/**
 * Módulo de Recordatorios de Comidas - DIA Dashboard
 * Gestión de recordatorios para Desayuno, Almuerzo, Cena y Refacción.
 * Soporte para notificaciones nativas de escritorio (PC), anticipación (15m, 30m, 1h),
 * y popover interactivo en la campana superior para PC y Móvil.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'dia_recordatorios';
  const NOTIF_PERM_KEY = 'dia_notif_requested';
  const LAST_TRIGGERED_KEY = 'dia_reminders_last_triggered';

  // Configuración de tipos de comida
  const TIPOS_COMIDA = {
    Desayuno: {
      titulo: 'Desayuno',
      icono: 'wb_twilight',
      colorBg: 'bg-amber-500/10',
      colorText: 'text-amber-600',
      colorBorder: 'border-amber-500/30',
      sugerencia: '¡Empieza tu día con energía balanceada y monitorea tu glucosa matutina!',
      colorBadge: 'bg-amber-100 text-amber-800'
    },
    Almuerzo: {
      titulo: 'Almuerzo',
      icono: 'sunny',
      colorBg: 'bg-emerald-500/10',
      colorText: 'text-emerald-600',
      colorBorder: 'border-emerald-500/30',
      sugerencia: 'Momento de tu comida principal. Recuerda acompañar con porción de vegetales y agua.',
      colorBadge: 'bg-emerald-100 text-emerald-800'
    },
    Cena: {
      titulo: 'Cena',
      icono: 'bedtime',
      colorBg: 'bg-indigo-500/10',
      colorText: 'text-indigo-600',
      colorBorder: 'border-indigo-500/30',
      sugerencia: 'Cena ligera para evitar picos nocturnos de glucosa y favorecer un descanso reparador.',
      colorBadge: 'bg-indigo-100 text-indigo-800'
    },
    Refacción: {
      titulo: 'Refacción',
      icono: 'apple',
      colorBg: 'bg-rose-500/10',
      colorText: 'text-rose-600',
      colorBorder: 'border-rose-500/30',
      sugerencia: 'Snack saludable: un puñado de frutos secos o proteína magra para mantener niveles estables.',
      colorBadge: 'bg-rose-100 text-rose-800'
    }
  };

  const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const DIAS_ABREV = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // ==========================================
  // STORE DE RECORDATORIOS
  // ==========================================
  const RecordatoriosStore = {
    getAll: function () {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          return [];
        }
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filtrar y eliminar recordatorios de ejemplo mock iniciales si aún persisten
          const cleaned = parsed.filter(r => !r.id || !r.id.startsWith('rec-init-'));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
        return [];
      } catch (e) {
        console.warn('[RecordatoriosStore] Error al leer localStorage:', e);
        return [];
      }
    },

    saveAll: function (list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        this.notifyChange();
        this.syncToServer(list);
      } catch (e) {
        console.error('[RecordatoriosStore] Error al guardar:', e);
      }
    },

    syncToServer: async function (list) {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        await fetch('/api/recordatorios/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_persona: idPersona, recordatorios: list })
        });
      } catch (e) {
        console.error('Error syncing reminders to server:', e);
      }
    },

    syncFromServer: async function () {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        const res = await fetch(`/api/recordatorios/${idPersona}`);
        if (res.ok) {
          const dbList = await res.json();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbList));
          this.notifyChange();
        }
      } catch (e) {
        console.error('Error fetching reminders from server:', e);
      }
    },

    getRecent: function (count = 3) {
      const list = this.getAll();
      return list.slice(0, count);
    },

    getById: function (id) {
      return this.getAll().find((r) => r.id === id) || null;
    },

    add: function (recordatorio) {
      const list = this.getAll();
      const nuevo = {
        id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        titulo: recordatorio.titulo || 'Almuerzo',
        hora: recordatorio.hora || '12:00',
        dias: Array.isArray(recordatorio.dias) && recordatorio.dias.length > 0 ? recordatorio.dias : [...DIAS_SEMANA],
        anticipacion: Number(recordatorio.anticipacion) || 0,
        activo: recordatorio.activo !== false,
        nota: recordatorio.nota || '',
        creadoEn: new Date().toISOString()
      };
      list.unshift(nuevo);
      this.saveAll(list);
      return nuevo;
    },

    update: function (id, data) {
      const list = this.getAll();
      const idx = list.findIndex((r) => r.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data, actualizadoEn: new Date().toISOString() };
        this.saveAll(list);
        return list[idx];
      }
      return null;
    },

    toggle: function (id) {
      const list = this.getAll();
      const item = list.find((r) => r.id === id);
      if (item) {
        item.activo = !item.activo;
        this.saveAll(list);
        return item.activo;
      }
      return false;
    },

    delete: function (id) {
      const list = this.getAll().filter((r) => r.id !== id);
      this.saveAll(list);
    },

    notifyChange: function () {
      try {
        window.dispatchEvent(new CustomEvent('dia_recordatorios_updated'));
        DiaRecordatorios.updateBadges();
      } catch (e) {}
    }
  };

  // ==========================================
  // SONIDO SINTETIZADO (Web Audio API)
  // ==========================================
  function playReminderChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0, ctx.currentTime + start);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Melodía suave de 3 notas tipo campana (Mi - Sol - Do)
      playTone(659.25, 0.0, 0.4);
      playTone(783.99, 0.15, 0.4);
      playTone(1046.5, 0.3, 0.6);
    } catch (e) {
      // Ignorar restricciones de autoplay si no hubo interacción previa
    }
  }

  // ==========================================
  // MOTOR DE NOTIFICACIONES WEB EN PC
  // ==========================================
  const NotificationEngine = {
    isSupported: function () {
      return typeof window !== 'undefined' && 'Notification' in window;
    },

    getPermission: function () {
      if (!this.isSupported()) return 'unsupported';
      return Notification.permission; // 'default', 'granted', 'denied'
    },

    requestPermission: async function () {
      if (!this.isSupported()) {
        DiaRecordatorios.showToast('Tu navegador actual no admite notificaciones de escritorio.', 'warning');
        return 'unsupported';
      }
      try {
        localStorage.setItem(NOTIF_PERM_KEY, 'true');
        const perm = await Notification.requestPermission();
        DiaRecordatorios.updatePermissionUI();
        if (perm === 'granted') {
          DiaRecordatorios.showToast('¡Notificaciones de escritorio en PC habilitadas correctamente! 🔔', 'success');
        } else if (perm === 'denied') {
          DiaRecordatorios.showToast('Notificaciones bloqueadas en los ajustes del navegador.', 'warning');
        }
        return perm;
      } catch (e) {
        console.error('Error al solicitar permisos de notificación:', e);
        return 'denied';
      }
    },

    sendBrowserNotification: function (title, body, tag = 'dia-meal') {
      // Notificación nativa en PC
      if (this.isSupported() && Notification.permission === 'granted') {
        try {
          const notif = new Notification(title, {
            body: body,
            icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="46" fill="%2310b981"/%3E%3Cpath d="M50 20v60M20 50h60" stroke="%23ffffff" stroke-width="12" stroke-linecap="round"/%3E%3C/svg%3E',
            tag: tag,
            silent: false
          });

          notif.onclick = function () {
            window.focus();
            if (typeof window.switchAppView === 'function') {
              window.switchAppView('recordatorios.html');
            }
            this.close();
          };
        } catch (e) {
          console.warn('[NotificationEngine] Error al emitir notificación del navegador:', e);
        }
      }

      // Sonido y banner toast en pantalla
      playReminderChime();
      DiaRecordatorios.showToast(`${title}: ${body}`, 'reminder');
    },

    testNotification: async function () {
      const perm = this.getPermission();
      if (perm === 'default') {
        const res = await this.requestPermission();
        if (res !== 'granted') return;
      } else if (perm === 'denied') {
        DiaRecordatorios.showToast('Las notificaciones están bloqueadas en tu navegador. Habilítalas en el candado de la barra de direcciones.', 'warning');
        return;
      }

      this.sendBrowserNotification(
        '🔔 Prueba de Recordatorio - DIA',
        '¡Las notificaciones en PC funcionan perfectamente! Recibirás avisos para tu Desayuno, Almuerzo, Cena y Refacción.',
        'test-alert'
      );
    }
  };

  // ==========================================
  // ESCÁNER EN SEGUNDO PLANO (CADA 30s)
  // ==========================================
  let scanInterval = null;

  function startReminderScanner() {
    if (scanInterval) clearInterval(scanInterval);

    const checkNow = () => {
      const now = new Date();
      const currentDayName = DIAS_SEMANA[now.getDay()]; // ej. "Lunes"
      const currentMinutesFromMidnight = now.getHours() * 60 + now.getMinutes();
      const todayDateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      let lastTriggeredMap = {};
      try {
        lastTriggeredMap = JSON.parse(localStorage.getItem(LAST_TRIGGERED_KEY) || '{}');
      } catch (e) {}

      const list = RecordatoriosStore.getAll();

      list.forEach((rec) => {
        if (!rec.activo) return;

        // Verificar si aplica hoy
        if (Array.isArray(rec.dias) && !rec.dias.includes(currentDayName)) {
          return;
        }

        const [rHour, rMinute] = (rec.hora || '00:00').split(':').map(Number);
        const reminderMinutes = rHour * 60 + rMinute;
        const anticipacion = Number(rec.anticipacion) || 0;
        const targetAlertMinutes = reminderMinutes - anticipacion;
        const configComida = TIPOS_COMIDA[rec.titulo] || TIPOS_COMIDA.Almuerzo;

        // 1. Alerta con anticipación previa (si anticipacion > 0)
        if (anticipacion > 0 && currentMinutesFromMidnight === targetAlertMinutes) {
          const triggerKey = `${rec.id}_${todayDateKey}_anticipo_${currentMinutesFromMidnight}`;
          if (!lastTriggeredMap[triggerKey]) {
            lastTriggeredMap[triggerKey] = true;
            try {
              localStorage.setItem(LAST_TRIGGERED_KEY, JSON.stringify(lastTriggeredMap));
            } catch (e) {}

            const tituloNotif = `⏰ En ${anticipacion} min: ${rec.titulo}`;
            const cuerpoNotif = rec.nota 
              ? `Aviso (${anticipacion} min antes): ${rec.nota}` 
              : `En ${anticipacion} minutos será tu tiempo de ${rec.titulo}. ¡Prepara tus alimentos y agua!`;

            NotificationEngine.sendBrowserNotification(tituloNotif, cuerpoNotif, `meal-${rec.id}-anticipo`);
          }
        }

        // 2. Alerta llegando a la hora exacta indicada
        if (currentMinutesFromMidnight === reminderMinutes) {
          const triggerKey = `${rec.id}_${todayDateKey}_exacta_${currentMinutesFromMidnight}`;
          if (!lastTriggeredMap[triggerKey]) {
            lastTriggeredMap[triggerKey] = true;
            try {
              localStorage.setItem(LAST_TRIGGERED_KEY, JSON.stringify(lastTriggeredMap));
            } catch (e) {}

            const tituloNotif = `🍽️ ¡Es hora de tu ${rec.titulo}!`;
            const cuerpoNotif = rec.nota 
              ? `Hora de comer: ${rec.nota}` 
              : `${configComida.sugerencia}`;

            NotificationEngine.sendBrowserNotification(tituloNotif, cuerpoNotif, `meal-${rec.id}-exacta`);
          }
        }
      });
    };

    scanInterval = setInterval(checkNow, 30000);
    // Chequeo inicial suave tras 3 segundos
    setTimeout(checkNow, 3000);
  }

  // ==========================================
  // VENTANA FLOTANTE (DROPDOWN DE NOTIFICACIONES)
  // PC Y MÓVIL
  // ==========================================
  function createOrGetDropdownElement() {
    let dropdown = document.getElementById('dia-reminders-dropdown');
    if (dropdown) return dropdown;

    dropdown = document.createElement('div');
    dropdown.id = 'dia-reminders-dropdown';
    dropdown.className = 'fixed z-50 hidden flex-col w-[340px] sm:w-[380px] max-w-[calc(100vw-24px)] bg-surface-container-lowest rounded-3xl shadow-[0_16px_40px_rgba(15,23,42,0.18)] border border-surface-container-high/80 overflow-hidden animate-message transition-all';
    dropdown.innerHTML = `
      <!-- Cabecera del popover -->
      <div class="px-5 py-4 border-b border-surface-container-high/60 bg-surface-container-low/40 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">notifications_active</span>
          </div>
          <div>
            <h4 class="font-bold text-sm text-on-surface">Recordatorios de Comidas</h4>
            <p class="text-[11px] text-on-surface-variant">Próximos avisos programados</p>
          </div>
        </div>
        <button id="btn-close-reminders-dropdown" type="button" aria-label="Cerrar" class="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <!-- Lista de los últimos 3 recordatorios -->
      <div id="dropdown-reminders-list" class="p-3 max-h-64 overflow-y-auto space-y-2">
        <!-- Render dinámico -->
      </div>

      <!-- Botones de Acción Solicitados -->
      <div class="p-3.5 bg-surface-container-low/30 border-t border-surface-container-high/60 flex flex-col gap-2">
        <!-- Botón 1: Agregar nuevo recordatorio (abre vista y modal) -->
        <button id="btn-dropdown-add-reminder" type="button" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">add_alarm</span>
          <span>Agregar nuevo recordatorio</span>
        </button>

        <!-- Botón 2: Mis recordatorios (abajo del de crear) -->
        <button id="btn-dropdown-view-all" type="button" class="w-full py-2 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs flex items-center justify-center gap-2 border border-surface-container-high transition-all cursor-pointer">
          <span class="material-symbols-outlined text-[16px] text-primary">format_list_bulleted</span>
          <span>Mis recordatorios</span>
        </button>
      </div>
    `;

    document.body.appendChild(dropdown);

    // Eventos internos del dropdown
    const btnClose = dropdown.querySelector('#btn-close-reminders-dropdown');
    if (btnClose) {
      btnClose.addEventListener('click', () => DiaRecordatorios.closeDropdown());
    }

    const btnAdd = dropdown.querySelector('#btn-dropdown-add-reminder');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        DiaRecordatorios.closeDropdown();
        DiaRecordatorios.openCreateModal();
      });
    }

    const btnViewAll = dropdown.querySelector('#btn-dropdown-view-all');
    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        DiaRecordatorios.closeDropdown();
        if (typeof window.switchAppView === 'function') {
          window.switchAppView('recordatorios.html');
        } else {
          window.location.href = 'recordatorios.html';
        }
      });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
        DiaRecordatorios.closeDropdown();
      }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (dropdown.classList.contains('hidden')) return;
      const isClickInside = dropdown.contains(e.target);
      const isClickOnTrigger = e.target.closest('button[aria-label="Notificaciones"]') || 
                               e.target.closest('#btn-open-reminders-mobile') || 
                               e.target.closest('#btn-open-reminders-desktop');
      if (!isClickInside && !isClickOnTrigger) {
        DiaRecordatorios.closeDropdown();
      }
    });

    return dropdown;
  }

  function renderDropdownItems() {
    const listEl = document.getElementById('dropdown-reminders-list');
    if (!listEl) return;

    const recent = RecordatoriosStore.getRecent(3);

    if (recent.length === 0) {
      listEl.innerHTML = `
        <div class="py-6 px-4 text-center">
          <div class="w-11 h-11 mx-auto mb-2 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span class="material-symbols-outlined text-[24px]">alarm_off</span>
          </div>
          <p class="text-xs font-bold text-on-surface">No tienes recordatorios</p>
          <p class="text-[11px] text-on-surface-variant mt-0.5">Toca el botón abajo para programar tu primera comida.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = recent
      .map((item) => {
        const config = TIPOS_COMIDA[item.titulo] || TIPOS_COMIDA.Almuerzo;
        const horaFormatted = formatTime(item.hora);
        const diasResumen = formatDaysSummary(item.dias);
        const anticipacionTxt = item.anticipacion > 0 ? `${item.anticipacion}m antes` : 'Hora exacta';

        return `
          <div class="p-3 rounded-2xl ${item.activo ? 'bg-surface-container-low/60' : 'bg-surface-container/40 opacity-70'} border border-surface-container-high/60 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl ${config.colorBg} ${config.colorText} flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">${config.icono}</span>
              </div>
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-xs font-extrabold text-on-surface truncate">${item.titulo}</span>
                  ${item.activo ? '<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>' : '<span class="text-[10px] text-on-surface-variant">(Pausado)</span>'}
                </div>
                <div class="flex items-center gap-1.5 text-[11px] text-on-surface-variant mt-0.5">
                  <span class="font-bold text-on-surface">${horaFormatted}</span>
                  <span>•</span>
                  <span class="truncate">${diasResumen}</span>
                </div>
              </div>
            </div>

            <div class="text-right shrink-0">
              <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-container text-on-surface-variant">
                ${anticipacionTxt}
              </span>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // ==========================================
  // FORMATOS Y UTILIDADES
  // ==========================================
  function is24HourFormat() {
    if (window.DiaSettings && typeof window.DiaSettings.getTimeFormat === 'function') {
      return window.DiaSettings.getTimeFormat() === '24h';
    }
    return localStorage.getItem('dia_time_format') === '24h';
  }

  function formatTime(timeStr) {
    if (!timeStr) return '--:--';
    const [h, m] = timeStr.split(':').map(Number);
    const minutesStr = String(m).padStart(2, '0');

    if (is24HourFormat()) {
      const hours24 = String(h).padStart(2, '0');
      return `${hours24}:${minutesStr} hrs`;
    }

    const period = h >= 12 ? 'PM' : 'AM';
    const hours12 = h % 12 || 12;
    return `${hours12}:${minutesStr} ${period}`;
  }

  function formatDaysSummary(dias) {
    if (!Array.isArray(dias) || dias.length === 0) return 'Sin días';
    if (dias.length === 7) return 'Todos los días';
    if (dias.length === 5 && !dias.includes('Sábado') && !dias.includes('Domingo')) return 'Lun - Vie';
    if (dias.length === 2 && dias.includes('Sábado') && dias.includes('Domingo')) return 'Fines de semana';
    return dias.map((d) => d.substring(0, 3)).join(', ');
  }

  // ==========================================
  // OBJETO GLOBAL DIA RECORDATORIOS
  // ==========================================
  const DiaRecordatorios = {
    store: RecordatoriosStore,
    engine: NotificationEngine,
    tiposComida: TIPOS_COMIDA,
    diasSemana: DIAS_SEMANA,
    formatTime: formatTime,
    is24HourFormat: is24HourFormat,

    init: function () {
      createOrGetDropdownElement();
      this.bindBellButtons();
      this.updateBadges();
      startReminderScanner();

      // Reaccionar ante cambios en el formato de hora (12h / 24h)
      window.addEventListener('dia_time_format_changed', () => {
        renderDropdownItems();
        DiaRecordatorios.updateModalTimeFormatHint();
      });
    },

    updateModalTimeFormatHint: function () {
      const is24h = is24HourFormat();
      const badge = document.getElementById('rec-hora-format-badge');
      const preview = document.getElementById('rec-hora-preview');
      const inputHora = document.getElementById('rec-hora');

      if (badge) {
        if (is24h) {
          badge.textContent = 'Formato activo: 24 Horas (Militar)';
          badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200';
        } else {
          badge.textContent = 'Formato activo: 12 Horas (AM/PM)';
          badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary-fixed/40 text-primary border border-primary-container/30';
        }
      }

      if (preview && inputHora) {
        const val = inputHora.value || '12:30';
        preview.innerHTML = `Vista previa: <strong class="text-on-surface font-extrabold">${formatTime(val)}</strong>`;
      }
    },

    bindBellButtons: function () {
      // Buscar todos los botones de campana (en headers de móvil y escritorio)
      const bells = document.querySelectorAll(
        'button[aria-label="Notificaciones"], #btn-open-reminders-mobile, #btn-open-reminders-desktop, .btn-reminder-bell'
      );

      bells.forEach((btn) => {
        if (btn.__reminderBound) return;
        btn.__reminderBound = true;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          DiaRecordatorios.toggleDropdown(btn);
        });
      });
    },

    toggleDropdown: function (anchorEl) {
      const dropdown = createOrGetDropdownElement();
      if (!dropdown.classList.contains('hidden')) {
        this.closeDropdown();
        return;
      }

      renderDropdownItems();
      dropdown.classList.remove('hidden');

      // Posicionamiento inteligente según el elemento de anclaje
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          dropdown.style.top = `${rect.bottom + 8}px`;
          dropdown.style.right = '12px';
          dropdown.style.left = 'auto';
        } else {
          dropdown.style.top = `${rect.bottom + 10}px`;
          dropdown.style.right = `${Math.max(12, window.innerWidth - rect.right - 8)}px`;
          dropdown.style.left = 'auto';
        }
      } else {
        dropdown.style.top = '70px';
        dropdown.style.right = '16px';
      }
    },

    closeDropdown: function () {
      const dropdown = document.getElementById('dia-reminders-dropdown');
      if (dropdown) {
        dropdown.classList.add('hidden');
      }
    },

    updateBadges: function () {
      const activeCount = RecordatoriosStore.getAll().filter((r) => r.activo).length;
      const bells = document.querySelectorAll('button[aria-label="Notificaciones"] span.rounded-full');
      bells.forEach((badge) => {
        if (activeCount > 0) {
          badge.style.display = 'block';
        } else {
          badge.style.display = 'none';
        }
      });
    },

    updatePermissionUI: function () {
      const statusBadge = document.getElementById('pc-notif-status-badge');
      const btnRequest = document.getElementById('btn-request-pc-perm');
      const perm = NotificationEngine.getPermission();

      if (statusBadge) {
        if (perm === 'granted') {
          statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5';
          statusBadge.innerHTML = '<span class="material-symbols-outlined text-[15px]">verified</span> Notificaciones PC Habilitadas';
          if (btnRequest) btnRequest.classList.add('hidden');
        } else if (perm === 'denied') {
          statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5';
          statusBadge.innerHTML = '<span class="material-symbols-outlined text-[15px]">block</span> Permiso Bloqueado en Navegador';
          if (btnRequest) {
            btnRequest.classList.remove('hidden');
            btnRequest.textContent = 'Cómo desbloquear';
          }
        } else {
          statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5';
          statusBadge.innerHTML = '<span class="material-symbols-outlined text-[15px]">notifications_paused</span> Permiso Pendiente';
          if (btnRequest) {
            btnRequest.classList.remove('hidden');
            btnRequest.textContent = 'Activar notificaciones';
          }
        }
      }
    },

    showToast: function (message, type = 'info') {
      const toast = document.createElement('div');
      const isReminder = type === 'reminder';
      const isSuccess = type === 'success';
      const isWarning = type === 'warning';

      let bgClass = 'bg-surface-container-lowest text-on-surface border-surface-container-high shadow-2xl';
      let icon = 'notifications';
      let iconColor = 'text-primary';

      if (isReminder) {
        bgClass = 'bg-primary-container text-on-primary shadow-emerald-500/25 shadow-2xl border-emerald-400';
        icon = 'restaurant';
        iconColor = 'text-on-primary';
      } else if (isSuccess) {
        bgClass = 'bg-surface-container-lowest text-on-surface border-emerald-400 shadow-xl';
        icon = 'check_circle';
        iconColor = 'text-emerald-600';
      } else if (isWarning) {
        bgClass = 'bg-surface-container-lowest text-on-surface border-amber-400 shadow-xl';
        icon = 'warning';
        iconColor = 'text-amber-600';
      }

      toast.className = `fixed bottom-6 right-6 z-[120] max-w-sm w-[calc(100vw-32px)] sm:w-auto p-4 rounded-2xl border flex items-start gap-3 transform transition-all duration-300 translate-y-8 opacity-0 pointer-events-auto ${bgClass}`;
      toast.innerHTML = `
        <span class="material-symbols-outlined text-[24px] shrink-0 mt-0.5 ${iconColor}">${icon}</span>
        <div class="flex-1 text-xs sm:text-sm font-medium leading-snug">
          ${message}
        </div>
        <button class="text-xs opacity-75 hover:opacity-100 transition-opacity p-1 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      `;

      document.body.appendChild(toast);

      const closeBtn = toast.querySelector('button');
      closeBtn.addEventListener('click', () => {
        toast.classList.add('opacity-0', 'translate-y-8');
        setTimeout(() => toast.remove(), 300);
      });

      // Animar entrada
      requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'translate-y-8');
      });

      // Auto ocultar
      setTimeout(() => {
        if (document.body.contains(toast)) {
          toast.classList.add('opacity-0', 'translate-y-8');
          setTimeout(() => toast.remove(), 300);
        }
      }, isReminder ? 8000 : 4500);
    },

    openCreateModal: function (recordatorioParaEditar = null) {
      const currentPath = typeof window.getCurrentPagePath === 'function' ? window.getCurrentPagePath() : window.location.pathname;
      const isRecordatoriosPage = currentPath.includes('recordatorios.html') || window.__CURRENT_ACTIVE_PATH__ === 'recordatorios.html';

      const showModal = () => {
        const modal = document.getElementById('modal-crear-recordatorio');
        if (!modal) return;

        const form = document.getElementById('form-recordatorio');
        const modalTitle = document.getElementById('modal-recordatorio-titulo');
        const inputId = document.getElementById('rec-id');
        const inputHora = document.getElementById('rec-hora');
        const inputAnticipacion = document.getElementById('rec-anticipacion');
        const inputNota = document.getElementById('rec-nota');

        if (form) form.reset();

        if (recordatorioParaEditar) {
          if (modalTitle) modalTitle.textContent = 'Editar Recordatorio';
          if (inputId) inputId.value = recordatorioParaEditar.id;
          if (inputHora) inputHora.value = recordatorioParaEditar.hora;
          if (inputAnticipacion) inputAnticipacion.value = recordatorioParaEditar.anticipacion;
          if (inputNota) inputNota.value = recordatorioParaEditar.nota || '';

          // Seleccionar tipo de comida
          const radioComida = form.querySelector(`input[name="rec-titulo"][value="${recordatorioParaEditar.titulo}"]`);
          if (radioComida) {
            radioComida.checked = true;
            radioComida.dispatchEvent(new Event('change'));
          }

          // Seleccionar días
          const dias = recordatorioParaEditar.dias || [];
          form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => {
            chk.checked = dias.includes(chk.value);
            chk.dispatchEvent(new Event('change'));
          });
        } else {
          if (modalTitle) modalTitle.textContent = 'Nuevo Recordatorio de Comida';
          if (inputId) inputId.value = '';
          if (inputHora) inputHora.value = '12:30';
          if (inputAnticipacion) inputAnticipacion.value = '15';
          if (inputNota) inputNota.value = '';

          // Por defecto Almuerzo
          const radioAlmuerzo = form.querySelector('input[name="rec-titulo"][value="Almuerzo"]');
          if (radioAlmuerzo) {
            radioAlmuerzo.checked = true;
            radioAlmuerzo.dispatchEvent(new Event('change'));
          }

          // Por defecto todos los días
          form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => {
            chk.checked = true;
            chk.dispatchEvent(new Event('change'));
          });
        }

        // Sincronizar indicador de formato de hora y vista previa
        DiaRecordatorios.updateModalTimeFormatHint();

        if (inputHora && !inputHora.__formatListenerAttached) {
          inputHora.__formatListenerAttached = true;
          inputHora.addEventListener('input', () => DiaRecordatorios.updateModalTimeFormatHint());
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };

      if (!isRecordatoriosPage) {
        if (typeof window.switchAppView === 'function') {
          window.switchAppView('recordatorios.html');
          setTimeout(showModal, 150);
        } else {
          window.location.href = 'recordatorios.html#nuevo';
        }
      } else {
        showModal();
      }
    },

    closeCreateModal: function () {
      const modal = document.getElementById('modal-crear-recordatorio');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }
  };

  // Exponer globalmente
  window.DiaRecordatorios = DiaRecordatorios;

  // Inicializar al cargar el DOM
  if (typeof document !== 'undefined') {
    const startInit = () => {
      DiaRecordatorios.init();
      // Solo sincronizar del servidor si ya hay un ID de persona (ha completado el onboarding)
      if (localStorage.getItem('dia_id_persona')) {
        DiaRecordatorios.store.syncFromServer();
      }
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startInit);
    } else {
      startInit();
    }
  }
})();
