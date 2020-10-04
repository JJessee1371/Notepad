const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//GET /notes will return the notes.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// * returns the index.html page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /api/notes reads the db.json file and retuns all saved notes

//POST /api/notes - Receive a new note on the req.body and add to db.json, return new note to client

//DELETE /api/notes/:id
//Receive query parameter to locate note to delete. In order to delete a note, read all the notes from db.json
//remove the note with th egiven id and rewrite notes to db.json

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});