import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const [notes, setNotes] = useState([])
    
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/getnotes`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }

    const addNote = (title, description, tag) => {
        const note = {
            "title": title,
            "description": description,
            "tag": tag
        }
        fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
            .then(response => response.json())
            .then(note => {
                console.log('Success:', note);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setNotes(notes.concat(note));
    }
    const editNote = async (note) => {

        const response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(note)
        })
    
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === note._id) {
                newNotes[index] = note;
                break;
            }
        }
        setNotes(newNotes)
    }
    const deleteNote = (id) => {

        const newNotes = notes.filter(note => { return note._id !== id })
        setNotes(newNotes);
        fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(note => {
                console.log('Success:', note);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;