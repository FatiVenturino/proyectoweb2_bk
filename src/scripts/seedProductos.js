const { sequelize } = require('../config/database');
const Producto = require('../models/Producto');

const productos = [
  // Canastitas
  { nombre: 'Canastita Calabresa', descripcion: 'Canastita de calabresa', precio: 1200, imagen: '/FOTOS/Canastitas/calabresa.JPG', categoria: 'canastitas', activo: true },
  { nombre: 'Canastita Capresse', descripcion: 'Canastita capresse', precio: 1200, imagen: '/FOTOS/Canastitas/capresse.JPG', categoria: 'canastitas', activo: true },
  { nombre: 'Canastita Humita', descripcion: 'Canastita de humita', precio: 1200, imagen: '/FOTOS/Canastitas/humita.JPG', categoria: 'canastitas', activo: true },

  // Congelados pollo
  { nombre: 'Tiritas de Pollo', descripcion: 'Tiritas de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/tiritas_pollo.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Arrollado de Pollo', descripcion: 'Arrollado de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/arrollado.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Pechuga Romana', descripcion: 'Pechuga romana', precio: 1500, imagen: '/FOTOS/congelados pollo/pechuga_romana.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Albóndigas de Pollo', descripcion: 'Albóndigas de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/albondigas.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Suprema de Pollo', descripcion: 'Suprema de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/suprema.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Nuggets de Pollo', descripcion: 'Nuggets de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/nuggets.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Patitas de Pollo', descripcion: 'Patitas de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/patitas.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Medallón JyQ', descripcion: 'Medallón jamón y queso', precio: 1500, imagen: '/FOTOS/congelados pollo/medallon_jyq.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Dinosaurios de Pollo', descripcion: 'Dinosaurios de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/dinosaurios.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Patitas JyQ', descripcion: 'Patitas jamón y queso', precio: 1500, imagen: '/FOTOS/congelados pollo/patitas_jamon_queso.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Medallón de Pollo', descripcion: 'Medallón de pollo', precio: 1500, imagen: '/FOTOS/congelados pollo/medallon_pollo.JPG', categoria: 'congelados-pollo', activo: true },
  { nombre: 'Medallón de Espinaca', descripcion: 'Medallón de espinaca', precio: 1500, imagen: '/FOTOS/congelados pollo/medallon_espinaca.JPG', categoria: 'congelados-pollo', activo: true },

  // Congelados pescado
  { nombre: 'Merzula Hierbas', descripcion: 'Merzula con hierbas', precio: 1800, imagen: '/FOTOS/congelados pescado/merzula_hierbas.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Filet Rebozado', descripcion: 'Filet rebozado', precio: 1800, imagen: '/FOTOS/congelados pescado/filet_rebozado.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Merluza Espinaca', descripcion: 'Merluza con espinaca', precio: 1800, imagen: '/FOTOS/congelados pescado/merluza_espinaca.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Merluza Romana', descripcion: 'Merluza romana', precio: 1800, imagen: '/FOTOS/congelados pescado/merluza_romana.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Filet Romana', descripcion: 'Filet romana', precio: 1800, imagen: '/FOTOS/congelados pescado/filet_romana.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Crocante Merluza', descripcion: 'Crocante de merluza', precio: 1800, imagen: '/FOTOS/congelados pescado/croncante_merluza.JPG', categoria: 'congelados-pescado', activo: true },
  { nombre: 'Medallón Merluza', descripcion: 'Medallón de merluza', precio: 1800, imagen: '/FOTOS/congelados pescado/medallon_merluza.JPG', categoria: 'congelados-pescado', activo: true },

  // Congelados verduras
  { nombre: 'Croquetas de Papa', descripcion: 'Croquetas de papa', precio: 1300, imagen: '/FOTOS/Congelados verduras/croquetas_papa.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Nuggets de Brócoli', descripcion: 'Nuggets de brócoli', precio: 1300, imagen: '/FOTOS/Congelados verduras/nuggets_brocoli.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Soja y Arroz', descripcion: 'Soja y arroz', precio: 1300, imagen: '/FOTOS/Congelados verduras/soja_arroz.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Barritas Muzza', descripcion: 'Barritas de muzzarella', precio: 1300, imagen: '/FOTOS/Congelados verduras/barritas_muzza.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Arroz y Lentejas', descripcion: 'Arroz y lentejas', precio: 1300, imagen: '/FOTOS/Congelados verduras/arroz_lentejas.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Soja y Calabaza', descripcion: 'Soja y calabaza', precio: 1300, imagen: '/FOTOS/Congelados verduras/soja_calabaza.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Calabaza Muzza', descripcion: 'Calabaza y muzzarella', precio: 1300, imagen: '/FOTOS/Congelados verduras/calabaza_muzza.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Espinaca', descripcion: 'Espinaca', precio: 1300, imagen: '/FOTOS/Congelados verduras/espinaca.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Garbanzos', descripcion: 'Garbanzos', precio: 1300, imagen: '/FOTOS/Congelados verduras/garbanzos.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Espinaca Medallón', descripcion: 'Medallón de espinaca', precio: 1300, imagen: '/FOTOS/Congelados verduras/espinaca_medallon.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Caritas', descripcion: 'Caritas', precio: 1300, imagen: '/FOTOS/Congelados verduras/caritas.JPG', categoria: 'congelados-verduras', activo: true },
  { nombre: 'Noiset', descripcion: 'Noiset', precio: 1300, imagen: '/FOTOS/Congelados verduras/noiset.JPG', categoria: 'congelados-verduras', activo: true },

  // Pastas - fideos al huevo
  { nombre: 'Fideos al Huevo N1', descripcion: 'Fideos al huevo', precio: 1100, imagen: '/FOTOS/Pastas/fideos al huevo/fideos n1.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fideos al Huevo N2', descripcion: 'Fideos al huevo', precio: 1100, imagen: '/FOTOS/Pastas/fideos al huevo/fideos n2.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fideos al Huevo N3', descripcion: 'Fideos al huevo', precio: 1100, imagen: '/FOTOS/Pastas/fideos al huevo/fideos n3.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fideos al Huevo N4', descripcion: 'Fideos al huevo', precio: 1100, imagen: '/FOTOS/Pastas/fideos al huevo/fideos n4.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fusiles', descripcion: 'Fusiles', precio: 1100, imagen: '/FOTOS/Pastas/fideos al huevo/fusiles.jpg', categoria: 'pastas', activo: true },
  // Pastas - Fideos Morron
  { nombre: 'Fideos Morron N1', descripcion: 'Fideos morron', precio: 1100, imagen: '/FOTOS/Pastas/Fideos Morron/morron n1.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fideos Morron N4', descripcion: 'Fideos morron', precio: 1100, imagen: '/FOTOS/Pastas/Fideos Morron/morron n4.jpg', categoria: 'pastas', activo: true },
  // Pastas - fideos verdes
  { nombre: 'Fideos Verdes N1', descripcion: 'Fideos verdes', precio: 1100, imagen: '/FOTOS/Pastas/fideos verdes/verdes n1.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Fideos Verdes N4', descripcion: 'Fideos verdes', precio: 1100, imagen: '/FOTOS/Pastas/fideos verdes/verdes n4.jpg', categoria: 'pastas', activo: true },
  // Pastas - Ñoquis
  { nombre: 'Ñoquis de Papa', descripcion: 'Ñoquis de papa', precio: 1100, imagen: '/FOTOS/Pastas/Ñoquis/ñoquis papa.jpg', categoria: 'pastas', activo: true },
  { nombre: 'Ñoquis de Espinaca', descripcion: 'Ñoquis de espinaca', precio: 1100, imagen: '/FOTOS/Pastas/Ñoquis/ñoquis espinaca.jpg', categoria: 'pastas', activo: true },

  // Pescado
  { nombre: 'Medallón de Salmón', descripcion: 'Medallón de salmón', precio: 2500, imagen: '/FOTOS/Pescado/medallon_salmon.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Bandeja Mariscos', descripcion: 'Bandeja de mariscos', precio: 2500, imagen: '/FOTOS/Pescado/bandeja_mariscos.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Langostinos', descripcion: 'Langostinos', precio: 2500, imagen: '/FOTOS/Pescado/langostinos.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Camarones', descripcion: 'Camarones', precio: 2500, imagen: '/FOTOS/Pescado/camarones.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Vieyras', descripcion: 'Vieyras', precio: 2500, imagen: '/FOTOS/Pescado/vieyras.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Mejillón Pelado', descripcion: 'Mejillón pelado', precio: 2500, imagen: '/FOTOS/Pescado/mejillon pelado.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Pacu', descripcion: 'Pacu', precio: 2500, imagen: '/FOTOS/Pescado/pacu.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Rabas', descripcion: 'Rabas', precio: 2500, imagen: '/FOTOS/Pescado/rabas.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Merluza', descripcion: 'Merluza', precio: 2500, imagen: '/FOTOS/Pescado/merluza.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Lomitos de Atún', descripcion: 'Lomitos de atún', precio: 2500, imagen: '/FOTOS/Pescado/lomitos_atun.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Salmón', descripcion: 'Salmón', precio: 2500, imagen: '/FOTOS/Pescado/salmon.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Rodajas de Merluza', descripcion: 'Rodajas de merluza', precio: 2500, imagen: '/FOTOS/Pescado/rodajas_merluza.JPG', categoria: 'pescado', activo: true },
  { nombre: 'Trucha', descripcion: 'Trucha', precio: 2500, imagen: '/FOTOS/Pescado/trucha.JPG', categoria: 'pescado', activo: true },

  // Pizza
  { nombre: 'Pizza Muzza', descripcion: 'Pizza muzzarella', precio: 2000, imagen: '/FOTOS/Pizza/muzza.JPG', categoria: 'pizza', activo: true },
  { nombre: 'Pizza Jamón y Queso', descripcion: 'Pizza de jamón y queso', precio: 2000, imagen: '/FOTOS/Pizza/jamon y queso.JPG', categoria: 'pizza', activo: true },

  // Tartas
  { nombre: 'Tarta Jamón y Queso', descripcion: 'Tarta de jamón y queso', precio: 1400, imagen: '/FOTOS/Tartas/jamon y queso tarta.JPG', categoria: 'tartas', activo: true },
  { nombre: 'Tarta de Calabaza', descripcion: 'Tarta de calabaza', precio: 1400, imagen: '/FOTOS/Tartas/calabaza.JPG', categoria: 'tartas', activo: true },
  { nombre: 'Tarta de Verdura', descripcion: 'Tarta de verdura', precio: 1400, imagen: '/FOTOS/Tartas/verdura.JPG', categoria: 'tartas', activo: true },
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