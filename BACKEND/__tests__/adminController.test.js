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


}

)
