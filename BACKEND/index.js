require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
const secretKey = process.env.JWT_SECRET;


pool.on('connect', () => {
    console.log('Conectado a la base de datos Konecta en PostgreSQL');
});


app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

app.post('/registro', async (req, res) => {
    const { nombre, email, contrasena } = req.body;
    try {
        const hash = await bcrypt.hash(contrasena, 10);
        const result = await pool.query(
            'INSERT INTO usuario (NOMBRE, EMAIL, CONTRASENA) VALUES ($1, $2, $3) RETURNING ID',
            [nombre, email, hash]
        );
        res.status(201).json({
            id: result.rows[0].id
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registra usuario');
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
