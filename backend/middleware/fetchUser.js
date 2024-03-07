const jwt = require('jsonwebtoken'); // Imports the jsonwebtoken library
const Jwt_Secret = "Doneby@RohithRudrapati"; // Defines the secret key for JWT



const fetchUser = (req, res, next) => { // Defines a middleware function named fetchuser
    //Getting the user from the jwt token and add id to req object
    const token = req.header('auth-token'); // Extracts the 'auth-token' header from the request
    if (!token) { // Checks if the token is not present
        res.status(401).send({ error: " Please enter valid token for authentication " })
    }
    try {
        const data = jwt.verify(token, Jwt_Secret); // Attempts to verify the token using the secret key
        req.user = data.user; // Assigns the user data extracted from the token to req.user
        next(); //calls next middleware which is in the stack
    }
 catch(error) {  // Catches any errors that occur during token verification
    res.status(401).send({ error: " Please enter valid token for authentication " })
}
}


module.exports = fetchUser; // Exports the fetchUser middleware for use in other parts of the application