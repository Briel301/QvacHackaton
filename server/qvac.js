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
    const INSTRUCCIONES_SISTEMA = `Eres DIA NutriBot, un asistente nutricional especializado en diabetes.
Responde de forma directa, profesional y concisa.
Incluye obligatoriamente:
1. Veredicto claro: Indica si el alimento es una buena o mala opción para alguien con diabetes y explica brevemente el porqué (razón nutricional).
2. Estimación rápida de calorías y carbohidratos.
3. Impacto glucémico breve.
4. Termina exactamente con esta frase: "⚠️ *Recuerda que soy una IA. Consulta a tu médico.*"`;

    try {
        const modelId = await inicializarModelo();

        const history = [
            { role: "system", content: INSTRUCCIONES_SISTEMA },
            { role: "user", content: mensajeUsuario || "Analiza este alimento." }
        ];

        const opcionesInferencia = { 
            modelId: modelId, 
            history: history, 
            stream: false,
            max_tokens: 180, 
            temperature: 0.1, 
            threads: 4 
        };

        if (imagenBase64) {
            let base64Puro = imagenBase64.includes(',') ? imagenBase64.split(',')[1] : imagenBase64;
            opcionesInferencia.images = [base64Puro];
        }

        console.log("🧠 Ejecutando inferencia con Llama 3.2...");
        
        const result = await qvac.completion(opcionesInferencia);
        
        let textoFinal = "Sin respuesta del modelo";
        
        if (result.text) {
            textoFinal = await result.text;
        } else if (result.choices && result.choices.length > 0) {
            textoFinal = result.choices[0].message.content;
        }

        console.log("💬 IA Respondió correctamente.");
        return textoFinal;

    } catch (error) {
        console.error("❌ Error ejecutando inferencia:", error);
        throw error;
    }
}

module.exports = { analizarPlatillo, inicializarModelo };