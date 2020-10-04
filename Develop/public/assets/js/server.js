const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//GET /notes will return the notes.html page

// * returns the index.html page

// GET /api/notes reads the db.json file and retuns all saved notes

//POST /api/notes - Receive a new note on the req.body and add to db.json, return new note to client

//DELETE /api/notes/:id
//Receive query parameter to locate note to delete. In order to delete a note, read all the notes from db.json
//remove the note with th egiven id and rewrite notes to db.json

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});