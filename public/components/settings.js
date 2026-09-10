/**
 * Módulo de Configuraciones - DIA Dashboard
 * Control de Modo Claro/Oscuro con switch de sol/luna verde claro,
 * cambio de unidades (kg/lb, g/oz, kcal/kJ), cambio de idioma (es/en)
 * y eliminación segura de historiales.
 */

(function () {
  'use strict';

  // Claves de almacenamiento
  const STORAGE_KEYS = {
    THEME: 'dia_theme',
    UNITS: 'dia_units',
    LANGUAGE: 'dia_language',
    MEALS: 'dia_mis_platos',
    CHAT_HISTORY: 'dia_chat_history',
    ACTIVE_CHAT: 'dia_active_chat_id',
    MEALS_CLEARED: 'dia_meals_cleared'
  };

  // Diccionario bilingüe para la interfaz
  const TRANSLATIONS = {
    es: {
      settingsTitle: 'Configuraciones de DIA',
      settingsDesc: 'Personaliza tu experiencia, unidades de medida y preferencias.',
      themeSection: 'Apariencia y Tema',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Oscuro',
      themeHint: 'Cambia entre interfaz diurna luminosa y modo nocturno relajante.',
      unitsSection: 'Unidades de Medida y Dimensiones',
      unitsDesc: 'Selecciona las unidades en las que se presentarán tus métricas.',
      weightLabel: 'Peso corporal',
      weightKg: 'Kilogramos (kg)',
      weightLb: 'Libras (lb)',
      portionLabel: 'Porciones de alimentos',
      portionG: 'Gramos (g)',
      portionOz: 'Onzas (oz)',
      energyLabel: 'Energía de comidas',
      energyKcal: 'Kilocalorías (kcal)',
      energyKj: 'Kilojulios (kJ)',
      langSection: 'Idioma de la Aplicación',
      langDesc: 'Selecciona el idioma principal de navegación e interfaz.',
      langEs: 'Español (ES)',
      langEn: 'English (EN)',
      dataSection: 'Gestión de Datos e Historiales',
      dataDesc: 'Gestiona o elimina de forma selectiva tus registros almacenados.',
      clearMealsBtn: 'Eliminar historial de comidas',
      clearMealsDesc: 'Borra todos tus platillos guardados y la bitácora del día.',
      clearChatBtn: 'Eliminar historial de chat IA',
      clearChatDesc: 'Borra todas las conversaciones y consultas con DIA NutriBot.',
      closeBtn: 'Cerrar',
      confirmClearMealsTitle: '¿Eliminar historial de comidas?',
      confirmClearMealsText: '¿Estás seguro de que deseas borrar todas las comidas registradas y platillos guardados? Esta acción es irreversible.',
      confirmClearChatTitle: '¿Eliminar historial del Asistente IA?',
      confirmClearChatText: '¿Estás seguro de que deseas eliminar todas las consultas y chats con DIA NutriBot? Esta acción no se puede deshacer.',
      confirmBtn: 'Sí, eliminar',
      cancelBtn: 'Cancelar',
      mealsClearedToast: 'Historial de comidas eliminado con éxito',
      chatClearedToast: 'Historial de chats con IA eliminado con éxito',
      settingsSavedToast: 'Configuración actualizada',
      navInicio: 'Inicio',
      navProgreso: 'Mi progreso',
      navPlatos: 'Mis Platos',
      navHistorial: 'Historial',
      greeting: '¡Buenos días!',
      remainingKcal: 'kcal de completar tu objetivo del día',
      remainingKj: 'kJ de completar tu objetivo del día',
      todayMeals: 'Mis comidas de hoy',
      noMealsToday: 'No tienes comidas registradas hoy. ¡Toca "Registrar Comida" para comenzar!',
      restoreMealsBtn: 'Restaurar comidas de ejemplo'
    },
    en: {
      settingsTitle: 'DIA Settings',
      settingsDesc: 'Customize your experience, measurement units, and preferences.',
      themeSection: 'Appearance & Theme',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
      themeHint: 'Switch between bright daytime UI and soothing dark mode.',
      unitsSection: 'Measurement Units & Dimensions',
      unitsDesc: 'Choose the units used to display your metrics across the app.',
      weightLabel: 'Body weight',
      weightKg: 'Kilograms (kg)',
      weightLb: 'Pounds (lb)',
      portionLabel: 'Food portions',
      portionG: 'Grams (g)',
      portionOz: 'Ounces (oz)',
      energyLabel: 'Food energy',
      energyKcal: 'Kilocalories (kcal)',
      energyKj: 'Kilojoules (kJ)',
      langSection: 'Application Language',
      langDesc: 'Select the primary language for navigation and UI.',
      langEs: 'Spanish (ES)',
      langEn: 'English (EN)',
      dataSection: 'Data & History Management',
      dataDesc: 'Selectively manage or wipe your stored records.',
      clearMealsBtn: 'Delete meal history',
      clearMealsDesc: 'Clears all your saved dishes and today’s food log.',
      clearChatBtn: 'Delete AI chat history',
      clearChatDesc: 'Clears all conversations and queries with DIA NutriBot.',
      closeBtn: 'Close',
      confirmClearMealsTitle: 'Delete meal history?',
      confirmClearMealsText: 'Are you sure you want to delete all registered meals and saved dishes? This action cannot be undone.',
      confirmClearChatTitle: 'Delete AI Assistant history?',
      confirmClearChatText: 'Are you sure you want to delete all chats and queries with DIA NutriBot? This action cannot be undone.',
      confirmBtn: 'Yes, delete',
      cancelBtn: 'Cancel',
      mealsClearedToast: 'Meal history successfully deleted',
      chatClearedToast: 'AI chat history successfully deleted',
      settingsSavedToast: 'Settings updated',
      navInicio: 'Home',
      navProgreso: 'My Progress',
      navPlatos: 'My Dishes',
      navHistorial: 'History',
      greeting: 'Good morning!',
      remainingKcal: 'kcal away from completing your daily goal',
      remainingKj: 'kJ away from completing your daily goal',
      todayMeals: "Today's meals",
      noMealsToday: 'No meals registered today. Tap "Log Meal" to get started!',
      restoreMealsBtn: 'Restore sample meals'
    }
  };

  // Estado reactivo en memoria
  const AppSettings = {
    theme: 'light',
    units: {
      weight: 'kg',
      portion: 'g',
      energy: 'kcal'
    },
    language: 'es',

    load: function () {
      try {
        // Tema
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme === 'dark' || savedTheme === 'light') {
          this.theme = savedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.theme = 'dark';
        } else {
          this.theme = 'light';
        }

        // Unidades
        const savedUnits = localStorage.getItem(STORAGE_KEYS.UNITS);
        if (savedUnits) {
          try {
            const parsed = JSON.parse(savedUnits);
            if (parsed && typeof parsed === 'object') {
              this.units.weight = parsed.weight === 'lb' ? 'lb' : 'kg';
              this.units.portion = parsed.portion === 'oz' ? 'oz' : 'g';
              this.units.energy = parsed.energy === 'kJ' ? 'kJ' : 'kcal';
            }
          } catch (e) {}
        }

        // Idioma
        const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        if (savedLang === 'en' || savedLang === 'es') {
          this.language = savedLang;
        } else {
          this.language = 'es';
        }
      } catch (e) {
        console.warn('Error al cargar configuraciones:', e);
      }
    },

    save: function () {
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, this.theme);
        localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(this.units));
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, this.language);
      } catch (e) {}
    }
  };

  // Utilidad Toast
  function showToast(message) {
    let toast = document.getElementById('dia-feedback-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dia-feedback-toast';
      toast.className = 'dia-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[18px]">check_circle</span>
      <span>${escapeHtml(message)}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toast.__timeout);
    toast.__timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Aplicar tema en el DOM
  function applyTheme(theme) {
    AppSettings.theme = theme;
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    // Actualizar switch UI si está renderizado
    const thumb = document.getElementById('dia-theme-switch-thumb');
    const icon = document.getElementById('dia-theme-switch-icon');
    const track = document.getElementById('dia-theme-switch-track');
    const label = document.getElementById('dia-theme-current-label');

    if (thumb && icon && track) {
      if (isDark) {
        thumb.style.transform = 'translateX(28px)';
        thumb.style.backgroundColor = '#4edea3';
        thumb.style.color = '#002b1c';
        icon.textContent = 'dark_mode';
        track.setAttribute('aria-checked', 'true');
        if (label) label.textContent = TRANSLATIONS[AppSettings.language].themeDark;
      } else {
        thumb.style.transform = 'translateX(0px)';
        thumb.style.backgroundColor = '#6ffbbe';
        thumb.style.color = '#00422b';
        icon.textContent = 'light_mode';
        track.setAttribute('aria-checked', 'false');
        if (label) label.textContent = TRANSLATIONS[AppSettings.language].themeLight;
      }
    }

    AppSettings.save();
  }

  // Aplicar unidades de medida
  function applyUnits(newUnits) {
    if (newUnits) {
      AppSettings.units = { ...AppSettings.units, ...newUnits };
    }
    AppSettings.save();
    updatePageUnits();
  }

  // Actualizar valores de unidades en el DOM
  function updatePageUnits() {
    const isKj = AppSettings.units.energy === 'kJ';
    const isOz = AppSettings.units.portion === 'oz';

    // 1. Calorías restantes del día (por defecto 460 kcal = ~1,925 kJ)
    const kcalGoalRemaining = document.querySelectorAll('.remaining-calories-val');
    kcalGoalRemaining.forEach((el) => {
      el.textContent = isKj ? '1,925' : '460';
    });

    const kcalGoalUnit = document.querySelectorAll('.remaining-calories-unit');
    kcalGoalUnit.forEach((el) => {
      el.textContent = isKj ? 'kJ' : 'kcal';
    });

    // 2. Calorías consumidas hoy (por defecto 1,640 kcal = ~6,862 kJ)
    const isCleared = localStorage.getItem(STORAGE_KEYS.MEALS_CLEARED) === 'true';
    const consumedVal = document.querySelectorAll('.consumed-calories-val');
    consumedVal.forEach((el) => {
      if (isCleared) {
        el.textContent = '0';
      } else {
        el.textContent = isKj ? '6,862' : '1,640';
      }
    });

    const consumedUnit = document.querySelectorAll('.consumed-calories-unit');
    consumedUnit.forEach((el) => {
      el.textContent = isKj ? 'kJ' : 'kcal';
    });

    // Meta total (2,100 kcal = ~8,786 kJ)
    const targetCaloriesTotal = document.querySelectorAll('.target-calories-total');
    targetCaloriesTotal.forEach((el) => {
      el.textContent = isKj ? '/ 8,786 kJ' : '/ 2,100 kcal';
    });

    // Macronutrientes (220g / 7.8oz, 135g / 4.8oz, 52g / 1.8oz)
    const carbVal = document.querySelector('.macro-carbs-val');
    if (carbVal) carbVal.innerHTML = isOz ? '7.8 oz <span class="text-on-surface-variant font-normal text-[11px]">(50%)</span>' : '220g <span class="text-on-surface-variant font-normal text-[11px]">(50%)</span>';

    const protVal = document.querySelector('.macro-prot-val');
    if (protVal) protVal.innerHTML = isOz ? '4.8 oz <span class="text-on-surface-variant font-normal text-[11px]">(30%)</span>' : '135g <span class="text-on-surface-variant font-normal text-[11px]">(30%)</span>';

    const fatVal = document.querySelector('.macro-fat-val');
    if (fatVal) fatVal.innerHTML = isOz ? '1.8 oz <span class="text-on-surface-variant font-normal text-[11px]">(20%)</span>' : '52g <span class="text-on-surface-variant font-normal text-[11px]">(20%)</span>';
  }

  // Aplicar idioma
  function applyLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') lang = 'es';
    AppSettings.language = lang;
    AppSettings.save();

    const t = TRANSLATIONS[lang];

    // Actualizar etiquetas en la barra lateral
    document.querySelectorAll('app-sidebar nav a, app-bottom-nav nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes('index')) {
        const span = link.querySelector('span:not(.material-symbols-outlined)');
        if (span) span.textContent = t.navInicio;
      } else if (href.includes('mi_progreso')) {
        const span = link.querySelector('span:not(.material-symbols-outlined)');
        if (span) span.textContent = t.navProgreso;
      } else if (href.includes('mis_platos')) {
        const span = link.querySelector('span:not(.material-symbols-outlined)');
        if (span) span.textContent = t.navPlatos;
      } else if (href.includes('historial')) {
        const span = link.querySelector('span:not(.material-symbols-outlined)');
        if (span) span.textContent = t.navHistorial;
      }
    });

    // Saludo
    document.querySelectorAll('.app-user-greeting').forEach((el) => {
      el.textContent = t.greeting;
    });

    // Textos del modal
    renderModalContent();
    updatePageUnits();
  }

  // Renderizar o inyectar el Modal de Configuraciones
  function injectSettingsModal() {
    if (document.getElementById('dia-settings-modal')) {
      renderModalContent();
      attachModalEvents();
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'dia-settings-modal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 overflow-y-auto';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'dia-settings-title');

    modal.innerHTML = `
      <!-- Backdrop difuso con animación -->
      <div id="dia-settings-backdrop" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"></div>

      <!-- Contenedor de la Tarjeta del Modal -->
      <div class="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-2xl border border-surface-container-high/80 z-10 flex flex-col max-h-[92vh] overflow-y-auto transition-transform duration-300 scale-95">
        
        <!-- HEADER DEL MODAL -->
        <div class="flex items-center justify-between pb-4 border-b border-surface-container-high/60">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/25">
              <span class="material-symbols-outlined text-[24px]">settings</span>
            </div>
            <div>
              <h2 id="dia-settings-title" class="font-headline-md text-lg sm:text-xl text-on-surface font-extrabold">Configuraciones</h2>
              <p id="dia-settings-subtitle" class="font-body-sm text-xs text-on-surface-variant">Preferencias generales y personalización</p>
            </div>
          </div>
          <button id="btn-close-settings-modal" type="button" aria-label="Cerrar modal" class="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <!-- CUERPO DE OPCIONES -->
        <div id="dia-settings-body" class="flex flex-col gap-6 py-5">
          <!-- Inyectado dinámicamente -->
        </div>

        <!-- PIE DE ACCIONES -->
        <div class="pt-4 border-t border-surface-container-high/60 flex items-center justify-end">
          <button id="btn-done-settings" type="button" class="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-secondary text-on-primary font-bold text-sm shadow-md shadow-primary-container/25 active:scale-95 transition-all cursor-pointer">
            Listo
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
    renderModalContent();
    attachModalEvents();
  }

  // Renderizar contenido dinámico del modal de acuerdo al idioma
  function renderModalContent() {
    const body = document.getElementById('dia-settings-body');
    if (!body) return;

    const t = TRANSLATIONS[AppSettings.language];
    const isDark = AppSettings.theme === 'dark';

    // Títulos de cabecera
    const titleEl = document.getElementById('dia-settings-title');
    const subTitleEl = document.getElementById('dia-settings-subtitle');
    const doneBtn = document.getElementById('btn-done-settings');
    if (titleEl) titleEl.textContent = t.settingsTitle;
    if (subTitleEl) subTitleEl.textContent = t.settingsDesc;
    if (doneBtn) doneBtn.textContent = t.closeBtn;

    body.innerHTML = `
      <!-- 1. OPCIÓN: MODO CLARO A MODO OSCURO (SWITCH CON CÍRCULO VERDE CLARO SOL/LUNA) -->
      <div class="p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/60 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">contrast</span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-title-sm text-sm font-bold text-on-surface">${t.themeSection}</span>
              <span id="dia-theme-current-label" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed/40 text-primary border border-primary-container/30 transition-all">
                ${isDark ? t.themeDark : t.themeLight}
              </span>
            </div>
            <span class="font-body-sm text-xs text-on-surface-variant mt-0.5">${t.themeHint}</span>
          </div>
        </div>

        <!-- Control Switch: Círculo verde claro con sol (izq) a luna (der) -->
        <button 
          id="dia-theme-switch-track" 
          type="button" 
          role="switch" 
          aria-checked="${isDark ? 'true' : 'false'}" 
          aria-label="${t.themeSection}" 
          class="theme-switch-track shrink-0"
        >
          <div id="dia-theme-switch-thumb" class="theme-switch-thumb" style="transform: ${isDark ? 'translateX(28px)' : 'translateX(0px)'}; background-color: ${isDark ? '#4edea3' : '#6ffbbe'}; color: ${isDark ? '#002b1c' : '#00422b'};">
            <span id="dia-theme-switch-icon" class="material-symbols-outlined theme-switch-icon">${isDark ? 'dark_mode' : 'light_mode'}</span>
          </div>
        </button>
      </div>

      <!-- 2. OPCIÓN: CAMBIO DE DIMENSIONES / UNIDADES (SELECTS DE PESO, PORCIÓN Y ENERGÍA) -->
      <div class="p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/60 flex flex-col gap-3.5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">straighten</span>
          </div>
          <div>
            <span class="font-title-sm text-sm font-bold text-on-surface block">${t.unitsSection}</span>
            <span class="font-body-sm text-xs text-on-surface-variant">${t.unitsDesc}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <!-- Select 1: Peso (kg / lb) -->
          <div class="flex flex-col gap-1.5">
            <label for="dia-select-unit-weight" class="font-label-md text-xs font-bold text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary">scale</span>
              ${t.weightLabel}
            </label>
            <select id="dia-select-unit-weight" class="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold text-xs focus:ring-2 focus:ring-primary-container focus:outline-none transition-all cursor-pointer">
              <option value="kg" ${AppSettings.units.weight === 'kg' ? 'selected' : ''}>${t.weightKg}</option>
              <option value="lb" ${AppSettings.units.weight === 'lb' ? 'selected' : ''}>${t.weightLb}</option>
            </select>
          </div>

          <!-- Select 2: Porciones (gramos / onzas) -->
          <div class="flex flex-col gap-1.5">
            <label for="dia-select-unit-portion" class="font-label-md text-xs font-bold text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary">nutrition</span>
              ${t.portionLabel}
            </label>
            <select id="dia-select-unit-portion" class="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold text-xs focus:ring-2 focus:ring-primary-container focus:outline-none transition-all cursor-pointer">
              <option value="g" ${AppSettings.units.portion === 'g' ? 'selected' : ''}>${t.portionG}</option>
              <option value="oz" ${AppSettings.units.portion === 'oz' ? 'selected' : ''}>${t.portionOz}</option>
            </select>
          </div>

          <!-- Select 3: Energía aportada (kcal / kJ) -->
          <div class="flex flex-col gap-1.5">
            <label for="dia-select-unit-energy" class="font-label-md text-xs font-bold text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary">bolt</span>
              ${t.energyLabel}
            </label>
            <select id="dia-select-unit-energy" class="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold text-xs focus:ring-2 focus:ring-primary-container focus:outline-none transition-all cursor-pointer">
              <option value="kcal" ${AppSettings.units.energy === 'kcal' ? 'selected' : ''}>${t.energyKcal}</option>
              <option value="kJ" ${AppSettings.units.energy === 'kJ' ? 'selected' : ''}>${t.energyKj}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. OPCIÓN: CAMBIO DE IDIOMA (ESPAÑOL / INGLÉS) -->
      <div class="p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/60 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">language</span>
          </div>
          <div>
            <span class="font-title-sm text-sm font-bold text-on-surface block">${t.langSection}</span>
            <span class="font-body-sm text-xs text-on-surface-variant">${t.langDesc}</span>
          </div>
        </div>

        <div class="w-40 shrink-0">
          <select id="dia-select-language" class="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-semibold text-xs focus:ring-2 focus:ring-primary-container focus:outline-none transition-all cursor-pointer">
            <option value="es" ${AppSettings.language === 'es' ? 'selected' : ''}>${t.langEs}</option>
            <option value="en" ${AppSettings.language === 'en' ? 'selected' : ''}>${t.langEn}</option>
          </select>
        </div>
      </div>

      <!-- 4 Y 5. OPCIONES: ELIMINAR HISTORIAL DE COMIDAS Y DE CHAT IA -->
      <div class="p-4 rounded-2xl bg-surface-container-low/70 border border-surface-container-high/60 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-error/15 text-error flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">auto_delete</span>
          </div>
          <div>
            <span class="font-title-sm text-sm font-bold text-on-surface block">${t.dataSection}</span>
            <span class="font-body-sm text-xs text-on-surface-variant">${t.dataDesc}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
          <!-- Botón 4: Eliminar historial de comidas -->
          <button 
            id="btn-delete-meals-history" 
            type="button" 
            class="flex-1 px-3.5 py-3 rounded-xl bg-surface-container-lowest hover:bg-error/10 text-on-surface hover:text-error border border-surface-container-high hover:border-error/40 flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-error">restaurant</span>
              <div class="text-left">
                <span class="block">${t.clearMealsBtn}</span>
                <span class="text-[10px] font-normal text-on-surface-variant block">${t.clearMealsDesc}</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-[18px] text-on-surface-variant/70">chevron_right</span>
          </button>

          <!-- Botón 5: Eliminar historial de chat IA -->
          <button 
            id="btn-delete-chat-history" 
            type="button" 
            class="flex-1 px-3.5 py-3 rounded-xl bg-surface-container-lowest hover:bg-error/10 text-on-surface hover:text-error border border-surface-container-high hover:border-error/40 flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-error">forum</span>
              <div class="text-left">
                <span class="block">${t.clearChatBtn}</span>
                <span class="text-[10px] font-normal text-on-surface-variant block">${t.clearChatDesc}</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-[18px] text-on-surface-variant/70">chevron_right</span>
          </button>
        </div>
      </div>
    `;

    bindFormControls();
  }

  // Vincular eventos de los controles internos del modal
  function bindFormControls() {
    // Switch de tema
    const switchTrack = document.getElementById('dia-theme-switch-track');
    if (switchTrack) {
      switchTrack.onclick = function () {
        const nextTheme = AppSettings.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(
          nextTheme === 'dark'
            ? (AppSettings.language === 'en' ? 'Dark mode enabled' : 'Modo oscuro activado')
            : (AppSettings.language === 'en' ? 'Light mode enabled' : 'Modo claro activado')
        );
      };
    }

    // Selects de unidades
    const selectWeight = document.getElementById('dia-select-unit-weight');
    if (selectWeight) {
      selectWeight.onchange = function () {
        applyUnits({ weight: selectWeight.value });
        showToast(TRANSLATIONS[AppSettings.language].settingsSavedToast);
      };
    }

    const selectPortion = document.getElementById('dia-select-unit-portion');
    if (selectPortion) {
      selectPortion.onchange = function () {
        applyUnits({ portion: selectPortion.value });
        showToast(TRANSLATIONS[AppSettings.language].settingsSavedToast);
      };
    }

    const selectEnergy = document.getElementById('dia-select-unit-energy');
    if (selectEnergy) {
      selectEnergy.onchange = function () {
        applyUnits({ energy: selectEnergy.value });
        showToast(TRANSLATIONS[AppSettings.language].settingsSavedToast);
      };
    }

    // Select de idioma
    const selectLang = document.getElementById('dia-select-language');
    if (selectLang) {
      selectLang.onchange = function () {
        applyLanguage(selectLang.value);
        showToast(selectLang.value === 'en' ? 'Language set to English' : 'Idioma configurado a Español');
      };
    }

    // Botón 4: Eliminar historial de comidas
    const btnClearMeals = document.getElementById('btn-delete-meals-history');
    if (btnClearMeals) {
      btnClearMeals.onclick = function () {
        openConfirmDialog({
          title: TRANSLATIONS[AppSettings.language].confirmClearMealsTitle,
          text: TRANSLATIONS[AppSettings.language].confirmClearMealsText,
          confirmLabel: TRANSLATIONS[AppSettings.language].confirmBtn,
          onConfirm: function () {
            // Vaciar comidas
            try {
              localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify([]));
              localStorage.setItem(STORAGE_KEYS.MEALS_CLEARED, 'true');
            } catch (e) {}

            // Refrescar tarjetas de comidas en index si existen
            const mealsList = document.querySelector('.flex.flex-col.gap-space-sm .space-y-3, #mis-comidas-container') || document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12 .flex.flex-col.gap-space-sm .flex.flex-col.gap-space-sm');
            if (mealsList) {
              const t = TRANSLATIONS[AppSettings.language];
              mealsList.innerHTML = `
                <div class="p-6 bg-surface-container-lowest rounded-2xl border border-dashed border-surface-container-high text-center flex flex-col items-center gap-2">
                  <div class="w-12 h-12 rounded-2xl bg-primary-container/15 text-primary flex items-center justify-center">
                    <span class="material-symbols-outlined text-[24px]">restaurant</span>
                  </div>
                  <p class="text-xs text-on-surface-variant max-w-sm">${t.noMealsToday}</p>
                  <button id="btn-restore-sample-meals" type="button" class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-primary-container/10 transition-colors">
                    ${t.restoreMealsBtn}
                  </button>
                </div>
              `;
              const btnRestore = document.getElementById('btn-restore-sample-meals');
              if (btnRestore) {
                btnRestore.onclick = function () {
                  localStorage.removeItem(STORAGE_KEYS.MEALS_CLEARED);
                  localStorage.removeItem(STORAGE_KEYS.MEALS);
                  if (typeof switchAppView === 'function') {
                    switchAppView('index.html');
                  } else {
                    window.location.reload();
                  }
                };
              }
            }

            updatePageUnits();
            showToast(TRANSLATIONS[AppSettings.language].mealsClearedToast);
          }
        });
      };
    }

    // Botón 5: Eliminar historial del chat de IA
    const btnClearChat = document.getElementById('btn-delete-chat-history');
    if (btnClearChat) {
      btnClearChat.onclick = function () {
        openConfirmDialog({
          title: TRANSLATIONS[AppSettings.language].confirmClearChatTitle,
          text: TRANSLATIONS[AppSettings.language].confirmClearChatText,
          confirmLabel: TRANSLATIONS[AppSettings.language].confirmBtn,
          onConfirm: function () {
            try {
              localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([]));
              sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_CHAT);
            } catch (e) {}

            // Si estamos en la página de historial, refrescar la lista
            if (window.DIA_CHAT_HISTORY_MODULE && typeof window.DIA_CHAT_HISTORY_MODULE.refresh === 'function') {
              window.DIA_CHAT_HISTORY_MODULE.refresh();
            }

            showToast(TRANSLATIONS[AppSettings.language].chatClearedToast);
          }
        });
      };
    }
  }

  // Modal de confirmación destructiva
  function openConfirmDialog({ title, text, confirmLabel, onConfirm }) {
    let dialog = document.getElementById('dia-confirm-action-modal');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'dia-confirm-action-modal';
      dialog.className = 'fixed inset-0 z-60 hidden items-center justify-center p-4';
      dialog.innerHTML = `
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"></div>
        <div class="relative w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high/80 z-10 flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center mb-3">
            <span class="material-symbols-outlined text-[26px]">warning</span>
          </div>
          <h3 id="dia-confirm-modal-title" class="font-headline-md text-base font-bold text-on-surface"></h3>
          <p id="dia-confirm-modal-text" class="text-xs text-on-surface-variant mt-1.5 mb-4 leading-relaxed"></p>
          <div class="flex items-center gap-2.5 w-full">
            <button id="dia-btn-cancel-confirm" type="button" class="flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs transition-all cursor-pointer">
              Cancelar
            </button>
            <button id="dia-btn-accept-confirm" type="button" class="flex-1 py-2.5 rounded-xl bg-error text-on-error font-bold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer">
              Eliminar
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(dialog);
    }

    const titleEl = document.getElementById('dia-confirm-modal-title');
    const textEl = document.getElementById('dia-confirm-modal-text');
    const btnCancel = document.getElementById('dia-btn-cancel-confirm');
    const btnAccept = document.getElementById('dia-btn-accept-confirm');

    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;
    if (btnCancel) btnCancel.textContent = TRANSLATIONS[AppSettings.language].cancelBtn;
    if (btnAccept) btnAccept.textContent = confirmLabel || TRANSLATIONS[AppSettings.language].confirmBtn;

    const closeDialog = () => {
      dialog.classList.add('hidden');
      dialog.classList.remove('flex');
    };

    btnCancel.onclick = closeDialog;
    btnAccept.onclick = () => {
      closeDialog();
      if (typeof onConfirm === 'function') onConfirm();
    };

    dialog.classList.remove('hidden');
    dialog.classList.add('flex');
  }

  // Función para cerrar el modal de configuraciones
  function closeSettingsModal() {
    const modal = document.getElementById('dia-settings-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    document.body.style.overflow = '';
  }

  // Vincular apertura y cierre del modal
  function attachModalEvents() {
    const backdrop = document.getElementById('dia-settings-backdrop');
    const closeBtn = document.getElementById('btn-close-settings-modal');
    const doneBtn = document.getElementById('btn-done-settings');

    if (closeBtn) closeBtn.onclick = closeSettingsModal;
    if (doneBtn) doneBtn.onclick = closeSettingsModal;
    if (backdrop) backdrop.onclick = closeSettingsModal;
  }

  // Función pública para abrir el modal
  function openSettingsModal() {
    injectSettingsModal();
    const modal = document.getElementById('dia-settings-modal');
    if (modal) {
      renderModalContent();
      attachModalEvents();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  // Escuchar clics globales para abrir o cerrar el modal (garantiza funcionamiento sin importar renderizado previo)
  document.addEventListener('click', (e) => {
    // Abrir modal con botón de ajustes / engranaje
    const openBtn = e.target.closest(
      '#btn-open-settings-mobile, #btn-open-settings-desktop, [aria-label="Ajustes y preferencias"], .btn-settings'
    );
    if (openBtn) {
      e.preventDefault();
      openSettingsModal();
      return;
    }

    // Cerrar modal al hacer clic en 'X', botón 'Listo/Cerrar', o en el fondo oscuro (backdrop)
    const closeTrigger = e.target.closest(
      '#btn-close-settings-modal, #btn-done-settings, #dia-settings-backdrop, [data-close-settings]'
    );
    if (closeTrigger) {
      e.preventDefault();
      closeSettingsModal();
    }
  });

  // Cerrar con la tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('dia-settings-modal');
      if (modal && !modal.classList.contains('hidden')) {
        closeSettingsModal();
      }
    }
  });

  // Inicialización inmediata al cargar
  AppSettings.load();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyTheme(AppSettings.theme);
      applyUnits();
      applyLanguage(AppSettings.language);
    });
  } else {
    applyTheme(AppSettings.theme);
    applyUnits();
    applyLanguage(AppSettings.language);
  }

  // Exportar a window para uso en componentes y vistas
  window.DiaSettings = {
    open: openSettingsModal,
    applyTheme,
    applyUnits,
    applyLanguage,
    getSettings: () => ({ ...AppSettings })
  };
})();
