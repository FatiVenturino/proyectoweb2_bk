require('dotenv').config();
const { sequelize } = require('../config/database');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');

async function initDB() {
  try {
    // Eliminar tablas en orden inverso a las dependencias
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Sincronizar todos los modelos
    await sequelize.sync({ force: true });
    
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Base de datos sincronizada correctamente');

    // Crear usuario administrador
    const adminUser = await Usuario.create({
      nombre: 'Administrador',
      email: 'admin@example.com',
      password: 'admin123',
      rol: 'admin',
      activo: true
    });
    console.log('Usuario administrador creado:', adminUser.email);

    // Crear algunos productos iniciales
    const productos = [
      {
        nombre: 'Merluza Congelada',
        descripcion: 'Filetes de merluza congelados de primera calidad',
        precio: 1200.00,
        stock: 50,
        categoria: 'mariscos',
        destacado: true
      },
      {
        nombre: 'Milanesas de Pollo',
        descripcion: 'Pack de milanesas de pollo congeladas',
        precio: 800.00,
        stock: 100,
        categoria: 'pollo_congelado'
      },
      {
        nombre: 'Mix de Verduras',
        descripcion: 'Mix de verduras congeladas (zanahoria, arveja, choclo)',
        precio: 400.00,
        stock: 80,
        categoria: 'verduras_congeladas'
      }
    ];

    for (const producto of productos) {
      await Producto.create(producto);
    }
    console.log('Productos iniciales creados');

    console.log('Inicialización completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    process.exit(1);
  }
}

initDB(); 