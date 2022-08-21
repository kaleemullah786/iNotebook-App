const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchusr');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Please give valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    let note = await Notes.findById(req.params.id);
    if (!note)
    {
        return res.status(404).send('Not found');
    }
    if (note.user.toString() !== req.user.id)
    {
        return res.status(401).send('Not allowed');
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.send({note});
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send('Not found');
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not allowed');
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"Note has been deleted"  });
})

module.exports = router;