import React, { useContext,useState } from 'react'
import noteContext from '../context/note/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: " ", description: " ", tag: "default" })
    const handleChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
  return (
      <div className="p-5">
          <h1>Add Note</h1>
          <form>
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
          </form>
      </div>
  )
}

export default AddNote