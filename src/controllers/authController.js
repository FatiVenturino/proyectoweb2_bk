const { Usuario } = require('../models');

exports.login = (req, res) => {/* ... */};
exports.registro = (req, res) => {/* ... */};

exports.validarUsuario = async (req, res) => {
    const { usuario } = req.body;
    try {
        const user = await Usuario.findOne({ where: { nombre: usuario } });
        if (user) {
            return res.json({ existe: true });
        } else {
            return res.json({ existe: false });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al validar usuario' });
    }
}; 