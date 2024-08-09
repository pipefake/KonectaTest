const { JsonWebTokenError } = require('jsonwebtoken');
const { agregarUsuario } = require('../src/controllers/userController');
const pool = require("../src/controllers/db");

jest.mock('../src/controllers/db');

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
}

)
