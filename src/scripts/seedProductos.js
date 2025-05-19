const { sequelize } = require('../config/database');
const Producto = require('../models/Producto');

const productos = [
  // Canastitas
  {
    nombre: 'Canastita Calabresa',
    descripcion: 'Canastita de calabresa',
    precio: 1200,
    imagen: '/FOTOS/Canastitas/calabresa.JPG',
    categoria: 'canastitas',
    activo: true
  },
  {
    nombre: 'Canastita Capresse',
    descripcion: 'Canastita capresse',
    precio: 1200,
    imagen: '/FOTOS/Canastitas/capresse.JPG',
    categoria: 'canastitas',
    activo: true
  },
  {
    nombre: 'Canastita Humita',
    descripcion: 'Canastita de humita',
    precio: 1200,
    imagen: '/FOTOS/Canastitas/humita.JPG',
    categoria: 'canastitas',
    activo: true
  },
  // Congelados pescado
  {
    nombre: 'Crocante de Merluza',
    descripcion: 'Crocante de merluza',
    precio: 1800,
    imagen: '/FOTOS/congelados pescado/croncante_merluza.JPG',
    categoria: 'congelados-pescado',
    activo: true
  },
  {
    nombre: 'Medallón de Merluza',
    descripcion: 'Medallón de merluza',
    precio: 1800,
    imagen: '/FOTOS/congelados pescado/medallon_merluza.JPG',
    categoria: 'congelados-pescado',
    activo: true
  },
  {
    nombre: 'Filet Rebozado',
    descripcion: 'Filet de merluza rebozado',
    precio: 1800,
    imagen: '/FOTOS/congelados pescado/filet_rebozado.JPG',
    categoria: 'congelados-pescado',
    activo: true
  },
  // Congelados pollo
  {
    nombre: 'Albóndigas de Pollo',
    descripcion: 'Albóndigas de pollo',
    precio: 1500,
    imagen: '/FOTOS/congelados pollo/albondigas.JPG',
    categoria: 'congelados-pollo',
    activo: true
  },
  {
    nombre: 'Nuggets de Pollo',
    descripcion: 'Nuggets de pollo',
    precio: 1500,
    imagen: '/FOTOS/congelados pollo/nuggets.JPG',
    categoria: 'congelados-pollo',
    activo: true
  },
  {
    nombre: 'Suprema de Pollo',
    descripcion: 'Suprema de pollo',
    precio: 1500,
    imagen: '/FOTOS/congelados pollo/suprema.JPG',
    categoria: 'congelados-pollo',
    activo: true
  },
  // Congelados verduras
  {
    nombre: 'Arroz y Lentejas',
    descripcion: 'Arroz y lentejas congelado',
    precio: 1300,
    imagen: '/FOTOS/Congelados verduras/arroz_lentejas.JPG',
    categoria: 'congelados-verduras',
    activo: true
  },
  {
    nombre: 'Croquetas de Papa',
    descripcion: 'Croquetas de papa',
    precio: 1300,
    imagen: '/FOTOS/Congelados verduras/croquetas_papa.JPG',
    categoria: 'congelados-verduras',
    activo: true
  },
  {
    nombre: 'Espinaca',
    descripcion: 'Espinaca congelada',
    precio: 1300,
    imagen: '/FOTOS/Congelados verduras/espinaca.JPG',
    categoria: 'congelados-verduras',
    activo: true
  },
  // Pastas
  {
    nombre: 'Fideos al Huevo N1',
    descripcion: 'Fideos al huevo',
    precio: 1100,
    imagen: '/FOTOS/Pastas/fideos al huevo/fideos n1.jpg',
    categoria: 'pastas',
    activo: true
  },
  {
    nombre: 'Fideos al Huevo N2',
    descripcion: 'Fideos al huevo',
    precio: 1100,
    imagen: '/FOTOS/Pastas/fideos al huevo/fideos n2.jpg',
    categoria: 'pastas',
    activo: true
  },
  {
    nombre: 'Fideos Morron N1',
    descripcion: 'Fideos morrón',
    precio: 1100,
    imagen: '/FOTOS/Pastas/Fideos Morron/morron n1.jpg',
    categoria: 'pastas',
    activo: true
  },
  {
    nombre: 'Fideos Verdes N1',
    descripcion: 'Fideos verdes',
    precio: 1100,
    imagen: '/FOTOS/Pastas/fideos verdes/verdes n1.jpg',
    categoria: 'pastas',
    activo: true
  },
  {
    nombre: 'Ñoquis de Espinaca',
    descripcion: 'Ñoquis de espinaca',
    precio: 1100,
    imagen: '/FOTOS/Pastas/Ñoquis/ñoquis espinaca.jpg',
    categoria: 'pastas',
    activo: true
  },
  {
    nombre: 'Ñoquis de Papa',
    descripcion: 'Ñoquis de papa',
    precio: 1100,
    imagen: '/FOTOS/Pastas/Ñoquis/ñoquis papa.jpg',
    categoria: 'pastas',
    activo: true
  },
  // Pescado
  {
    nombre: 'Salmón',
    descripcion: 'Salmón fresco',
    precio: 2500,
    imagen: '/FOTOS/Pescado/salmon.JPG',
    categoria: 'pescado',
    activo: true
  },
  {
    nombre: 'Camarones',
    descripcion: 'Camarones',
    precio: 2500,
    imagen: '/FOTOS/Pescado/camarones.JPG',
    categoria: 'pescado',
    activo: true
  },
  {
    nombre: 'Merluza',
    descripcion: 'Merluza',
    precio: 2500,
    imagen: '/FOTOS/Pescado/merluza.JPG',
    categoria: 'pescado',
    activo: true
  },
  // Pizza
  {
    nombre: 'Pizza Jamón y Queso',
    descripcion: 'Pizza de jamón y queso',
    precio: 2000,
    imagen: '/FOTOS/Pizza/jamon y queso.JPG',
    categoria: 'pizza',
    activo: true
  },
  {
    nombre: 'Pizza Muzza',
    descripcion: 'Pizza muzzarella',
    precio: 2000,
    imagen: '/FOTOS/Pizza/muzza.JPG',
    categoria: 'pizza',
    activo: true
  },
  // Tartas
  {
    nombre: 'Tarta de Calabaza',
    descripcion: 'Tarta de calabaza',
    precio: 1400,
    imagen: '/FOTOS/Tartas/calabaza.JPG',
    categoria: 'tartas',
    activo: true
  },
  {
    nombre: 'Tarta Jamón y Queso',
    descripcion: 'Tarta de jamón y queso',
    precio: 1400,
    imagen: '/FOTOS/Tartas/jamon y queso tarta.JPG',
    categoria: 'tartas',
    activo: true
  },
  {
    nombre: 'Tarta de Verdura',
    descripcion: 'Tarta de verdura',
    precio: 1400,
    imagen: '/FOTOS/Tartas/verdura.JPG',
    categoria: 'tartas',
    activo: true
  }
];

async function seedProductos() {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Producto.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await Producto.bulkCreate(productos);
    console.log('Productos insertados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error al insertar productos:', error);
    process.exit(1);
  }
}

seedProductos(); 