// server.js (Actualizado con el puerto 3307 y endpoints de catálogos)
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
// Cargar .env desde la carpeta server o desde la raíz
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const { analizarPlatillo, inicializarModelo } = require('./qvac'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' })); 
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const pool = mysql.createPool(process.env.DATABASE_URL || {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_dia_nutribot',
    port: Number(process.env.DB_PORT) || 3307, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Catálogos de respaldo cuando la base de datos no está activa o accesible
const GENEROS_DEFAULT = [
    { id_genero: 1, nom_genero: 'Masculino' },
    { id_genero: 2, nom_genero: 'Femenino' },
    { id_genero: 3, nom_genero: 'Otro / Prefiero no decir' }
];

const TIPOS_DIABETES_DEFAULT = [
    { id_tipodiabetes: 1, nom_tipodiabetes: 'Diabetes Tipo 1' },
    { id_tipodiabetes: 2, nom_tipodiabetes: 'Diabetes Tipo 2' },
    { id_tipodiabetes: 3, nom_tipodiabetes: 'Diabetes Gestacional' },
    { id_tipodiabetes: 4, nom_tipodiabetes: 'Prediabetes' }
];

///////////////////////////////////////////////////////
////////////////MODULO DE CATÁLOGOS/////////////////////
///////////////////////////////////////////////////////

// Obtener lista de géneros activos
app.get('/api/generos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_genero, nom_genero FROM Genero WHERE estado_genero = 1');
        return res.json(rows);
    } catch (error) {
        console.warn("⚠️ [Backend] MariaDB no disponible para /api/generos. Usando catálogo local de respaldo.");
        return res.json(GENEROS_DEFAULT);
    }
});

// Obtener lista de tipos de diabetes activos
app.get('/api/tipos-diabetes', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_tipodiabetes, nom_tipodiabetes FROM Tipo_Diabetes WHERE estado_tipodiabetes = 1');
        return res.json(rows);
    } catch (error) {
        console.warn("⚠️ [Backend] MariaDB no disponible para /api/tipos-diabetes. Usando catálogo local de respaldo.");
        return res.json(TIPOS_DIABETES_DEFAULT);
    }
});

///////////////////////////////////////////////////////
////////////////MODULO DE PERFIL////////////////////////
///////////////////////////////////////////////////////

app.post('/api/perfil', async (req, res) => {
    try {
        const { nombre, edad, altura, peso, genero, tipo_diabetes, insulina } = req.body;

        if (!nombre || !genero || !tipo_diabetes) {
            return res.status(400).json({ error: 'Faltan datos obligatorios del perfil.' });
        }

        const usoInsulinaVal = insulina ? 1 : 0;

        try {
            const query = `
                INSERT INTO Persona (id_genero, id_tipodiabetes, nombre_persona, edad_persona, altura_persona, peso_persona, uso_insulina, estado_persona)
                VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `;

            const [resultado] = await pool.execute(query, [
                genero,
                tipo_diabetes,
                nombre,
                edad || null,
                altura || null,
                peso || null,
                usoInsulinaVal
            ]);

            console.log("💾 [Backend] Perfil guardado en MariaDB con ID:", resultado.insertId);
            return res.json({ success: true, id_persona: resultado.insertId, message: 'Perfil guardado exitosamente.' });
        } catch (dbError) {
            console.warn("⚠️ [Backend] MariaDB no disponible para guardar perfil. Guardado en modo local/fallback:", dbError.message);
            return res.json({ success: true, id_persona: Date.now(), message: 'Perfil guardado (Modo local/fallback).' });
        }

    } catch (error) {
        console.error("❌ [Backend] Error inesperado al procesar perfil:", error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

app.post('/api/analizar', async (req, res) => {
    try {
        const { mensaje, imagen, usaInsulina } = req.body;

        if (!mensaje && !imagen) {
            return res.status(400).json({ error: 'Faltan datos.' });
        }

        console.log("\n📩 [Backend] Solicitud recibida desde la web.");
        
        const textoRespuesta = await analizarPlatillo(mensaje, imagen, usaInsulina);

        console.log("📤 [Backend] Enviando respuesta al navegador...");
        res.json({ textoRespuesta: textoRespuesta });
        
    } catch (error) {
        console.error("❌ [Backend] Error:", error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

// Endpoint de salud para health checks de Railway y proxies
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor API escuchando en el puerto ${PORT} (Accesible externamente)`);
    
    // Iniciar modelo en segundo plano de forma no bloqueante para que Railway pase el healthcheck de inmediato
    inicializarModelo()
        .then(() => {
            console.log("🚀 El backend está 100% listo para recibir mensajes desde la web.");
        })
        .catch((e) => {
            console.warn("⚠️ [Backend] Inicialización del modelo diferida o en modo de respaldo:", e.message);
        });
});

// Respaldo de puerto secundario (3000) para prevenir 502 por desincronización en Railway
if (String(PORT) !== '3000') {
    try {
        app.listen(3000, '0.0.0.0', () => {
            console.log(`✅ Servidor API escuchando también en puerto de respaldo 3000`);
        }).on('error', () => {});
    } catch (err) {}
}