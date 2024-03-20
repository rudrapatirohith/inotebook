import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  let navigate = useNavigate();

  const {showAlert}=props;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getAllNotes()
    }
    else{
      navigate("/");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose= useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }



  const handleClick = (newval) => {
    // newval.preventDefault(); //to avoid page reload
    console.log("updating the note ", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // props.showAlert("Updated the Note Successfully","success");
   

  }
  const onChange = (newval) => {
    setNote({ ...note, [newval.target.name]: newval.target.value })
  }



  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <textarea className="form-control" id="etitle" name="etitle" rows="1" value={note.etitle} onChange={onChange} minLength={3} required></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="edescription" name="edescription" rows="1" value={note.edescription} onChange={onChange} minLength={3} required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <textarea className="form-control" id="etag" name="etag" rows="1" value={note.etag} onChange={onChange}></textarea>
                  </div>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3}onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container mx-2'>
        {notes.length===0 && 'No notes to Display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes
