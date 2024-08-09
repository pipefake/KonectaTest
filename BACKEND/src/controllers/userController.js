const pool = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require("pg/lib/defaults");
const validator = require('validator');


//Agregar nuevo usuario
const agregarUsuario = async (req, res) => {
    const {
        nombre,
        email,
        contrasena,
    } = req.body;

    if (!email || !contrasena) {
        return res.status(400).json({
            mensaje: 'Correo y contrasña son requeridos'
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            mensaje: 'correo no válido'
        });
    }


    const hash = await bcrypt.hash(contrasena, 10);
    try {

        const result = await pool.query(
            'INSERT INTO usuario (NOMBRE, EMAIL, CONTRASENA) VALUES ($1, $2, $3) RETURNING ID',
            [nombre, email, hash]
        );
        const usuario = result.rows[0];
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            'secret_key',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            mensaje: 'Registro exitoso',
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registra usuario');
    }
};

//login
const iniciarSesion = async (req, res) => {
    const {
        email,
        contrasena,
    } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM usuario WHERE EMAIL = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.json({ mensaje: 'correo Incorrecto' });
        }
        const usuario = result.rows[0];
        const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (contrasenaCorrecta) {
            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            res.json({
                mensaje: 'Bienvenide',
                id: usuario.id,
                nombre: usuario.nombre,
                token,
                email: usuario.email
            });
        } else {
            res.json({ mensaje: 'algo anda mal' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error iniciar secion');
    }
}

module.exports = {
    iniciarSesion,
    agregarUsuario
};
