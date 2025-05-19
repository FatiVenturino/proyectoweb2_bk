const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { verificarToken, esAdmin } = require('../middleware/auth');

// Rutas públicas
router.get('/categorias', productoController.getCategorias);
router.get('/', productoController.getProductos);
router.get('/categoria/:categoria', productoController.getProductosByCategoria);
router.get('/:id', productoController.getProductoById);

// Rutas protegidas (solo admin)
router.post('/', [verificarToken, esAdmin], productoController.createProducto);
router.put('/:id', [verificarToken, esAdmin], productoController.updateProducto);
router.delete('/:id', [verificarToken, esAdmin], productoController.deleteProducto);

module.exports = router; 