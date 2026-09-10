# QvacHackaton - MacroCounter para Personas con Diabetes

Prototipo desarrollado para hackatón: **Aplicación de conteo de macros asistida por un agente Qvac en local para personas con diabetes**.

---

## 🎯 Propuesta y Objetivo

Desarrollar y validar rápidamente un prototipo funcional que ayude a personas diabéticas en el cálculo y control de sus macronutrientes (especialmente carbohidratos/insulina) utilizando un **agente Qvac ejecutándose en local**, orquestado mediante **Node.js**. Enfoque 100% práctico y directo.

---

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js
- **Agente:** Qvac (Entorno Local)
- **Gestor de paquetes:** npm

---

## 🚀 Puesta en Marcha (Local)

1. **Clonar repositorio:**
   ```bash
   git clone https://github.com/Briel301/QvacHackaton.git
   cd QvacHackaton
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar entorno:**
   - Crear `.env` con las variables de conexión del agente local Qvac si se requieren.

4. **Ejecutar:**
   ```bash
   npm start
   ```

---

## 📋 Reglas para Agentes IA y Colaboradores

Dado que este proyecto es un **prototipo de hackatón**, se deben seguir estas reglas fundamentales:

### 1. Directo y Sin Adornos (KISS)
- Priorizar funcionalidad y velocidad de entrega.
- Evitar sobre-ingeniería, abstracciones complejas prematuras o dependencias innecesarias.
- Código limpio, legible y enfocado únicamente en la tarea requerida.

### 2. Instrucciones para Agentes IA
- **Respeto al contexto:** Lee la estructura actual antes de proponer cambios para evitar duplicidades o romper interfaces existentes.
- **Limpieza:** No generar código muerto, comentarios redundantes ni plantillas no implementadas.
- **Atomicidad:** Realiza cambios concisos y directamente testeables.

### 3. Manejo del Agente Qvac en Local
- Toda configuración (puertos, endpoints, credenciales locales) debe ser configurable mediante variables de entorno o archivo de configuración centralizado.
- No usar rutas absolutas de disco en el código; emplear rutas relativas al proyecto.

---

## 📁 Estructura del Proyecto

*(Se actualizará dinámicamente con los módulos del prototipo)*
