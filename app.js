const express = require('express');
const db = require('./conn');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Biodata page ni ha
app.get('/', (req, res) => {
    res.render('index');
});

// INSERT biodata  10 ka content.
app.post('/insert', (req, res) => {

    console.log(req.body);

    const {
        firstname,
        lastname,
        age,
        gender,
        birthday,
        address,
        contact,
        email,
        course,
        yearlevel,
        section,
        hobbies,
        skills,
        motto
    } = req.body;

    const sql = `
        INSERT INTO bsit3_6
        (firstname, lastname, age, gender, birthday, address,
        contact, email, course, yearlevel, section, hobbies, skills, motto)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        firstname,
        lastname,
        age,
        gender,
        birthday,
        address,
        contact,
        email,
        course,
        yearlevel,
        section,
        hobbies,
        skills,
        motto
    ], (err) => {

        if (err) {
            console.log(err);
            return res.send('Error inserting biodata.');
        }

        res.redirect('/details');
    });
});

//  sa details ja
app.get('/details', (req, res) => {

    const sql = 'SELECT * FROM bsit3_6';

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.send('Error loading details.');
        }

        res.render('details', {
            students: results
        });
    });
});

app.listen(9000, () => {
    console.log('Server running at http://localhost:9000');
});