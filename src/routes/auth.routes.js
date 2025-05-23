const express = require('express');
const { registro, login, perfil } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);
router.get('/perfil', auth, perfil);
router.post('/validar-usuario', authController.validarUsuario);

module.exports = router; 