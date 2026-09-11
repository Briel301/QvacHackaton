# DIA NutriBot - Asistente Nutricional con IA para Diabetes

Prototipo desarrollado para hackatón: **Aplicación de conteo y balance de macronutrientes asistida por un agente de Inteligencia Artificial local (QVAC / Llama 3.2) para personas con diabetes**.

---

## 🎯 Propuesta y Objetivo

Brindar a las personas con diabetes una herramienta intuitiva y rápida para el registro de comidas, estimación de macronutrientes (carbohidratos, proteínas, grasas y calorías) y sugerencias contextuales, utilizando un **modelo de IA ejecutándose 100% en local** con **@qvac/sdk** y orquestado mediante **Node.js y Express**.

---

## 🛠️ Stack Tecnológico

- **Backend:** Node.js, Express 5.
- **Motor de IA Local:** `@qvac/sdk` con Bare Runtime (Llama 3.2 1B con GGML/llama.cpp en local).
- **Base de Datos:** MariaDB / MySQL (con soporte de modo resiliente / fallback local sin base de datos).
- **Frontend:** HTML5, Tailwind CSS, Web Components vanilla, soporte bilingüe (ES/EN), Modo Claro/Oscuro dinámico.
- **CI / Validación Continua:** GitHub Actions (`.github/workflows/ci.yml`).

---

## 📁 Estructura del Repositorio

```text
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de integración continua (CI)
├── database/
│   └── schema.sql              # Script DDL completo de MariaDB / MySQL con catálogos
├── public/                     # Frontend estático servido por Express
│   ├── components/
│   │   ├── Js/
│   │   │   ├── asistente.js    # Conexión al endpoint de IA /api/analizar
│   │   │   └── main.js         # Lógica de onboarding, perfil y catálogos
│   │   ├── historial.js        # Historial de consultas y platos
│   │   ├── mis_platos.js       # Listado y gestión de comidas
│   │   ├── navigation.js       # Web Components de navegación (sidebar, topbar, bottom-nav)
│   │   ├── settings.js         # Módulo de configuraciones (Dark Mode, unidades, idioma)
│   │   └── views.js            # Plantillas SPA de vistas
│   ├── asistente.html          # Vista de chat con DIA NutriBot IA
│   ├── historial.html          # Vista de historial
│   ├── index.html              # Dashboard principal y modal de onboarding
│   ├── mi_progreso.html        # Métricas, gráficas y macros
│   ├── mis_platos.html         # Catálogo de platos
│   ├── style.css               # Estilos globales y reglas de Dark Mode / Switches
│   └── tailwind.config.js      # Configuración de diseño y paleta
├── server/
│   ├── .env.example            # Plantilla de variables de entorno seguras
│   ├── qvac.js                 # Integración con el motor QVAC y Llama 3.2
│   └── server.js               # Servidor API Express y servidor de estáticos
├── .gitignore                  # Exclusión de node_modules y credenciales
├── DbDIA.dm2                   # Modelo de datos original (Toad Data Modeler)
├── package.json
└── README.md
```

---

## 🚀 Puesta en Marcha Rápida (Local)

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/Briel301/QvacHackaton.git
cd QvacHackaton
npm install
```

### 2. Configurar variables de entorno (Opcional)
Copia la plantilla de ejemplo:
```bash
cp server/.env.example server/.env
```
*(Si usas Windows PowerShell: `Copy-Item server/.env.example server/.env`)*

### 3. Base de Datos (Opcional - Modo Resiliente Activo)
- **Sin MariaDB instalada:** El servidor cuenta con un **mecanismo de fallback automático**. Si no detecta una base de datos activa, cargará catálogos locales en memoria (géneros y tipos de diabetes) y permitirá completar el onboarding sin errores.
- **Con MariaDB / MySQL:** Puedes inicializar la base de datos completa con:
  ```bash
  mysql -u root -p < database/schema.sql
  ```

### 4. Ejecutar la aplicación
```bash
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**

> [!NOTE]
> En el primer arranque, `@qvac/sdk` descargará los pesos de Llama 3.2 (~800 MB). Si Windows Firewall o el sistema operativo solicita permisos para `bare.exe`, concédeselos para permitir la inferencia local.

---

## 🔄 Flujo de Trabajo en Git para la Hackathon

1. **Ramas protegidas:** No hacer commits directos con código en pruebas sobre `main`.
2. **Feature branches:** Trabajar en ramas específicas (`feat/nombre-tarea`) y abrir Pull Requests hacia `desarrollo`.
3. **Validación automática (CI):** Cada Pull Request se comprueba con GitHub Actions para garantizar que no existan errores de sintaxis y que nunca se suban `node_modules/` ni credenciales `.env`.
