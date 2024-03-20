const express = require('express'); //imports the express.js library
const router = express.Router(); //creating a object router to define routes
const User = require('../models/User.js'); //importing user.js file
const { body, validationResult } = require('express-validator'); //importing validation functions from express-validator
const bcrypt = require('bcryptjs'); //importing bcrypt lib for password hashing
const jwt=require('jsonwebtoken');
const Jwt_Secret="Doneby@RohithRudrapati";
const fetchUser=require('../middleware/fetchUser.js');


//ROUTE 1 : create a User using: POST "/api/auth/createuser". No login Required
//here i am defining a POST route at /createuser that handles user creation
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }), //giving validations
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 4 characters').isLength({ min: 4 })
], async (req, res) => { //Mark the callback function as async to use await
    //if there are errors , return Bad request and the errors
  //prints the req which we gave in body
    // console.log(req.body);    
    let success=false;
    const errors = validationResult(req); //checking for validation errors
    if (!errors.isEmpty()) {  // If there are validation errors, returns a 400 status with the errors.  
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email }); //Checks if a user with the given email already exists.
        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" }) //if exists gives this error
        }
        const salt = await bcrypt.genSalt(10); //generates a salt for the password hashing
        securedPass = await bcrypt.hash(req.body.password, salt); //hashes the password with the salt

        // create a new user with the provided name, hashed password, and email.
        user = await User.create({
            name: req.body.name,
            password: securedPass,
            email: req.body.email
        })
        const data={ //Prepares data for JWT token generation.
            user:{
                id: user.id
            }
        }
        const authenticationToken =jwt.sign(data, Jwt_Secret ); //Generates a JWT token for the user by using the sign. 
        // console.log(authenticationToken);
        success=true;
        res.json({success,authenticationToken}) //Sends the newly created user as a JSON response.
    }
    //catch errors: Handles any errors that occur during the process.
    catch (error) {
        console.error(error.message);
        res.status(500).send("There is some Internal Server Issue"); // we will get to see this in response like in thunderclient response
    }

})



// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login required
// Defining a POST route for user login, with validation for email and password.
router.post('/login', [
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'password cannot be blank').exists(), // check whether the password is entered or not

], async (req, res) => {
    let success=false;
    const errors = validationResult(req); //checking for validation errors
    if (!errors.isEmpty()) {  // If there are validation errors, returns a 400 status with the errors.  
        return res.status(400).json({ errors: errors.array() });
    }
    //uses destructuring to extract email and password properties from the req.body object, making them available as constants for use in the code that follows 
    const {email,password} = req.body; //Extracts email and password from the request body.
    try{
        let user= await User.findOne({email}); //checks if user had similar email
        if(!user){ //if not return error
            return res.status(400).json({success, error: "Please log in with the correct credentials"});
        }
        // if yes it will check for password match so we use comparing btw the provided password and stored password
        const passwordComparing = await bcrypt.compare(password,user.password);
        if(!passwordComparing){ // if password dont match raises error
            return res.status(400).json({success,error: "Please log in with the correct credentials"});
        }

    // if matches we prepare data for jwt token generation
        const data= {
            user:{
                id: user.id
            }
        }
        const authenticationToken= jwt.sign(data,Jwt_Secret); 
        success=true;
        res.json({success,authenticationToken}) // Sends the JWT token back to the client we can see this in response in json format.

    }
    catch (error) {  //if any error occurs during progress, it will send 500 status with an error message
        console.error(error.message);
        res.status(500).send("There is some Internal Server Issue"); // we will get to see this in response like in thunderclient response
    }

});

 

// we will be using concept like middle ware , its nothing but a fucntion which will be called if we get any request . here it works if any request raises at login req
//ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchUser,async(req,res)=>{

try {
    userId= req.user.id; //Assigning the ID of the authenticated user to the variable userId. This is obtained from the req.user.id property, which is populated by the fetchUser middleware.
    const user= await User.findById(userId).select("-password") //Fetches the user from the database by ID, excluding the password field from the result.
    res.send(user) // sending the user data back to the client 

} catch (error) {
    console.error(error.message);
        res.status(500).send("There is some Internal Server Issue"); // we will get to see this in response like in thunderclient response
}
});
module.exports = router //exports the router so that we can use it in other parts of the application