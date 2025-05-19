const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const registro = async (req, res) => {
  try {
    const { nombre, email, password, direccion, telefono } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({
        status: 'error',
        message: 'El email ya está registrado'
      });
    }

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      direccion,
      telefono
    });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      data: {
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Email o contraseña incorrectos'
      });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({
      status: 'success',
      data: {
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

const perfil = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        usuario: {
          id: req.usuario.id,
          nombre: req.usuario.nombre,
          email: req.usuario.email,
          rol: req.usuario.rol,
          direccion: req.usuario.direccion,
          telefono: req.usuario.telefono
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

module.exports = {
  registro,
  login,
  perfil
}; 