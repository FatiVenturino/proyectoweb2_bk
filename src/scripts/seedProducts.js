require('dotenv').config();
const { sequelize } = require('../config/database');
const Producto = require('../models/Producto');

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
  },
  {
    nombre: 'Canastitas de Verdura',
    descripcion: 'Canastitas rellenas de verdura, listas para hornear',
    precio: 600.00,
    stock: 60,
    categoria: 'canastitas'
  },
  {
    nombre: 'Pizza de Muzzarella',
    descripcion: 'Pizza casera de muzzarella, lista para hornear',
    precio: 700.00,
    stock: 40,
    categoria: 'pizzas'
  }
];

async function seedProducts() {
  try {
    await sequelize.sync();
    
    for (const producto of productos) {
      await Producto.create(producto);
    }
    
    console.log('Productos sembrados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar productos:', error);
    process.exit(1);
  }
}

seedProducts(); 