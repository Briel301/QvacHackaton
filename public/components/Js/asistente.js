document.addEventListener('DOMContentLoaded', () => {

    const chatForm = document.getElementById('chat-form');
    
    if (chatForm) {
        const chatInput = document.getElementById('chat-input');
        const photoFileInput = document.getElementById('photo-file-input');
        const btnTriggerCamera = document.getElementById('btn-trigger-camera');
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

        // -- Funciones Utilitarias del Chat --
        function scrollToBottom() {
            if(!scrollContainer) return;
            setTimeout(() => {
                scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
            }, 50);
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
                btn.addEventListener('click', () => {
                    if(chatInput) {
                        chatInput.value = btn.getAttribute('data-prompt');
                        chatForm.requestSubmit();
                    }
                });
            });
        }

        // -- Manejo de Imágenes --
        if (btnTriggerCamera) {
            btnTriggerCamera.addEventListener('click', () => photoFileInput.click());
        }

        if (photoFileInput) {
            photoFileInput.addEventListener('change', (e) => {
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
            });
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
                const backendUrl = window.location.protocol.startsWith('http')
                    ? '/api/analizar'
                    : 'http://localhost:3000/api/analizar';

                const respuesta = await fetch(backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mensaje: texto,
                        imagen: imagenBase64,
                        usaInsulina: localStorage.getItem('dia_insulina') === 'true'
                    })
                });
                
                if (!respuesta.ok) {
                    throw new Error('Respuesta no exitosa del servidor');
                }
                
                const data = await respuesta.json();
                return data.textoRespuesta; 

            } catch (error) {
                console.error("Error conectando al backend:", error);
                return "Lo siento, no pude conectarme con el servidor. Verifica que tu backend y tu túnel estén activos.\n\n⚠️ *Nota: Soy una inteligencia artificial y puedo cometer errores. Consulta siempre a tu médico.*";
            }
        }

        // -- Envío del Mensaje --
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if(!chatInput) return;
            const text = chatInput.value.trim();
            const hasImage = !!selectedImageDataUrl;

            if (!text && !hasImage) return;

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
                .replace(/\n/g, '<br/>');

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
                  <div class="text-sm leading-relaxed mb-3 ai-response-text">
                    ${htmlContent}
                  </div>
                  <!-- Botones interactivos para agregar o descartar del historial -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-surface-container-high/40 action-buttons-container">
                    <span class="text-xs font-medium text-on-surface-variant">¿Deseas registrar este alimento en tu historial?</span>
                    <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button type="button" class="btn-add-history px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1 cursor-pointer active:scale-95">
                        <span class="material-symbols-outlined text-[14px]">check</span> Sí, agregar
                      </button>
                      <button type="button" class="btn-skip-history px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium transition-all cursor-pointer active:scale-95">
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

            btnAdd.addEventListener('click', () => {
                // Lógica opcional: Guardar en localStorage para tu vista de "Mis Platos" o "Historial"
                try {
                    const historialPlatos = JSON.parse(localStorage.getItem('dia_historial_platos') || '[]');
                    historialPlatos.push({
                        alimento: userQuery || 'Consulta nutricional',
                        resultado: aiText,
                        fecha: new Date().toISOString()
                    });
                    localStorage.setItem('dia_historial_platos', JSON.stringify(historialPlatos));
                } catch (e) {
                    console.error("Error guardando en historial local:", e);
                }

                actionContainer.innerHTML = `
                  <div class="flex items-center gap-1.5 text-emerald-600 text-xs font-bold py-1">
                    <span class="material-symbols-outlined text-[16px]">task_alt</span> ¡Agregado a tu historial de comida!
                  </div>
                `;
            });

            btnSkip.addEventListener('click', () => {
                actionContainer.innerHTML = `
                  <div class="flex items-center gap-1.5 text-on-surface-variant/70 text-xs py-1">
                    <span class="material-symbols-outlined text-[16px]">info</span> Consulta descartada del historial.
                  </div>
                `;
            });

            dynamicMessages.appendChild(wrapper);
        }
    }
});