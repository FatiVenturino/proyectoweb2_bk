const { Pedido } = require('../models/Pedido');

// Obtener todos los pedidos (para administrador)
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.getAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
    }
};

// Obtener pedidos de un cliente específico
exports.getPedidosCliente = async (req, res) => {
    try {
        const pedidos = await Pedido.getByCliente(req.params.clienteId);
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pedidos del cliente', error: error.message });
    }
};

// Obtener detalles de un pedido específico
exports.getDetallesPedido = async (req, res) => {
    try {
        const detalles = await Pedido.getDetalles(req.params.pedidoId);
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los detalles del pedido', error: error.message });
    }
};

// Crear nuevo pedido
exports.crearPedido = async (req, res) => {
    try {
        const { pedidoData, detallesData } = req.body;
        const pedidoId = await Pedido.create(pedidoData, detallesData);
        res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedidoId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
    }
};

// Actualizar estado del pedido
exports.actualizarEstado = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const { nuevoEstado } = req.body;
        const actualizado = await Pedido.updateEstado(pedidoId, nuevoEstado);
        
        if (actualizado) {
            res.json({ mensaje: 'Estado del pedido actualizado exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido', error: error.message });
    }
};

// Marcar pedido como pagado
exports.marcarComoPagado = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const actualizado = await Pedido.marcarComoPagado(pedidoId);
        
        if (actualizado) {
            res.json({ mensaje: 'Pedido marcado como pagado exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al marcar el pedido como pagado', error: error.message });
    }
}; 