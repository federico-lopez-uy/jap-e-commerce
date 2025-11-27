CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- TABLA USUARIO
CREATE TABLE Usuario (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Contrasenia VARCHAR(255),
    Telefono VARCHAR(30)
);

-- TABLA CARRITO
CREATE TABLE Carrito (
    ID_Carrito INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- TABLA PRODUCTO
CREATE TABLE Producto (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(200),
    Descripcion TEXT,
    Costo DECIMAL(10,2),
    Cantidad_Ventas INT DEFAULT 0,
    Precio DECIMAL(10,2)
);

-- TABLA CATEGORIA
CREATE TABLE Categoria (
    ID_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(200),
    Descripcion TEXT,
    Imagen VARCHAR(255)
);

-- RELACIÓN PRODUCTO - CATEGORÍA
ALTER TABLE Producto
ADD COLUMN ID_Categoria INT,
ADD FOREIGN KEY (ID_Categoria) REFERENCES Categoria(ID_Categoria);

-- TABLA PRODUCTO_IMAGEN
CREATE TABLE Producto_Imagen (
    ID_Imagen INT AUTO_INCREMENT PRIMARY KEY,
    ID_Producto INT,
    URL VARCHAR(255),
    Alt VARCHAR(150),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

-- TABLA OPINION
CREATE TABLE Opinion (
    ID_Opinion INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT,
    ID_Producto INT,
    Comentario TEXT,
    Valoracion INT,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

-- TABLA CARRITO-ITEM
CREATE TABLE Carrito_Item (
    ID_Item INT AUTO_INCREMENT PRIMARY KEY,
    ID_Carrito INT,
    ID_Producto INT,
    Cantidad INT,
    FOREIGN KEY (ID_Carrito) REFERENCES Carrito(ID_Carrito),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

-- TABLA MÉTODO DE PAGO
CREATE TABLE Metodo_Pago (
    ID_Metodo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Descripcion TEXT
);

-- TABLA DIRECCIÓN DE ENVÍO
CREATE TABLE Direccion_Envio (
    ID_Direccion INT AUTO_INCREMENT PRIMARY KEY,
    Departamento VARCHAR(100),
    Localidad VARCHAR(100),
    Calle VARCHAR(150),
    Numero VARCHAR(10),
    Esquina VARCHAR(150)
);

-- TABLA ORDEN
CREATE TABLE Orden (
    ID_Orden INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT,
    ID_Direccion INT,
    ID_Metodo INT,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Direccion) REFERENCES Direccion_Envio(ID_Direccion),
    FOREIGN KEY (ID_Metodo) REFERENCES Metodo_Pago(ID_Metodo)
);

-- TABLA ORDEN-ITEM
CREATE TABLE Orden_Item (
    ID_Item INT AUTO_INCREMENT PRIMARY KEY,
    ID_Orden INT,
    ID_Producto INT,
    Cantidad INT,
    Precio_Unitario DECIMAL(10,2),
    FOREIGN KEY (ID_Orden) REFERENCES Orden(ID_Orden),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);
 