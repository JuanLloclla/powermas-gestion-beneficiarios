CREATE DATABASE PowerMas_DB;
GO

USE PowerMas_DB;
GO

-- Tabla: DocumentoIdentidad
CREATE TABLE DocumentoIdentidad (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    Abreviatura VARCHAR(10) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Longitud INT NOT NULL,
    SoloNumeros BIT NOT NULL DEFAULT 1,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT UQ_DocumentoIdentidad_AbreviaturaPais UNIQUE (Abreviatura, Pais)
);

-- Tabla: Beneficiario
CREATE TABLE Beneficiario (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    DocumentoIdentidadId INT NOT NULL,
    NumeroDocumento VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('M', 'F')),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Beneficiario_DocumentoIdentidad FOREIGN KEY (DocumentoIdentidadId) 
        REFERENCES DocumentoIdentidad(Id) ON DELETE CASCADE
);

-- Insertar Documentos de Identidad por país

-- DOCUMENTOS PERÚ
INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
    ('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
    ('Pasaporte', 'PAS', 'Perú', 9, 0, 1),
    ('Carné de Extranjería', 'CE', 'Perú', 12, 0, 1);

-- DOCUMENTOS CHILE
INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
    ('Cédula de Identidad', 'RUT', 'Chile', 10, 0, 1),
    ('Pasaporte', 'PAS', 'Chile', 9, 0, 1);

-- DOCUMENTOS COLOMBIA
INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
    ('Cédula de Ciudadanía', 'CC', 'Colombia', 10, 1, 1),
    ('Cédula de Extranjería', 'CE', 'Colombia', 10, 0, 1),
    ('Pasaporte', 'PAS', 'Colombia', 9, 0, 1);

-- Beneficiarios de ejemplo
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Juan', 'Pérez', 1, '12345678', '1990-05-15', 'M'),
    ('María', 'López', 1, '87654321', '1992-08-22', 'F'),
    ('Carlos', 'Rodríguez', 2, 'P12345678', '1988-03-10', 'M'),
    ('Ana', 'Martínez', 4, '1234567890', '1995-11-28', 'F'),
    ('Luis', 'Sánchez', 5, 'P98765432', '1991-07-05', 'M');

GO

-- SP: Obtener documentos por país (PARA EL DROPDOWN)
CREATE PROCEDURE sp_DocumentoIdentidad_ObtenerPorPais
    @Pais VARCHAR(50)
AS
BEGIN
    SELECT 
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros,
        Activo
    FROM DocumentoIdentidad
    WHERE Pais = @Pais AND Activo = 1
    ORDER BY Nombre;
END
GO

-- Prueba del SP
-- EXEC sp_DocumentoIdentidad_ObtenerPorPais @Pais = 'Perú'