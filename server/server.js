// server.js (Actualizado con el puerto 3307 y endpoints de catálogos)
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { analizarPlatillo, inicializarModelo } = require('./qvac'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' })); 
app.use(express.urlencoded({ limit: '20mb', extended: true }));

const pool = mysql.createPool(process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3307, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

///////////////////////////////////////////////////////
////////////////MODULO DE CATÁLOGOS/////////////////////
///////////////////////////////////////////////////////

// Obtener lista de géneros activos
app.get('/api/generos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_genero, nom_genero FROM Genero WHERE estado_genero = 1');
        res.json(rows);
    } catch (error) {
        console.error("❌ [Backend] Error al obtener géneros:", error);
        res.status(500).json({ error: 'Error al obtener géneros.' });
    }
});

// Obtener lista de tipos de diabetes activos
app.get('/api/tipos-diabetes', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_tipodiabetes, nom_tipodiabetes FROM Tipo_Diabetes WHERE estado_tipodiabetes = 1');
        res.json(rows);
    } catch (error) {
        console.error("❌ [Backend] Error al obtener tipos de diabetes:", error);
        res.status(500).json({ error: 'Error al obtener tipos de diabetes.' });
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
        res.json({ success: true, id_persona: resultado.insertId, message: 'Perfil guardado exitosamente.' });

    } catch (error) {
        console.error("❌ [Backend] Error al guardar perfil en la base de datos:", error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor al guardar el perfil.' });
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

app.listen(PORT, '0.0.0.0', async () => {
    console.log(`✅ Servidor API escuchando en el puerto ${PORT} (Accesible externamente)`);
    
    try {
        await inicializarModelo(); 
        console.log("🚀 El backend está 100% listo para recibir mensajes desde la web.");
    } catch (e) {
        console.error("Hubo un problema inicializando el modelo en el arranque.");
    }
});