const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

//Contents of public folder are staticly served
app.use(express.static( __dirname + '/public' ));

//Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Server listening for activity
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});


//GET requests
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            throw err
        }
        
        return res.json(JSON.parse(data.toString()));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './index.html'));
});


//POST request
app.post('/api/notes', (req, res) => {
    let note = req.body;
    note["id"] = Date.now();

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            throw err
        }
        let json = JSON.parse(data);
        json.push(note);

        fs.writeFile('./db/db.json', JSON.stringify(json), (err) => {
            if (err) {
                throw err
            }
            res.json(note);
        });

    });
});


//DELETE request
app.delete('/api/notes/:id', (req, res) => {
    let selected = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            throw err
        }

        let json = JSON.parse(data);
        const toDelete = json.find(note => {
            return note.id == selected
        });
        if(!toDelete) {
            res.status(404).send('Note with given ID could not be located');
        };
        const index = json.indexOf(toDelete);
        json.splice(index, 1);

        fs.writeFile('./db/db.json', JSON.stringify(json), (err) => {
            if (err) {
                throw err
            }
            res.json({ ok: true });
        });
    });  
});