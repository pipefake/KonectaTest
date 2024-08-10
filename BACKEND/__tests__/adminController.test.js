const { JsonWebTokenError } = require('jsonwebtoken');
const { readEmployees, registerEmployee, deleteEmployee } = require('../src/controllers/adminController');
const pool = require("../src/controllers/db");
const bcrypt = require('bcryptjs/dist/bcrypt');

jest.mock('../src/controllers/db');
jest.mock('bcryptjs');

describe(' Admincontroller test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    //readEmployees
    test('Should list employees', async () => {
        const mockEmployees = [
            {
                id: 1,
                fecha_ingreso: "2024-08-09T05:00:00.000Z",
                nombre: "Juan Perez",
                salario: "50000.00"
            },
            {
                id: 2,
                fecha_ingreso: "2024-02-09T05:00:00.000Z",
                nombre: "Andrea Perez",
                salario: "60000.00"
            }
        ];
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        pool.query.mockResolvedValueOnce({ rows: mockEmployees });



        await readEmployees(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Okay',
            employees: mockEmployees
        });
    });
    //Test for 'registerEmployee
    test('Should register an employee', async () => {

        const req = {
            body: {
                fecha_ingreso: '2024-08-09T05:00:00.000Z',
                nombre: 'andrés gomez',
                salario: 800000
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        pool.query.mockResolvedValueOnce({
            rows: [{ nombre: 'andrés gomez' }]
        });

        await registerEmployee(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Empleado ya existe'
        });


    });
    //Test for deleteEmployee
    test('should delete an employee and return success', async () => {
        const req = {
            params: { id: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        pool.query.mockResolvedValueOnce({ rowCount: 1 });
        await deleteEmployee(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            mensaje: 'Deleted Employee'
        });
    });



}

)
