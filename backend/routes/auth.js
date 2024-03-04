const express = require('express'); //imports the express.js library
const router = express.Router(); //creating a object router to define routes
const User = require('../models/User.js'); //importing user.js file
const { body, validationResult } = require('express-validator'); //importing validation functions from express-validator
const bcrypt = require('bcryptjs'); //importing bcrypt lib for password hashing

//create a User using: POST "/api/auth/createuser". No login Required
//here i am defining a POST route at /createuser that handles user creation
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }), //giving validations
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 4 characters').isLength({ min: 4 })
], async (req, res) => { //Mark the callback function as async to use await
    //if there are errors , return Bad request and the errors
    console.log(req.body); //prints the req which we gave in body

    const errors = validationResult(req); //checking for validation errors
    if (!errors.isEmpty()) {  // If there are validation errors, returns a 400 status with the errors.  
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email }); //Checks if a user with the given email already exists.
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" }) //if exists gives this error
        }
        const salt= await bcrypt.genSalt(10); //generates a salt for the password hashing
        securedPass= await bcrypt.hash(req.body.password,salt); //hashes the password with the salt

        // create a new user with the provided name, hashed password, and email.
        user = await User.create({ 
            name: req.body.name,
            password: securedPass,
            email: req.body.email
        })

        res.json(user) //Sends the newly created user as a JSON response.
    }
    //catch errors: Handles any errors that occur during the process.
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured"); // we will get to see this in response like in thunderclient response
    }
    
})

module.exports = router //exports the router so that we can use it in other parts of the application