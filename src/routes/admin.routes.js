const express = require('express');
const router = express.Router();

// Controladores (a crear)
const adminController = require('../controllers/adminController');

// Gestión de productos
router.get('/productos', adminController.getProductos);
router.post('/productos', adminController.createProducto);
router.put('/productos/:id', adminController.updateProducto);
router.delete('/productos/:id', adminController.deleteProducto);

// Gestión de pedidos
router.get('/pedidos', adminController.getPedidos);
router.put('/pedidos/:id', adminController.updatePedido);

// Gestión de clientes
router.get('/clientes', adminController.getClientes);

// Reportes
router.get('/reportes', adminController.getReportes);

// Promociones
router.get('/promociones', adminController.getPromociones);
router.post('/promociones', adminController.createPromocion);

module.exports = router; 