/**
 * Historial de Conversaciones del Asistente IA - DIA Dashboard
 * Compatible con visualización directa en navegador y navegación instantánea SPA (switchAppView).
 * Funciona perfectamente en dispositivos de escritorio (PC) y móviles.
 */

(function () {
  const STORAGE_KEY = 'dia_chat_history';

  // Conversaciones iniciales predeterminadas con datos realistas de nutrición
  const DEFAULT_CHATS = [
    {
      id: 'chat-1',
      titulo: 'Análisis de Almuerzo: Pollo a la Plancha con Quinoa',
      primeraSolicitud: '¿El pollo a la plancha con quinoa y ensalada verde es una buena opción para mi almuerzo?',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // Hace 45 min (Hoy)
      categoria: 'Almuerzo',
      calorias: 485,
      icono: 'lunch_dining',
      hasImage: false,
      mensajes: [
        {
          sender: 'user',
          text: '¿El pollo a la plancha con quinoa y ensalada verde es una buena opción para mi almuerzo?',
          time: '12:32 PM'
        },
        {
          sender: 'ai',
          text: '¡Excelente elección! Es un almuerzo altamente equilibrado que encaja perfectamente en tu objetivo diario de déficit controlado. Te aporta unas 485 kcal con 42g de proteína de alto valor biológico y carbohidratos complejos de lenta absorción.',
          time: '12:33 PM',
          macros: { calorias: 485, proteina: 42, carbos: 45, grasas: 11 }
        }
      ]
    },
    {
      id: 'chat-2',
      titulo: 'Recomendación de Cena Ligera y Saciante',
      primeraSolicitud: 'Recomiéndame una cena ligera y saciante de menos de 400 kcal para hoy.',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // Ayer
      categoria: 'Cena',
      calorias: 360,
      icono: 'dinner_dining',
      hasImage: false,
      mensajes: [
        {
          sender: 'user',
          text: 'Recomiéndame una cena ligera y saciante de menos de 400 kcal para hoy.',
          time: '08:15 PM'
        },
        {
          sender: 'ai',
          text: 'Para una cena de < 400 kcal te sugiero: Salteado de pechuga de pavo con calabacines, champiñones y espinacas tiernas con una cucharadita de aceite de oliva virgen extra. Aporta 28g de proteína y promueve una óptima digestión previa al descanso.',
          time: '08:16 PM',
          macros: { calorias: 360, proteina: 32, carbos: 18, grasas: 9 }
        }
      ]
    },
    {
      id: 'chat-3',
      titulo: 'Valor Calórico y Proteico: Bowl de Avena con Plátano',
      primeraSolicitud: '¿Cuántas calorías y proteínas tiene un tazón de avena con plátano y nueces?',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // Hace 2 días
      categoria: 'Desayuno',
      calorias: 395,
      icono: 'breakfast_dining',
      hasImage: false,
      mensajes: [
        {
          sender: 'user',
          text: '¿Cuántas calorías y proteínas tiene un tazón de avena con plátano y nueces?',
          time: '08:40 AM'
        },
        {
          sender: 'ai',
          text: 'Un tazón típico de avena integral (50g) cocida con 1 plátano mediano y 20g de nueces contiene ~395 kcal, 12g de proteína, 58g de carbohidratos saludables y grasas insaturadas cardiosaludables. Es una fuente sostenida de energía matutina.',
          time: '08:41 AM',
          macros: { calorias: 395, proteina: 12, carbos: 58, grasas: 14 }
        }
      ]
    },
    {
      id: 'chat-4',
      titulo: 'Visión IA: Escaneo de Salmón a la Plancha con Espárragos',
      primeraSolicitud: 'Analiza esta foto de mi plato (Salmón a la plancha, espárragos trigueros y arroz integral).',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // Hace 3 días
      categoria: 'Visión IA',
      calorias: 520,
      icono: 'photo_camera',
      hasImage: true,
      mensajes: [
        {
          sender: 'user',
          text: 'Analiza esta foto de mi plato (Salmón a la plancha, espárragos trigueros y arroz integral).',
          time: '02:15 PM'
        },
        {
          sender: 'ai',
          text: 'Reconocimiento visual completado: He identificado salmón fresco sellado a la plancha, espárragos trigueros salteados y una porción de arroz integral con semillas de sésamo. Estimación nutricional: ~520 kcal, 38g proteína, 35g carbohidratos y 19g grasas saludables (Omega-3).',
          time: '02:16 PM',
          macros: { calorias: 520, proteina: 38, carbos: 35, grasas: 19 }
        }
      ]
    },
    {
      id: 'chat-5',
      titulo: 'Evaluación de Balance de Macronutrientes Diario',
      primeraSolicitud: '¿Cómo voy con mi distribución de macronutrientes hoy y qué me recomiendas ajustar?',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // Hace 4 días
      categoria: 'Balance Macros',
      calorias: 0,
      icono: 'monitoring',
      hasImage: false,
      mensajes: [
        {
          sender: 'user',
          text: '¿Cómo voy con mi distribución de macronutrientes hoy y qué me recomiendas ajustar?',
          time: '06:10 PM'
        },
        {
          sender: 'ai',
          text: 'Hoy llevas acumulado el 68% de tus proteínas objetivo (92g de 135g) y el 72% de tus carbohidratos. Para la cena te recomiendo priorizar fuentes magras como pechuga de pavo, claras de huevo o tofu junto con vegetales verdes.',
          time: '06:11 PM'
        }
      ]
    },
    {
      id: 'chat-6',
      titulo: 'Merienda Saludable Post-Entrenamiento',
      primeraSolicitud: 'Terminé de entrenar en el gimnasio, ¿qué merienda rápida de unas 200 kcal me recomiendas?',
      fechaCreacion: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // Hace 5 días
      categoria: 'Snack',
      calorias: 210,
      icono: 'fitness_center',
      hasImage: false,
      mensajes: [
        {
          sender: 'user',
          text: 'Terminé de entrenar en el gimnasio, ¿qué merienda rápida de unas 200 kcal me recomiendas?',
          time: '05:25 PM'
        },
        {
          sender: 'ai',
          text: 'Excelente momento para la síntesis de glucógeno y recuperación muscular. Te recomiendo un yogur griego natural desnatado (150g) con un puñado de arándanos y media cucharadita de semillas de chía (~210 kcal y 18g de proteína).',
          time: '05:26 PM',
          macros: { calorias: 210, proteina: 18, carbos: 22, grasas: 4 }
        }
      ]
    }
  ];

  // Store local
  const ChatHistoryStore = {
    getAll: function () {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CHATS));
          return [...DEFAULT_CHATS];
        }
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [...DEFAULT_CHATS];
      } catch (e) {
        console.warn('Error al leer historial de chats:', e);
        return [...DEFAULT_CHATS];
      }
    },
    saveAll: function (chats) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
        this.syncToServer(chats);
      } catch (e) {
        console.error('Error al guardar historial de chats:', e);
      }
    },
    syncToServer: async function (chats) {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        await fetch('/api/historial-chat/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_persona: idPersona, chats: chats })
        });
      } catch (e) {
        console.error('Error sincronizando historial al servidor:', e);
      }
    },
    syncFromServer: async function () {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        const res = await fetch(`/api/historial-chat/${idPersona}`);
        if (res.ok) {
          const dbChats = await res.json();
          // Solo sobrescribimos si hay chats del server, o si el server dice explícitamente 0 chats (pero evitamos borrar defaults en primer inicio si el usuario no tiene DB aún)
          // Wait, si vacían el historial, deben devolver array vacío, que es correcto
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbChats));
          window.dispatchEvent(new CustomEvent('dia_chat_history_updated'));
        }
      } catch (e) {
        console.error('Error obteniendo historial del servidor:', e);
      }
    },
    getById: function (id) {
      const list = this.getAll();
      return list.find((c) => c.id === id) || null;
    },
    remove: function (id) {
      const list = this.getAll();
      const filtered = list.filter((c) => c.id !== id);
      this.saveAll(filtered);
      return filtered;
    },
    clearAll: function () {
      this.saveAll([]);
      return [];
    },
    restoreDefaults: function () {
      this.saveAll(DEFAULT_CHATS);
      return [...DEFAULT_CHATS];
    }
  };

  // Helper para dar formato amigable a la fecha y hora en español
  function formatChatDateTime(isoString) {
    if (!isoString) return { relativo: 'Reciente', fechaCompleta: '', hora: '' };

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return { relativo: 'Reciente', fechaCompleta: '', hora: '' };

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    // Formato de hora: 12:32 PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hora = `${hours}:${minutes} ${ampm}`;

    // Nombres de meses en español
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const anio = date.getFullYear();
    const fechaCompleta = `${dia} ${mes} ${anio}`;

    let relativo = '';
    if (isToday) {
      relativo = `Hoy, ${hora}`;
    } else if (isYesterday) {
      relativo = `Ayer, ${hora}`;
    } else {
      relativo = `${dia} ${mes} ${anio} • ${hora}`;
    }

    return {
      relativo,
      fechaCompleta,
      hora
    };
  }

  // Sanitización de cadenas
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Estado activo de filtros
  let currentCategory = 'Todos';
  let currentSearchQuery = '';
  let activeChatToDelete = null;

  /**
   * Inicializador principal de la vista Historial
   */
  window.initHistorialView = async function () {
    // Sincronizar desde BD al iniciar
    if (localStorage.getItem('dia_id_persona')) {
      await ChatHistoryStore.syncFromServer();
    }
    
    const container = document.getElementById('historial-chats-grid');
    if (!container) return;

    const countBadge = document.getElementById('historial-count-badge');
    const searchInput = document.getElementById('historial-search');
    const btnClearSearch = document.getElementById('btn-clear-search-historial');
    const filterChips = document.querySelectorAll('.historial-category-chip');
    const btnClearAll = document.getElementById('btn-clear-all-history');
    const btnNewChat = document.getElementById('btn-new-chat-historial');

    // Modales
    const chatModal = document.getElementById('chat-detail-modal');
    const chatModalClose = document.getElementById('btn-close-chat-modal');
    const chatModalContinue = document.getElementById('btn-continue-chat-in-assistant');
    const confirmDeleteModal = document.getElementById('confirm-delete-chat-modal');
    const btnCancelDelete = document.getElementById('btn-cancel-delete-chat');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete-chat');

    // Renderizar lista con los filtros actuales
    function render() {
      const allChats = ChatHistoryStore.getAll();

      // Filtrado por categoría
      let filtered = allChats.filter((chat) => {
        if (currentCategory === 'Todos') return true;
        if (currentCategory === 'Hoy') {
          const d = new Date(chat.fechaCreacion);
          return d.toDateString() === new Date().toDateString();
        }
        if (currentCategory === 'Visión IA') {
          return chat.hasImage || chat.categoria === 'Visión IA';
        }
        return chat.categoria.toLowerCase() === currentCategory.toLowerCase();
      });

      // Filtrado por término de búsqueda (nombre de conversación o primera solicitud)
      if (currentSearchQuery.trim() !== '') {
        const q = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter((chat) => {
          const matchTitle = (chat.titulo || '').toLowerCase().includes(q);
          const matchRequest = (chat.primeraSolicitud || '').toLowerCase().includes(q);
          const matchCategory = (chat.categoria || '').toLowerCase().includes(q);
          return matchTitle || matchRequest || matchCategory;
        });
      }

      // Actualizar contador
      if (countBadge) {
        countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'chat' : 'chats'}`;
      }

      // Mostrar / ocultar botón de limpiar búsqueda
      if (btnClearSearch) {
        if (currentSearchQuery.trim() !== '') {
          btnClearSearch.classList.remove('hidden');
        } else {
          btnClearSearch.classList.add('hidden');
        }
      }

      // Si no hay elementos que coincidan
      if (filtered.length === 0) {
        const isSearchOrFilter = currentSearchQuery.trim() !== '' || currentCategory !== 'Todos';

        container.innerHTML = `
          <div class="col-span-full py-16 px-4 flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-xs">
            <div class="w-16 h-16 rounded-3xl bg-surface-container-low text-primary flex items-center justify-center mb-4 shadow-inner">
              <span class="material-symbols-outlined text-[34px]">${isSearchOrFilter ? 'search_off' : 'forum'}</span>
            </div>
            <h3 class="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-1">
              ${isSearchOrFilter ? 'No se encontraron conversaciones' : 'Tu historial de IA está vacío'}
            </h3>
            <p class="text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
              ${
                isSearchOrFilter
                  ? 'No hay consultas que coincidan con tus términos de búsqueda o filtros seleccionados.'
                  : 'Aún no has tenido conversaciones con DIA NutriBot. Pregúntale sobre alimentos o sube una foto de tu plato.'
              }
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              ${
                isSearchOrFilter
                  ? `<button id="btn-reset-filters" type="button" class="px-5 py-2.5 rounded-2xl bg-primary-container text-on-primary font-bold text-sm shadow-sm hover:brightness-105 active:scale-95 transition-all">Restablecer filtros</button>`
                  : `<button id="btn-seed-history" type="button" class="px-5 py-2.5 rounded-2xl bg-surface-container text-on-surface font-bold text-sm border border-surface-container-high hover:bg-surface-container-high active:scale-95 transition-all">Cargar ejemplos</button>
                     <button id="btn-start-first-chat" type="button" class="px-5 py-2.5 rounded-2xl bg-primary-container text-on-primary font-bold text-sm shadow-md shadow-primary-container/30 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2">
                       <span class="material-symbols-outlined text-[18px]">chat</span>
                       <span>Iniciar primer chat</span>
                     </button>`
              }
            </div>
          </div>
        `;

        // Listeners para botones de estado vacío
        const btnResetFilters = document.getElementById('btn-reset-filters');
        if (btnResetFilters) {
          btnResetFilters.addEventListener('click', () => {
            currentCategory = 'Todos';
            currentSearchQuery = '';
            if (searchInput) searchInput.value = '';
            filterChips.forEach((btn) => {
              const cat = btn.getAttribute('data-category');
              if (cat === 'Todos') {
                btn.className =
                  'historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-primary-container text-on-primary shadow-sm cursor-pointer whitespace-nowrap';
              } else {
                btn.className =
                  'historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap';
              }
            });
            render();
          });
        }

        const btnSeed = document.getElementById('btn-seed-history');
        if (btnSeed) {
          btnSeed.addEventListener('click', () => {
            ChatHistoryStore.restoreDefaults();
            render();
          });
        }

        const btnStartFirst = document.getElementById('btn-start-first-chat');
        if (btnStartFirst) {
          btnStartFirst.addEventListener('click', () => {
            if (typeof switchAppView === 'function') {
              switchAppView('asistente.html');
            } else {
              window.location.href = 'asistente.html';
            }
          });
        }

        return;
      }

      // Renderizar tarjetas con efecto transform al pasar el mouse
      container.innerHTML = filtered
        .map((chat) => {
          const dateInfo = formatChatDateTime(chat.fechaCreacion);
          const icon = chat.icono || (chat.hasImage ? 'photo_camera' : 'smart_toy');
          const msgCount = (chat.mensajes && chat.mensajes.length) || 1;

          return `
          <div 
            class="chat-history-card group relative p-5 bg-surface-container-lowest rounded-3xl border border-surface-container-high/70 shadow-sm hover:shadow-xl hover:border-primary-container/60 transform hover:scale-[1.025] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between" 
            data-chat-id="${escapeHtml(chat.id)}"
            role="button"
            tabindex="0"
            aria-label="Abrir conversación: ${escapeHtml(chat.titulo)}"
          >
            <!-- PARTE SUPERIOR DE LA TARJETA -->
            <div>
              <!-- FILA SUPERIOR: BADGE DE CATEGORÍA Y FECHA/HORA DE CREACIÓN -->
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/35 border border-primary-fixed text-primary text-xs font-bold shrink-0">
                  <span class="material-symbols-outlined text-[15px]">${icon}</span>
                  <span>${escapeHtml(chat.categoria || 'Consulta IA')}</span>
                </div>

                <!-- FECHA Y HORA EN QUE SE CREÓ EL CHAT -->
                <div class="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-on-surface-variant/80 bg-surface-container-low px-2.5 py-1 rounded-full border border-surface-container-high/60 shrink-0" title="Creado el ${escapeHtml(dateInfo.fechaCompleta)} a las ${escapeHtml(dateInfo.hora)}">
                  <span class="material-symbols-outlined text-[14px] text-primary">schedule</span>
                  <span>${escapeHtml(dateInfo.relativo)}</span>
                </div>
              </div>

              <!-- NOMBRE DE LA CONVERSACIÓN -->
              <h3 class="text-base sm:text-[17px] font-bold font-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                ${escapeHtml(chat.titulo)}
              </h3>

              <!-- BREVE DESCRIPCIÓN DE LA PRIMERA SOLICITUD QUE GENERÓ EL USUARIO -->
              <div class="mt-3 p-3 rounded-2xl bg-surface-container-low/60 border border-surface-container-high/50 group-hover:bg-primary-fixed/10 group-hover:border-primary-container/30 transition-all">
                <div class="flex items-center gap-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  <span class="material-symbols-outlined text-[14px] text-primary">person</span>
                  <span>Primera solicitud:</span>
                </div>
                <p class="text-xs sm:text-[13px] text-on-surface-variant font-medium line-clamp-3 leading-relaxed">
                  "${escapeHtml(chat.primeraSolicitud || 'Sin descripción disponible')}"
                </p>
              </div>
            </div>

            <!-- PARTE INFERIOR DE LA TARJETA (FOOTER CON CALORÍAS, CONTEO Y ACCIONES) -->
            <div class="mt-4 pt-3 border-t border-surface-container-high/50 flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                ${
                  chat.calorias > 0
                    ? `<span class="inline-flex items-center gap-1 text-xs font-bold text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-lg">
                        <span class="material-symbols-outlined text-[13px]">local_fire_department</span>
                        ${chat.calorias} kcal
                       </span>`
                    : `<span class="inline-flex items-center gap-1 text-xs font-medium text-on-surface-variant/70">
                        <span class="material-symbols-outlined text-[14px]">forum</span>
                        ${msgCount} ${msgCount === 1 ? 'msj' : 'mensajes'}
                       </span>`
                }
                ${
                  chat.hasImage
                    ? `<span class="inline-flex items-center gap-0.5 text-[11px] font-bold text-primary bg-primary-fixed/20 px-1.5 py-0.5 rounded-md" title="Incluye imagen de plato">
                        <span class="material-symbols-outlined text-[13px]">image</span> Foto
                       </span>`
                    : ''
                }
              </div>

              <!-- BOTONES DE ACCIÓN: VER CONVERSACIÓN Y ELIMINAR -->
              <div class="flex items-center gap-1.5">
                <button 
                  type="button" 
                  class="btn-delete-chat w-8 h-8 rounded-xl text-on-surface-variant/60 hover:text-error hover:bg-error/10 flex items-center justify-center transition-colors cursor-pointer" 
                  data-chat-id="${escapeHtml(chat.id)}"
                  aria-label="Eliminar conversación"
                  title="Eliminar este chat"
                >
                  <span class="material-symbols-outlined text-[17px] pointer-events-none">delete_outline</span>
                </button>

                <div class="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform bg-primary-fixed/30 group-hover:bg-primary group-hover:text-on-primary px-3 py-1.5 rounded-xl">
                  <span>Ver chat</span>
                  <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        `;
        })
        .join('');

      // Listener de clic en tarjeta para abrir el modal de detalles
      container.querySelectorAll('.chat-history-card').forEach((card) => {
        card.addEventListener('click', (e) => {
          // Si el clic vino del botón eliminar, no abrir el modal
          if (e.target.closest('.btn-delete-chat')) {
            return;
          }
          const chatId = card.getAttribute('data-chat-id');
          openChatDetailModal(chatId);
        });

        // Accesibilidad por teclado (Enter / Espacio)
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const chatId = card.getAttribute('data-chat-id');
            openChatDetailModal(chatId);
          }
        });
      });

      // Listener de botones de eliminación individual
      container.querySelectorAll('.btn-delete-chat').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const chatId = btn.getAttribute('data-chat-id');
          confirmDeleteSingleChat(chatId);
        });
      });
    }

    // Modal de Detalle de Conversación
    function openChatDetailModal(chatId) {
      const chat = ChatHistoryStore.getById(chatId);
      if (!chat) return;

      const modalTitle = document.getElementById('modal-chat-title');
      const modalMeta = document.getElementById('modal-chat-meta');
      const modalFirstRequest = document.getElementById('modal-chat-first-request');
      const modalMessagesContainer = document.getElementById('modal-chat-messages');

      const dateInfo = formatChatDateTime(chat.fechaCreacion);

      if (modalTitle) modalTitle.textContent = chat.titulo;
      if (modalMeta) {
        modalMeta.innerHTML = `
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed/35 text-primary text-xs font-bold">
              <span class="material-symbols-outlined text-[14px]">${chat.icono || 'smart_toy'}</span>
              ${escapeHtml(chat.categoria || 'Consulta IA')}
            </span>
            <span class="text-xs font-medium text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
              ${escapeHtml(dateInfo.fechaCompleta)} a las ${escapeHtml(dateInfo.hora)}
            </span>
            ${
              chat.calorias > 0
                ? `<span class="text-xs font-bold text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-md">~${chat.calorias} kcal</span>`
                : ''
            }
          </div>
        `;
      }

      if (modalFirstRequest) {
        modalFirstRequest.textContent = `"${chat.primeraSolicitud}"`;
      }

      if (modalMessagesContainer) {
        const msgs = chat.mensajes || [];
        modalMessagesContainer.innerHTML = msgs
          .map((m) => {
            const isUser = m.sender === 'user';
            if (isUser) {
              return `
              <div class="flex items-start justify-end gap-2.5">
                <div class="flex flex-col items-end max-w-xl">
                  <div class="p-3.5 sm:p-4 rounded-3xl rounded-tr-sm bg-primary-container text-on-primary shadow-sm text-sm">
                    <p class="leading-relaxed font-medium">${escapeHtml(m.text)}</p>
                  </div>
                  <span class="text-[10px] text-on-surface-variant/70 mt-1 mr-2">${escapeHtml(m.time || '')}</span>
                </div>
                <div class="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary border border-primary/20">
                  <span class="material-symbols-outlined text-[18px]">person</span>
                </div>
              </div>
            `;
            } else {
              let macrosHtml = '';
              if (m.macros) {
                macrosHtml = `
                <div class="grid grid-cols-4 gap-1.5 mt-2.5 pt-2 border-t border-surface-container-high/50 text-center">
                  <div class="bg-surface-container-low rounded-xl p-1.5">
                    <span class="text-[9px] uppercase font-bold text-on-surface-variant block">Calorías</span>
                    <span class="text-xs font-black text-on-surface">${m.macros.calorias} kcal</span>
                  </div>
                  <div class="bg-primary-fixed/25 rounded-xl p-1.5">
                    <span class="text-[9px] uppercase font-bold text-primary block">Proteína</span>
                    <span class="text-xs font-black text-primary">${m.macros.proteina}g</span>
                  </div>
                  <div class="bg-tertiary-fixed/30 rounded-xl p-1.5">
                    <span class="text-[9px] uppercase font-bold text-tertiary block">Carbos</span>
                    <span class="text-xs font-black text-tertiary">${m.macros.carbos}g</span>
                  </div>
                  <div class="bg-surface-container-low rounded-xl p-1.5">
                    <span class="text-[9px] uppercase font-bold text-on-surface-variant block">Grasas</span>
                    <span class="text-xs font-black text-on-surface">${m.macros.grasas}g</span>
                  </div>
                </div>
              `;
              }

              return `
              <div class="flex items-start gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <span class="material-symbols-outlined text-[18px]">smart_toy</span>
                </div>
                <div class="flex-1 max-w-xl">
                  <div class="p-3.5 sm:p-4 rounded-3xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-xs text-on-surface text-sm space-y-2">
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-bold text-primary">DIA NutriBot</span>
                      <span class="text-[10px] text-on-surface-variant/80">${escapeHtml(m.time || '')}</span>
                    </div>
                    <p class="leading-relaxed">${escapeHtml(m.text)}</p>
                    ${macrosHtml}
                  </div>
                </div>
              </div>
            `;
            }
          })
          .join('');
      }

      // Configurar botón para continuar este chat en asistente.html
      if (chatModalContinue) {
        chatModalContinue.onclick = function () {
          try {
            sessionStorage.setItem('dia_active_chat_id', chat.id);
          } catch (e) {}

          closeChatDetailModal();

          if (typeof switchAppView === 'function') {
            switchAppView('asistente.html');
          } else {
            window.location.href = 'asistente.html';
          }
        };
      }

      // Mostrar modal
      if (chatModal) {
        chatModal.classList.remove('hidden');
        chatModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeChatDetailModal() {
      if (chatModal) {
        chatModal.classList.add('hidden');
        chatModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    }

    if (chatModalClose) {
      chatModalClose.addEventListener('click', closeChatDetailModal);
    }

    if (chatModal) {
      chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) {
          closeChatDetailModal();
        }
      });
    }

    // Modal de confirmación para eliminar
    function confirmDeleteSingleChat(chatId) {
      const chat = ChatHistoryStore.getById(chatId);
      if (!chat) return;

      activeChatToDelete = { type: 'single', id: chatId, title: chat.titulo };
      const descEl = document.getElementById('confirm-delete-chat-text');
      if (descEl) {
        descEl.textContent = `¿Estás seguro de que deseas eliminar la conversación "${chat.titulo}"? Esta acción no se puede deshacer.`;
      }

      if (confirmDeleteModal) {
        confirmDeleteModal.classList.remove('hidden');
        confirmDeleteModal.classList.add('flex');
      }
    }

    function confirmClearAllChats() {
      activeChatToDelete = { type: 'all' };
      const descEl = document.getElementById('confirm-delete-chat-text');
      if (descEl) {
        descEl.textContent =
          '¿Estás seguro de que deseas vaciar todo el historial de conversaciones del Asistente IA? Se borrarán todos los chats guardados.';
      }

      if (confirmDeleteModal) {
        confirmDeleteModal.classList.remove('hidden');
        confirmDeleteModal.classList.add('flex');
      }
    }

    function closeDeleteModal() {
      activeChatToDelete = null;
      if (confirmDeleteModal) {
        confirmDeleteModal.classList.add('hidden');
        confirmDeleteModal.classList.remove('flex');
      }
    }

    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', closeDeleteModal);
    }

    if (confirmDeleteModal) {
      confirmDeleteModal.addEventListener('click', (e) => {
        if (e.target === confirmDeleteModal) closeDeleteModal();
      });
    }

    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', () => {
        if (!activeChatToDelete) return;

        if (activeChatToDelete.type === 'single') {
          ChatHistoryStore.remove(activeChatToDelete.id);
        } else if (activeChatToDelete.type === 'all') {
          ChatHistoryStore.clearAll();
        }

        closeDeleteModal();
        render();
      });
    }

    // Botón para vaciar todo el historial
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        const chats = ChatHistoryStore.getAll();
        if (chats.length === 0) return;
        confirmClearAllChats();
      });
    }

    // Botón para iniciar un nuevo chat en el Asistente
    if (btnNewChat) {
      btnNewChat.addEventListener('click', () => {
        try {
          sessionStorage.removeItem('dia_active_chat_id');
        } catch (e) {}

        if (typeof switchAppView === 'function') {
          switchAppView('asistente.html');
        } else {
          window.location.href = 'asistente.html';
        }
      });
    }

    // Filtros por categoría
    filterChips.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category') || 'Todos';

        filterChips.forEach((b) => {
          if (b === btn) {
            b.className =
              'historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-primary-container text-on-primary shadow-sm cursor-pointer whitespace-nowrap';
          } else {
            b.className =
              'historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap';
          }
        });

        render();
      });
    });

    // Búsqueda en tiempo real
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        render();
      });
    }

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        currentSearchQuery = '';
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        render();
      });
    }

    // Tecla ESC para cerrar modales
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeChatDetailModal();
        closeDeleteModal();
      }
    });

    window.addEventListener('dia_chat_history_updated', render);

    // Render inicial
    render();
  };

  // Inicializar automáticamente si el DOM ya está listo (para carga directa de historial.html)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initHistorialView);
  } else {
    setTimeout(window.initHistorialView, 50);
  }
})();
