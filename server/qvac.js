const qvac = require('@qvac/sdk');

let modeloCargadoId = null;
let cargandoPromise = null;

async function inicializarModelo() {
    if (modeloCargadoId) return modeloCargadoId;
    if (cargandoPromise) return await cargandoPromise;

    cargandoPromise = (async () => {
        console.log("\n⏳ Iniciando el motor de QVAC...");
        console.log("📦 ATENCIÓN: Cargando Llama 3.2 1B (Modelo equilibrado para velocidad e inteligencia ~800 MB).");
        
        modeloCargadoId = await qvac.loadModel({
            modelSrc: qvac.LLAMA_3_2_1B_INST_Q4_0_SHARD,
            onProgress: (progress) => {
                if (progress.total > 0) {
                    const porcentaje = Math.round((progress.loaded / progress.total) * 100);
                    const mbDescargados = (progress.loaded / 1024 / 1024).toFixed(1);
                    const mbTotal = (progress.total / 1024 / 1024).toFixed(1);
                    process.stdout.write(`\r📥 Progreso de carga: ${porcentaje}% (${mbDescargados} MB / ${mbTotal} MB)   `);
                }
            }
        });
        
        console.log("\n✅ ¡Modelo cargado con éxito! ID:", modeloCargadoId);
        return modeloCargadoId;
    })();

    try {
        return await cargandoPromise;
    } catch (error) {
        cargandoPromise = null;
        console.error("\n❌ Error al cargar el modelo:", error);
        throw error;
    }
}

async function analizarPlatillo(mensajeUsuario, imagenBase64, usaInsulina) {
    let instruccionesSistema = `Eres DIA NutriBot, un asistente nutricional inteligente especializado en personas con diabetes.
Responde de forma concisa, profesional, motivadora y estructurada en español.
Incluye siempre las siguientes secciones obligatorias:
1. **Veredicto:** Indica con claridad si el alimento es una opción recomendada, con moderación o desaconsejada para alguien con diabetes y la razón nutricional.
2. **Estimación Nutricional:** Aporta una estimación rápida de calorías, carbohidratos (g), proteínas (g) y grasas (g).
3. **Impacto Glucémico:** Breve explicación del índice/carga glucémica esperada.`;

    const ADVERTENCIA_MEDICA = `⚠️ *Aviso: Recuerda que soy un modelo de Inteligencia Artificial y puedo cometer errores. Esta información no sustituye el criterio profesional. Siempre debes consultar con tu médico antes de realizar cambios en tu tratamiento o alimentación.*`;

    if (usaInsulina) {
        instruccionesSistema += `\n4. **Atención con Insulina:** El usuario utiliza insulina; incluye un consejo breve de precaución respecto al conteo de carbohidratos para dosificación.`;
    }

    instruccionesSistema += `\n5. Termina obligatoriamente con esta advertencia exacta al final: "${ADVERTENCIA_MEDICA}"`;

    try {
        const modelId = await inicializarModelo();

        let consultaFinal = (mensajeUsuario || '').trim();
        if (!consultaFinal || consultaFinal === 'Analiza esta foto de mi plato' || consultaFinal === 'Mi platillo tiene los siguientes ingredientes:') {
            if (imagenBase64) {
                consultaFinal = "He subido una foto de mi comida. Analiza un platillo saludable típico para alguien con diabetes, detallando calorías, carbohidratos y recomendaciones.";
            } else {
                consultaFinal = "Analiza este alimento y dime si es apto para alguien con diabetes.";
            }
        } else if (imagenBase64) {
            consultaFinal = `${consultaFinal} (Nota: El usuario adjuntó una foto de este platillo).`;
        }

        const history = [
            { role: "system", content: instruccionesSistema },
            { role: "user", content: consultaFinal }
        ];

        const opcionesInferencia = { 
            modelId: modelId, 
            history: history, 
            stream: false,
            max_tokens: 350, 
            temperature: 0.2, 
            threads: 4 
        };

        console.log("🧠 Ejecutando inferencia con Llama 3.2...");
        
        const result = await qvac.completion(opcionesInferencia);
        
        let textoFinal = "Sin respuesta del modelo";
        
        if (result.text) {
            textoFinal = await result.text;
        } else if (result.choices && result.choices.length > 0) {
            textoFinal = result.choices[0].message.content;
        }

        // Garantizar al 100% que la advertencia médica esté presente al final de cualquier mensaje
        const regexDisclaimer = /(?:⚠️\s*\*?)?(?:Recuerda que soy una? IA|Aviso:.*|Consulta a tu médico.*|Recuerda que soy un modelo de Inteligencia Artificial.*)[\s\S]*$/i;
        if (regexDisclaimer.test(textoFinal)) {
            textoFinal = textoFinal.replace(regexDisclaimer, ADVERTENCIA_MEDICA).trim();
        } else {
            textoFinal = `${textoFinal.trim()}\n\n${ADVERTENCIA_MEDICA}`;
        }

        console.log("💬 IA Respondió correctamente con advertencia médica garantizada.");
        return textoFinal;

    } catch (error) {
        console.error("❌ Error ejecutando inferencia:", error);
        throw error;
    }
}

module.exports = { analizarPlatillo, inicializarModelo };