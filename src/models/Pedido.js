const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmado', 'en_preparacion', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  direccionEntrega: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: true
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia'),
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Pedido; 