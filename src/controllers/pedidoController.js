const { Pedido } = require('../models/Pedido');

// Obtener todos los pedidos (para administrador)
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.getAll();
        res.json(pedidos);
    } catch (error) {
        console.error('Error en getAllPedidos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
    }
};

// Obtener pedidos de un cliente específico
exports.getPedidosCliente = async (req, res) => {
    try {
        const pedidos = await Pedido.getByCliente(req.params.clienteId);
        res.json(pedidos);
    } catch (error) {
        console.error('Error en getPedidosCliente:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos del cliente', error: error.message });
    }
};

// Obtener detalles de un pedido específico
exports.getDetallesPedido = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        if (!pedidoId) {
            return res.status(400).json({ mensaje: 'ID de pedido no proporcionado' });
        }

        const detalles = await Pedido.getDetalles(pedidoId);
        if (!detalles || detalles.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron detalles para este pedido' });
        }

        res.json(detalles);
    } catch (error) {
        console.error('Error en getDetallesPedido:', error);
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
        console.error('Error en crearPedido:', error);
        res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
    }
};

// Actualizar estado del pedido
exports.actualizarEstado = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const { nuevoEstado } = req.body;
        
        if (!pedidoId || !nuevoEstado) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        await Pedido.actualizarEstado(pedidoId, nuevoEstado);
        res.json({ mensaje: 'Estado actualizado exitosamente' });
    } catch (error) {
        console.error('Error en actualizarEstado:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido', error: error.message });
    }
};

// Marcar pedido como pagado
exports.marcarComoPagado = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        
        if (!pedidoId) {
            return res.status(400).json({ mensaje: 'ID de pedido no proporcionado' });
        }

        await Pedido.marcarComoPagado(pedidoId);
        res.json({ mensaje: 'Pedido marcado como pagado exitosamente' });
    } catch (error) {
        console.error('Error en marcarComoPagado:', error);
        res.status(500).json({ mensaje: 'Error al marcar el pedido como pagado', error: error.message });
    }
}; 