const express = require('express'); //imports express
const router = express.Router(); //creates a new router object in Express.js, allowing for modular route handling by acting as a mini-app
const fetchUser = require('../middleware/fetchUser'); // Imports the fetchUser middleware
const Note = require('../models/Note'); // Imports the Note model
const { body, validationResult } = require('express-validator'); //importing validation functions from express-validator


// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchnotes" that uses FetchUser middle ware for authentication . Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // Queries the database for notes
        res.json(notes) // Sends the notes as a JSON response
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("There is some Internal Server Issue"); // we will get to see this in response like in thunderclient response
    }
})

// ROUTE 2 : Add a new Note using: POST "/api/notes/addnote" that uses the fetchUser middleware for authentication and includes validation. Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }), //giving validations
    body('description', 'description must be atleast 4 characters').isLength({ min: 4 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body; // Extracts title, description, and tag from the request body
        const errors = validationResult(req); // Checks for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({ // Creates a new Note instance
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save() // Saves the new note to the database
        res.json(savedNote)  // Sends the saved note as a JSON response
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("There is some Internal Server Issue"); // we will get to see this in response like in thunderclient response
    }
})
module.exports = router