# Sistema de Gestión de Beneficiarios - PowerMas

Sistema de gestión de beneficiarios para programa social multi-país desarrollado con React, .NET Core y SQL Server.

## Requisitos Previos

- Node.js 24.11.1+
- .NET SDK 10.0+
- SQL Server 2019+
- Visual Studio 2022 o Visual Studio Code
- Git

## Instalación

### 1. Clonar Repositorio

```bash
git clone https://github.com/JuanLloclla/powermas-gestion-beneficiarios.git
cd powermas-gestion-beneficiarios
```

### 2. Backend (.NET)

#### En Visual Studio:

1. Abre `PowerMas.API` en Visual Studio
2. Visual Studio restaura automáticamente las dependencias
3. Configura la conexión en `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(local);Database=PowerMas_DB;Trusted_Connection=True;Encrypt=false;"
}
```

4. Presiona **F5** para ejecutar

#### En línea de comandos:

```bash
cd PowerMas.API
dotnet restore
dotnet run
```

La API estará en: `https://localhost:7078`

### 3. Frontend (React)

```bash
cd powermas-frontend
npm install
npm run dev
```

Frontend estará en: `http://localhost:5173`

### 4. Base de Datos

1. Abre **SQL Server Management Studio**
2. Conecta a: `(local)` o `.\SQLEXPRESS`
3. Ejecuta el script SQL:

```bash
# En SSMS, abre y ejecuta:
POWERMAS_DB_CLEAN.sql
```

Este script crea:

- Base de datos `PowerMas_DB`
- Tabla `DocumentoIdentidad`
- Tabla `Beneficiario`
- Stored Procedure `sp_DocumentoIdentidad_ObtenerPorPais`
- Datos de ejemplo

## Ejecución del Proyecto

### Terminal 1: Backend

```bash
cd PowerMas.API
dotnet run
# http://localhost:7078 (o 5165 para HTTP)
```

### Terminal 2: Frontend

```bash
cd powermas-frontend
npm run dev
# http://localhost:5173
```

Abre el navegador en `http://localhost:5173`

## Funcionalidades

✅ **CRUD Completo de Beneficiarios**

- Registrar nuevo beneficiario
- Consultar lista de beneficiarios
- Editar beneficiario
- Eliminar beneficiario

✅ **Validación Condicional de Documentos**

- Validar longitud según tipo de documento
- Validar formato (solo números si aplica)
- Feedback en tiempo real

✅ **Multi-país**

- Documentos específicos por país
- Perú, Chile, Colombia

## Estructura del Proyecto

```
powermas-gestion-beneficiarios/
├── PowerMas.API/              # Backend .NET
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── appsettings.json
│   └── Program.cs
├── powermas-frontend/         # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── POWERMAS_DB_CLEAN.sql      # Script BD
└── README.md
```

## Tecnologías Utilizadas

**Frontend:**

- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router v6

**Backend:**

- .NET Core 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

**Base de Datos:**

- SQL Server 2019+
- Stored Procedures

## Notas Importantes

- La conexión a BD usa `Trusted_Connection` (Windows Authentication)
- Si usas otra instancia de SQL Server, modifica `appsettings.json`
- El frontend se conecta a la API en `http://localhost:5165/api`
