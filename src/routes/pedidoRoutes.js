const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { auth, esAdmin } = require('../middleware/auth.middleware');

// Rutas para administrador
router.get('/admin/pedidos', auth, esAdmin, pedidoController.getAllPedidos);
router.get('/admin/pedidos/:pedidoId', auth, esAdmin, pedidoController.getDetallesPedido);
router.put('/admin/pedidos/:pedidoId/estado', auth, esAdmin, pedidoController.actualizarEstado);
router.put('/admin/pedidos/:pedidoId/pagar', auth, esAdmin, pedidoController.marcarComoPagado);

// Rutas para cliente
router.get('/cliente/:clienteId/pedidos', auth, pedidoController.getPedidosCliente);
router.get('/:pedidoId/detalles', auth, pedidoController.getDetallesPedido);
router.post('/pedidos', auth, pedidoController.crearPedido);

module.exports = router; 