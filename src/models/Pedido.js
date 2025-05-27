const { Pedido: PedidoModel } = require('./index');
const db = require('../config/database');

class Pedido {
    // Obtener todos los pedidos
    static async getAll() {
        try {
            const [pedidos] = await db.query(`
                SELECT p.*, u.nombre as nombre_cliente 
                FROM pedidos p 
                JOIN usuarios u ON p.cliente_id = u.id 
                ORDER BY p.fecha_pedido DESC
            `);
            return pedidos;
        } catch (error) {
            console.error('Error en getAll:', error);
            throw error;
        }
    }

    // Obtener pedidos por cliente
    static async getByCliente(clienteId) {
        try {
            const [pedidos] = await db.query(`
                SELECT p.*, u.nombre as nombre_cliente 
                FROM pedidos p 
                JOIN usuarios u ON p.cliente_id = u.id 
                WHERE p.cliente_id = ?
                ORDER BY p.fecha_pedido DESC
            `, [clienteId]);
            return pedidos;
        } catch (error) {
            console.error('Error en getByCliente:', error);
            throw error;
        }
    }

    // Obtener detalles de un pedido
    static async getDetalles(pedidoId) {
        try {
            const [detalles] = await db.query(`
                SELECT d.*, p.nombre as nombre_producto, p.precio as precio_unitario,
                       (d.cantidad * p.precio) as subtotal
                FROM detalles_pedido d 
                JOIN productos p ON d.producto_id = p.id 
                WHERE d.pedido_id = ?
            `, [pedidoId]);
            return detalles;
        } catch (error) {
            console.error('Error en getDetalles:', error);
            throw error;
        }
    }

    // Crear nuevo pedido
    static async create(pedidoData, detallesData) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insertar pedido
            const [result] = await connection.query(
                'INSERT INTO pedidos (cliente_id, total, metodo_pago, tipo_entrega, direccion_entrega) VALUES (?, ?, ?, ?, ?)',
                [pedidoData.cliente_id, pedidoData.total, pedidoData.metodo_pago, pedidoData.tipo_entrega, pedidoData.direccion_entrega]
            );

            const pedidoId = result.insertId;

            // Insertar detalles del pedido
            for (const detalle of detallesData) {
                await connection.query(
                    'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, unidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
                    [pedidoId, detalle.producto_id, detalle.cantidad, detalle.unidad, detalle.precio_unitario, detalle.subtotal]
                );
            }

            await connection.commit();
            return pedidoId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // Actualizar estado del pedido
    static async actualizarEstado(pedidoId, nuevoEstado) {
        try {
            const [result] = await db.query(
                'UPDATE pedidos SET estado = ? WHERE id = ?',
                [nuevoEstado, pedidoId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en actualizarEstado:', error);
            throw error;
        }
    }

    // Marcar pedido como pagado
    static async marcarComoPagado(pedidoId) {
        try {
            const [result] = await db.query(
                'UPDATE pedidos SET pagado = true WHERE id = ?',
                [pedidoId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en marcarComoPagado:', error);
            throw error;
        }
    }
}

module.exports = Pedido; 