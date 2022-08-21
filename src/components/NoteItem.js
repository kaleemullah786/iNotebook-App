import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'


const NoteItem = (props) => {
    const { title, description } = props.note;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    
    
    return (
        <div className="col-sm-2 mx-5">
            
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <button className="btn btn-outline-info mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>props.updateNote(props.note)}>Edit</button>
                    <button className="btn btn-outline-danger mx-2" onClick={() => deleteNote(props.note._id)}>Delete</button>
                </div>
            </div>
            
        </div>
    )
}

export default NoteItem