const express = require('express');
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/producto.controller');
const { auth, esAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);

// Rutas protegidas (solo admin)
router.post('/', auth, esAdmin, crearProducto);
router.put('/:id', auth, esAdmin, actualizarProducto);
router.delete('/:id', auth, esAdmin, eliminarProducto);

module.exports = router; 