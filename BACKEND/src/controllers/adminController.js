const pool = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require("pg/lib/defaults");
const validator = require('validator');
const { json } = require("express/lib/response");

//list of employee
const readEmployees = async (req, res) => {
    try {
        const listOfEmployees = await pool.query(
            'SELECT * FROM empleado'
        );
        const employees = listOfEmployees.rows;
        res.status(201).json({
            mensaje: 'Okay',
            employees
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Error al listar empleados');
    }
}

//add a new employee
const registerEmployee = async (req, res) => {
    const {
        fecha_ingreso,
        nombre,
        salario,
    } = req.body;

    if (!fecha_ingreso || !nombre || !salario) {
        return res.status(400).json({
            mensaje: 'Los datos fecha, nombre y salario son requeridos'
        });
    }

    try {

        const existEmployee = await pool.query(
            'SELECT * FROM empleado WHERE NOMBRE = $1',
            [nombre]
        );
        if (existEmployee.rows.length > 0) {
            return res.status(400).json({
                mensaje: 'Empleado ya existe'
            });
        }



        const result = await pool.query(
            'INSERT INTO empleado (FECHA_INGRESO, NOMBRE,SALARIO) VALUES ($1, $2, $3) RETURNING ID, FECHA_INGRESO, NOMBRE,SALARIO',
            [fecha_ingreso, nombre, salario]
        );
        const employee = result.rows[0];
        const token = jwt.sign(
            {
                id: employee.id,
                fecha_ingreso: employee.fecha_ingreso,
                nombre: employee.nombre,
                salario: employee.salario,

            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            mensaje: 'Registro exitoso',
            id: employee.id,
            fecha_ingreso: employee.fecha_ingreso,
            nombre: employee.nombre,
            salario: employee.salario,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Error al registra usuario');
    }
};
//delete employee

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            'DELETE FROM empleado WHERE ID = $1 RETURNING ID, FECHA_INGRESO, NOMBRE,SALARIO', [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'Empleado no encontrado'
            })
        }
        res.status(200).json({
            mensaje: 'Deleted Employee',

        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Ocurrió un error al eliminar',
            error: error.message
        });
    }
};


module.exports = {
    registerEmployee,
    deleteEmployee,
    readEmployees
};

