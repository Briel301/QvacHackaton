// server.js (Actualizado con el puerto 3307 y endpoints de catálogos)
///////////////////////////////////////////////////////
////////////////MODULO DE CONFIGURACIÓN/////////////////
///////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
// Cargar .env desde la carpeta server o desde la raíz
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const { analizarPlatillo, extraerDatosComida, inicializarModelo } = require('./qvac'); 

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

// Obtener lista de Tipos de Comida
app.get('/api/tipos-comida', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_tipocomida, nomb_tipocomida FROM TipoComida WHERE estado_tipocomida = 1');
        return res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener lista de Días
app.get('/api/dias', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_dia, nom_dia FROM Dia');
        return res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

///////////////////////////////////////////////////////
////////////////MODULO DE RECORDATORIOS/////////////////
///////////////////////////////////////////////////////

app.post('/api/recordatorios/sync', async (req, res) => {
    try {
        const { id_persona, recordatorios } = req.body;
        if (!id_persona || !Array.isArray(recordatorios)) {
            return res.status(400).json({ error: 'Datos inválidos.' });
        }

        await pool.execute('DELETE FROM Recordatorio WHERE id_persona = ?', [id_persona]);
        
        const mapTipoComida = { 'Desayuno': 1, 'Almuerzo': 2, 'Cena': 3, 'Refacción': 4 };
        const mapDia = { 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6, 'Domingo': 7 };

        for (const rec of recordatorios) {
            const id_tipocomida = mapTipoComida[rec.titulo] || 2;
            const estado = rec.activo ? 1 : 0;
            const anticipacion = rec.anticipacion || 0;
            const comentario = rec.nota || '';
            const hora = rec.hora || '12:00';

            for (const diaName of (rec.dias || [])) {
                const id_dia = mapDia[diaName];
                if (id_dia) {
                    await pool.execute(
                        'INSERT INTO Recordatorio (id_dia, id_tipocomida, id_persona, comentario_recordatorio, hora_recordatorio, estado_recordatorio, anticipacion_recordatorio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [id_dia, id_tipocomida, id_persona, comentario, hora, estado, anticipacion]
                    );
                }
            }
        }
        res.json({ success: true, message: 'Recordatorios sincronizados con éxito.' });
    } catch (error) {
        console.error("❌ [Backend] Error sincronizando recordatorios:", error);
        res.status(500).json({ error: 'Error interno al sincronizar.' });
    }
});

app.get('/api/recordatorios/:id_persona', async (req, res) => {
    try {
        const id_persona = req.params.id_persona;
        const query = `
            SELECT r.*, d.nom_dia, tc.nomb_tipocomida 
            FROM Recordatorio r
            JOIN Dia d ON r.id_dia = d.id_dia
            JOIN TipoComida tc ON r.id_tipocomida = tc.id_tipocomida
            WHERE r.id_persona = ?
        `;
        const [rows] = await pool.execute(query, [id_persona]);
        
        const grupos = {};
        for (let row of rows) {
            const key = `${row.nomb_tipocomida}_${row.hora_recordatorio}`;
            if (!grupos[key]) {
                const hexId = Buffer.from(key).toString('hex').substring(0, 8);
                grupos[key] = {
                    id: 'rec-db-' + hexId,
                    titulo: row.nomb_tipocomida,
                    hora: row.hora_recordatorio.substring(0, 5),
                    dias: [],
                    anticipacion: row.anticipacion_recordatorio,
                    activo: row.estado_recordatorio === 1,
                    nota: row.comentario_recordatorio || '',
                    creadoEn: new Date().toISOString()
                };
            }
            grupos[key].dias.push(row.nom_dia);
            if (row.estado_recordatorio === 1) grupos[key].activo = true;
        }
        
        res.json(Object.values(grupos));
    } catch (error) {
        console.error("❌ [Backend] Error obteniendo recordatorios:", error);
        res.status(500).json({ error: 'Error al obtener recordatorios.' });
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

///////////////////////////////////////////////////////
////////////////MODULO DE HISTORIAL CHAT///////////////
///////////////////////////////////////////////////////

app.post('/api/historial-chat/sync', async (req, res) => {
    try {
        const { id_persona, chats } = req.body;
        if (!id_persona || !Array.isArray(chats)) {
            return res.status(400).json({ error: 'Datos inválidos.' });
        }

        await pool.execute('DELETE FROM HistorialChat WHERE id_persona = ?', [id_persona]);
        
        for (const chat of chats) {
            const titulo = chat.titulo || 'Consulta IA';
            const reqText = chat.primeraSolicitud || '';
            const fecha = chat.fechaCreacion || new Date().toISOString();
            // MySQL datetime format: YYYY-MM-DD HH:MM:SS
            const sqlFecha = fecha.replace('T', ' ').substring(0, 19); 
            const categoria = chat.categoria || 'Consulta IA';
            const calorias = chat.calorias || 0;
            const icono = chat.icono || 'forum';
            const has_image = chat.hasImage ? 1 : 0;
            const mensajes = JSON.stringify(chat.mensajes || []);

            await pool.execute(
                'INSERT INTO HistorialChat (id_persona, titulo, primera_solicitud, fecha_creacion, categoria, calorias, icono, has_image, mensajes_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id_persona, titulo, reqText, sqlFecha, categoria, calorias, icono, has_image, mensajes]
            );
        }
        res.json({ success: true, message: 'Historial sincronizado.' });
    } catch (error) {
        console.error("❌ [Backend] Error sincronizando historial chat:", error);
        res.status(500).json({ error: 'Error interno al sincronizar historial.' });
    }
});

app.get('/api/historial-chat/:id_persona', async (req, res) => {
    try {
        const id_persona = req.params.id_persona;
        const [rows] = await pool.execute('SELECT * FROM HistorialChat WHERE id_persona = ? ORDER BY fecha_creacion DESC', [id_persona]);
        
        const chats = rows.map(row => {
            // ISO 8601 string expected by frontend
            const fecha = new Date(row.fecha_creacion).toISOString();
            let mensajes = [];
            try { mensajes = typeof row.mensajes_json === 'string' ? JSON.parse(row.mensajes_json) : row.mensajes_json; } catch(e) {}
            return {
                id: 'chat-db-' + row.id_chat,
                titulo: row.titulo,
                primeraSolicitud: row.primera_solicitud,
                fechaCreacion: fecha,
                categoria: row.categoria,
                calorias: row.calorias,
                icono: row.icono,
                hasImage: row.has_image === 1,
                mensajes: mensajes || []
            };
        });
        
        res.json(chats);
    } catch (error) {
        console.error("❌ [Backend] Error obteniendo historial chat:", error);
        res.status(500).json({ error: 'Error al obtener historial chat.' });
    }
});

///////////////////////////////////////////////////////
////////////////MODULO DE MIS PLATOS (FAVORITOS)///////
///////////////////////////////////////////////////////

app.post('/api/platillos/sync', async (req, res) => {
    try {
        const { id_persona, platillos } = req.body;
        if (!id_persona || !Array.isArray(platillos)) {
            return res.status(400).json({ error: 'Datos inválidos.' });
        }

        // Crear tabla si no existe
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Platillo (
                id_platillo INT AUTO_INCREMENT PRIMARY KEY,
                id_persona INT NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                foto LONGTEXT,
                categoria VARCHAR(100),
                calorias INT,
                descripcion TEXT,
                carbohidratos FLOAT,
                proteinas FLOAT,
                grasas FLOAT,
                fibra FLOAT,
                fecha_creacion DATETIME,
                FOREIGN KEY (id_persona) REFERENCES Persona(id_persona) ON DELETE CASCADE
            )
        `);

        try {
            await pool.execute('ALTER TABLE Platillo MODIFY foto LONGTEXT');
        } catch(e) {
            console.log("No se pudo alterar la tabla o ya era LONGTEXT", e.message);
        }

        await pool.execute('DELETE FROM Platillo WHERE id_persona = ?', [id_persona]);
        
        for (const plato of platillos) {
            const nombre = plato.nombre || 'Platillo';
            const foto = plato.foto || '';
            const categoria = plato.categoria || 'Almuerzo';
            let calorias = plato.calorias || 0;
            const descripcion = plato.descripcion || '';
            let carbs = plato.carbohidratos || 0;
            let prot = plato.proteinas || 0;
            let grasas = plato.grasas || 0;
            const fibra = plato.fibra || 0;
            
            // Si el plato es nuevo (calorias === 0), dejamos que QVAC calcule los macros y calorías
            if (calorias === 0) {
                console.log(`[QVAC] Calculando calorías para nuevo platillo: ${nombre}`);
                try {
                    const qvacData = await extraerDatosComida(`${nombre}. ${descripcion}`);
                    if (qvacData) {
                        calorias = parseInt(qvacData.total_calorias) || 0;
                        carbs = parseFloat(qvacData.total_carbohidratos) || carbs;
                        prot = parseFloat(qvacData.total_proteina) || prot;
                        grasas = parseFloat(qvacData.total_grasas) || grasas;
                        
                        // Si la IA no detectó calorías, hacemos una estimación simple
                        if (calorias === 0 && (carbs > 0 || prot > 0 || grasas > 0)) {
                            calorias = Math.round((carbs * 4) + (prot * 4) + (grasas * 9));
                        }
                    }
                } catch (e) {
                    console.error("[QVAC] Error calculando platillo:", e);
                }
            }

            const fecha = plato.fecha || new Date().toISOString();
            const sqlFecha = fecha.replace('T', ' ').substring(0, 19); 

            // Asegurarse de que no haya NaN
            calorias = isNaN(calorias) ? 0 : calorias;
            carbs = isNaN(carbs) ? 0 : carbs;
            prot = isNaN(prot) ? 0 : prot;
            grasas = isNaN(grasas) ? 0 : grasas;

            await pool.execute(
                'INSERT INTO Platillo (id_persona, nombre, foto, categoria, calorias, descripcion, carbohidratos, proteinas, grasas, fibra, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id_persona, nombre, foto, categoria, calorias, descripcion, carbs, prot, grasas, fibra, sqlFecha]
            );
        }
        res.json({ success: true, message: 'Platillos sincronizados con éxito.' });
    } catch (error) {
        console.error("❌ [Backend] Error sincronizando platillos:", error);
        res.status(500).json({ error: 'Error interno al sincronizar platillos.' });
    }
});

app.get('/api/platillos/:id_persona', async (req, res) => {
    try {
        const id_persona = req.params.id_persona;
        const [rows] = await pool.execute('SELECT * FROM Platillo WHERE id_persona = ? ORDER BY fecha_creacion DESC', [id_persona]);
        
        const platillos = rows.map(row => {
            return {
                id: 'plato-db-' + row.id_platillo,
                nombre: row.nombre,
                foto: row.foto,
                categoria: row.categoria,
                calorias: row.calorias,
                descripcion: row.descripcion,
                carbohidratos: row.carbohidratos,
                proteinas: row.proteinas,
                grasas: row.grasas,
                fibra: row.fibra,
                fecha: new Date(row.fecha_creacion).toISOString()
            };
        });
        
        res.json(platillos);
    } catch (error) {
        console.error("❌ [Backend] Error obteniendo platillos:", error);
        res.status(500).json({ error: 'Error al obtener platillos.' });
    }
});

///////////////////////////////////////////////////////
////////////////MODULO DE ANÁLISIS E IA////////////////
///////////////////////////////////////////////////////

app.post('/api/analizar', async (req, res) => {
    try {
        const { mensaje, imagen, usaInsulina, edad, peso, altura, genero, tipoDiabetesId } = req.body;

        if (!mensaje && !imagen) {
            return res.status(400).json({ error: 'Faltan datos.' });
        }

        console.log("\n📩 [Backend] Solicitud recibida desde la web.");
        
        const tipoDiabetesStr = TIPOS_DIABETES_DEFAULT.find(t => t.id_tipodiabetes == tipoDiabetesId)?.nom_tipodiabetes || '';
        const generoStr = GENEROS_DEFAULT.find(g => g.id_genero == genero)?.nom_genero || '';

        const textoRespuesta = await analizarPlatillo(mensaje, imagen, usaInsulina, edad, peso, altura, generoStr, tipoDiabetesStr);

        console.log("📤 [Backend] Enviando respuesta al navegador...");
        res.json({ textoRespuesta: textoRespuesta });
        
    } catch (error) {
        console.error("❌ [Backend] Error:", error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

///////////////////////////////////////////////////////
////////////////MODULO DE COMIDAS E HISTORIAL//////////
///////////////////////////////////////////////////////

// Obtener las comidas de hoy para el dashboard
app.get('/api/comidas/hoy/:id_persona', async (req, res) => {
    try {
        const id_persona = req.params.id_persona;
        const query = `
            SELECT id_comida, id_tipocomida, descripcion_comida, fecha_comida, total_calorias, 
                   total_carbohidratos, total_proteina, total_fibra, total_azucar, total_sodio, total_grasas 
            FROM Comida 
            WHERE id_persona = ? AND DATE(fecha_comida) = CURDATE()
            ORDER BY fecha_comida DESC
        `;
        const [rows] = await pool.execute(query, [id_persona]);
        
        // Sumar totales
        let total_calorias = 0;
        let total_carbohidratos = 0;
        let total_proteina = 0;
        let total_grasas = 0; 
        
        rows.forEach(r => {
            total_calorias += Number(r.total_calorias || 0);
            total_carbohidratos += Number(r.total_carbohidratos || 0);
            total_proteina += Number(r.total_proteina || 0);
            total_grasas += Number(r.total_grasas || 0);
        });

        res.json({
            comidas: rows,
            resumen: {
                calorias: total_calorias,
                carbohidratos: total_carbohidratos,
                proteinas: total_proteina,
                grasas: total_grasas
            }
        });
    } catch (error) {
        console.error("❌ [Backend] Error obteniendo comidas de hoy:", error);
        res.status(500).json({ error: 'Error interno al obtener comidas.' });
    }
});

// Endpoint para previsualizar la comida antes de guardar
app.post('/api/comidas/previsualizar', async (req, res) => {
    console.log("📩 [Backend] Solicitud de previsualización recibida...");
    try {
        const { textoAcumulado } = req.body;
        if (!textoAcumulado) return res.status(400).json({ error: "No hay texto acumulado." });
        
        console.log("⏳ [Backend] Extrayendo datos nutricionales para resumen...");
        const datosExtraidos = await extraerDatosComida(textoAcumulado);
        res.json({ success: true, datos_extraidos: datosExtraidos });
    } catch (error) {
        console.error("❌ [Backend] Error en previsualización:", error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener todo el historial de comidas (para selects)
app.get('/api/comidas/historial/:id_persona', async (req, res) => {
    try {
        const id_persona = req.params.id_persona;
        const [rows] = await pool.execute(`
            SELECT c.*, t.nomb_tipocomida 
            FROM Comida c
            LEFT JOIN TipoComida t ON c.id_tipocomida = t.id_tipocomida
            WHERE c.id_persona = ?
            ORDER BY c.fecha_comida DESC
            LIMIT 50
        `, [id_persona]);
        res.json(rows);
    } catch (error) {
        console.error("❌ [Backend] Error obteniendo historial de comidas:", error);
        res.status(500).json({ error: 'Error al obtener historial de comidas.' });
    }
});

// Endpoint para guardar una comida en la Base de Datos
app.post('/api/comidas/guardar', async (req, res) => {
    console.log("📩 [Backend] Solicitud recibida en /api/comidas/guardar");
    try {
        const { id_persona, datosExtraidos, foto_comida } = req.body;

        if (!id_persona || !datosExtraidos) {
            console.warn("⚠️ [Backend] Faltan datos:", { id_persona, datosExtraidos });
            return res.status(400).json({ error: 'Faltan datos obligatorios (id_persona o datosExtraidos).' });
        }
        
        if (!datosExtraidos) {
            return res.status(500).json({ error: 'No se pudieron extraer los datos con la IA.' });
        }

        // Determinar id_tipocomida según la hora del día
        const hour = new Date().getHours();
        let id_tipocomida = 4; // Snack por defecto
        if (hour >= 5 && hour < 11) id_tipocomida = 1; // Desayuno
        else if (hour >= 11 && hour < 16) id_tipocomida = 2; // Almuerzo
        else if (hour >= 16 && hour < 22) id_tipocomida = 3; // Cena

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Asegurarnos de que los Tipos de Comida existan en la BD (Prevenir Error de Foreign Key)
            const [tiposResult] = await connection.execute('SELECT COUNT(*) as count FROM TipoComida');
            if (tiposResult[0].count === 0) {
                console.log("⚠️ [Backend] Tabla TipoComida vacía. Insertando valores por defecto...");
                await connection.execute("INSERT INTO TipoComida (id_tipocomida, nomb_tipocomida, estado_tipocomida) VALUES (1, 'Desayuno', 1), (2, 'Almuerzo', 1), (3, 'Cena', 1), (4, 'Snack', 1)");
            }

            // 1. Crear la comida
            const insertComidaQuery = `
                INSERT INTO Comida (id_persona, id_tipocomida, foto_comida, descripcion_comida, fecha_comida, total_azucar, total_carbohidratos, total_proteina, total_fibra, total_sodio, total_grasas, uso_insulina, total_calorias, fav_comida)
                VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, 0, ?, 0)
            `;
            
            // Si la IA no trajo grasas totales, podemos sumar de los alimentos o dejar 0
            let grasasTotales = datosExtraidos.total_grasas || 0;
            if (grasasTotales === 0 && datosExtraidos.alimentos) {
                datosExtraidos.alimentos.forEach(a => grasasTotales += (a.grasas || 0));
            }

            const [comidaResult] = await connection.execute(insertComidaQuery, [
                id_persona,
                id_tipocomida,
                foto_comida || null,
                datosExtraidos.descripcion_comida || 'Comida',
                datosExtraidos.total_azucar || 0,
                datosExtraidos.total_carbohidratos || 0,
                datosExtraidos.total_proteina || 0,
                datosExtraidos.total_fibra || 0,
                datosExtraidos.total_sodio || 0,
                grasasTotales,
                datosExtraidos.total_calorias || 0
            ]);

            const id_comida = comidaResult.insertId;

            // 2. Procesar e insertar los alimentos (y detalles de comida)
            const alimentos = datosExtraidos.alimentos || [];
            for (const item of alimentos) {
                // Verificar si el alimento ya existe o insertarlo
                let id_alimento;
                const [rows] = await connection.execute('SELECT id_alimento FROM Alimento WHERE nombre_alimento = ?', [item.nombre]);
                if (rows.length > 0) {
                    id_alimento = rows[0].id_alimento;
                } else {
                    const [insertAlim] = await connection.execute('INSERT INTO Alimento (nombre_alimento, descripcion_alimento, estado_alimento) VALUES (?, ?, 1)', [item.nombre, item.descripcion || null]);
                    id_alimento = insertAlim.insertId;
                }

                // Insertar DetalleComida
                const insertDetalle = `
                    INSERT INTO DetalleComida (id_comida, id_alimento, cantidad_detallecomida, medida_detallecomida, azucar_detallecomida, carbohidrato_detallecomida, proteina_detallecomida, fibra_detallecomida, caloria_detallecomida, grasa_detallecomida)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                
                // Calcular calorías individuales si no vienen de la IA
                const caloriasItem = item.calorias || ((item.carbohidratos || 0) * 4 + (item.proteina || 0) * 4 + (item.grasas || 0) * 9);

                await connection.execute(insertDetalle, [
                    id_comida,
                    id_alimento,
                    item.cantidad || 1,
                    item.medida || 'porcion',
                    item.azucar || 0,
                    item.carbohidratos || 0,
                    item.proteina || 0,
                    item.fibra || 0,
                    caloriasItem,
                    item.grasas || 0
                ]);
            }

            await connection.commit();
            console.log("✅ [Backend] Comida y detalles guardados exitosamente.");
            res.json({ success: true, id_comida, datos_extraidos: datosExtraidos });
        } catch (dbError) {
            await connection.rollback();
            throw dbError;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error("❌ [Backend] Error guardando comida:", error);
        res.status(500).json({ error: 'Ocurrió un error al guardar en la BD.' });
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