import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => { // Defining a functional component named NoteState that accepts props.
  const host = "http://localhost:5000" // Setting the host URL for API calls.
  const notesInitial = [] // Here Im Initializing an empty array for storing notes.
  const [notes, setNotes] = useState(notesInitial) //Here I am Using the useState hook to create a state variable notes and a function setNotes to update it, initializing it with notesInitial.

  // GET ALL NOTES
  const getAllNotes = async () => {
    //Have to do API CALL
    //Here i am Making an asynchronous GET request to the /api/notes/fetchallnotes endpoint, awaiting the response.
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json() // I am parsing the response as JSON, awaiting the result.
    console.log(json) // logs the parsed json to the console
    setNotes(json) // updates the notes state with the fetched notes.    props.showAlert("Updated the Note Successfully","success");
    props.showAlert("Welcome to iNotebook Where you can save your notes","success");

  }



  // Add a note
  const addNote = async (title, description, tag) => {
    //Have to do API CALL
    // Making an asynchronous POST request to the /api/notes/addnote endpoint, awaiting the response.
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const newNote = await response.json();
    console.log(newNote);

    console.log("adding new note");
    setNotes([newNote, ...notes]);
    props.showAlert("Added the Note Successfully","success");

  }



  // Delete a note

  const deleteNote = async (id) => {
    //Have to do API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    console.log("Deleting the note with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id }) //here both ids are same so filter method willl delete that array newNote 
    setNotes(newNote)  // Upating the notes state by concatenating the new note to the existing notes.
    props.showAlert("Deleted the Note Successfully","success");

  }



  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Have to do API CALL
    // Making an asynchronous POST request to the /api/notes/updatenote/{id} endpoint, awaiting the response.
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)


    // LOGIC TO edit in client
    console.log("Editing note id:" + id + title + description + tag);

    // Create a new array with the updated note
    const updatedNotes = notes.map((note) => note._id === id ? { ...note, title, description, tag } : note);

    // Update the state with the new array
    setNotes(updatedNotes);
    props.showAlert("Edited the Note Successfully","success");

  };

  // Returning  a NoteContext.Provider that passes down the notes state and the functions to manipulate it (getAllNotes, addNote, editNote, deleteNote) to its children components.
  return (
    <NoteContext.Provider value={{ notes, getAllNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;