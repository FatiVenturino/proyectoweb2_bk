const express = require('express');
const router = express.Router();
const promocionController = require('../controllers/promocionController');

// Listar promociones
router.get('/', promocionController.getAll);
// Crear promoción
router.post('/', promocionController.create);
// Editar promoción
router.put('/:id', promocionController.update);
// Eliminar promoción
router.delete('/:id', promocionController.delete);

module.exports = router; 