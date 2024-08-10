const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/userController');



router.post('/registro', userContoller.agregarUsuario);
router.post('/login', userContoller.iniciarSesion);

module.exports = router;
