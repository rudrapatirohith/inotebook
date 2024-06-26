import express from 'express'; // Import express
const router = express.Router(); // Creates a new router object in Express.js

import fetchUser from '../middleware/fetchUser.js'; // Imports the fetchUser middleware
import Note from '../models/Note.js'; // Imports the Note model
import { body, validationResult } from 'express-validator'; // Import validation functions from express-validator

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

// ROUTE 3 : UPDATE AN EXISTING NOTE using : PUT "api/notes/updatenote/id" - login reqd - where id is placeholder for notes ID which we got after adding a note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body; // Extracts title, description, and tag from the request body
    // creating a newNote object
    // Initializes an empty object to hold the new note data.
    const newNote = {};
    if (title) { newNote.title = title }; // adds title to newNote if provided
    if (description) { newNote.description = description }; // adds description to newNote if provided
    if (tag) { newNote.tag = tag }; // adds tag to newNote if provided

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id); //Finds the note by ID from the database.
    if (!note) { return res.status(404).send("Not Found") }

    //mongoose stores IDs as objects  and direct comparison between objects and strings would always result in false, even if the IDs are the same.
    // so i am using string convertion to match
    //req.user.id id the ID user making the req, obtained fromt the req obj
    if (note.user.toString() != req.user.id) { //Checks if the note's user ID matches the requesting user's ID.
        return res.status(401).send("Not Allowed");
    }
    // Updates the note in the database with the new data.
    //The $set operator is used to specify the fields to update. It updates the document with the new values contained in the newNote object. 
    //The {new:true} option tells Mongoose to return the updated document rather than the original
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note);
}
)


// ROUTE 4 : DELETE AN EXISITING NODE USING : DELETE "api/notes/deletenote/id" - login required - where id is the id of the note which we see after adding the note in response
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {

        // Attempting to find a note in the database with the ID specified in the request parameters. 
        let note = await Note.findById(req.params.id);

        // Checking if the note was found. If not, it sends a 404 Not Found response to the client.
        if (!note) { return res.status(404).send("Not Found") }

        // Checking if the user who made the request is the owner of the note. If not, it proceeds to the next line.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        // Deletes the note from the database using its ID. The await keyword is used to wait for the promise returned by Note.findByIdAndDelete to resolve.
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note});
    }

    catch (error) {
        console.error(error.messgae);
        res.status(500).send("Internal Server Error");
    }

})

// module.exports = router
export default router;