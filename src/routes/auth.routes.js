const express = require('express');
const { registro, login, perfil } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);
router.get('/perfil', auth, perfil);

module.exports = router; 