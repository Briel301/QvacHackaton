document.addEventListener('DOMContentLoaded', () => {

    const chatForm = document.getElementById('chat-form');
    
    if (chatForm) {
        if (chatForm.dataset.initialized === 'true') return;
        chatForm.dataset.initialized = 'true';

        const chatInput = document.getElementById('chat-input');
        const photoFileInput = document.getElementById('photo-file-input');
        const galleryFileInput = document.getElementById('gallery-file-input');
        const btnTriggerCamera = document.getElementById('btn-trigger-camera');
        const btnTriggerGallery = document.getElementById('btn-trigger-gallery');
        const cameraAttachedBadge = document.getElementById('camera-attached-badge');
        const imagePreviewBar = document.getElementById('image-preview-bar');
        const previewImageElement = document.getElementById('preview-image-element');
        const previewFilename = document.getElementById('preview-filename');
        const btnRemoveImage = document.getElementById('btn-remove-image');
        const dynamicMessages = document.getElementById('dynamic-messages');
        const typingIndicator = document.getElementById('typing-indicator');
        const scrollContainer = document.getElementById('chat-scroll-container');
        const btnClearMobile = document.getElementById('btn-clear-mobile');
        const btnClearDesktop = document.getElementById('btn-clear-desktop');
        const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

        let selectedImageDataUrl = null;
        let selectedFileName = '';
        let isSubmitting = false;

        function disableChat() {
            if (chatInput) {
                chatInput.disabled = true;
                chatInput.placeholder = "Selecciona una opción arriba...";
            }
            if (btnTriggerCamera) btnTriggerCamera.disabled = true;
            const submitBtn = chatForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
        }

        function enableChat() {
            if (chatInput) {
                chatInput.disabled = false;
                chatInput.placeholder = "Escribe aquí...";
            }
            if (btnTriggerCamera) btnTriggerCamera.disabled = false;
            const submitBtn = chatForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = false;
        }

        // -- Funciones Utilitarias del Chat --
        function scrollToBottom() {
            if(!scrollContainer) return;
            const doScroll = () => {
                scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
            };
            doScroll();
            setTimeout(doScroll, 80);
            setTimeout(doScroll, 220);
        }

        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
        }

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        // -- Chips Sugerencias Rápidas --
        if (quickPromptBtns) {
            quickPromptBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    if(chatInput) {
                        const prompt = btn.getAttribute('data-prompt');
                        if (!prompt) return;
                        chatInput.value = prompt;
                        chatForm.requestSubmit();
                    }
                });
            });
        }

        // Permitir envío con tecla Enter
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (isSubmitting) return;
                    chatForm.requestSubmit();
                }
            });
        }

        // -- Manejo de Imágenes --
        if (btnTriggerCamera) {
            btnTriggerCamera.addEventListener('click', () => photoFileInput.click());
        }
        if (btnTriggerGallery) {
            btnTriggerGallery.addEventListener('click', () => galleryFileInput.click());
        }

        // Abrir automáticamente la cámara o selector si se solicitó desde Escanear con IA
        if (sessionStorage.getItem('dia_auto_open_camera') === 'true') {
            sessionStorage.removeItem('dia_auto_open_camera');
            setTimeout(() => {
                if (photoFileInput) {
                    try { photoFileInput.click(); } catch (e) {}
                }
            }, 80);
        }

        const handleFileChange = (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            selectedFileName = file.name;
            const reader = new FileReader();
            reader.onload = function(event) {
                selectedImageDataUrl = event.target.result;
                if(previewImageElement) previewImageElement.src = selectedImageDataUrl;
                if(previewFilename) previewFilename.textContent = selectedFileName;
                
                if(imagePreviewBar) {
                    imagePreviewBar.classList.remove('hidden');
                    imagePreviewBar.classList.add('flex');
                }
                if(cameraAttachedBadge) cameraAttachedBadge.classList.remove('hidden');
                
                if(chatInput) {
                    chatInput.focus();
                    if (!chatInput.value.trim()) {
                        chatInput.value = 'Mi platillo tiene los siguientes ingredientes: ';
                    }
                }
            };
            reader.readAsDataURL(file);
        };

        if (photoFileInput) {
            photoFileInput.addEventListener('change', handleFileChange);
        }
        if (galleryFileInput) {
            galleryFileInput.addEventListener('change', handleFileChange);
        }

        if (btnRemoveImage) {
            btnRemoveImage.addEventListener('click', () => {
                selectedImageDataUrl = null;
                selectedFileName = '';
                if(photoFileInput) photoFileInput.value = '';
                
                if(imagePreviewBar) {
                    imagePreviewBar.classList.add('hidden');
                    imagePreviewBar.classList.remove('flex');
                }
                if(cameraAttachedBadge) cameraAttachedBadge.classList.add('hidden');
                
                if (chatInput && chatInput.value === 'Mi platillo tiene los siguientes ingredientes: ') {
                    chatInput.value = '';
                }
            });
        }

        function limpiarChat() {
            if(dynamicMessages) dynamicMessages.innerHTML = '';
            if(btnRemoveImage) btnRemoveImage.click();
        }

        if (btnClearMobile) btnClearMobile.addEventListener('click', limpiarChat);
        if (btnClearDesktop) btnClearDesktop.addEventListener('click', limpiarChat);

        // -- Conexión al Backend (Soporta Local y Túneles externos) --
        async function procesarEnServidorNode(texto, imagenBase64) {
            try {
                let backendUrl = '/api/analizar';
                const hostname = window.location.hostname;

                if (hostname === 'localhost' || hostname === '127.0.0.1') {
                    if (window.location.port !== '3000' && window.location.port !== '') {
                        backendUrl = 'http://localhost:3000/api/analizar';
                    }
                } else if (window.location.protocol === 'file:') {
                    backendUrl = 'http://localhost:3000/api/analizar';
                } else if (hostname.includes('-5500.use2.devtunnels.ms') || hostname.match(/-5500\./)) {
                    const newHostname = hostname.replace('-5500.', '-3000.');
                    backendUrl = `https://${newHostname}/api/analizar`;
                }

                const respuesta = await fetch(backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mensaje: texto,
                        imagen: imagenBase64,
                        usaInsulina: localStorage.getItem('dia_insulina') === 'true',
                        edad: localStorage.getItem('dia_edad'),
                        peso: localStorage.getItem('dia_peso'),
                        altura: localStorage.getItem('dia_altura'),
                        genero: localStorage.getItem('dia_genero'),
                        tipoDiabetesId: localStorage.getItem('dia_tipo_diabetes')
                    })
                });
                
                if (!respuesta.ok) {
                    throw new Error('Respuesta no exitosa del servidor');
                }
                
                const data = await respuesta.json();
                return data.textoRespuesta; 

            } catch (error) {
                console.error("Error conectando al backend:", error);
                return "Lo siento, no pude conectarme con el servidor. Verifica que tu backend y tu túnel estén activos.\n\n⚠️ *Aviso: Recuerda que soy un modelo de Inteligencia Artificial y puedo cometer errores. Esta información no sustituye el criterio profesional. Siempre debes consultar con tu médico antes de realizar cambios en tu tratamiento o alimentación.*";
            }
        }

        // -- Envío del Mensaje --
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            
            if(!chatInput) return;
            const text = chatInput.value.trim();
            const hasImage = !!selectedImageDataUrl;

            if (!text && !hasImage) return;

            isSubmitting = true;
            try {
                renderUserMessage(text, selectedImageDataUrl);
                
                const submittedText = text;
                const submittedImage = selectedImageDataUrl;

                chatInput.value = '';
                if(btnRemoveImage) btnRemoveImage.click();
                scrollToBottom();

                if(typingIndicator) {
                    typingIndicator.classList.remove('hidden');
                    typingIndicator.classList.add('flex');
                }
                scrollToBottom();

                const respuestaDelServidor = await procesarEnServidorNode(submittedText, submittedImage);

                if(typingIndicator) {
                    typingIndicator.classList.add('hidden');
                    typingIndicator.classList.remove('flex');
                }
                renderAiResponse(respuestaDelServidor, submittedText);
                scrollToBottom();
            } catch (err) {
                console.error("Error al procesar mensaje:", err);
                if(typingIndicator) {
                    typingIndicator.classList.add('hidden');
                    typingIndicator.classList.remove('flex');
                }
            } finally {
                isSubmitting = false;
            }
        });

        // -- Renderizado Visual --
        function renderUserMessage(text, imageUrl) {
            if(!dynamicMessages) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-start justify-end gap-3 animate-message';

            let imageHtml = '';
            if (imageUrl) {
                imageHtml = `
                  <div class="mb-2 rounded-2xl overflow-hidden border border-white/20 shadow-sm max-w-[260px] max-h-48 bg-black/10">
                    <img src="${imageUrl}" alt="Foto enviada" class="w-full h-full object-cover" />
                  </div>
                `;
            }

            let textHtml = text ? `<p class="text-sm font-medium leading-relaxed">${escapeHtml(text)}</p>` : '';

            wrapper.innerHTML = `
              <div class="flex flex-col items-end max-w-xl">
                <div class="p-4 rounded-3xl rounded-tr-sm bg-primary-container text-on-primary shadow-md shadow-primary-container/20">
                  ${imageHtml}
                  ${textHtml}
                </div>
                <span class="text-[11px] text-on-surface-variant/70 mt-1 mr-2">${getCurrentTime()}</span>
              </div>
            `;
            dynamicMessages.appendChild(wrapper);
        }

        function renderAiResponse(aiText, userQuery) {
            if(!dynamicMessages) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-start gap-3 animate-message';

            let htmlContent = escapeHtml(aiText)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/(?:^|\n)\*\s+(.*?)(?=\n|$)/g, '<br/>• $1')
                .replace(/\n/g, '<br/>');

            // Guardar en el historial general de chats
            try {
                const historyKey = 'dia_chat_history';
                let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
                const now = new Date();
                const timeStr = getCurrentTime();
                const userMsg = { sender: 'user', text: userQuery || 'Consulta nutricional', time: timeStr };
                const aiMsg = { sender: 'ai', text: aiText, time: timeStr };

                let activeId = sessionStorage.getItem('dia_active_chat_id');
                let chat = activeId ? history.find(c => c.id === activeId) : null;
                if (!chat) {
                    const newId = 'chat-' + Date.now();
                    sessionStorage.setItem('dia_active_chat_id', newId);
                    let title = userQuery || 'Consulta nutricional';
                    if (title.length > 45) title = title.substring(0, 42) + '...';
                    chat = {
                        id: newId,
                        titulo: title,
                        primeraSolicitud: userQuery || 'Consulta nutricional',
                        fechaCreacion: now.toISOString(),
                        categoria: 'Consulta IA',
                        icono: 'smart_toy',
                        hasImage: false,
                        mensajes: [userMsg, aiMsg]
                    };
                    history.unshift(chat);
                } else {
                    chat.mensajes.push(userMsg, aiMsg);
                }
                localStorage.setItem(historyKey, JSON.stringify(history));
                
                const idPersona = localStorage.getItem('dia_id_persona');
                if (idPersona) {
                    fetch('/api/historial-chat/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id_persona: idPersona, chats: history })
                    }).catch(e => console.warn('Error syncing history to server:', e));
                }
            } catch (e) {
                console.warn('Error registrando en dia_chat_history:', e);
            }

            wrapper.innerHTML = `
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span class="material-symbols-outlined text-[20px] sm:text-[22px]">smart_toy</span>
              </div>
              <div class="flex-1 max-w-2xl">
                <div class="p-4 sm:p-5 rounded-3xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-sm text-on-surface">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-on-surface">DIA NutriBot</span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed/30 text-primary">
                        <span class="material-symbols-outlined text-[13px]">auto_awesome</span> Respuesta IA
                      </span>
                    </div>
                    <span class="text-[11px] text-on-surface-variant/80">${getCurrentTime()}</span>
                  </div>
                  <div class="ai-response-text text-sm leading-relaxed mb-3 text-on-surface">
                    ${htmlContent}
                  </div>
                  <!-- Botones interactivos para agregar o descartar del historial -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-surface-container-high/40 action-buttons-container">
                    <span class="text-xs font-semibold text-on-surface-variant">¿Deseas registrar este alimento en tu historial?</span>
                    <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button type="button" class="btn-add-history flex-1 sm:flex-initial min-h-[38px] px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
                        <span class="material-symbols-outlined text-[16px]">check</span> Sí, agregar
                      </button>
                      <button type="button" class="btn-skip-history flex-1 sm:flex-initial min-h-[38px] px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium transition-all flex items-center justify-center cursor-pointer active:scale-95">
                        No, solo era duda
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;

            // Manejo de eventos para los botones de confirmación
            const btnAdd = wrapper.querySelector('.btn-add-history');
            const btnSkip = wrapper.querySelector('.btn-skip-history');
            const actionContainer = wrapper.querySelector('.action-buttons-container');

            // Bloquear input hasta que el usuario decida
            disableChat();

            function doSaveMeal() {
                actionContainer.innerHTML = `
                  <div class="flex items-center gap-1.5 text-blue-500 text-xs font-bold py-1">
                    <span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Generando resumen de tu comida...
                  </div>
                `;
                (async () => {
                    try {
                        let baseUrl = '';
                        const hostname = window.location.hostname;
                        if (hostname === 'localhost' || hostname === '127.0.0.1') {
                            if (window.location.port !== '3000' && window.location.port !== '') baseUrl = 'http://localhost:3000';
                        } else if (window.location.protocol === 'file:') {
                            baseUrl = 'http://localhost:3000';
                        } else if (hostname.includes('-5500.use2.devtunnels.ms') || hostname.match(/-5500\./)) {
                            baseUrl = `https://${hostname.replace('-5500.', '-3000.')}`;
                        }

                        const finalMealText = sessionStorage.getItem('dia_current_meal_text') || '';
                        
                        // 1. Obtener Previsualización
                        const prevRes = await fetch(`${baseUrl}/api/comidas/previsualizar`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ textoAcumulado: finalMealText })
                        });

                        if (!prevRes.ok) throw new Error("Error al generar resumen.");
                        const prevData = await prevRes.json();
                        let datosExtraidos = prevData.datos_extraidos;

                        // 2. Renderizar Resumen Editable
                        function renderSummary() {
                            if (datosExtraidos.alimentos.length === 0) {
                                actionContainer.innerHTML = `
                                  <div class="flex items-center gap-1.5 text-on-surface-variant/70 text-xs py-1">
                                    <span class="material-symbols-outlined text-[16px]">info</span> No hay alimentos para guardar. Comida cancelada.
                                  </div>
                                `;
                                sessionStorage.removeItem('dia_current_meal_text');
                                enableChat();
                                return;
                            }

                            // Recalcular totales
                            datosExtraidos.total_calorias = 0;
                            datosExtraidos.total_carbohidratos = 0;
                            datosExtraidos.alimentos.forEach(a => {
                                datosExtraidos.total_calorias += ((a.carbohidratos * 4) + (a.proteina * 4) + (a.grasas * 9)) || 0;
                                datosExtraidos.total_carbohidratos += a.carbohidratos || 0;
                            });

                            let html = `
                              <div class="flex flex-col gap-2 w-full mt-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30">
                                <span class="text-xs font-bold text-on-surface">Resumen de tu comida (Verifica los datos)</span>
                                <div class="flex flex-col gap-1.5">
                            `;
                            
                            datosExtraidos.alimentos.forEach((alim, idx) => {
                                html += `
                                  <div class="flex items-center justify-between bg-surface-container rounded-lg p-2">
                                    <div class="flex flex-col">
                                      <span class="text-xs font-semibold text-on-surface-variant">${alim.nombre}</span>
                                      <span class="text-[10px] text-on-surface-variant/70">${alim.carbohidratos}g carbs.</span>
                                    </div>
                                    <button type="button" class="btn-remove-food text-red-500 hover:bg-red-500/10 p-1 rounded-md" data-idx="${idx}">
                                      <span class="material-symbols-outlined text-[16px]">delete</span>
                                    </button>
                                  </div>
                                `;
                            });

                            html += `
                                </div>
                                <div class="flex items-center justify-between mt-1">
                                  <span class="text-xs font-medium text-on-surface-variant">Total: ~${Math.round(datosExtraidos.total_calorias)} kcal | ${Math.round(datosExtraidos.total_carbohidratos)}g carbs</span>
                                  <button type="button" class="btn-confirm-save px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm active:scale-95">Confirmar y Guardar</button>
                                </div>
                              </div>
                            `;

                            actionContainer.innerHTML = html;

                            // Botones Eliminar
                            actionContainer.querySelectorAll('.btn-remove-food').forEach(btn => {
                                btn.addEventListener('click', (e) => {
                                    const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                                    datosExtraidos.alimentos.splice(idx, 1);
                                    renderSummary();
                                });
                            });

                            // Botón Confirmar
                            actionContainer.querySelector('.btn-confirm-save').addEventListener('click', async () => {
                                actionContainer.innerHTML = `
                                  <div class="flex items-center gap-1.5 text-emerald-600 text-xs font-bold py-1">
                                    <span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Guardando en base de datos...
                                  </div>
                                `;
                                try {
                                    const idPersona = localStorage.getItem('dia_id_persona') || 1; 
                                    const saveRes = await fetch(`${baseUrl}/api/comidas/guardar`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            id_persona: idPersona,
                                            datosExtraidos: datosExtraidos
                                        })
                                    });

                                    if (saveRes.ok) {
                                        actionContainer.innerHTML = `
                                          <div class="flex items-center gap-1.5 text-emerald-600 text-xs font-bold py-1">
                                            <span class="material-symbols-outlined text-[16px]">task_alt</span> ¡Comida y detalles guardados con éxito!
                                          </div>
                                        `;
                                        sessionStorage.removeItem('dia_current_meal_text');
                                        
                                        // Refrescar el dashboard si la función existe globalmente
                                        if (typeof initDashboard === 'function') {
                                            initDashboard();
                                        }
                                        // Refrescar mi_progreso
                                        window.dispatchEvent(new Event('dia_platos_updated'));
                                    } else {
                                        throw new Error("Error en servidor al guardar.");
                                    }
                                } catch (err) {
                                    console.error(err);
                                    actionContainer.innerHTML = `
                                      <div class="flex items-center gap-1.5 text-red-500 text-xs font-bold py-1">
                                        <span class="material-symbols-outlined text-[16px]">error</span> Error al guardar: ${err.message}
                                      </div>
                                    `;
                                } finally {
                                    enableChat();
                                }
                            });
                        }
                        
                        renderSummary();

                    } catch (err) {
                        console.error(err);
                        actionContainer.innerHTML = `
                          <div class="flex items-center gap-1.5 text-red-500 text-xs font-bold py-1">
                            <span class="material-symbols-outlined text-[16px]">error</span> Error de conexión: ${err.message}.
                          </div>
                        `;
                        enableChat();
                    }
                })();
            }

            btnAdd.addEventListener('click', () => {
                let currentMealText = sessionStorage.getItem('dia_current_meal_text') || '';
                currentMealText += `\n\nUsuario: ${userQuery}\nIA: ${aiText}`;
                sessionStorage.setItem('dia_current_meal_text', currentMealText);

                actionContainer.innerHTML = `
                  <div class="flex flex-col gap-2 w-full mt-2">
                    <span class="text-xs font-medium text-on-surface-variant">¿Vas a comer algo más para añadirlo en esta misma comida?</span>
                    <div class="flex items-center gap-2 justify-end">
                      <button type="button" class="btn-more-yes px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium transition-all cursor-pointer shadow-sm active:scale-95">Sí, agregar más</button>
                      <button type="button" class="btn-more-no px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95">No, es todo (Guardar)</button>
                    </div>
                  </div>
                `;

                actionContainer.querySelector('.btn-more-yes').addEventListener('click', () => {
                    actionContainer.innerHTML = `
                      <div class="flex items-center gap-1.5 text-on-surface-variant/70 text-xs py-1">
                        <span class="material-symbols-outlined text-[16px]">info</span> Por favor, sube la foto o describe tu siguiente alimento abajo.
                      </div>
                    `;
                    enableChat();
                });

                actionContainer.querySelector('.btn-more-no').addEventListener('click', doSaveMeal);
            });

            btnSkip.addEventListener('click', () => {
                const pendingMeal = sessionStorage.getItem('dia_current_meal_text');
                if (pendingMeal) {
                    actionContainer.innerHTML = `
                      <div class="flex flex-col gap-2 w-full mt-2">
                        <span class="text-xs font-medium text-on-surface-variant">Consulta descartada. ¿Vas a comer algo más para tu comida pendiente?</span>
                        <div class="flex items-center gap-2 justify-end">
                          <button type="button" class="btn-more-yes px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium transition-all cursor-pointer shadow-sm active:scale-95">Sí, agregar más</button>
                          <button type="button" class="btn-more-no px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-95">No, es todo (Guardar)</button>
                        </div>
                      </div>
                    `;
                    actionContainer.querySelector('.btn-more-yes').addEventListener('click', () => {
                        actionContainer.innerHTML = `
                          <div class="flex items-center gap-1.5 text-on-surface-variant/70 text-xs py-1">
                            <span class="material-symbols-outlined text-[16px]">info</span> Por favor, sube la foto o describe tu siguiente alimento abajo.
                          </div>
                        `;
                        enableChat();
                    });
                    actionContainer.querySelector('.btn-more-no').addEventListener('click', doSaveMeal);
                } else {
                    actionContainer.innerHTML = `
                      <div class="flex items-center gap-1.5 text-on-surface-variant/70 text-xs py-1">
                        <span class="material-symbols-outlined text-[16px]">info</span> Consulta descartada del historial.
                      </div>
                    `;
                    enableChat();
                }
            });

            dynamicMessages.appendChild(wrapper);
        }
    }
});