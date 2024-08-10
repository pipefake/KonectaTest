const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Auth = require('../helpers/Auth');

router.post('/create', Auth.verifyToken, adminController.registerEmployee);
//router.post('/register', userContoller.iniciarSesion);
//router.post('/edit', userContoller.iniciarSesion);
router.delete('/delete/:id', adminController.deleteEmployee);

module.exports = router;
