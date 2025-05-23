const Producto = require('../models/Producto');

exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

exports.createProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto' });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        await producto.update(req.body);
        res.json(producto);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        await producto.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
};

exports.getPedidos = (req, res) => res.json([]);
exports.updatePedido = (req, res) => res.json({ message: 'Pedido actualizado (simulado)' });

exports.getClientes = (req, res) => res.json([]);

exports.getReportes = (req, res) => res.json([]);

exports.getPromociones = (req, res) => res.json([]);
exports.createPromocion = (req, res) => res.json({ message: 'Promoción creada (simulado)' }); 