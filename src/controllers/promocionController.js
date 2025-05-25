const Promocion = require('../models/Promocion');
const Producto = require('../models/Producto');

// Listar todas las promociones
exports.getAll = async (req, res) => {
  try {
    const promociones = await Promocion.findAll({ include: [{ model: Producto, as: 'producto' }] });
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener promociones', error: error.message });
  }
};

// Crear promoción
exports.create = async (req, res) => {
  try {
    const { producto_id, nombre, descuento, fecha_inicio, fecha_fin } = req.body;
    const promocion = await Promocion.create({ producto_id, nombre, descuento, fecha_inicio, fecha_fin });
    res.status(201).json(promocion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear promoción', error: error.message });
  }
};

// Editar promoción
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descuento, fecha_inicio, fecha_fin, activa } = req.body;
    const promocion = await Promocion.findByPk(id);
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    promocion.nombre = nombre;
    promocion.descuento = descuento;
    promocion.fecha_inicio = fecha_inicio;
    promocion.fecha_fin = fecha_fin;
    promocion.activa = activa;
    await promocion.save();
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar promoción', error: error.message });
  }
};

// Eliminar promoción
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const promocion = await Promocion.findByPk(id);
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    await promocion.destroy();
    res.json({ mensaje: 'Promoción eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar promoción', error: error.message });
  }
}; 