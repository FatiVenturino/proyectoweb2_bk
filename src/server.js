require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const path = require('path');
const { sequelize } = require('./config/database');

// Importar modelos y sus asociaciones
require('./models/index');

// Importación de rutas
const authRoutes = require('./routes/auth.routes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedido.routes');
const adminRoutes = require('./routes/admin.routes');
const promocionRoutes = require('./routes/promocionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/FOTOS', express.static(path.join(__dirname, '../../FOTOS')));
app.use('/cliente', express.static(path.join(__dirname, '../../cliente')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/promociones', promocionRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = 4000; // Puerto fijo para desarrollo

// Función para crear la base de datos si no existe
async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'proyecto'
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'ecommerce_db'}`);
    console.log('Base de datos creada o ya existente');
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Iniciar servidor y conectar base de datos
async function startServer() {
  try {
    // Crear base de datos si no existe
    await createDatabaseIfNotExists();

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer(); 