-- ============================================================
-- Script de Creación e Inicialización de Base de Datos DIA NutriBot
-- ============================================================

CREATE DATABASE IF NOT EXISTS db_dia_nutribot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_dia_nutribot;

-- Tabla: Genero
CREATE TABLE IF NOT EXISTS Genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nom_genero VARCHAR(50) NOT NULL,
    estado_genero TINYINT DEFAULT 1
);

-- Tabla: Tipo_Diabetes
CREATE TABLE IF NOT EXISTS Tipo_Diabetes (
    id_tipodiabetes INT AUTO_INCREMENT PRIMARY KEY,
    nom_tipodiabetes VARCHAR(50) NOT NULL,
    estado_tipodiabetes TINYINT DEFAULT 1
);

-- Tabla: Tipo_Comida
CREATE TABLE IF NOT EXISTS Tipo_Comida (
    id_tipocomida INT AUTO_INCREMENT PRIMARY KEY,
    nom_tipocomida VARCHAR(50) NOT NULL,
    estado_tipocomida TINYINT DEFAULT 1
);

-- Tabla: Persona
CREATE TABLE IF NOT EXISTS Persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    id_genero INT NOT NULL,
    id_tipodiabetes INT NOT NULL,
    nombre_persona VARCHAR(100) NOT NULL,
    edad_persona INT NULL,
    altura_persona DECIMAL(5,2) NULL,
    peso_persona DECIMAL(5,2) NULL,
    uso_insulina TINYINT DEFAULT 0,
    estado_persona TINYINT DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero),
    FOREIGN KEY (id_tipodiabetes) REFERENCES Tipo_Diabetes(id_tipodiabetes)
);

-- Tabla: Comida
CREATE TABLE IF NOT EXISTS Comida (
    id_comida INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    id_tipocomida INT NULL,
    foto_comida LONGTEXT NULL,
    descripcion_comida TEXT NULL,
    fecha_comida DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_azucar DECIMAL(6,2) DEFAULT 0,
    total_carbohidratos DECIMAL(6,2) DEFAULT 0,
    total_proteina DECIMAL(6,2) DEFAULT 0,
    total_fibra DECIMAL(6,2) DEFAULT 0,
    total_sodio DECIMAL(6,2) DEFAULT 0,
    uso_insulina TINYINT DEFAULT 0,
    fav_comida TINYINT DEFAULT 0,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_tipocomida) REFERENCES Tipo_Comida(id_tipocomida)
);

-- ============================================================
-- Inserción de Catálogos Iniciales
-- ============================================================

INSERT INTO Genero (id_genero, nom_genero, estado_genero) VALUES
    (1, 'Masculino', 1),
    (2, 'Femenino', 1),
    (3, 'Otro / Prefiero no decir', 1)
ON DUPLICATE KEY UPDATE nom_genero = VALUES(nom_genero);

INSERT INTO Tipo_Diabetes (id_tipodiabetes, nom_tipodiabetes, estado_tipodiabetes) VALUES
    (1, 'Diabetes Tipo 1', 1),
    (2, 'Diabetes Tipo 2', 1),
    (3, 'Diabetes Gestacional', 1),
    (4, 'Prediabetes', 1)
ON DUPLICATE KEY UPDATE nom_tipodiabetes = VALUES(nom_tipodiabetes);

INSERT INTO Tipo_Comida (id_tipocomida, nom_tipocomida, estado_tipocomida) VALUES
    (1, 'Desayuno', 1),
    (2, 'Almuerzo', 1),
    (3, 'Cena', 1),
    (4, 'Snack', 1)
ON DUPLICATE KEY UPDATE nom_tipocomida = VALUES(nom_tipocomida);
