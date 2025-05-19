const Producto = require('../models/Producto');

const obtenerProductos = async (req, res) => {
  try {
    const { categoria, destacado } = req.query;
    const where = { activo: true };
    
    if (categoria) {
      where.categoria = categoria;
    }
    
    if (destacado === 'true') {
      where.destacado = true;
    }

    const productos = await Producto.findAll({ where });
    
    res.json({
      status: 'success',
      data: { productos }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({
      where: { id: req.params.id, activo: true }
    });

    if (!producto) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }

    res.json({
      status: 'success',
      data: { producto }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener producto',
      error: error.message
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: { producto }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }

    await producto.update(req.body);
    
    res.json({
      status: 'success',
      data: { producto }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      });
    }

    // Eliminación lógica
    await producto.update({ activo: false });
    
    res.json({
      status: 'success',
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}; 