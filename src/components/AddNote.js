import React,{useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";
import { useState } from 'react';

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note,setNote]=useState({title: "", description: "", tag: ""})
    const handleClick = (newval) => {
        newval.preventDefault(); //to avoid page reload
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "",tag: ""})
    }
    const onChange = (newval) => {
         setNote({...note, [newval.target.name]: newval.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>

            <form>
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <textarea className="form-control" id="title" name="title" rows="1" onChange={onChange} minLength={3} required value={note.title}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="1" onChange={onChange} minLength={3} required value={note.description}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <textarea className="form-control" id="tag" name="tag" rows="1" onChange={onChange} value={note.tag}></textarea>
                    </div>
                    <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary mx-1 my-2" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
