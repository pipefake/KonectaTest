const { JsonWebTokenError } = require('jsonwebtoken');
const { agregarUsuario, iniciarSesion } = require('../src/controllers/userController');
const pool = require("../src/controllers/db");
const bcrypt = require('bcryptjs/dist/bcrypt');

jest.mock('../src/controllers/db');
jest.mock('bcryptjs');

describe('userController Authentification', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Add an user if not provide email or password throw error', async () => {
        const req = {
            body: {
                nombre: 'Test User',
                email: '',
                contrasena: ''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await agregarUsuario(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Correo y contraseña son requeridos'
        });
    });
    test('Should return an error if the email already exists', async () => {
        const req = {
            body: {
                nombre: 'Test User',
                email: 'felipe@felipe.com',
                contrasena: '123456'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        pool.query.mockResolvedValueOnce({
            rows: [{ email: 'felipe@felipe.com' }]
        });



        await agregarUsuario(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Correo ya existe'
        });
    });
    test('Should return an error if doesn not provide password and user', async () => {
        const req = {
            body: {
                email: '',
                contrasena: ''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }



        await iniciarSesion(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Correo y contraseña son requeridos'
        });
    });
    test('Should return an error if the email is not correct', async () => {
        const req = {
            body: {
                email: 'felipe.com',
                contrasena: '123456'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        pool.query.mockResolvedValueOnce({
            rows: []
        });



        await iniciarSesion(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Correo Incorrecto'
        });
    });
    test('Should return an error if the email does not exist', async () => {
        const req = {
            body: {
                email: 'felipe@felipe.com',
                contrasena: '123456'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        pool.query.mockResolvedValueOnce({
            rows: []
        });



        await iniciarSesion(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Correo Incorrecto'
        });
    });

}

)
