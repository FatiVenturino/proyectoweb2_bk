const express = require('express');
const {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  actualizarEstadoPedido
} = require('../controllers/pedido.controller');
const { auth, esAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas para clientes y admin
router.post('/', auth, crearPedido);
router.get('/', auth, obtenerPedidos);
router.get('/:id', auth, obtenerPedido);

// Rutas solo para admin
router.patch('/:id/estado', auth, esAdmin, actualizarEstadoPedido);

module.exports = router; 