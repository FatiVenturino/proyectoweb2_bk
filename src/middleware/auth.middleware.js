const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No se proporcionó token de autenticación'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({ where: { id: decoded.id, activo: true } });

    if (!usuario) {
      throw new Error();
    }

    req.token = token;
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Por favor autentíquese correctamente'
    });
  }
};

const esAdmin = async (req, res, next) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado. Se requieren privilegios de administrador'
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al verificar rol de usuario'
    });
  }
};

module.exports = {
  auth,
  esAdmin
}; 