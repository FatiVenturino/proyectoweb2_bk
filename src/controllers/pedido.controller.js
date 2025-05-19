const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');
const Producto = require('../models/Producto');
const { sequelize } = require('../config/database');

const crearPedido = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { productos, direccionEntrega, metodoPago, observaciones } = req.body;
    
    let total = 0;
    
    // Verificar stock y calcular total
    for (const item of productos) {
      const producto = await Producto.findByPk(item.productoId);
      if (!producto || producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto ${producto?.nombre || item.productoId}`);
      }
      total += producto.precio * item.cantidad;
    }

    // Crear pedido
    const pedido = await Pedido.create({
      usuarioId: req.usuario.id,
      total,
      direccionEntrega,
      metodoPago,
      observaciones
    }, { transaction: t });

    // Crear detalles del pedido y actualizar stock
    for (const item of productos) {
      const producto = await Producto.findByPk(item.productoId);
      
      await DetallePedido.create({
        pedidoId: pedido.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
        subtotal: producto.precio * item.cantidad
      }, { transaction: t });

      await producto.update({
        stock: producto.stock - item.cantidad
      }, { transaction: t });
    }

    await t.commit();

    res.status(201).json({
      status: 'success',
      data: { pedido }
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      status: 'error',
      message: 'Error al crear pedido',
      error: error.message
    });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const where = {};
    
    // Si no es admin, solo ver sus propios pedidos
    if (req.usuario.rol !== 'admin') {
      where.usuarioId = req.usuario.id;
    }

    const pedidos = await Pedido.findAll({
      where,
      include: [{
        model: DetallePedido,
        include: [Producto]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: { pedidos }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener pedidos',
      error: error.message
    });
  }
};

const obtenerPedido = async (req, res) => {
  try {
    const where = { id: req.params.id };
    
    // Si no es admin, solo ver sus propios pedidos
    if (req.usuario.rol !== 'admin') {
      where.usuarioId = req.usuario.id;
    }

    const pedido = await Pedido.findOne({
      where,
      include: [{
        model: DetallePedido,
        include: [Producto]
      }]
    });

    if (!pedido) {
      return res.status(404).json({
        status: 'error',
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      status: 'success',
      data: { pedido }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener pedido',
      error: error.message
    });
  }
};

const actualizarEstadoPedido = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedido = await Pedido.findByPk(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        status: 'error',
        message: 'Pedido no encontrado'
      });
    }

    await pedido.update({ estado });

    res.json({
      status: 'success',
      data: { pedido }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar estado del pedido',
      error: error.message
    });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  actualizarEstadoPedido
}; 