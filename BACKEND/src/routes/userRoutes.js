const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/userController');

router.post('/', userContoller.agregarUsuario);

module.exports = router;
