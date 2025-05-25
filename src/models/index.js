const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'cliente'),
        defaultValue: 'cliente'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Definición del modelo Pedido
const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('confirmado', 'en_preparacion', 'en_camino', 'entregado'),
        defaultValue: 'confirmado'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta'),
        allowNull: false
    },
    tipo_entrega: {
        type: DataTypes.ENUM('local', 'delivery'),
        allowNull: false
    },
    direccion_entrega: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pagado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Definición del modelo Producto
const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imagen: {
        type: DataTypes.STRING
    }
});

// Definición del modelo DetallePedido
const DetallePedido = sequelize.define('DetallePedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    unidad: {
        type: DataTypes.ENUM('kg', 'unidad'),
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Definición de las asociaciones
Usuario.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'cliente_id' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedido_id' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

Producto.hasMany(DetallePedido, { foreignKey: 'producto_id' });
DetallePedido.belongsTo(Producto, { foreignKey: 'producto_id' });

// Exportar los modelos
module.exports = {
  Usuario,
    Pedido,
  Producto,
    DetallePedido,
    sequelize
}; 