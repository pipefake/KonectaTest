const pool = require("./db");
const bcrypt = require('bcryptjs');

//Agregar nuevo usuario
const agregarUsuario = async (req, res) => {
    const {
        nombre,
        email,
        contrasena,
    } = req.body;
    const hash = await bcrypt.hash(contrasena, 10);
    try {

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
};

module.exports = {
    agregarUsuario
};
