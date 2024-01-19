const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('entries.db');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/entries/getEntries',(request, response) => {
    const validColumns = ['author', 'title', 'content'];
    const filter = validColumns.includes(request.body.filter) ? request.body.filter : 'title';
    const search = request.body.search || '';
    const searchTerm = "%" + search + "%";
    const page = typeof request.body.page === 'number' ? request.body.page : 1;
    const limit = 70;
    const offset = (page - 1) * limit;
    
    if(!search) {
        const q = 'SELECT * FROM entries ORDER BY fecha_creacion DESC LIMIT ? OFFSET ?';
        db.all(q, [limit, offset], (err, rows) => {
            if (err) {
                response.status(500).send(err.message);
            } else {
                response.send(rows);
            }
        });
        return;
    }
    const query = `SELECT * FROM entries WHERE ${filter} LIKE ? ORDER BY fecha_creacion DESC LIMIT ? OFFSET ?`;
    db.all(query, [searchTerm, limit, offset], (err, rows) => {
        if (err) {
            response.status(500).send(err.message);
        } else {
            response.send(rows);
        } 
    });
});

app.post('/entries/addEntry',(request, response) => {
    console.log(request.body);
    const { author, title, content, fecha_creacion } = request.body;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

    if (!author || !title || !content || !fecha_creacion) {
        return response.status(400).send({ error: 'Author, title, and content are required.' });
    }

    if(!regexFecha.test(fecha_creacion)) {
        response.status(400).send('Formato de fecha inválido. Use el formato YYYY-MM-DD.');
        return;
    }

    const stmt = db.prepare("INSERT INTO entries (author, title, content, fecha_creacion) VALUES (?, ?, ?, ?)");
    stmt.run([author, title, content, fecha_creacion], function(err) {
        if (err) {
            return response.status(500).send({ error: err.message });
        }
        response.status(201).send({ message: 'Entry added successfully', id: this.lastID });
    });
    stmt.finalize();
});

app.listen(7835)
