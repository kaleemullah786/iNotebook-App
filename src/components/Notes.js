import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/note/noteContext'
import NoteItem from './NoteItem';
import AddNote from "./AddNote";

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: 'default' })
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        
        for (let i = 0; i < notes.length; i++) {
            if (notes[i]._id === note._id) {
                notes[i] = note;
            }
        }
        editNote(note);
    }
    const updateNote = (curr) => {
        setNote(curr)
    }
    useEffect(() => {
        
            getNotes();
        
    })
    return (
        <>
            <AddNote />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        <div className='row gap-3 pb-5'>
            <h1 className='mb-3'>Your Notes</h1>
            {notes.map((n,i) => {
                return <NoteItem note={n} updateNote={updateNote}  key={i}  />
            })}
            </div>
        </>
    )
}

export default Notes