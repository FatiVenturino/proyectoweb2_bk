const Producto = require('../models/Producto');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Producto.findAll({
            attributes: ['categoria'],
            group: ['categoria'],
            raw: true
        });
        res.json(categorias.map(c => c.categoria));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorías', error: error.message });
    }
};

// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: { activo: true },
            order: [['nombre', 'ASC']]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
    }
};

// Obtener productos por categoría
exports.getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const productos = await Producto.findAll({
            where: { 
                categoria,
                activo: true
            },
            order: [['nombre', 'ASC']]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos por categoría', error: error.message });
    }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        await producto.update(req.body);
        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto (soft delete)
exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        await producto.update({ activo: false });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
}; 