const express = require('express');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();

const db = new pg.Client({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST
});

db.connect()
    .then(() => console.log('connected'))
    .catch(err => console.log(err));

const server = express();

// Use CORS middleware
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/api/pokemon', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM caught_pokemon');
        res.json(data.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.post('/api/pokemon', async (req, res) => {
    const { name, base_experience } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO caught_pokemon (name, base_experience) VALUES ($1, $2) RETURNING *',
            [name, base_experience]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
