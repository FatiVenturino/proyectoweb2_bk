-- Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('confirmado', 'en_preparacion', 'en_camino', 'entregado') DEFAULT 'confirmado',
    total DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta') NOT NULL,
    tipo_entrega ENUM('local', 'delivery') NOT NULL,
    direccion_entrega TEXT,
    pagado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
);

-- Tabla de Detalles de Pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    unidad ENUM('kg', 'unidad') NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
); 