// server.js
const express = require('express');
const db = require('./db');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// home
app.get('/', (req, res) => {
    res.render('index', { message: null });
});

// GET add form
app.get('/add', (req, res) => {
    res.render('add', { error: null });
});

// POST add student
app.post('/add', async (req, res) => {
    const { name, class: clas, adm, roll, addr, mob } = req.body;
    if (!name || !clas || !adm) {
        return res.render('add', { error: 'Name, class and admission no. are required.' });
    }

    try {
        // Check if admission number already exists
        const docRef = db.collection('students').doc(adm);
        const doc = await docRef.get();

        if (doc.exists) {
            return res.render('add', { error: 'Admission number already exists.' });
        }

        // Add student to Firestore (adm_no is the document ID)
        await docRef.set({
            name: name,
            class: clas,
            roll_no: roll || null,
            address: addr || '',
            mob_no: mob || null
        });

        res.render('index', { message: 'Record Added Successfully ✅' });
    } catch (err) {
        console.error(err);
        res.render('add', { error: 'Database error. Check server logs.' });
    }
});

// view all (or filter by class via query ?class=10A)
app.get('/view', async (req, res) => {
    const classFilter = req.query.class || null;
    try {
        let students = [];

        if (classFilter) {
            // Query students filtered by class
            const snapshot = await db.collection('students')
                .where('class', '==', classFilter)
                .get();

            snapshot.forEach(doc => {
                students.push({
                    adm_no: doc.id,  // Document ID is the admission number
                    ...doc.data()
                });
            });
        } else {
            // Get all students
            const snapshot = await db.collection('students').get();

            snapshot.forEach(doc => {
                students.push({
                    adm_no: doc.id,  // Document ID is the admission number
                    ...doc.data()
                });
            });
        }

        res.render('view', { students: students, classFilter });
    } catch (err) {
        console.error(err);
        res.render('view', { students: [], classFilter, error: 'Failed to fetch records' });
    }
});

// GET delete form
app.get('/delete', (req, res) => {
    res.render('delete', { error: null });
});

// POST delete by admission no.
app.post('/delete', async (req, res) => {
    const { adm } = req.body;
    if (!adm) return res.render('delete', { error: 'Please provide admission number.' });

    try {
        const docRef = db.collection('students').doc(adm);
        const doc = await docRef.get();

        if (!doc.exists) {
            res.render('delete', { error: 'No record found with that admission number.' });
        } else {
            await docRef.delete();
            res.render('index', { message: 'Record Deleted Successfully 🗑️' });
        }
    } catch (err) {
        console.error(err);
        res.render('delete', { error: 'Delete failed. Check server logs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
