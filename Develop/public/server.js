const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;


//Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//GET requests
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if(err) {
            throw err
        }
        return res.json(data);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


//POST request
app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if(err) {
            throw err
        }
        let json = JSON.parse(data);
        json.push(newNote);

        fs.writeFile('../db/db.json', JSON.stringify(json), (err) => {
            if (err) {
                throw err
            };
        });
        console.log('File successfully updated!');
    });
});


//DELETE request
//Receive query parameter to locate note to delete. In order to delete a note, read all the notes from db.json
//remove the note with the given id and rewrite notes to db.json
// app.delete('/api/notes:title', (req, res) => {
//     let selected = req.params.title;
//     fs.readFile('../db/db.json', 'utf8', (err, data) => {
//         if(err) {
//             throw err
//         }

//         let json = JSON.parse(data);
//         const toDelete = json.find(note => note.title === selected);
//         if(!toDelete) {
//             res.status(404).send('Note with given title could not be located');
//         };
//         const index = json.indexOf(toDelete);
//         json.splice(index, 1);
//     });   
// });

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});