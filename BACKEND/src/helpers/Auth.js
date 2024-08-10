const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = async (req, res, next) => {
    const jwtPassword = process.env.JWT_SECRET;

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({
            mensaje: 'You are no authorized'
        });
    }
    const token = authHeader;
    if (!token || token == 'null') {
        return res.json({
            mensaje: 'You are no authorized Null'
        });
    }
    jwt.verify(token, jwtPassword, (error, decoded) => {
        if (error) return res.status(401).json({
            mensaje: 'You are no authorized'
        });
        next();
        req.user = decoded;
    }
    );
}
// const verifyRol = (rol) => {
//     return async (req, res, next) => {

//         const authHeader = req.headers['authorization'];
//         console.log(authHeader);
//         if (!authHeader) {
//             return res.status(401).json({
//                 mensaje: 'You are no authorized'
//             });
//         }
//         const token = authHeader;
//         if (!token || token == 'null') {
//             return res.status(401).json({
//                 mensaje: 'You are no authorized Null'
//             });
//         }
//         try {
//             const decoded = jwt.verify(token, jwt);

//             const userId = decoded.id;

//             const query = ` 
//              SELECT r.nombre
//              FROM rol r
//              JOIN usuario_rol ur ON r.id = ur.rol_id
//              WHERE ur.usuario_id = $1;

//              `;
//             const result = await pool.query(query, [userId]);

//             const userRoles = result.rows.map(row => row.nombre);
//             const tieneRolPermitido = rolesPermitidos.some(rol => userRoles.includes(rol));
//             next();
//         } catch (error) {
//             console.error(error);
//             return res.status(401).json({
//                 mensaje: 'You are not authorized'
//             });
//         }


//     }
// }

module.exports = {
    verifyToken,
};