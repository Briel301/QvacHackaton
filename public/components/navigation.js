/**
 * Componentes de Navegación Compartidos - DIA Dashboard
 * Compatible con HTML nativo (Web Components) y preparado para Node.js / Vite / Bundlers
 */

// Obtener la ruta o vista actual activa normalizada
function getCurrentPagePath() {
  if (window.__CURRENT_ACTIVE_PATH__) {
    return window.__CURRENT_ACTIVE_PATH__;
  }

  // Comprobar si hay hash en la URL (útil para file:// y enlaces directos)
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash && window.APP_VIEWS) {
    for (const [file, view] of Object.entries(window.APP_VIEWS)) {
      if (view.id === hash) {
        window.__CURRENT_ACTIVE_PATH__ = file;
        return file;
      }
    }
  }

  const rawPath = window.location.pathname.split('/').pop() || 'index.html';
  const current = rawPath === '' ? 'index.html' : rawPath;
  window.__CURRENT_ACTIVE_PATH__ = current;
  return current;
}

// Sincronizar el layout del documento según la vista activa:
// 'asistente' requiere layout fijo de 100vh con scroll únicamente en el historial de mensajes,
// tanto en PC como en móvil para permitir la ventana flotante inferior fija,
// mientras que las demás vistas (inicio, progreso, mis platos, historial) requieren scroll vertical normal.
function syncLayoutWithActivePage(pagePath) {
  if (typeof document === 'undefined') return;
  const current = pagePath || getCurrentPagePath();
  const isAsistente = current === 'asistente.html';
  const contentCol = document.querySelector('.flex-1.flex.flex-col.min-w-0');
  
  if (isAsistente) {
    document.body.classList.add('chat-view-active', 'h-screen', 'max-h-screen', 'overflow-hidden', 'lg:h-screen', 'lg:max-h-screen', 'lg:overflow-hidden');
    document.body.classList.remove('min-h-screen');
    if (contentCol) {
      contentCol.classList.add('h-screen', 'max-h-screen', 'overflow-hidden', 'lg:h-screen', 'lg:max-h-screen', 'lg:overflow-hidden');
      contentCol.classList.remove('min-h-screen');
    }
  } else {
    document.body.classList.remove('chat-view-active', 'h-screen', 'max-h-screen', 'overflow-hidden', 'lg:h-screen', 'lg:max-h-screen', 'lg:overflow-hidden');
    document.body.classList.add('min-h-screen');
    if (contentCol) {
      contentCol.classList.remove('h-screen', 'max-h-screen', 'overflow-hidden', 'lg:h-screen', 'lg:max-h-screen', 'lg:overflow-hidden');
      contentCol.classList.add('min-h-screen');
    }
  }
}

// Cambiar de vista de forma 100% instantánea (0ms de latencia, sin recargas, sin bloqueos)
function switchAppView(targetHref, e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const normalizedTarget = targetHref.split('/').pop() || 'index.html';
  const currentPath = getCurrentPagePath();

  // Si ya estamos en la vista solicitada: realizar acción si fue solicitada y hacer scroll al inicio
  if (normalizedTarget === currentPath) {
    if (sessionStorage.getItem('dia_auto_open_create_dish') === 'true') {
      sessionStorage.removeItem('dia_auto_open_create_dish');
      setTimeout(() => {
        if (typeof window.openCreatePlatoModal === 'function') {
          window.openCreatePlatoModal();
        } else {
          const btn = document.getElementById('btn-create-dish') || document.getElementById('btn-empty-create');
          if (btn) btn.click();
        }
      }, 50);
    }
    if (sessionStorage.getItem('dia_auto_open_camera') === 'true') {
      sessionStorage.removeItem('dia_auto_open_camera');
      const photoInput = document.getElementById('photo-file-input');
      if (photoInput) {
        try { photoInput.click(); } catch (err) {}
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Si tenemos el registro de vistas cargado en memoria, cambio instantáneo
  if (window.APP_VIEWS && window.APP_VIEWS[normalizedTarget]) {
    const view = window.APP_VIEWS[normalizedTarget];
    const mainEl = document.querySelector('main');

    if (mainEl) {
      if (view.mainClass) mainEl.className = view.mainClass;
      mainEl.innerHTML = view.html;
    }

    if (view.title) {
      document.title = view.title;
    }

    const headerTitle = document.querySelector('header .font-headline-md');
    if (headerTitle && view.headerTitle) {
      headerTitle.textContent = view.headerTitle;
    }

    // Actualizar estado activo
    window.__CURRENT_ACTIVE_PATH__ = normalizedTarget;

    // Sincronizar el layout para la vista seleccionada
    syncLayoutWithActivePage(normalizedTarget);

    // Actualizar barras de navegación
    document.querySelectorAll('app-sidebar').forEach((s) => s.render());
    document.querySelectorAll('app-bottom-nav').forEach((n) => n.render());
    document.querySelectorAll('app-topbar').forEach((t) => t.render());

    // Sincronizar configuraciones de unidades e idioma en la nueva vista
    if (window.DiaSettings) {
      try {
        window.DiaSettings.applyUnits();
        window.DiaSettings.applyLanguage(window.DiaSettings.getSettings().language);
      } catch (e) {}
    }

    // Sincronizar botones de campana y badges de recordatorios
    if (window.DiaRecordatorios) {
      try {
        window.DiaRecordatorios.bindBellButtons();
        window.DiaRecordatorios.updateBadges();
      } catch (e) {}
    }

    // Ejecutar inicializadores interactivos (ej. chat de IA o recordatorios)
    if (typeof view.init === 'function') {
      try {
        view.init();
      } catch (err) {
        console.warn('Error al inicializar la vista:', err);
      }
    }

    // Scroll inmediato arriba
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Actualizar historial del navegador
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      try {
        window.history.pushState({ path: normalizedTarget }, '', normalizedTarget);
      } catch (err) {}
    } else {
      window.location.hash = view.id;
    }
    return;
  }

  // Fallback por si la vista no estuviese en el registro
  window.location.href = targetHref;
}

class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.className = 'hidden lg:block w-64 xl:w-72 shrink-0';
    this.render();
  }

  render() {
    const currentPath = getCurrentPagePath();

    const navItems = [
      { href: 'index.html', icon: 'home', label: 'Inicio', id: 'inicio' },
      { href: 'mi_progreso.html', icon: 'trending_up', label: 'Mi progreso', id: 'progreso' },
      { href: 'mis_platos.html', icon: 'bookmark', label: 'Mis Platos', id: 'mis-platos' },
      { href: 'historial.html', icon: 'history', label: 'Historial', id: 'historial' },
      { href: 'recordatorios.html', icon: 'notifications_active', label: 'Recordatorios', id: 'recordatorios' },
    ];

    const isAsistente = currentPath === 'asistente.html';

    const linksHtml = navItems
      .map((item) => {
        const isActive = currentPath === item.href;
        if (isActive) {
          return `
          <a href="${item.href}" aria-current="page" class="nav-link flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-primary-container text-on-primary font-bold shadow-[0_4px_14px_rgba(16,185,129,0.35)] transition-all">
            <span class="material-symbols-outlined text-[22px] pointer-events-none">${item.icon}</span>
            <span class="font-title-sm text-[15px] pointer-events-none">${item.label}</span>
          </a>`;
        } else {
          return `
          <a href="${item.href}" class="nav-link flex items-center gap-3.5 px-4 py-3 rounded-2xl text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all font-semibold">
            <span class="material-symbols-outlined text-[22px] pointer-events-none">${item.icon}</span>
            <span class="font-title-sm text-[15px] pointer-events-none">${item.label}</span>
          </a>`;
        }
      })
      .join('\n');

    this.innerHTML = `
      <!-- BARRA LATERAL IZQUIERDA FIJA (Permanece fija en el viewport en PC lg+) -->
      <aside class="flex flex-col justify-between w-64 xl:w-72 bg-surface-container-lowest border-r border-surface-container-high/60 fixed top-0 left-0 bottom-0 h-screen z-40 p-6 shadow-[2px_0_16px_rgba(15,23,42,0.02)] overflow-y-auto">
        <div class="flex flex-col">
          <!-- Logo e Isotipo de Marca: DIA -->
          <a href="index.html" class="nav-link flex items-center gap-3 px-1 mb-8 hover:opacity-90 transition-opacity">
            <div class="w-10 h-10 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 pointer-events-none">
              <span class="material-symbols-outlined text-[24px]">eco</span>
            </div>
            <span class="text-2xl font-black tracking-tight text-on-surface font-headline-xl pointer-events-none">DIA</span>
          </a>

          <!-- Banner / Acceso Rápido Asistente IA en Sidebar -->
          <a id="sidebar-assistant-banner" href="asistente.html" class="nav-link sidebar-assistant-banner relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-primary-fixed-dim/30 via-surface-container-low to-surface-container border ${isAsistente ? 'border-primary-container ring-2 ring-primary-container/40 shadow-md' : 'border-primary-fixed/50'} mb-6 group cursor-pointer hover:border-primary-container/60 hover:shadow-md transition-all">
            <div class="flex items-center justify-between mb-2 pointer-events-none">
              <div class="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <span class="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">auto_awesome</span>
            </div>
            <h4 class="font-headline-md text-[15px] font-bold text-on-surface leading-snug pointer-events-none">Asistente IA</h4>
            <p class="font-body-sm text-[12px] text-on-surface-variant mt-0.5 pointer-events-none">Escanear plato con foto</p>
          </a>

          <!-- Menú de Navegación Lateral -->
          <nav class="flex flex-col gap-1.5" aria-label="Navegación principal">
            ${linksHtml}
          </nav>
        </div>

        <!-- Widget Inferior de Racha en Sidebar -->
        <div class="rounded-2xl bg-primary-fixed/25 border border-primary-fixed/50 p-3.5 flex items-center gap-3 select-none">
          <div class="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 pointer-events-none">
            <span class="material-symbols-outlined text-[20px]">local_fire_department</span>
          </div>
          <div class="flex flex-col pointer-events-none">
            <span class="font-label-md text-[12px] font-bold text-on-surface">Racha activa: 14 días</span>
            <span class="font-body-sm text-[11px] text-on-surface-variant">¡Excelente constancia!</span>
          </div>
        </div>
      </aside>
    `;

    // Vincular listener de clics instantáneos
    this.querySelectorAll('a.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href) {
          switchAppView(href, e);
        }
      });
    });
  }
}

class AppBottomNav extends HTMLElement {
  connectedCallback() {
    this.className = 'block lg:hidden';
    this.render();
  }

  render() {
    const currentPath = getCurrentPagePath();

    const navItems = [
      { href: 'index.html', icon: 'home', label: 'Inicio', path: 'inicio' },
      { href: 'mi_progreso.html', icon: 'trending_up', label: 'Mi progreso', path: 'progreso' },
      { href: 'mis_platos.html', icon: 'bookmark', label: 'Mis platos', path: 'mis-platos' },
      { href: 'historial.html', icon: 'history', label: 'Historial', path: 'historial' },
    ];

    const isAsistente = currentPath === 'asistente.html';

    const renderLink = (item) => {
      const isActive = currentPath === item.href;
      return `
        <a class="nav-link flex-1 flex flex-col items-center justify-center gap-space-2xs min-h-[44px] min-w-[44px] transition-colors ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary font-semibold'}" ${isActive ? 'aria-current="page"' : ''} data-path="${item.path}" href="${item.href}">
          <span class="material-symbols-outlined text-[24px] pointer-events-none">${item.icon}</span>
          <span class="font-label-sm text-label-sm pointer-events-none">${item.label}</span>
        </a>
      `;
    };

    this.innerHTML = `
      <!-- BARRA DE NAVEGACIÓN INFERIOR (Visible únicamente en Móviles < lg) -->
      <nav class="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl rounded-t-2xl shadow-[0_-4px_24px_rgba(15,23,42,0.06)] lg:hidden" data-active-classes="text-primary font-bold">
        <div class="relative flex items-center justify-between h-20 px-space-xs">
          ${renderLink(navItems[0])}
          ${renderLink(navItems[1])}

          <!-- Botón Central Asistente IA -->
          <div class="flex-1 flex flex-col items-center justify-center relative -top-4">
            <a aria-label="Asistente IA con escaneo de alimentos" class="nav-link w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_8px_24px_-2px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-transform ${isAsistente ? 'ring-4 ring-primary-container/40' : ''}" data-path="asistente-ia" href="asistente.html">
              <div class="relative flex items-center justify-center pointer-events-none">
                <span class="material-symbols-outlined text-[28px]">photo_camera</span>
                <span class="absolute -top-1.5 -right-1.5 text-on-primary flex items-center justify-center pointer-events-none">
                  <svg class="w-3.5 h-3.5 fill-current text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]" viewBox="0 0 24 24">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"></path>
                  </svg>
                </span>
              </div>
            </a>
          </div>

          ${renderLink(navItems[2])}
          ${renderLink(navItems[3])}
        </div>
      </nav>
    `;

    // Vincular listener de clics instantáneos para móvil
    this.querySelectorAll('a.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href) {
          switchAppView(href, e);
        }
      });
    });
  }
}

class AppTopbar extends HTMLElement {
  connectedCallback() {
    this.className = 'hidden lg:block sticky top-0 z-30 w-full';
    this.render();
  }

  render() {
    const currentPath = getCurrentPagePath();
    const isAsistente = currentPath === 'asistente.html';

    // Diccionario de nombres de vista para la barra superior en PC
    const viewTitles = {
      'index.html': 'Dashboard',
      'mi_progreso.html': 'Mi Progreso',
      'mis_platos.html': 'Mis Platos',
      'historial.html': 'Historial',
      'asistente.html': 'Asistente IA',
      'recordatorios.html': 'Recordatorios',
    };

    const title = this.getAttribute('title') || 
                  (window.APP_VIEWS && window.APP_VIEWS[currentPath] && window.APP_VIEWS[currentPath].headerTitle) || 
                  viewTitles[currentPath] || 
                  'Dashboard';

    if (isAsistente) {
      this.innerHTML = `
        <!-- HEADER SUPERIOR COMPARTIDO PARA ESCRITORIO (Fijo en scroll) -->
        <header class="flex items-center justify-between px-8 py-4 bg-surface/85 backdrop-blur-md border-b border-surface-container-high/40 w-full transition-all">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/25">
              <span class="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">DIA NutriBot IA</span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed/40 text-primary border border-primary-container/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span> En línea
                </span>
              </div>
              <span class="text-xs text-on-surface-variant font-medium">Modelo multimodal para reconocimiento de platos y asesoría nutricional</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button id="btn-clear-desktop" type="button" aria-label="Limpiar conversación" class="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm">
              <span class="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Nueva conversación</span>
            </button>

            <!-- Notificaciones -->
            <button aria-label="Notificaciones" class="relative w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span class="absolute top-2 right-2 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            
            <!-- Ajustes y Preferencias -->
            <button id="btn-open-settings-desktop-asistente" aria-label="Ajustes y preferencias" class="btn-settings w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px]">settings</span>
            </button>

            <!-- Perfil de usuario -->
            <div class="flex items-center gap-3 pl-3 ml-1 border-l border-surface-container-high/70">
              <div class="flex flex-col text-right">
                <span class="font-label-sm text-[11px] text-on-surface-variant app-user-greeting">¡Buenos días!</span>
                <span class="font-title-sm text-[14px] font-bold text-on-surface">[Nombre del Usuario]</span>
              </div>
              <div class="relative w-10 h-10 rounded-full overflow-hidden shadow-sm bg-surface-container shrink-0 ring-2 ring-primary/20" title="[Foto de perfil]">
                <img alt="[Foto de perfil de usuario]" class="w-full h-full object-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e2e8f0'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%2394a3b8'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24z' fill='%2394a3b8'/%3E%3C/svg%3E" />
              </div>
            </div>
          </div>
        </header>
      `;
    } else {
      this.innerHTML = `
        <!-- HEADER SUPERIOR COMPARTIDO PARA ESCRITORIO (Fijo en scroll) -->
        <header class="flex items-center justify-between px-8 py-4 bg-surface/85 backdrop-blur-md border-b border-surface-container-high/40 w-full transition-all">
          <div class="flex items-center gap-2">
            <span class="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">${title}</span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Notificaciones -->
            <button aria-label="Notificaciones" class="relative w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span class="absolute top-2 right-2 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            
            <!-- Ajustes y Preferencias -->
            <button id="btn-open-settings-desktop" aria-label="Ajustes y preferencias" class="btn-settings w-10 h-10 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px]">settings</span>
            </button>

            <!-- Perfil de usuario -->
            <div class="flex items-center gap-3 pl-3 ml-1 border-l border-surface-container-high/70">
              <div class="flex flex-col text-right">
                <span class="font-label-sm text-[11px] text-on-surface-variant">¡Buenos días!</span>
                <span class="font-title-sm text-[14px] font-bold text-on-surface">[Nombre del Usuario]</span>
              </div>
              <div class="relative w-10 h-10 rounded-full overflow-hidden shadow-sm bg-surface-container shrink-0 ring-2 ring-primary/20" title="[Foto de perfil]">
                <img alt="[Foto de perfil de usuario]" class="w-full h-full object-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e2e8f0'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%2394a3b8'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24z' fill='%2394a3b8'/%3E%3C/svg%3E" />
              </div>
            </div>
          </div>
        </header>
      `;
    }
  }
}

// Soporte para botones Atrás/Adelante y navegación por URL
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.path) {
      switchAppView(event.state.path);
    } else {
      const page = getCurrentPagePath();
      switchAppView(page);
    }
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && window.APP_VIEWS) {
      for (const [file, view] of Object.entries(window.APP_VIEWS)) {
        if (view.id === hash) {
          switchAppView(file);
          break;
        }
      }
    }
  });

  // Interceptar otros enlaces de la página y botones especiales de acción
  document.addEventListener('click', (e) => {
    // 1. Botón "Escanear con IA": ir inmediatamente a la vista del asistente y activar la opción de subir imagen
    const targetScan = e.target.closest('.btn-scan-ai-dashboard, [data-action="scan-ai"]');
    if (targetScan) {
      e.preventDefault();
      sessionStorage.setItem('dia_auto_open_camera', 'true');
      switchAppView('asistente.html', e);
      const photoInput = document.getElementById('photo-file-input');
      if (photoInput) {
        try {
          photoInput.click();
          sessionStorage.removeItem('dia_auto_open_camera');
        } catch (err) {}
      }
      return;
    }

    // 2. Botón "Registrar Comida" o "Registrar platillo": ir inmediatamente a la vista y al formulario para ingresar comida
    const targetCreateDish = e.target.closest('.btn-open-create-dish-dashboard, [data-action="create-dish"]');
    if (targetCreateDish) {
      e.preventDefault();
      sessionStorage.setItem('dia_auto_open_create_dish', 'true');
      switchAppView('mis_platos.html', e);
      setTimeout(() => {
        if (typeof window.openCreatePlatoModal === 'function') {
          window.openCreatePlatoModal();
        } else {
          const btn = document.getElementById('btn-create-dish') || document.getElementById('btn-empty-create');
          if (btn) btn.click();
        }
      }, 60);
      return;
    }

    const targetA = e.target.closest('a[href]');
    if (targetA && !targetA.classList.contains('nav-link')) {
      const href = targetA.getAttribute('href');
      if (href && (href === 'mi_progreso.html' || href === 'mis_platos.html' || href === 'historial.html' || href === 'asistente.html' || href === 'index.html' || href === 'recordatorios.html')) {
        switchAppView(href, e);
      }
    }
  });
}

// Ejecutar sincronización de layout en carga inicial
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => syncLayoutWithActivePage());
  } else {
    syncLayoutWithActivePage();
  }
}

// Registro nativo de los Custom Elements en el navegador
if (typeof window !== 'undefined' && 'customElements' in window) {
  if (!customElements.get('app-sidebar')) {
    customElements.define('app-sidebar', AppSidebar);
  }
  if (!customElements.get('app-bottom-nav')) {
    customElements.define('app-bottom-nav', AppBottomNav);
  }
  if (!customElements.get('app-topbar')) {
    customElements.define('app-topbar', AppTopbar);
  }
}

// Soporte para entornos modulares futuros con Node.js / Vite / Webpack
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppSidebar, AppBottomNav, AppTopbar, switchAppView };
}
