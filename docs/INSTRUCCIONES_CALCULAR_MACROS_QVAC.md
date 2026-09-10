# Guía e Instrucciones: Función "Calcular Macros con IA" (Qvac)

Este documento contiene las especificaciones e instrucciones para implementar en el futuro la función **"Calcular Macros con IA"** en DIA NutriBot.

---

## 1. Objetivo de la Función
Permitir que el usuario, al crear o editar un platillo en el modal (`plato-modal`), presione el botón **"Calcular macros con IA"** (`#btn-ia-calc-macros`) para que el modelo local Qvac (Llama 3.2) estime automáticamente:
- **Carbohidratos (g)**
- **Proteínas (g)**
- **Grasas (g)**
- **Fibra (g)**
- **Calorías totales (kcal)** calculadas a partir de la fórmula: `(Carbs × 4) + (Proteínas × 4) + (Grasas × 9)`.

---

## 2. Parámetros de Entrada Requeridos
1. **Nombre del platillo** (`#plato-nombre`): Obligatorio.
2. **Descripción de ingredientes / preparación** (`#plato-descripcion`): Recomendado / Obligatorio para mayor precisión.
3. **Foto del platillo** (en base64 o URL): Opcional pero recomendada para análisis visual multimodal.
4. **Contexto diabético** (`localStorage.getItem('dia_tipo_diabetes')` y uso de insulina): Para advertencias o sugerencias adicionales.

---

## 3. Flujo Técnico Recomendado

### Paso 1: Interfaz en Frontend (`mis_platos.js`)
1. El usuario llena el nombre del platillo y una descripción básica (o adjunta foto).
2. Hace clic en `#btn-ia-calc-macros`.
3. El botón muestra un estado de carga:
   - Icono animado giratorio (`animate-spin`).
   - Texto: `"Analizando platillo con Qvac..."`.
   - Botón deshabilitado temporalmente.
4. Si falta el nombre o la descripción, mostrar un aviso al usuario: `"Por favor ingresa al menos el nombre y los ingredientes principales en la descripción para estimar los macros con precisión."`
5. Realiza un `POST` al endpoint del backend `/api/calcular-macros`.

### Paso 2: Endpoint Backend (`server/server.js`)
Crear la ruta `POST /api/calcular-macros`:
```javascript
app.post('/api/calcular-macros', async (req, res) => {
  try {
    const { nombre, descripcion, imagen } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del platillo es obligatorio.' });
    }

    const resultado = await estimarMacrosConQvac(nombre, descripcion, imagen);
    res.json(resultado);
  } catch (error) {
    console.error('Error al calcular macros con Qvac:', error);
    res.status(500).json({ error: 'No se pudo estimar los macros del platillo.' });
  }
});
```

### Paso 3: Prompt para el Modelo Qvac (`server/qvac.js`)
Diseñar el prompt estructurado para forzar una respuesta en formato JSON limpio:
```text
Eres un nutricionista clínico experto en conteo de carbohidratos y macronutrientes para pacientes con diabetes.
Analiza el siguiente platillo:
- Nombre: ${nombre}
- Descripción/Ingredientes: ${descripcion || 'No especificada'}
${imagen ? '- Se incluye imagen del platillo para referencia visual de porción.' : ''}

Devuelve EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura exacta (sin texto introductorio ni formato markdown adicional fuera del JSON):
{
  "carbohidratos": 45.0,
  "proteinas": 30.0,
  "grasas": 12.0,
  "fibra": 6.0,
  "calorias": 408,
  "justificacion": "Breve explicación de los ingredientes estimados y porciones promedio."
}
```

### Paso 4: Relleno Automático del Formulario en el Cliente
Cuando el backend responda con el JSON:
1. Asignar los valores a los inputs:
   - `inputCarbs.value = resultado.carbohidratos;`
   - `inputProtein.value = resultado.proteinas;`
   - `inputFat.value = resultado.grasas;`
   - `inputFibra.value = resultado.fibra || 0;`
2. El listener de `input` de macros o la función `autoCalcCalories()` calculará automáticamente:
   `inputCalorias.value = Math.round((resultado.carbohidratos * 4) + (resultado.proteinas * 4) + (resultado.grasas * 9));`
3. Si la descripción estaba vacía o corta, se puede añadir o complementar con `resultado.justificacion`.
4. Restaurar el botón con un estado de éxito visual (`"¡Macros calculados con éxito!"`) durante 2 segundos.

---

## 4. Pruebas y Validación
1. **Caso 1**: Platillo con solo nombre ("Plato de arroz con pollo").
2. **Caso 2**: Platillo con nombre, descripción detallada y foto ("Salmón 150g con 1 taza de espárragos y 1/2 taza de quinoa").
3. **Caso 3**: Comportamiento ante desconexión del servidor local de Qvac (manejar timeout con mensaje amigable sin congelar el formulario).
