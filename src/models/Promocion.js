const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Promocion = sequelize.define('Promocion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descuento: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY
  },
  fecha_fin: {
    type: DataTypes.DATEONLY
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

Promocion.belongsTo(require('./Producto'), { foreignKey: 'producto_id', as: 'producto' });

module.exports = Promocion; 