const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Pedido = require('./Pedido');
const DetallePedido = require('./DetallePedido');

// Asociaciones Usuario-Pedido
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Asociaciones Pedido-DetallePedido
Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// Asociaciones Producto-DetallePedido
Producto.hasMany(DetallePedido, { foreignKey: 'productoId' });
DetallePedido.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = {
  Usuario,
  Producto,
  Pedido,
  DetallePedido
}; 