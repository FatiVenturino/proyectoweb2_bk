const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'proyecto',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      // Desactivar la pluralización automática
      freezeTableName: true,
      // Usar snake_case en lugar de camelCase para nombres de columnas
      underscored: true,
      // Agregar timestamps (created_at, updated_at)
      timestamps: true
    }
  }
);

module.exports = { sequelize }; 