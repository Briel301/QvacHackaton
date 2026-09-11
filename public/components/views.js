/**
 * Registro y Renderizador de Vistas Compartidas - DIA Dashboard
 * Permite cambiar entre vistas de manera 100% instantánea sin recargas de página
 * ni congelamientos en cualquier entorno (incluyendo file:// y servidores locales).
 */

window.APP_VIEWS = {
  'index.html': {
    id: 'inicio',
    title: 'DIA - Dashboard Nutricional',
    headerTitle: 'Dashboard Nutricional',
    mainClass: 'flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-7xl w-full mx-auto pb-28 lg:pb-12',
    html: `
        <!-- HEADER MÓVIL (Visible únicamente en móvil < lg) -->
        <div class="lg:hidden flex items-center justify-between pt-safe pb-5">
          <div id="user-profile-header-area-mobile" class="flex items-center gap-space-sm cursor-pointer">
            <div class="relative w-12 h-12 rounded-full overflow-hidden shadow-sm bg-surface-container ring-2 ring-primary/25 hover:ring-primary/50 transition-all flex items-center justify-center text-primary" title="Editar Perfil">
              <span class="material-symbols-outlined text-[24px]">person</span>
            </div>
            <div class="flex flex-col">
              <span id="mobile-saludo" class="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                ¡Buenos días!
                <span class="inline-block animate-pulse text-xs">✨</span>
              </span>
              <span class="font-headline-md text-headline-md text-on-surface" id="header-nombre-movil">Usuario</span>
            </div>
          </div>
          <!-- Acciones Rápidas Móviles -->
          <div class="flex items-center gap-space-xs">
            <button aria-label="Notificaciones" class="relative w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[22px]">notifications</span>
              <span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            <button id="btn-open-settings-mobile" aria-label="Ajustes y preferencias" class="btn-settings w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer" title="Configuraciones">
              <span class="material-symbols-outlined text-[22px]">settings</span>
            </button>
          </div>
        </div>

        <!-- ENCABEZADO ESCRITORIO -->
        <div class="hidden lg:flex items-center justify-between mb-6">
          <div class="flex flex-col">
            <h1 class="font-headline-xl text-2xl xl:text-3xl text-on-surface flex items-center gap-2">
              <span id="desktop-saludo">¡Buenos días</span>, <span id="header-nombre-desktop">Usuario</span>! <span class="text-xl">✨</span>
            </h1>
            <p class="font-body-md text-on-surface-variant mt-1" id="header-goal-status">
              Estás a <span class="header-remaining-kcal font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed/40">2,100 kcal</span> de completar tu objetivo del día
            </p>
          </div>
          
          <!-- Acciones Principales -->
          <div class="flex items-center gap-3">
            <a href="asistente.html" class="btn-scan-ai-dashboard px-4 py-2.5 rounded-full bg-surface-container-lowest border border-primary-container/30 text-on-surface hover:bg-surface-container-low font-headline-md text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-primary text-[20px]">photo_camera</span>
              <span class="text-primary font-bold">Escanear con IA</span>
              <span class="material-symbols-outlined text-on-surface-variant text-[16px]">chevron_right</span>
            </a>
            <button type="button" class="btn-open-create-dish-dashboard px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-sm flex items-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px]">add</span>
              <span>Registrar Comida</span>
            </button>
          </div>
        </div>

        <!-- CUADRÍCULA -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          <!-- COLUMNA PRINCIPAL -->
          <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            <!-- 1. Tarjeta de Racha Diaria & Progreso -->
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-fixed via-primary-container to-secondary p-card-padding shadow-[0_12px_28px_-6px_rgba(16,185,129,0.3)]">
              <div class="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/20 blur-2xl pointer-events-none"></div>
              <div class="relative z-10 flex items-center justify-between">
                <div class="flex flex-col gap-space-2xs max-w-[62%] sm:max-w-[70%]">
                  <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/30 backdrop-blur-md w-fit">
                    <span class="material-symbols-outlined text-on-primary-container text-[16px]">bolt</span>
                    <span class="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-bold">Racha diaria</span>
                  </div>
                  <h2 class="font-headline-lg text-lg sm:text-xl lg:text-2xl text-on-primary-container pt-1 font-extrabold">
                    Tu progreso diario activo 🔥
                  </h2>
                  <p class="font-body-sm text-body-sm text-on-primary-container/85 leading-relaxed" id="streak-meta-pct-text">
                    ¡Completaste el <strong id="streak-meta-pct">0%</strong> de tu meta calórica de hoy! Registra tus comidas para monitorear tu consistencia.
                  </p>
                </div>
                <div class="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                  <svg class="w-full h-full -rotate-90" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" fill="none" r="36" stroke="rgba(255,255,255,0.3)" stroke-width="7"></circle>
                    <circle id="streak-circle-progress" cx="44" cy="44" fill="none" r="36" stroke="#ffffff" stroke-dasharray="226" stroke-dashoffset="226" stroke-linecap="round" stroke-width="7" class="transition-all duration-700"></circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span id="streak-meta-badge" class="text-[10px] font-bold text-on-primary uppercase tracking-tight">0% META</span>
                    <div class="flex items-center justify-center gap-0.5 mt-0.5">
                      <span class="font-numeric-hero text-xl sm:text-2xl text-on-primary font-black leading-none">1</span>
                      <span class="material-symbols-outlined text-[16px] text-tertiary-fixed fill-current" style="font-variation-settings: &quot;FILL&quot; 1">local_fire_department</span>
                    </div>
                    <span class="font-label-sm text-[10px] text-on-primary/90 font-semibold uppercase tracking-wide">día</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Sección Calendario Semanal -->
            <div class="flex flex-col gap-space-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-on-surface-variant text-[20px]">calendar_today</span>
                  <h3 class="font-headline-md text-headline-md text-on-surface">Septiembre 2026</h3>
                  <span class="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">Semana 37</span>
                </div>
                <div class="flex items-center gap-space-xs">
                  <span class="hidden sm:inline font-title-sm text-body-sm text-on-surface-variant font-medium">06 – 12 Sep</span>
                  <div class="flex items-center gap-1 bg-surface-container-low rounded-full p-0.5">
                    <button aria-label="Semana anterior" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all">
                      <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button aria-label="Semana siguiente" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all">
                      <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Tira Semanal de Días -->
              <div class="bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30">
                <div class="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant font-semibold">DOM</span>
                    <span class="font-title-sm text-title-sm text-on-surface font-bold">06</span>
                    <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>
                  </button>
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant font-semibold">LUN</span>
                    <span class="font-title-sm text-title-sm text-on-surface font-bold">07</span>
                    <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>
                  </button>
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant font-semibold">MAR</span>
                    <span class="font-title-sm text-title-sm text-on-surface font-bold">08</span>
                    <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: &quot;FILL&quot; 1">check_circle</span>
                  </button>
                  <button class="flex flex-col items-center gap-1 py-2 rounded-2xl bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(16,185,129,0.4)] scale-105">
                    <span class="text-[10px] font-black uppercase tracking-wider text-on-primary/90">● HOY</span>
                    <span class="font-title-sm text-title-sm text-on-primary font-extrabold">09</span>
                    <span class="text-[11px] font-bold text-on-primary/95">1,640 kcal</span>
                  </button>
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant">JUE</span>
                    <span class="font-title-sm text-title-sm text-on-surface-variant">10</span>
                    <span class="w-2 h-2 rounded-full bg-surface-container"></span>
                  </button>
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant">VIE</span>
                    <span class="font-title-sm text-title-sm text-on-surface-variant">11</span>
                    <span class="w-2 h-2 rounded-full bg-surface-container"></span>
                  </button>
                  <button class="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <span class="font-label-md text-label-md text-on-surface-variant">SÁB</span>
                    <span class="font-title-sm text-title-sm text-on-surface-variant">12</span>
                    <span class="w-2 h-2 rounded-full bg-surface-container"></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col gap-space-sm mt-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span class="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">Bitácora Diaria</span>
                  <h3 class="font-headline-md text-headline-md text-on-surface">Mis comidas de hoy</h3>
                </div>
                <div class="flex flex-col sm:items-end">
                  <div class="flex items-center gap-1">
                    <span class="consumed-calories-val font-headline-md text-lg text-primary font-black">0</span>
                    <span class="target-calories-total font-body-md text-on-surface-variant font-medium">/ 2,100 kcal</span>
                  </div>
                  <div class="w-36 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1">
                    <div id="consumed-calories-bar" class="h-full bg-primary-container rounded-full transition-all duration-500" style="width: 0%;"></div>
                  </div>
                </div>
              </div>
              
              <!-- Lista Dinámica de Comidas del Día -->
              <div id="mis-comidas-container" class="flex flex-col gap-space-sm">
                <!-- Se renderiza en tiempo real según los platillos ingresados hoy -->
              </div>

              <!-- Botón Destacado CTA -->
              <div id="bottom-registrar-comida-container" class="pt-2 hidden">
                <button type="button" class="btn-open-create-dish-dashboard w-full py-3.5 px-card-padding rounded-2xl bg-primary-container hover:bg-secondary text-on-primary font-headline-md text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] active:scale-[0.99] transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-[22px]">add_circle</span>
                  <span>Registrar Comida</span>
                </button>
              </div>
            </div>
          </div>

          <!-- COLUMNA LATERAL DERECHA -->
          <div class="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            <!-- PANEL 1: "Mi progreso" -->
            <div class="bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-surface-container-high/50 pb-3">
                <div class="flex flex-col">
                  <span class="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">Balance Nutricional</span>
                  <h3 class="font-headline-md text-lg text-on-surface font-bold">Mi progreso</h3>
                </div>
                <a href="mi_progreso.html" aria-label="Ir a Mi progreso" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container/15 text-primary hover:bg-primary-container hover:text-on-primary transition-all font-title-sm text-xs font-bold group">
                  <span class="material-symbols-outlined text-[18px]">trending_up</span>
                  <span>Mi progreso</span>
                  <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                </a>
              </div>

              <!-- Calorías Restantes -->
              <div class="flex items-center justify-between bg-surface-container-low/70 rounded-xl p-3">
                <div class="flex flex-col">
                  <span class="font-body-sm text-xs text-on-surface-variant">Calorías restantes</span>
                  <div class="flex items-baseline gap-1 mt-0.5">
                    <span class="remaining-calories-val font-headline-lg text-2xl font-black text-primary">2,100</span>
                    <span class="remaining-calories-unit font-body-sm text-xs text-on-surface-variant font-semibold">kcal libres</span>
                  </div>
                </div>
                <div class="w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">flag</span>
                </div>
              </div>

              <!-- Gráfico Donut de Calorías -->
              <div class="relative w-40 h-40 mx-auto my-1 flex items-center justify-center">
                <svg id="dashboard-donut-svg" class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="40" stroke="#f2f3ff" stroke-width="10"></circle>
                  <circle id="donut-segment-fat" cx="50" cy="50" fill="none" r="40" stroke="#ffb95f" stroke-dasharray="0 251.2" stroke-linecap="round" stroke-width="10" class="transition-all duration-500"></circle>
                  <circle id="donut-segment-prot" cx="50" cy="50" fill="none" r="40" stroke="#0284c7" stroke-dasharray="0 251.2" stroke-linecap="round" stroke-width="10" class="transition-all duration-500"></circle>
                  <circle id="donut-segment-carbs" cx="50" cy="50" fill="none" r="40" stroke="#10b981" stroke-dasharray="0 251.2" stroke-linecap="round" stroke-width="10" class="transition-all duration-500"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span class="font-label-sm text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Total</span>
                  <span class="consumed-calories-val font-headline-md text-xl font-black text-on-surface leading-tight">0</span>
                  <span class="consumed-calories-unit font-body-sm text-[11px] text-on-surface-variant font-semibold">kcal consumidas</span>
                </div>
              </div>

              <!-- Desglose de Macronutrientes -->
              <div class="flex flex-col gap-2.5 pt-1">
                <!-- Carbohidratos -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                      <span class="font-title-sm text-on-surface font-semibold">Carbohidratos</span>
                    </div>
                    <span class="macro-carbs-val font-title-sm font-bold text-on-surface">0g <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span></span>
                  </div>
                  <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div id="macro-carbs-bar" class="h-full bg-[#10b981] rounded-full transition-all duration-500" style="width: 0%;"></div>
                  </div>
                </div>

                <!-- Proteínas -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
                      <span class="font-title-sm text-on-surface font-semibold">Proteínas</span>
                    </div>
                    <span class="macro-prot-val font-title-sm font-bold text-on-surface">0g <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span></span>
                  </div>
                  <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div id="macro-prot-bar" class="h-full bg-[#0284c7] rounded-full transition-all duration-500" style="width: 0%;"></div>
                  </div>
                </div>

                <!-- Grasas -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span>
                      <span class="font-title-sm text-on-surface font-semibold">Grasas</span>
                    </div>
                    <span class="macro-fat-val font-title-sm font-bold text-on-surface">0g <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span></span>
                  </div>
                  <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div id="macro-fat-bar" class="h-full bg-[#ffb95f] rounded-full transition-all duration-500" style="width: 0%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PANEL 3: "Platos Favoritos" -->
            <div class="bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-surface-container-high/40 pb-2.5">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[20px]">bookmark</span>
                  <h3 class="font-headline-md text-base text-on-surface font-bold">Platos Favoritos</h3>
                </div>
                <a href="mis_platos.html" class="font-label-sm text-xs text-primary hover:underline font-bold">Ver todos</a>
              </div>

              <!-- Lista Dinámica de Platos Favoritos -->
              <div id="favoritos-container" class="flex flex-col gap-2.5">
                <!-- Se cargan dinámicamente desde PlatosStore -->
              </div>
            </div>

          </div>
        </div>
    `,
    init: function() {
      if (typeof window.initDashboard === 'function') {
        window.initDashboard();
      }
    }
  },
  'mi_progreso.html': {
    id: 'progreso',
    title: 'DIA - Mi Progreso',
    headerTitle: 'Mi Progreso',
    mainClass: 'flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-7xl w-full mx-auto pb-28 lg:pb-12 space-y-6',
    html: `
        <!-- BARRA SUPERIOR DE CONTROL: Selector de Período y Control de Flechas -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-surface-container-lowest rounded-3xl border border-surface-container-high/50 shadow-sm">
          
          <!-- Encabezado con título e ícono (Desktop) -->
          <div class="hidden sm:flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-container to-secondary text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30">
              <span class="material-symbols-outlined text-[28px]">trending_up</span>
            </div>
            <div>
              <h1 class="text-xl lg:text-2xl font-bold font-headline-xl text-on-surface">Mi Progreso</h1>
              <p class="text-xs text-on-surface-variant">Calorías consumidas, macronutrientes e hidratación</p>
            </div>
          </div>

          <!-- Selector de Modo de Tiempo: Día | Semana | Mes -->
          <div class="flex items-center justify-center bg-surface-container-low p-1.5 rounded-2xl border border-surface-container-high/50 w-full sm:w-auto shadow-inner">
            <button id="tab-dia" type="button" class="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-primary-container text-on-primary shadow-sm">
              Día
            </button>
            <button id="tab-semana" type="button" class="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-all">
              Semana
            </button>
            <button id="tab-mes" type="button" class="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-all">
              Mes
            </button>
          </div>

          <!-- Control de Flechas de Fecha -->
          <div class="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <div class="flex items-center bg-surface-container-low rounded-2xl p-1 border border-surface-container-high/40 shadow-xs">
              <!-- Flecha Izquierda -->
              <button id="btn-prev-period" aria-label="Período anterior" class="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest active:scale-90 transition-all shadow-xs" title="Retroceder">
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <!-- Indicador de Fecha / Período -->
              <div class="flex items-center gap-1.5 px-3 min-w-[150px] sm:min-w-[180px] justify-center select-none">
                <span id="period-icon" class="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                <span id="period-display-label" class="font-headline-md text-xs sm:text-sm font-bold text-on-surface text-center whitespace-nowrap">
                  Miércoles, 9 Sep
                </span>
              </div>

              <!-- Flecha Derecha -->
              <button id="btn-next-period" aria-label="Período siguiente" class="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest active:scale-90 transition-all shadow-xs" title="Avanzar">
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>

            <!-- Botón de retorno rápido a 'Hoy' -->
            <button id="btn-reset-today" type="button" class="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-on-surface-variant text-xs font-bold transition-all border border-surface-container-high/40 shadow-xs" title="Volver a la fecha actual">
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Hoy</span>
            </button>
          </div>

        </div>

        <!-- SECCIÓN 1: GRÁFICA DE BARRAS DE MACRONUTRIENTES -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high/50 shadow-sm flex flex-col gap-4">
          
          <!-- Encabezado de la Gráfica y Leyenda de Macros -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-container-high/40 pb-4">
            <div>
              <div class="flex items-center gap-2">
                <h2 id="chart-main-title" class="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
                  Distribución de Macronutrientes por Comida
                </h2>
                <span id="chart-badge-period" class="px-2.5 py-0.5 rounded-full bg-primary-fixed/30 text-primary text-[11px] font-bold">
                  Vista Diaria
                </span>
              </div>
              <p id="chart-sub-title" class="text-xs text-on-surface-variant mt-0.5">
                Desglose calórico y gramos consumidos en cada momento del día
              </p>
            </div>

            <!-- Leyenda Interactiva de Macronutrientes -->
            <div class="flex items-center flex-wrap gap-2 sm:gap-3 text-xs font-semibold">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-surface-container-high/40">
                <span class="w-3 h-3 rounded-full bg-[#10b981] shadow-xs"></span>
                <span class="text-on-surface">Proteínas</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-surface-container-high/40">
                <span class="w-3 h-3 rounded-full bg-[#0284c7] shadow-xs"></span>
                <span class="text-on-surface">Carbohidratos</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-surface-container-high/40">
                <span class="w-3 h-3 rounded-full bg-[#f59e0b] shadow-xs"></span>
                <span class="text-on-surface">Grasas</span>
              </div>
            </div>
          </div>

          <!-- Contenedor Visual de la Gráfica (SVG Dinámico y Responsivo) -->
          <div class="relative w-full overflow-x-auto no-scrollbar py-2">
            <div id="chart-svg-wrapper" class="min-w-[500px] md:min-w-0 w-full">
              <!-- El SVG de barras se genera e inyecta dinámicamente con JavaScript -->
            </div>

            <!-- Tooltip Flotante Interactivo -->
            <div id="chart-tooltip" class="absolute z-20 pointer-events-none opacity-0 transition-opacity duration-200 bg-surface-container-lowest text-on-surface rounded-2xl p-3 shadow-xl border border-surface-container-high/70 text-xs flex flex-col gap-1 min-w-[160px]">
              <!-- Contenido dinámico del tooltip -->
            </div>
          </div>

          <!-- Pie de Gráfica: Resumen e Indicador Calórico -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-surface-container-high/40 text-xs">
            <div class="flex items-center gap-2 text-on-surface-variant font-medium">
              <span class="material-symbols-outlined text-primary text-[18px]">info</span>
              <span id="chart-footnote-text">Toca o pasa el cursor sobre una barra para ver gramos exactos y porcentaje.</span>
            </div>
            <div class="flex items-center gap-1.5 font-bold">
              <span class="text-on-surface-variant">Calorías en este período:</span>
              <span id="chart-total-kcal" class="text-primary text-sm font-black">1,640 kcal</span>
            </div>
          </div>

        </div>

        <!-- SECCIÓN 2: CUADRÍCULA DE TARJETAS DE MACRONUTRIENTES (Estilo exacto de la foto de referencia) -->
        <div>
          <div class="flex items-center justify-between mb-4 px-1">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">grid_view</span>
              <h2 class="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
                Métricas y Macronutrientes
              </h2>
            </div>
            <span class="text-xs text-on-surface-variant font-medium">Actualizado en tiempo real</span>
          </div>

          <!-- Grid de 6 Tarjetas Estilo Widget Deportivo / Saludable -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
            
            <!-- TARJETA 1: CALORÍAS / ENERGÍA (Degradado Naranja / Coral Cálido) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#ff5e62] via-[#ff7844] to-[#f97316] text-white shadow-[0_12px_24px_-6px_rgba(249,115,22,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Calorías</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">local_fire_department</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-calorias-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">1,640</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">kcal</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-calorias-sub">78% Meta</span>
                  <span id="card-calorias-goal" class="font-bold">Meta 2,100</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-calorias-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 78%;"></div>
                </div>
              </div>
            </div>

            <!-- TARJETA 2: PROTEÍNAS (Degradado Esmeralda Brillante - Color Primario de la App) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] text-white shadow-[0_12px_24px_-6px_rgba(16,185,129,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Proteínas</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">fitness_center</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-proteinas-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">135</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">g</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-proteinas-sub">90% Meta</span>
                  <span id="card-proteinas-goal" class="font-bold">Meta 150g</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-proteinas-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 90%;"></div>
                </div>
              </div>
            </div>

            <!-- TARJETA 3: CARBOHIDRATOS (Degradado Azul Atlántico / Cyan Intenso) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] text-white shadow-[0_12px_24px_-6px_rgba(2,132,199,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Carbohidratos</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">grain</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-carbs-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">220</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">g</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-carbs-sub">88% Meta</span>
                  <span id="card-carbs-goal" class="font-bold">Meta 250g</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-carbs-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 88%;"></div>
                </div>
              </div>
            </div>

            <!-- TARJETA 4: GRASAS SALUDABLES (Degradado Ámbar Dorado / Sol) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] text-white shadow-[0_12px_24px_-6px_rgba(245,158,11,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Grasas</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">opacity</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-grasas-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">52</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">g</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-grasas-sub">80% Meta</span>
                  <span id="card-grasas-goal" class="font-bold">Meta 65g</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-grasas-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 80%;"></div>
                </div>
              </div>
            </div>

            <!-- TARJETA 5: FIBRA DIETÉTICA (Degradado Púrpura / Violeta Intenso) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] text-white shadow-[0_12px_24px_-6px_rgba(139,92,246,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Fibra</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">psychiatry</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-fibra-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">28</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">g</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-fibra-sub">87% Meta</span>
                  <span id="card-fibra-goal" class="font-bold">Meta 32g</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-fibra-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 87%;"></div>
                </div>
              </div>
            </div>

            <!-- TARJETA 6: AGUA / HIDRATACIÓN (Degradado Cian Cristalino / Agua Marina) -->
            <div class="metric-card rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#06b6d4] via-[#0891b2] to-[#0e7490] text-white shadow-[0_12px_24px_-6px_rgba(6,182,212,0.35)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[165px]">
              <div class="flex items-start justify-between relative z-10">
                <span class="font-title-sm text-xs sm:text-sm font-bold text-white/95 tracking-wide">Agua</span>
                <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner shrink-0">
                  <span class="material-symbols-outlined text-[22px] sm:text-[24px]">water_drop</span>
                </div>
              </div>
              <div class="my-2 relative z-10">
                <div class="flex items-baseline gap-1">
                  <span id="card-agua-val" class="font-numeric-hero text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none tracking-tight">2.4</span>
                  <span class="text-xs sm:text-sm font-bold text-white/90">L</span>
                </div>
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between text-[11px] sm:text-xs text-white/90 font-medium">
                  <span id="card-agua-sub">80% Meta</span>
                  <span id="card-agua-goal" class="font-bold">Meta 3.0 L</span>
                </div>
                <div class="w-full h-1.5 bg-black/15 rounded-full overflow-hidden mt-1.5">
                  <div id="card-agua-bar" class="h-full bg-white rounded-full transition-all duration-500" style="width: 80%;"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- SECCIÓN 3: RECOMENDACIÓN NUTRICIONAL INTELIGENTE (Asistente IA) -->
        <div id="progreso-ai-diagnosis-card" class="progreso-ai-card p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-primary-fixed/20 dark:from-[#131d33] dark:via-[#17233d] dark:to-primary-container/15 border border-primary-fixed/50 dark:border-emerald-500/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 shrink-0">
              <span class="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-headline-md text-base font-bold text-on-surface dark:text-white">Diagnóstico IA del Período</h3>
                <span class="badge-diagnostico-optimo px-2.5 py-0.5 rounded-full bg-primary-fixed/40 dark:bg-emerald-500/20 text-primary dark:text-emerald-300 border border-primary-container/30 dark:border-emerald-500/40 text-[10px] font-extrabold uppercase tracking-wide">Óptimo</span>
              </div>
              <p id="insight-ai-text" class="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                ¡Gran consistencia! Estás a 460 kcal de tu objetivo calórico diario con un excelente balance de proteínas (90%).
              </p>
            </div>
          </div>
          <a href="asistente.html" class="btn-consultar-nutribot px-4 py-2.5 rounded-2xl bg-surface-container-lowest dark:bg-emerald-500/15 border border-primary-container/40 dark:border-emerald-500/40 text-primary dark:text-emerald-300 hover:bg-primary-container hover:text-on-primary dark:hover:bg-primary-container dark:hover:text-slate-950 font-title-sm text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all whitespace-nowrap self-end sm:self-center">
            <span>Consultar NutriBot</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </a>
        </div>
    `,
    init: function() {
      if (typeof window.initMiProgreso === 'function') {
        window.initMiProgreso();
      }
    }
  },
  'mis_platos.html': {
    id: 'mis-platos',
    title: 'DIA - Mis Platos y Recetas',
    headerTitle: 'Mis Platos',
    mainClass: 'flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-7xl w-full mx-auto pb-28 lg:pb-12',
    html: `<!-- ENCABEZADO SUPERIOR CON BOTÓN PRINCIPAL "CREAR PLATILLO" -->
        <div class="p-5 sm:p-6 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 shrink-0">
              <span class="material-symbols-outlined text-[28px]">restaurant_menu</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl sm:text-2xl font-bold font-headline-xl text-on-surface">Mis Platos y Recetas</h1>
                <span id="platos-count-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed/40 text-primary border border-primary-container/30">
                  Cargando...
                </span>
              </div>
              <p class="text-xs sm:text-sm text-on-surface-variant mt-0.5">Colección de tus comidas registradas con fotos, recetas y macronutrientes</p>
            </div>
          </div>

          <!-- BOTÓN SUPERIOR: + CREAR PLATILLO (Acción Principal Destacada) -->
          <button 
            id="btn-create-dish" 
            type="button" 
            class="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span class="material-symbols-outlined text-[22px]">add_circle</span>
            <span>Crear Platillo</span>
          </button>
        </div>

        <!-- BARRA DE FILTROS Y BÚSQUEDA -->
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
          
          <!-- BUSCADOR CON ICONO DE LUPA -->
          <div class="relative flex-1 max-w-md">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
              search
            </span>
            <input 
              type="text" 
              id="platos-search" 
              placeholder="Buscar por nombre, descripción o ingrediente..." 
              class="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border border-surface-container-high/80 rounded-2xl text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
            />
            <button 
              id="btn-clear-search" 
              type="button" 
              aria-label="Limpiar búsqueda" 
              class="hidden absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center text-xs transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <!-- CHIPS DE FILTRO POR CATEGORÍA -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button type="button" class="plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-primary-container text-on-primary shadow-sm cursor-pointer whitespace-nowrap" data-category="Todos">
              Todos
            </button>
            <button type="button" class="plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Desayuno">
              Desayuno
            </button>
            <button type="button" class="plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Almuerzo">
              Almuerzo
            </button>
            <button type="button" class="plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Cena">
              Cena
            </button>
            <button type="button" class="plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Snack">
              Snack
            </button>
          </div>
        </div>

        <!-- CUADRÍCULA DE CARTAS DE PLATILLOS (GRID RESPONSIVE: 1 col móvil, 2 tablet, 3-4 PC) -->
        <div id="platos-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          <!-- Las tarjetas de platos se renderizan dinámicamente aquí -->
        </div>

        <!-- ESTADO VACÍO (Si no hay platos registrados o coincidentes) -->
        <div id="platos-empty-state" class="hidden flex flex-col items-center justify-center text-center py-16 px-4 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm my-6">
          <div class="w-20 h-20 rounded-3xl bg-primary-fixed/30 text-primary flex items-center justify-center mb-4 mx-auto shadow-inner">
            <span class="material-symbols-outlined text-[42px]">set_meal</span>
          </div>
          <h2 class="text-xl font-bold font-headline-md text-on-surface text-center">No se encontraron platillos</h2>
          <p class="text-sm text-on-surface-variant max-w-sm mt-1.5 mb-6 mx-auto text-center leading-relaxed">
            Aún no has registrado ningún plato en esta categoría o no coincide con tu búsqueda.
          </p>
          <button 
            id="btn-empty-create" 
            type="button" 
            class="px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-bold text-sm inline-flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer mx-auto"
          >
            <span class="material-symbols-outlined text-[20px]">add</span>
            <span>Registrar mi primer platillo</span>
          </button>
        </div>

        <!-- ======================================================== -->
        <!-- VENTANA MODAL PARA INTRODUCIR / EDITAR INFORMACIÓN DE CADA PLATO -->
        <!-- ======================================================== -->
        <div id="plato-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          
          <!-- FONDO TRASLÚCIDO OSCURO (BACKDROP) -->
          <div id="plato-modal-backdrop" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 transition-opacity duration-200"></div>

          <!-- CONTENEDOR DIÁLOGO MODAL -->
          <div id="plato-modal-dialog" class="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/80 overflow-hidden z-10 opacity-0 scale-95 transition-all duration-200 flex flex-col max-h-[92vh]">
            
            <!-- CABECERA DEL MODAL -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-surface-container-high/60 bg-surface/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">restaurant</span>
                </div>
                <div>
                  <h2 id="modal-title" class="font-headline-md text-lg font-bold text-on-surface">Crear Platillo</h2>
                  <p class="text-xs text-on-surface-variant">Introduce los detalles de tu comida o receta</p>
                </div>
              </div>
              <button 
                id="btn-modal-close" 
                type="button" 
                aria-label="Cerrar modal" 
                class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- CUERPO DEL FORMULARIO (SCROLLABLE EN PANTALLAS PEQUEÑAS) -->
            <form id="plato-form" class="p-6 space-y-4 overflow-y-auto flex-1 text-on-surface">
              <!-- Campo ID Oculto para Edición -->
              <input type="hidden" id="plato-id" />

              <!-- 1. NOMBRE DEL PLATILLO -->
              <div>
                <label for="plato-nombre" class="block text-xs font-bold text-on-surface mb-1.5">
                  Nombre del platillo <span class="text-error">*</span>
                </label>
                <input 
                  type="text" 
                  id="plato-nombre" 
                  required 
                  placeholder="Ej. Salmón a la plancha con vegetales" 
                  class="w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              <!-- 2. FOTO DEL PLATILLO (URL, ARCHIVO LOCAL O SUGERENCIA RÁPIDA) -->
              <div class="space-y-2">
                <label class="block text-xs font-bold text-on-surface">
                  Foto del platillo
                </label>
                
                <div class="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="url" 
                    id="plato-foto-url" 
                    placeholder="Pega el enlace de la imagen (https://...)" 
                    class="flex-1 px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-all"
                  />
                  <input type="file" id="plato-foto-file" accept="image/*" class="hidden" />
                  <button 
                    type="button" 
                    id="btn-select-file" 
                    class="px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-primary-container/40 text-primary hover:bg-primary-container/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                    <span>Subir foto</span>
                  </button>
                </div>

                <!-- FOTOS SUGERIDAS RÁPIDAS -->
                <div class="pt-1">
                  <span class="text-[11px] font-semibold text-on-surface-variant/80 block mb-1.5">O elige una foto sugerida:</span>
                  <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button type="button" class="preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all" data-img="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" title="Salmón">
                      <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=120&q=60" class="w-full h-full object-cover" alt="Salmón" />
                    </button>
                    <button type="button" class="preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all" data-img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" title="Pollo y Quinoa">
                      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60" class="w-full h-full object-cover" alt="Bowl Saludable" />
                    </button>
                    <button type="button" class="preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all" data-img="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" title="Ensalada">
                      <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=60" class="w-full h-full object-cover" alt="Ensalada" />
                    </button>
                    <button type="button" class="preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all" data-img="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80" title="Bowl de Avena">
                      <img src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=120&q=60" class="w-full h-full object-cover" alt="Avena" />
                    </button>
                    <button type="button" class="preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all" data-img="https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80" title="Tostadas con Aguacate">
                      <img src="https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=120&q=60" class="w-full h-full object-cover" alt="Tostadas" />
                    </button>
                  </div>
                </div>

                <!-- VISTA PREVIA DE LA FOTO SELECCIONADA -->
                <div id="plato-image-preview-container" class="hidden relative rounded-2xl overflow-hidden border border-surface-container-high/80 aspect-[16/9] max-h-44 bg-surface-container-low">
                  <img id="plato-image-preview" src="" alt="Vista previa del plato" class="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    id="btn-remove-preview-image" 
                    title="Quitar foto" 
                    class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-error text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>

              <!-- 3. CATEGORÍA (1 COLUMNA) -->
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label for="plato-categoria" class="block text-xs font-bold text-on-surface mb-1.5">
                    Categoría
                  </label>
                  <select 
                    id="plato-categoria" 
                    class="w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface focus:outline-none focus:border-primary transition-all font-medium cursor-pointer"
                  >
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Cena">Cena</option>
                    <option value="Snack">Snack / Refacción</option>
                  </select>
                </div>
              </div>

              <!-- 4. BREVE DESCRIPCIÓN -->
              <div>
                <label for="plato-descripcion" class="block text-xs font-bold text-on-surface mb-1.5">
                  Breve descripción <span class="text-error">*</span>
                </label>
                <textarea 
                  id="plato-descripcion" 
                  rows="3" 
                  required 
                  placeholder="Describe los ingredientes principales, preparación o beneficios nutricionales de este plato..." 
                  class="w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none leading-relaxed"
                ></textarea>
              </div>

              <!-- PIE DE ACCIONES DEL FORMULARIO -->
              <div class="pt-3 border-t border-surface-container-high/60 flex items-center justify-end gap-2.5">
                <button 
                  type="button" 
                  id="btn-modal-cancel" 
                  class="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-bold text-sm transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-sm flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span class="material-symbols-outlined text-[19px]">check</span>
                  <span id="modal-submit-text">Guardar Platillo</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR PLATILLO -->
        <!-- ======================================================== -->
        <div id="delete-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true">
          <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"></div>
          <div class="relative w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high/80 z-10 flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-[26px]">delete_forever</span>
            </div>
            <h3 class="font-headline-md text-base font-bold text-on-surface">¿Eliminar platillo?</h3>
            <p class="text-xs text-on-surface-variant mt-1 mb-4 leading-relaxed">
              ¿Estás seguro de que deseas eliminar <strong id="delete-dish-name" class="text-on-surface">este platillo</strong> de tu colección? Esta acción no se puede deshacer.\n            </p>
            <div class="flex items-center gap-2 w-full">
              <button 
                type="button" 
                id="btn-cancel-delete" 
                class="flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                id="btn-confirm-delete" 
                class="flex-1 py-2.5 rounded-xl bg-error text-on-error font-bold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>`,
    init: function() {
      const checkAutoCreate = () => {
        if (sessionStorage.getItem('dia_auto_open_create_dish') === 'true' || window.location.hash === '#crear') {
          sessionStorage.removeItem('dia_auto_open_create_dish');
          setTimeout(() => {
            if (typeof window.openCreatePlatoModal === 'function') {
              window.openCreatePlatoModal();
            } else {
              const btn = document.getElementById('btn-create-dish') || document.getElementById('btn-empty-create');
              if (btn) btn.click();
            }
          }, 60);
        }
      };

      if (window.initMisPlatosView) {
        window.initMisPlatosView();
        checkAutoCreate();
      } else {
        const s = document.createElement('script');
        s.src = 'components/mis_platos.js';
        s.onload = () => {
          if (window.initMisPlatosView) window.initMisPlatosView();
          checkAutoCreate();
        };
        document.head.appendChild(s);
      }
    }
  },
  'historial.html': {
    id: 'historial',
    title: 'DIA - Historial del Asistente IA',
    headerTitle: 'Historial de Asistente IA',
    mainClass: 'flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-7xl w-full mx-auto pb-28 lg:pb-12',
    html: `
        <!-- ENCABEZADO PRINCIPAL DE LA VISTA CON ACCIONES DESTACADAS -->
        <div class="p-5 sm:p-6 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 shrink-0">
              <span class="material-symbols-outlined text-[28px]">history</span>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-bold font-headline-xl text-on-surface">Historial de Asistente IA</h1>
                <span id="historial-count-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed/40 text-primary border border-primary-container/30">
                  Cargando...
                </span>
              </div>
              <p class="text-xs sm:text-sm text-on-surface-variant mt-0.5">Consultas, recomendaciones nutricionales y análisis generados por DIA NutriBot</p>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN: NUEVA CONSULTA Y VACIAR HISTORIAL -->
          <div class="flex items-center gap-2.5 flex-wrap">
            <button 
              id="btn-clear-all-history" 
              type="button" 
              class="px-3.5 py-2.5 rounded-2xl bg-surface-container hover:bg-error/10 text-on-surface-variant hover:text-error border border-surface-container-high/80 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Vaciar todo el historial de chats"
            >
              <span class="material-symbols-outlined text-[18px]">delete_sweep</span>
              <span>Vaciar</span>
            </button>

            <button 
              id="btn-new-chat-historial" 
              type="button" 
              class="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span class="material-symbols-outlined text-[20px]">add_comment</span>
              <span>Nueva Consulta</span>
            </button>
          </div>
        </div>

        <!-- BARRA DE FILTROS Y BÚSQUEDA EN TIEMPO REAL -->
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
          
          <!-- BUSCADOR CON ICONO DE LUPA -->
          <div class="relative flex-1 max-w-md">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
              search
            </span>
            <input 
              type="text" 
              id="historial-search" 
              placeholder="Buscar por nombre o primera solicitud..." 
              class="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border border-surface-container-high/80 rounded-2xl text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
            />
            <button 
              id="btn-clear-search-historial" 
              type="button" 
              aria-label="Limpiar búsqueda" 
              class="hidden absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center text-xs transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <!-- CHIPS DE FILTRO POR CATEGORÍA -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-primary-container text-on-primary shadow-sm cursor-pointer whitespace-nowrap" data-category="Todos">
              Todos
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Hoy">
              Hoy
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Almuerzo">
              Almuerzo
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Cena">
              Cena
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Desayuno">
              Desayuno
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Visión IA">
              Visión IA
            </button>
            <button type="button" class="historial-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap" data-category="Snack">
              Snack
            </button>
          </div>
        </div>

        <!-- CUADRÍCULA RESPONSIVA DE CONVERSACIONES CON EFECTO TRANSFORM (1 col móvil, 2 cols tablet, 3 cols desktop) -->
        <div id="historial-chats-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <!-- Las tarjetas de cada conversación se renderizan dinámicamente con historial.js -->
        </div>

        <!-- MODAL DE DETALLE DE CONVERSACIÓN COMPLETA -->
        <div id="chat-detail-modal" class="fixed inset-0 z-50 hidden bg-black/60 backdrop-blur-xs items-center justify-center p-4 overflow-y-auto">
          <div class="bg-surface-container-lowest rounded-3xl border border-surface-container-high max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-message">
            <div class="p-5 border-b border-surface-container-high/60 flex items-start justify-between gap-3 bg-surface-container-low/40">
              <div class="flex-1 min-w-0">
                <h2 id="modal-chat-title" class="text-lg font-bold font-headline-md text-on-surface line-clamp-2">
                  Detalle de Conversación
                </h2>
                <div id="modal-chat-meta" class="mt-2"></div>
              </div>
              <button 
                id="btn-close-chat-modal" 
                type="button" 
                aria-label="Cerrar ventana modal" 
                class="w-9 h-9 rounded-2xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div class="p-5 overflow-y-auto flex-1 space-y-4">
              <div class="p-3.5 rounded-2xl bg-primary-fixed/15 border border-primary-container/25 flex items-start gap-2.5">
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">help_outline</span>
                <div>
                  <span class="text-[11px] font-bold text-primary uppercase tracking-wider block">Primera Solicitud Registrada</span>
                  <p id="modal-chat-first-request" class="text-xs sm:text-sm font-semibold text-on-surface mt-0.5 italic"></p>
                </div>
              </div>
              <div class="pt-2">
                <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-3">Mensajes de la consulta:</span>
                <div id="modal-chat-messages" class="space-y-3.5"></div>
              </div>
            </div>
            <div class="p-4 border-t border-surface-container-high/60 bg-surface-container-low/30 flex items-center justify-between gap-3">
              <span class="text-xs text-on-surface-variant hidden sm:inline">Generado por DIA NutriBot IA</span>
              <button 
                id="btn-continue-chat-in-assistant" 
                type="button" 
                class="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-primary-container text-on-primary font-bold text-sm shadow-md shadow-primary-container/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">chat</span>
                <span>Continuar chat en Asistente IA</span>
              </button>
            </div>
          </div>
        </div>

        <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR CHAT / VACIAR HISTORIAL -->
        <div id="confirm-delete-chat-modal" class="fixed inset-0 z-50 hidden bg-black/60 backdrop-blur-xs items-center justify-center p-4">
          <div class="bg-surface-container-lowest rounded-3xl border border-surface-container-high max-w-md w-full p-6 shadow-2xl animate-message">
            <div class="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <h3 class="text-lg font-bold font-headline-md text-on-surface mb-2">¿Confirmar eliminación?</h3>
            <p id="confirm-delete-chat-text" class="text-sm text-on-surface-variant leading-relaxed mb-6">
              ¿Estás seguro de que deseas eliminar este elemento del historial?
            </p>
            <div class="flex items-center justify-end gap-3">
              <button 
                id="btn-cancel-delete-chat" 
                type="button" 
                class="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                id="btn-confirm-delete-chat" 
                type="button" 
                class="px-5 py-2.5 rounded-xl bg-error text-on-error font-bold text-sm shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
    `,
    init: function () {
      if (window.initHistorialView) {
        window.initHistorialView();
      } else {
        const s = document.createElement('script');
        s.src = 'components/historial.js';
        s.onload = () => {
          if (window.initHistorialView) window.initHistorialView();
        };
        document.head.appendChild(s);
      }
    }
  },
  'asistente.html': {
    id: 'asistente',
    title: 'DIA - Asistente IA Conversacional',
    headerTitle: 'DIA NutriBot IA',
    mainClass: 'flex-1 flex flex-col min-h-0 max-w-4xl w-full mx-auto px-3 sm:px-6 relative overflow-hidden h-[calc(100dvh-64px)] lg:h-[calc(100vh-73px)] max-h-[100dvh] lg:max-h-[calc(100vh-73px)]',
    html: `<!-- ZONA DE HISTORIAL DE MENSAJES (SCROLLABLE) -->
        <div id="chat-scroll-container" class="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 sm:pr-2 space-y-4 sm:space-y-5 pt-3 pb-2">
          
          <!-- MENSAJE DE BIENVENIDA DEL ASISTENTE -->
          <div class="flex items-start gap-3 animate-message">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span class="material-symbols-outlined text-[20px] sm:text-[22px]">smart_toy</span>
            </div>
            <div class="flex-1 max-w-2xl">
              <div class="p-4 sm:p-5 rounded-3xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-sm text-on-surface">
                <div class="flex items-center gap-2 mb-2">
                  <span class="font-bold text-sm text-on-surface">DIA NutriBot IA</span>
                  <span class="text-[11px] text-on-surface-variant/80">En línea</span>
                </div>
                <p class="bot-message-body text-sm leading-relaxed mb-3 text-on-surface">
                  ¡Hola! 👋 Soy tu copiloto nutricional inteligente para diabetes con motor local QVAC (Llama 3.2). Puedes preguntarme sobre el impacto glucémico o los macronutrientes de tus comidas, o subir una foto usando el icono de la cámara para analizar tu plato.
                </p>

                <!-- Tarjeta destacada de sugerencia con cámara -->
                <div class="rounded-2xl p-3 bg-surface-container-low/70 border border-primary-container/20 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[20px]">photo_camera</span>
                  </div>
                  <div class="flex-1 text-xs">
                    <span class="font-bold text-on-surface block">¿Tienes tu comida enfrente?</span>
                    <span class="text-on-surface-variant">Toca la cámara abajo para adjuntar una foto y describe sus ingredientes.</span>
                  </div>
                </div>
              </div>

              <!-- CHIPS DE CONSULTAS RÁPIDAS -->
              <div class="mt-3 flex flex-wrap gap-2">
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-on-surface-variant hover:text-emerald-600 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer" data-prompt="¿Cuántas calorías y carbohidratos tiene un tazón de avena con plátano y nueces?">
                  <span>🥣 Avena con plátano y nueces</span>
                </button>
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-on-surface-variant hover:text-emerald-600 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer" data-prompt="¿Puedo cenar pechuga de pollo a la plancha con ensalada verde y aceite de oliva?">
                  <span>🥗 Pechuga con ensalada</span>
                </button>
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-on-surface-variant hover:text-emerald-600 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer" data-prompt="¿Qué impacto glucémico tiene comer 2 huevos con una rebanada de pan integral?">
                  <span>🍳 Huevos con pan integral</span>
                </button>
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-on-surface-variant hover:text-emerald-600 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer" data-prompt="¿Cómo debo calcular los carbohidratos de 2 tacos de maíz con carne asada?">
                  <span>🌮 Tacos con carne asada</span>
                </button>
              </div>
            </div>
          </div>

          <!-- CONTENEDOR DINÁMICO DE MENSAJES (Aquí se agregan los nuevos mensajes) -->
          <div id="dynamic-messages" class="space-y-4 sm:space-y-5"></div>

          <!-- INDICADOR DE ESCRIBIENDO (Oculto por defecto) -->
          <div id="typing-indicator" class="hidden items-start gap-3">
            <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span class="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div class="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-center gap-1.5">
              <span class="text-xs text-on-surface-variant font-medium mr-1">Analizando respuesta</span>
              <div class="w-2 h-2 rounded-full bg-primary-container typing-dot"></div>
              <div class="w-2 h-2 rounded-full bg-primary-container typing-dot"></div>
              <div class="w-2 h-2 rounded-full bg-primary-container typing-dot"></div>
            </div>
          </div>

        </div>

        <!-- VENTANA FLOTANTE INFERIOR DE ENTRADA (MÓVIL: Flotante sobre la barra inferior | DESKTOP: Barra estática en el chat) -->
        <div id="chat-floating-dock" class="chat-floating-dock shrink-0 w-full pt-2 pb-24 lg:pb-4 bg-surface z-20">
          
          <!-- PREVISUALIZACIÓN DE FOTO ADJUNTADA (Oculta hasta seleccionar imagen) -->
          <div id="image-preview-bar" class="hidden mb-2 p-2 bg-surface-container-lowest rounded-2xl border border-primary-container/30 shadow-sm flex items-center justify-between animate-message">
            <div class="flex items-center gap-3">
              <div class="relative w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 ring-1 ring-primary/30">
                <img id="preview-image-element" src="" alt="Vista previa de plato" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-on-surface flex items-center gap-1">
                  <span class="material-symbols-outlined text-primary text-[15px]">image</span>
                  Foto de alimento lista para analizar
                </span>
                <span id="preview-filename" class="text-[11px] text-on-surface-variant truncate max-w-[200px] sm:max-w-xs">plato.jpg</span>
              </div>
            </div>
            <button id="btn-remove-image" type="button" aria-label="Quitar foto" class="w-8 h-8 rounded-full bg-surface-container hover:bg-error/10 hover:text-error text-on-surface-variant flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <!-- INPUT FORMULARI0 CON ÍCONO DE CÁMARA A LA IZQUIERDA Y AVIÓN DE PAPEL VERDE A LA DERECHA -->
          <form id="chat-form" class="relative flex items-center bg-surface-container-lowest rounded-full p-1.5 sm:p-2 border border-surface-container-high/80 shadow-[0_4px_20px_rgba(15,23,42,0.06)] focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 transition-all">
            
            <!-- INPUT DE ARCHIVO OCULTO -->
            <input type="file" id="photo-file-input" accept="image/*" capture="environment" class="hidden" />
            <input type="file" id="gallery-file-input" accept="image/*" class="hidden" />

            <!-- 1. ÍCONO DE CÁMARA A LA IZQUIERDA PARA SUBIR FOTO -->
            <button 
              type="button" 
              id="btn-trigger-camera" 
              aria-label="Tomar foto de alimento" 
              title="Tomar foto de alimento"
              class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[24px]">photo_camera</span>
              <!-- Indicador badge si hay foto cargada -->
              <span id="camera-attached-badge" class="hidden absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            <button 
              type="button" 
              id="btn-trigger-gallery" 
              aria-label="Subir foto de galería" 
              title="Subir foto de galería"
              class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[24px]">image</span>
            </button>

            <!-- 2. CAMPO DE TEXTO CENTRAL -->
            <label for="chat-input" class="sr-only">Escribe tu mensaje sobre nutrición o alimentos</label>
            <input 
              type="text" 
              id="chat-input" 
              autocomplete="off"
              enterkeyhint="send"
              placeholder="Pregúntale a DIA o describe tu comida..." 
              class="flex-1 bg-transparent border-none text-on-surface placeholder:text-on-surface-variant/60 text-sm sm:text-base px-2 sm:px-3 py-2 outline-none font-medium min-w-0" 
            />

            <!-- 3. BOTÓN DE AVIÓN DE PAPEL A LA DERECHA CON FONDO VERDE -->
            <button 
              type="submit" 
              id="btn-send-message" 
              aria-label="Enviar mensaje" 
              title="Enviar mensaje"
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary-container hover:bg-emerald-600 text-on-primary shadow-md shadow-primary-container/30 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px] sm:text-[22px] ml-0.5 transform -rotate-12">send</span>
            </button>
          </form>

          <!-- Pie de ayuda sutil -->
          <div class="text-center py-1">
            <span class="text-[10px] text-on-surface-variant/60 font-medium chat-disclaimer">DIA Asistente IA puede tener imprecisiones. Verifica información médica importante.</span>
          </div>

        </div>`,
    init: function() {
      (function() {
        const chatForm = document.getElementById('chat-form');
        if (!chatForm || chatForm.dataset.initialized === 'true') return;
        chatForm.dataset.initialized = 'true';

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
        const btnClearDesktop = document.getElementById('btn-clear-desktop');
        const btnClearMobile = document.getElementById('btn-clear-mobile');
        const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

        let selectedImageDataUrl = null;
        let selectedFileName = '';
        let isSubmitting = false;

        // Función para autoscrollear al último mensaje
        function scrollToBottom() {
          setTimeout(() => {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: 'smooth'
            });
          }, 50);
        }

        // Obtener hora en formato legible HH:MM
        function getCurrentTime() {
          const now = new Date();
          let hours = now.getHours();
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;
          return `${hours}:${minutes} ${ampm}`;
        }

        const galleryFileInput = document.getElementById('gallery-file-input');
        const btnTriggerGallery = document.getElementById('btn-trigger-gallery');

        // Disparar selector de cámara / archivo
        if (btnTriggerCamera) {
          btnTriggerCamera.addEventListener('click', () => {
            photoFileInput.click();
          });
        }
        if (btnTriggerGallery) {
          btnTriggerGallery.addEventListener('click', () => {
            galleryFileInput.click();
          });
        }

        // Abrir automáticamente la cámara o selector si se solicitó desde Escanear con IA
        if (sessionStorage.getItem('dia_auto_open_camera') === 'true') {
          sessionStorage.removeItem('dia_auto_open_camera');
          setTimeout(() => {
            if (photoFileInput) {
              try { photoFileInput.click(); } catch(e) {}
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
            previewImageElement.src = selectedImageDataUrl;
            previewFilename.textContent = selectedFileName;
            imagePreviewBar.classList.remove('hidden');
            cameraAttachedBadge.classList.remove('hidden');
            chatInput.focus();
            if (!chatInput.value.trim()) {
              chatInput.value = 'Analiza esta foto de mi plato';
            }
          };
          reader.readAsDataURL(file);
        };

        // Manejar selección de foto
        if (photoFileInput) {
          photoFileInput.addEventListener('change', handleFileChange);
        }
        if (galleryFileInput) {
          galleryFileInput.addEventListener('change', handleFileChange);
        }

        // Quitar foto seleccionada
        btnRemoveImage.addEventListener('click', () => {
          clearImageSelection();
        });

        function clearImageSelection() {
          selectedImageDataUrl = null;
          selectedFileName = '';
          photoFileInput.value = '';
          imagePreviewBar.classList.add('hidden');
          cameraAttachedBadge.classList.add('hidden');
          if (chatInput.value === 'Analiza esta foto de mi plato') {
            chatInput.value = '';
          }
        }

        // Conectar botones de sugerencias rápidas
        quickPromptBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            const prompt = btn.getAttribute('data-prompt');
            if (!prompt) return;
            chatInput.value = prompt;
            chatForm.requestSubmit();
          });
        });

        // Limpiar conversación
        function clearConversation() {
          try {
            sessionStorage.removeItem('dia_active_chat_id');
          } catch (err) {}
          dynamicMessages.innerHTML = '';
          clearImageSelection();
          chatInput.value = '';
          chatInput.focus();
          scrollToBottom();
        }
        if (btnClearDesktop) btnClearDesktop.addEventListener('click', clearConversation);
        if (btnClearMobile) btnClearMobile.addEventListener('click', clearConversation);

        // Envío seguro ante IME (Input Method Editor) y tecla Enter
        let lastCompositionEndAt = null;
        chatInput.addEventListener('compositionend', (e) => {
          lastCompositionEndAt = e.timeStamp;
        });

        chatInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (isSubmitting) return;
            if (e.isComposing || e.keyCode === 229) return;
            if (lastCompositionEndAt !== null && Math.abs(e.timeStamp - lastCompositionEndAt) < 50) return;
            chatForm.requestSubmit();
          }
        });

        // Conexión directa al motor QVAC en Node.js
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
            console.error("Error conectando con QVAC backend:", error);
            return "Lo siento, no pude comunicarme con el servidor local de IA QVAC. Asegúrate de que `node server/server.js` esté ejecutándose.\n\n⚠️ *Aviso: Recuerda que soy un modelo de Inteligencia Artificial y puedo cometer errores. Esta información no sustituye el criterio profesional. Siempre debes consultar con tu médico antes de realizar cambios en tu tratamiento o alimentación.*";
          }
        }

        // Enviar mensaje al enviar el formulario
        chatForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          if (isSubmitting) return;

          const text = chatInput.value.trim();
          const hasImage = !!selectedImageDataUrl;

          if (!text && !hasImage) return;

          isSubmitting = true;
          try {
            // 1. Renderizar mensaje del usuario
            renderUserMessage(text, selectedImageDataUrl);

            const submittedText = text;
            const submittedImage = selectedImageDataUrl;

            // Limpiar input y adjuntos
            chatInput.value = '';
            clearImageSelection();
            scrollToBottom();

            // 2. Mostrar indicador de escritura
            typingIndicator.classList.remove('hidden');
            typingIndicator.classList.add('flex');
            scrollToBottom();

            // 3. Ejecutar inferencia en el modelo local Qvac
            const respuestaIA = await procesarEnServidorNode(submittedText, submittedImage);

            typingIndicator.classList.add('hidden');
            typingIndicator.classList.remove('flex');

            // 4. Renderizar la respuesta real de Qvac
            renderAiResponse(respuestaIA, submittedText, hasImage);
            scrollToBottom();
          } catch (err) {
            console.error('Error al procesar mensaje:', err);
            if (typingIndicator) {
              typingIndicator.classList.add('hidden');
              typingIndicator.classList.remove('flex');
            }
          } finally {
            isSubmitting = false;
          }
        });

        function renderUserMessage(text, imageUrl) {
          const wrapper = document.createElement('div');
          wrapper.className = 'flex items-start justify-end gap-3 animate-message';

          let imageHtml = '';
          if (imageUrl) {
            imageHtml = `
              <div class="mb-2 rounded-2xl overflow-hidden border border-white/20 shadow-sm max-w-[260px] max-h-48 bg-black/10">
                <img src="${imageUrl}" alt="Foto enviada por usuario" class="w-full h-full object-cover" />
              </div>
            `;
          }

          let textHtml = '';
          if (text) {
            textHtml = `<p class="text-sm font-medium leading-relaxed">${escapeHtml(text)}</p>`;
          }

          wrapper.innerHTML = `
            <div class="flex flex-col items-end max-w-xl">
              <div class="p-4 rounded-3xl rounded-tr-sm bg-primary-container text-on-primary shadow-md shadow-primary-container/20">
                ${imageHtml}
                ${textHtml}
              </div>
              <span class="text-[11px] text-on-surface-variant/70 mt-1 mr-2">${getCurrentTime()}</span>
            </div>
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden shrink-0 ring-2 ring-primary/20 shadow-sm mt-0.5" title="[Foto de perfil]">
              <img alt="[Foto de perfil de usuario]" class="w-full h-full object-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e2e8f0'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%2394a3b8'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24z' fill='%2394a3b8'/%3E%3C/svg%3E" />
            </div>
          `;
          dynamicMessages.appendChild(wrapper);
        }

        function renderAiResponse(aiText, queryText, withImage) {
          const wrapper = document.createElement('div');
          wrapper.className = 'flex items-start gap-3 animate-message';

          let htmlContent = escapeHtml(aiText)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/(?:^|\n)\*\s+(.*?)(?=\n|$)/g, '<br/>• $1')
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
                      <span class="material-symbols-outlined text-[13px]">auto_awesome</span> Qvac Llama 3.2
                    </span>
                  </div>
                  <span class="text-[11px] text-on-surface-variant/80">${getCurrentTime()}</span>
                </div>
                <div class="ai-response-text text-sm leading-relaxed mb-3 text-on-surface">
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

          const btnAdd = wrapper.querySelector('.btn-add-history');
          const btnSkip = wrapper.querySelector('.btn-skip-history');
          const actionContainer = wrapper.querySelector('.action-buttons-container');

          function disableChat() {
              if (chatInput) chatInput.disabled = true;
              if (btnTriggerCamera) btnTriggerCamera.disabled = true;
              chatInput.placeholder = "Por favor toma una decisión arriba...";
          }

          function enableChat() {
              if (chatInput) chatInput.disabled = false;
              if (btnTriggerCamera) btnTriggerCamera.disabled = false;
              chatInput.placeholder = "Pregúntale a DIA o describe tu comida...";
              chatInput.focus();
          }

          if (btnAdd) {
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
                currentMealText += `\n\nUsuario: ${queryText}\nIA: ${aiText}`;
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
          }

          if (btnSkip) {
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
          }

          dynamicMessages.appendChild(wrapper);

          // Guardar interacción en el historial del asistente
          recordInteractionToHistory(queryText, withImage, aiText);
        }

        function recordInteractionToHistory(queryText, withImage, adviceText) {
          try {
            const historyKey = 'dia_chat_history';
            let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            let activeId = sessionStorage.getItem('dia_active_chat_id');
            let chat = activeId ? history.find((c) => c.id === activeId) : null;
            const now = new Date();
            const timeStr = getCurrentTime();

            let category = 'Consulta IA';
            let icon = 'smart_toy';

            if (!chat) {
              const baseTitle = queryText ? queryText.trim() : (withImage ? 'Análisis de foto de plato' : 'Consulta Nutricional');
              const shortTitle = baseTitle.length > 45 ? baseTitle.substring(0, 45) + '...' : baseTitle;
              const formattedTitle = shortTitle.charAt(0).toUpperCase() + shortTitle.slice(1);

              chat = {
                id: 'chat-' + Date.now(),
                titulo: formattedTitle,
                primeraSolicitud: queryText || (withImage ? 'Analiza esta foto de mi plato' : 'Consulta nutricional'),
                fechaCreacion: now.toISOString(),
                categoria: category,
                icono: icon,
                hasImage: !!withImage,
                mensajes: []
              };
              history.unshift(chat);
              sessionStorage.setItem('dia_active_chat_id', chat.id);
            }

            chat.mensajes.push({
              sender: 'user',
              text: queryText || (withImage ? 'Analiza esta foto de mi plato' : ''),
              time: timeStr
            });
            chat.mensajes.push({
              sender: 'ai',
              text: adviceText,
              time: timeStr
            });

            localStorage.setItem(historyKey, JSON.stringify(history));

            const idPersona = localStorage.getItem('dia_id_persona');
            if (idPersona) {
                fetch('/api/historial-chat/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_persona: idPersona, chats: history })
                }).catch(e => console.warn('Error syncing history to server:', e));
            }
          } catch (err) {
            console.warn('Error al sincronizar historial:', err);
          }
        }

        function escapeHtml(str) {
          const div = document.createElement('div');
          div.textContent = str;
          return div.innerHTML;
        }

      })();
    }
  },
  'recordatorios.html': {
    id: 'recordatorios',
    title: 'DIA - Recordatorios de Comidas',
    headerTitle: 'Recordatorios',
    mainClass: 'flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-7xl w-full mx-auto pb-28 lg:pb-12',
    html: `
      <!-- ENCABEZADO PRINCIPAL DE LA VISTA -->
      <div class="p-5 sm:p-7 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-3xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary-container/30 shrink-0">
            <span class="material-symbols-outlined text-[30px] sm:text-[34px]">notifications_active</span>
          </div>
          <div>
            <div class="flex items-center gap-2.5 flex-wrap">
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold font-headline-xl text-on-surface">Recordatorios de Comidas</h1>
              <span id="rec-total-badge" class="px-3 py-0.5 rounded-full text-xs font-bold bg-primary-fixed/40 text-primary border border-primary-container/30">
                0 Activos
              </span>
            </div>
            <p class="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl">
              Configura alertas precisas para tu Desayuno, Almuerzo, Cena y Refacción. Mantén tus horarios de insulina y glucemia bajo control.
            </p>
          </div>
        </div>

        <!-- ACCIONES PRINCIPALES -->
        <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button 
            id="btn-test-notif-page" 
            type="button" 
            class="px-4 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-container-high text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
            title="Probar notificación nativa del navegador en PC"
          >
            <span class="material-symbols-outlined text-primary text-[20px]">notification_important</span>
            <span class="hidden sm:inline">Probar en PC</span>
            <span class="sm:hidden">Probar</span>
          </button>

          <button 
            id="btn-open-create-reminder-page" 
            type="button" 
            class="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0 font-bold"
          >
            <span class="material-symbols-outlined text-[20px]">add_alarm</span>
            <span>Nuevo Recordatorio</span>
          </button>
        </div>
      </div>

      <!-- BANNER DE ESTADO DE NOTIFICACIONES PC & ESTADÍSTICAS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Tarjeta de Permisos de PC -->
        <div class="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-xs flex flex-col justify-between gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-primary">laptop_mac</span>
              Notificaciones PC
            </span>
            <span id="pc-notif-status-badge" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant">
              Comprobando...
            </span>
          </div>
          <p class="text-xs text-on-surface-variant">
            Avisos sonoros y emergentes en tu navegador para que nunca olvides comer a tiempo.
          </p>
          <div class="pt-1">
            <button id="btn-request-pc-perm" type="button" class="w-full py-2 px-3 rounded-xl bg-primary-container/15 hover:bg-primary-container/25 text-primary text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>Activar notificaciones</span>
            </button>
          </div>
        </div>

        <!-- Tarjeta de Próxima Comida -->
        <div class="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-xs flex flex-col justify-between gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-amber-500">schedule</span>
              Próximo Recordatorio
            </span>
            <span id="rec-next-type-badge" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Pendiente
            </span>
          </div>
          <div class="flex items-baseline gap-2">
            <span id="rec-next-time" class="text-2xl sm:text-3xl font-black text-on-surface font-headline-xl">--:--</span>
            <span id="rec-next-name" class="text-xs font-bold text-on-surface-variant">Sin programar</span>
          </div>
          <p id="rec-next-anticipation" class="text-[11px] text-on-surface-variant/80">
            Avisará con 15 minutos de anticipación.
          </p>
        </div>

        <!-- Tarjeta de Frecuencia y Consistencia -->
        <div class="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-xs flex flex-col justify-between gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-emerald-600">health_and_safety</span>
              Impacto Glucémico
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Recomendado
            </span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Mantener horarios regulares para tus 4 comidas reduce hasta un <strong>40%</strong> la variabilidad glucémica en diabetes.
          </p>
          <div class="flex items-center gap-1.5 text-[11px] text-primary font-bold">
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Horarios estables = Mejor control</span>
          </div>
        </div>
      </div>

      <!-- BARRA DE FILTROS POR COMIDA -->
      <div class="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div class="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-2xl border border-surface-container-high/80 overflow-x-auto max-w-full no-scrollbar">
          <button type="button" data-filter="todos" class="btn-rec-filter px-3.5 py-1.5 rounded-xl text-xs font-bold bg-surface-container-lowest text-primary shadow-xs transition-all cursor-pointer">
            Todos
          </button>
          <button type="button" data-filter="Desayuno" class="btn-rec-filter px-3.5 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all cursor-pointer flex items-center gap-1">
            <span>🌅</span>
            <span>Desayuno</span>
          </button>
          <button type="button" data-filter="Almuerzo" class="btn-rec-filter px-3.5 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all cursor-pointer flex items-center gap-1">
            <span>☀️</span>
            <span>Almuerzo</span>
          </button>
          <button type="button" data-filter="Cena" class="btn-rec-filter px-3.5 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all cursor-pointer flex items-center gap-1">
            <span>🌙</span>
            <span>Cena</span>
          </button>
          <button type="button" data-filter="Refacción" class="btn-rec-filter px-3.5 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all cursor-pointer flex items-center gap-1">
            <span>🍎</span>
            <span>Refacción</span>
          </button>
        </div>

        <span id="rec-counter-text" class="text-xs text-on-surface-variant font-medium">
          Mostrando recordatorios
        </span>
      </div>

      <!-- GRID / LISTA DE RECORDATORIOS -->
      <div id="reminders-list-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 mb-8">
        <!-- Render dinámico desde initRecordatoriosView -->
      </div>

      <!-- ======================================================== -->
      <!-- MODAL PARA CREAR / EDITAR RECORDATORIO DE COMIDA        -->
      <!-- ======================================================== -->
      <div id="modal-crear-recordatorio" class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
        <div class="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-2xl border border-surface-container-high/80 z-10 flex flex-col max-h-[94vh] overflow-y-auto animate-message">
          
          <!-- Encabezado del modal -->
          <div class="flex items-center justify-between pb-4 border-b border-surface-container-high/60">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/25">
                <span class="material-symbols-outlined text-[24px]">alarm_on</span>
              </div>
              <div>
                <h3 id="modal-recordatorio-titulo" class="font-headline-md text-lg sm:text-xl text-on-surface font-extrabold">Nuevo Recordatorio de Comida</h3>
                <p class="text-xs text-on-surface-variant">Programa cuándo comer y con cuánto tiempo de anticipación avisarte.</p>
              </div>
            </div>
            <button id="btn-close-modal-rec" type="button" aria-label="Cerrar" class="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Formulario de Recordatorio -->
          <form id="form-recordatorio" class="flex flex-col gap-5 py-4">
            <input type="hidden" id="rec-id" value="" />

            <!-- 1. TÍTULO DEL RECORDATORIO: Desayuno, Almuerzo, Cena, Refacción -->
            <div>
              <label class="block text-xs font-bold text-on-surface mb-2">
                Tipo de Comida (Título del recordatorio) <span class="text-error">*</span>
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <label class="meal-radio-card cursor-pointer block">
                  <input type="radio" name="rec-titulo" value="Desayuno" class="sr-only" />
                  <div class="meal-option-box p-3 rounded-2xl border border-surface-container-high bg-surface-container-low hover:border-primary/50 text-center transition-all flex flex-col items-center gap-1.5 select-none">
                    <span class="text-xl">🌅</span>
                    <span class="text-xs font-bold text-on-surface">Desayuno</span>
                  </div>
                </label>

                <label class="meal-radio-card cursor-pointer block">
                  <input type="radio" name="rec-titulo" value="Almuerzo" class="sr-only" checked />
                  <div class="meal-option-box p-3 rounded-2xl border border-surface-container-high bg-surface-container-low hover:border-primary/50 text-center transition-all flex flex-col items-center gap-1.5 select-none">
                    <span class="text-xl">☀️</span>
                    <span class="text-xs font-bold text-on-surface">Almuerzo</span>
                  </div>
                </label>

                <label class="meal-radio-card cursor-pointer block">
                  <input type="radio" name="rec-titulo" value="Cena" class="sr-only" />
                  <div class="meal-option-box p-3 rounded-2xl border border-surface-container-high bg-surface-container-low hover:border-primary/50 text-center transition-all flex flex-col items-center gap-1.5 select-none">
                    <span class="text-xl">🌙</span>
                    <span class="text-xs font-bold text-on-surface">Cena</span>
                  </div>
                </label>

                <label class="meal-radio-card cursor-pointer block">
                  <input type="radio" name="rec-titulo" value="Refacción" class="sr-only" />
                  <div class="meal-option-box p-3 rounded-2xl border border-surface-container-high bg-surface-container-low hover:border-primary/50 text-center transition-all flex flex-col items-center gap-1.5 select-none">
                    <span class="text-xl">🍎</span>
                    <span class="text-xs font-bold text-on-surface">Refacción</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- 2. HORA Y DÍA -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label for="rec-hora" class="text-xs font-bold text-on-surface">
                    Hora de la comida <span class="text-error">*</span>
                  </label>
                  <span id="rec-hora-format-badge" class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary-fixed/40 text-primary border border-primary-container/30">
                    Formato: 12 Horas (AM/PM)
                  </span>
                </div>
                <input 
                  type="time" 
                  id="rec-hora" 
                  required 
                  value="12:30" 
                  class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-surface-container-high text-base text-on-surface focus:outline-none focus:border-primary font-bold transition-all cursor-pointer"
                />
                <div class="flex items-center justify-between mt-1.5 px-1">
                  <span id="rec-hora-preview" class="text-[11px] text-on-surface-variant font-medium">
                    Vista previa: <strong class="text-on-surface font-bold">12:30 PM</strong>
                  </span>
                </div>
              </div>

              <!-- 3. RECORDAR CON ANTICIPACIÓN (15m, 30m, 1h) -->
              <div>
                <label for="rec-anticipacion" class="block text-xs font-bold text-on-surface mb-1.5">
                  Recordar con anticipación <span class="text-error">*</span>
                </label>
                <select 
                  id="rec-anticipacion" 
                  required 
                  class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface focus:outline-none focus:border-primary font-medium transition-all cursor-pointer"
                >
                  <option value="15" selected>⏰ 15 minutos antes (Recomendado)</option>
                  <option value="30">⏰ 30 minutos antes</option>
                  <option value="60">⏰ 1 hora antes</option>
                  <option value="0">🔔 A la hora exacta</option>
                </select>
              </div>
            </div>

            <!-- SELECCIÓN DE DÍAS -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-on-surface">Días activos</label>
                <div class="flex items-center gap-1">
                  <button type="button" id="btn-days-all" class="text-[11px] px-2 py-0.5 rounded-md bg-surface-container text-primary font-bold hover:bg-surface-container-high transition-colors cursor-pointer">Todos</button>
                  <button type="button" id="btn-days-weekdays" class="text-[11px] px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors cursor-pointer">L - V</button>
                  <button type="button" id="btn-days-weekend" class="text-[11px] px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors cursor-pointer">Fin de semana</button>
                </div>
              </div>

              <div class="grid grid-cols-7 gap-1.5 text-center">
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Lunes" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Lun
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Martes" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Mar
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Miércoles" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Mié
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Jueves" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Jue
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Viernes" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Vie
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Sábado" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Sáb
                  </div>
                </label>
                <label class="cursor-pointer">
                  <input type="checkbox" name="rec-dias" value="Domingo" class="sr-only day-checkbox" checked />
                  <div class="day-box py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-bold text-on-surface-variant hover:border-primary transition-all select-none">
                    Dom
                  </div>
                </label>
              </div>
            </div>

            <!-- NOTA / SUGERENCIA PERSONALIZADA (OPCIONAL) -->
            <div>
              <label for="rec-nota" class="block text-xs font-bold text-on-surface mb-1.5">
                Nota personal o recordatorio médico (opcional)
              </label>
              <input 
                type="text" 
                id="rec-nota" 
                placeholder="Ej: Beber agua, medir glucosa antes de comer, preparar ensalada..." 
                class="w-full px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary transition-all font-medium"
              />
            </div>

            <!-- PIE DE ACCIONES DEL FORMULARIO -->
            <div class="pt-3 border-t border-surface-container-high/60 flex items-center justify-end gap-2.5">
              <button 
                type="button" 
                id="btn-cancel-modal-rec" 
                class="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-bold text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-sm flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-[19px]">save</span>
                <span>Guardar Recordatorio</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR RECORDATORIO -->
      <div id="modal-confirm-delete-rec" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div class="bg-surface-container-lowest rounded-3xl border border-surface-container-high max-w-md w-full p-6 shadow-2xl animate-message">
          <div class="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-[28px]">delete_forever</span>
          </div>
          <h3 class="text-lg font-bold font-headline-md text-on-surface mb-2">¿Eliminar este recordatorio?</h3>
          <p id="delete-rec-info-text" class="text-sm text-on-surface-variant leading-relaxed mb-6">
            Ya no recibirás alertas de navegador ni avisos para este tiempo de comida.
          </p>
          <div class="flex items-center justify-end gap-3">
            <button id="btn-cancel-delete-rec" type="button" class="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors cursor-pointer">Cancelar</button>
            <button id="btn-confirm-delete-rec" type="button" class="px-5 py-2.5 rounded-xl bg-error text-on-error font-bold text-sm shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer">Eliminar</button>
          </div>
        </div>
      </div>
    `,
    init: function () {
      if (typeof window.initRecordatoriosView === 'function') {
        window.initRecordatoriosView();
      }
    }
  }
};


/**
 * Controlador global para la vista Mi Progreso
 * Se ejecuta tanto en carga directa de mi_progreso.html como al navegar vía switchAppView()
 */
window.initMiProgreso = function() {
  let activePeriod = 'dia'; // 'dia' | 'semana' | 'mes'
  let dateOffset = 0; // 0 = hoy/actual, <0 = pasado, >0 = futuro

  const tabDia = document.getElementById('tab-dia');
  const tabSemana = document.getElementById('tab-semana');
  const tabMes = document.getElementById('tab-mes');
  const btnPrev = document.getElementById('btn-prev-period');
  const btnNext = document.getElementById('btn-next-period');
  const btnResetToday = document.getElementById('btn-reset-today');
  const btnTodayMobile = document.getElementById('btn-today-mobile');
  const periodDisplayLabel = document.getElementById('period-display-label');
  const periodIcon = document.getElementById('period-icon');
  const chartWrapper = document.getElementById('chart-svg-wrapper');
  const chartTooltip = document.getElementById('chart-tooltip');
  const chartMainTitle = document.getElementById('chart-main-title');
  const chartSubTitle = document.getElementById('chart-sub-title');
  const chartBadgePeriod = document.getElementById('chart-badge-period');
  const chartTotalKcal = document.getElementById('chart-total-kcal');
  const insightAiText = document.getElementById('insight-ai-text');

  if (!tabDia || !chartWrapper) return;

  const GOALS = {
    calorias: 2100,
    proteinas: 150,
    carbs: 250,
    grasas: 65,
    fibra: 32,
    agua: 3.0
  };

  try {
      const edad = parseInt(localStorage.getItem('dia_edad')) || 30;
      const peso = parseFloat(localStorage.getItem('dia_peso')) || 70;
      const altura = parseFloat(localStorage.getItem('dia_altura')) || 170;
      const generoId = localStorage.getItem('dia_genero') || localStorage.getItem('dia_genero_id') || '1';
      const generoNombre = localStorage.getItem('dia_genero_nombre') || '';

      let bmr = 0;
      if (generoId === '1' || generoNombre.toLowerCase().includes('masculino')) {
          bmr = 10 * peso + 6.25 * altura - 5 * edad + 5;
      } else {
          bmr = 10 * peso + 6.25 * altura - 5 * edad - 161;
      }
      const goalCal = Math.round(bmr * 1.2);
      GOALS.calorias = goalCal;
      // Proporciones saludables: 50% carbs, 25% prot, 25% grasas
      GOALS.carbs = Math.round((goalCal * 0.50) / 4);
      GOALS.proteinas = Math.round((goalCal * 0.25) / 4);
      GOALS.grasas = Math.round((goalCal * 0.25) / 9);
  } catch(e) {}

  const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  function getDateWithOffset() {
    const now = new Date();
    now.setHours(12, 0, 0, 0);

    if (activePeriod === 'dia') {
      const d = new Date(now);
      d.setDate(d.getDate() + dateOffset);
      return d;
    } else if (activePeriod === 'semana') {
      const d = new Date(now);
      d.setDate(d.getDate() + (dateOffset * 7));
      return d;
    } else if (activePeriod === 'mes') {
      const d = new Date(now);
      d.setMonth(d.getMonth() + dateOffset);
      return d;
    }
    return now;
  }

  function updatePeriodLabel() {
    const targetDate = getDateWithOffset();

    if (activePeriod === 'dia') {
      periodIcon.textContent = 'calendar_today';
      const dayName = DIAS_SEMANA[targetDate.getDay()];
      const dayNum = targetDate.getDate();
      const monthName = MESES[targetDate.getMonth()].slice(0, 3);

      if (dateOffset === 0) {
        periodDisplayLabel.textContent = `Hoy, ${dayName} ${dayNum} ${monthName}`;
      } else if (dateOffset === -1) {
        periodDisplayLabel.textContent = `Ayer, ${dayName} ${dayNum} ${monthName}`;
      } else if (dateOffset === 1) {
        periodDisplayLabel.textContent = `Mañana, ${dayName} ${dayNum} ${monthName}`;
      } else {
        periodDisplayLabel.textContent = `${dayName}, ${dayNum} ${monthName}`;
      }
    } else if (activePeriod === 'semana') {
      periodIcon.textContent = 'date_range';
      const d = new Date(targetDate);
      const dayOfWeek = d.getDay();
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(d);
      monday.setDate(d.getDate() + diffToMonday);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      const monDay = monday.getDate();
      const sunDay = sunday.getDate();
      const sunMonth = MESES[sunday.getMonth()].slice(0, 3);
      const monMonth = MESES[monday.getMonth()].slice(0, 3);

      if (dateOffset === 0) {
        periodDisplayLabel.textContent = `Esta semana (${monDay} – ${sunDay} ${sunMonth})`;
      } else if (dateOffset === -1) {
        periodDisplayLabel.textContent = `Semana anterior (${monDay} – ${sunDay} ${sunMonth})`;
      } else {
        periodDisplayLabel.textContent = `${monDay} ${monMonth} – ${sunDay} ${sunMonth}`;
      }
    } else if (activePeriod === 'mes') {
      periodIcon.textContent = 'calendar_month';
      const monthName = MESES[targetDate.getMonth()];
      const year = targetDate.getFullYear();

      if (dateOffset === 0) {
        periodDisplayLabel.textContent = `Este mes (${monthName} ${year})`;
      } else {
        periodDisplayLabel.textContent = `${monthName} ${year}`;
      }
    }

    if (dateOffset === 0) {
      if (btnResetToday) {
        btnResetToday.classList.add('hidden');
        btnResetToday.classList.remove('sm:inline-flex');
      }
      if (btnTodayMobile) {
        btnTodayMobile.classList.add('opacity-50', 'pointer-events-none');
      }
    } else {
      if (btnResetToday) {
        btnResetToday.classList.remove('hidden');
        btnResetToday.classList.add('sm:inline-flex');
      }
      if (btnTodayMobile) {
        btnTodayMobile.classList.remove('opacity-50', 'pointer-events-none');
      }
    }
  }

  async function generateNutritionData() {
    const seed = Math.abs((dateOffset * 37) + (activePeriod === 'dia' ? 11 : activePeriod === 'semana' ? 23 : 47)) % 100;
    const variation = (seed - 50) / 100;

    if (activePeriod === 'dia') {
      if (dateOffset === 0) {
        let cCal = 0, cProt = 0, cCarb = 0, cFat = 0, cFib = 0;
        let byCat = {
          Desayuno: { carbs: 0, protein: 0, fat: 0, kcal: 0, count: 0 },
          Almuerzo: { carbs: 0, protein: 0, fat: 0, kcal: 0, count: 0 },
          Cena: { carbs: 0, protein: 0, fat: 0, kcal: 0, count: 0 },
          Snack: { carbs: 0, protein: 0, fat: 0, kcal: 0, count: 0 }
        };

        try {
            const idPersona = localStorage.getItem('dia_id_persona') || 1;
            let baseUrl = '';
            const hostname = window.location.hostname;
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
                if (window.location.port !== '3000' && window.location.port !== '') baseUrl = 'http://localhost:3000';
            } else if (window.location.protocol === 'file:') {
                baseUrl = 'http://localhost:3000';
            } else if (hostname.includes('-5500.use2.devtunnels.ms') || hostname.match(/-5500\./)) {
                baseUrl = `https://${hostname.replace('-5500.', '-3000.')}`;
            }

            const res = await fetch(`${baseUrl}/api/comidas/hoy/${idPersona}`);
            if (res.ok) {
                const data = await res.json();
                cCal = data.resumen.calorias || 0;
                cCarb = data.resumen.carbohidratos || 0;
                cProt = data.resumen.proteinas || 0;
                cFat = data.resumen.grasas || 0;

                data.comidas.forEach(c => {
                    let cat = 'Snack';
                    if (c.id_tipocomida === 1) cat = 'Desayuno';
                    else if (c.id_tipocomida === 2) cat = 'Almuerzo';
                    else if (c.id_tipocomida === 3) cat = 'Cena';

                    byCat[cat].kcal += Number(c.total_calorias || 0);
                    byCat[cat].carbs += Number(c.total_carbohidratos || 0);
                    byCat[cat].protein += Number(c.total_proteina || 0);
                    byCat[cat].fat += Number(c.total_grasas || 0);
                    byCat[cat].count++;
                });
            }
        } catch (e) {
            console.error("Error obteniendo platos de hoy para progreso:", e);
        }

        const remainingKcal = Math.max(0, GOALS.calorias - cCal);
        const protPct = Math.round((cProt / GOALS.proteinas) * 100);
        let insightMsg = '';
        if (cCal === 0) {
          insightMsg = 'Aún no has registrado platillos hoy. Registra tus comidas para monitorear tus macros y progreso en tiempo real.';
        } else {
          insightMsg = `Has registrado ${cCal} kcal hoy. Estás a ${remainingKcal} kcal de tu meta calórica diaria con ${cProt}g de proteína (${protPct}% de tu meta).`;
        }

        return {
          totals: {
            calorias: cCal,
            proteinas: cProt,
            carbs: cCarb,
            grasas: cFat,
            fibra: cFib,
            agua: +(1.5 + Math.min(1.5, cCal / 1500)).toFixed(1)
          },
          bars: [
            { label: 'Desayuno', time: byCat.Desayuno.count > 0 ? `${byCat.Desayuno.count} reg.` : 'Pendiente', carbs: byCat.Desayuno.carbs, protein: byCat.Desayuno.protein, fat: byCat.Desayuno.fat, kcal: byCat.Desayuno.kcal },
            { label: 'Almuerzo', time: byCat.Almuerzo.count > 0 ? `${byCat.Almuerzo.count} reg.` : 'Pendiente', carbs: byCat.Almuerzo.carbs, protein: byCat.Almuerzo.protein, fat: byCat.Almuerzo.fat, kcal: byCat.Almuerzo.kcal },
            { label: 'Snack', time: byCat.Snack.count > 0 ? `${byCat.Snack.count} reg.` : 'Pendiente', carbs: byCat.Snack.carbs, protein: byCat.Snack.protein, fat: byCat.Snack.fat, kcal: byCat.Snack.kcal },
            { label: 'Cena', time: byCat.Cena.count > 0 ? `${byCat.Cena.count} reg.` : 'Pendiente', carbs: byCat.Cena.carbs, protein: byCat.Cena.protein, fat: byCat.Cena.fat, kcal: byCat.Cena.kcal }
          ],
          insight: insightMsg
        };
      } else {
        const cal = Math.round(1800 + variation * 400);
        const prot = Math.round(140 + variation * 30);
        const carb = Math.round(230 + variation * 50);
        const fat = Math.round(58 + variation * 15);
        const fib = Math.round(27 + variation * 8);
        const agu = +(2.2 + variation * 0.8).toFixed(1);

        return {
          totals: { calorias: cal, proteinas: prot, carbs: carb, grasas: fat, fibra: fib, agua: agu },
          bars: [
            { label: 'Desayuno', time: '08:15', carbs: Math.round(carb * 0.28), protein: Math.round(prot * 0.26), fat: Math.round(fat * 0.24), kcal: Math.round(cal * 0.27) },
            { label: 'Almuerzo', time: '13:30', carbs: Math.round(carb * 0.42), protein: Math.round(prot * 0.44), fat: Math.round(fat * 0.42), kcal: Math.round(cal * 0.42) },
            { label: 'Merienda', time: '17:00', carbs: Math.round(carb * 0.14), protein: Math.round(prot * 0.12), fat: Math.round(fat * 0.14), kcal: Math.round(cal * 0.13) },
            { label: 'Cena', time: '20:45', carbs: Math.round(carb * 0.16), protein: Math.round(prot * 0.18), fat: Math.round(fat * 0.20), kcal: Math.round(cal * 0.18) }
          ],
          insight: `En esta jornada registraste ${cal} kcal totales y un aporte proteico de ${prot}g, cumpliendo el ${Math.round((prot/GOALS.proteinas)*100)}% de tu meta.`
        };
      }
    } else if (activePeriod === 'semana') {
      const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      const bars = weekDays.map((dName, i) => {
        const dayFactor = 0.85 + (((seed + i * 17) % 30) / 100);
        const kcal = Math.round(GOALS.calorias * dayFactor);
        const protein = Math.round(GOALS.proteinas * dayFactor);
        const carbs = Math.round(GOALS.carbs * dayFactor);
        const fat = Math.round(GOALS.grasas * dayFactor);
        return { label: dName, carbs, protein, fat, kcal };
      });

      const avgCal = Math.round(bars.reduce((acc, b) => acc + b.kcal, 0) / 7);
      const avgProt = Math.round(bars.reduce((acc, b) => acc + b.protein, 0) / 7);
      const avgCarbs = Math.round(bars.reduce((acc, b) => acc + b.carbs, 0) / 7);
      const avgFat = Math.round(bars.reduce((acc, b) => acc + b.fat, 0) / 7);
      const avgFib = Math.round(29 + variation * 4);
      const avgAgu = +(2.5 + variation * 0.4).toFixed(1);

      return {
        totals: { calorias: avgCal, proteinas: avgProt, carbs: avgCarbs, grasas: avgFat, fibra: avgFib, agua: avgAgu },
        bars,
        insight: `Promedio semanal de ${avgCal} kcal/día. Tu distribución de carbohidratos y grasas saludables se mantuvo estable durante el período.`
      };
    } else if (activePeriod === 'mes') {
      const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'];
      const bars = weeks.map((wName, i) => {
        const wFactor = 0.9 + (((seed + i * 23) % 25) / 100);
        const kcal = Math.round(GOALS.calorias * wFactor);
        const protein = Math.round(GOALS.proteinas * wFactor);
        const carbs = Math.round(GOALS.carbs * wFactor);
        const fat = Math.round(GOALS.grasas * wFactor);
        return { label: wName, carbs, protein, fat, kcal };
      });

      const avgCal = Math.round(bars.reduce((acc, b) => acc + b.kcal, 0) / bars.length);
      const avgProt = Math.round(bars.reduce((acc, b) => acc + b.protein, 0) / bars.length);
      const avgCarbs = Math.round(bars.reduce((acc, b) => acc + b.carbs, 0) / bars.length);
      const avgFat = Math.round(bars.reduce((acc, b) => acc + b.fat, 0) / bars.length);
      const avgFib = 30;
      const avgAgu = 2.6;

      return {
        totals: { calorias: avgCal, proteinas: avgProt, carbs: avgCarbs, grasas: avgFat, fibra: avgFib, agua: avgAgu },
        bars,
        insight: `Rendimiento mensual óptimo: 88% de adherencia global a tus macronutrientes. Mayor balance en consumo de proteínas.`
      };
    }
  }

  function updateMetricCards(totals) {
    const calPct = Math.min(100, Math.round((totals.calorias / GOALS.calorias) * 100));
    const cardCalVal = document.getElementById('card-calorias-val');
    if (cardCalVal) cardCalVal.textContent = totals.calorias.toLocaleString('es-ES');
    const cardCalSub = document.getElementById('card-calorias-sub');
    if (cardCalSub) cardCalSub.textContent = `${calPct}% Meta`;
    const cardCalGoal = document.getElementById('card-calorias-goal');
    if (cardCalGoal) cardCalGoal.textContent = `Meta ${GOALS.calorias.toLocaleString('es-ES')}`;
    const cardCalBar = document.getElementById('card-calorias-bar');
    if (cardCalBar) cardCalBar.style.width = `${calPct}%`;

    const protPct = Math.min(100, Math.round((totals.proteinas / GOALS.proteinas) * 100));
    const cardProtVal = document.getElementById('card-proteinas-val');
    if (cardProtVal) cardProtVal.textContent = totals.proteinas;
    const cardProtSub = document.getElementById('card-proteinas-sub');
    if (cardProtSub) cardProtSub.textContent = `${protPct}% Meta`;
    const cardProtGoal = document.getElementById('card-proteinas-goal');
    if (cardProtGoal) cardProtGoal.textContent = `Meta ${GOALS.proteinas}g`;
    const cardProtBar = document.getElementById('card-proteinas-bar');
    if (cardProtBar) cardProtBar.style.width = `${protPct}%`;

    const carbsPct = Math.min(100, Math.round((totals.carbs / GOALS.carbs) * 100));
    const cardCarbsVal = document.getElementById('card-carbs-val');
    if (cardCarbsVal) cardCarbsVal.textContent = totals.carbs;
    const cardCarbsSub = document.getElementById('card-carbs-sub');
    if (cardCarbsSub) cardCarbsSub.textContent = `${carbsPct}% Meta`;
    const cardCarbsGoal = document.getElementById('card-carbs-goal');
    if (cardCarbsGoal) cardCarbsGoal.textContent = `Meta ${GOALS.carbs}g`;
    const cardCarbsBar = document.getElementById('card-carbs-bar');
    if (cardCarbsBar) cardCarbsBar.style.width = `${carbsPct}%`;

    const grasasPct = Math.min(100, Math.round((totals.grasas / GOALS.grasas) * 100));
    const cardGrasasVal = document.getElementById('card-grasas-val');
    if (cardGrasasVal) cardGrasasVal.textContent = totals.grasas;
    const cardGrasasSub = document.getElementById('card-grasas-sub');
    if (cardGrasasSub) cardGrasasSub.textContent = `${grasasPct}% Meta`;
    const cardGrasasGoal = document.getElementById('card-grasas-goal');
    if (cardGrasasGoal) cardGrasasGoal.textContent = `Meta ${GOALS.grasas}g`;
    const cardGrasasBar = document.getElementById('card-grasas-bar');
    if (cardGrasasBar) cardGrasasBar.style.width = `${grasasPct}%`;

    const fibraPct = Math.min(100, Math.round((totals.fibra / GOALS.fibra) * 100));
    const cardFibraVal = document.getElementById('card-fibra-val');
    if (cardFibraVal) cardFibraVal.textContent = totals.fibra;
    const cardFibraSub = document.getElementById('card-fibra-sub');
    if (cardFibraSub) cardFibraSub.textContent = `${fibraPct}% Meta`;
    const cardFibraGoal = document.getElementById('card-fibra-goal');
    if (cardFibraGoal) cardFibraGoal.textContent = `Meta ${GOALS.fibra}g`;
    const cardFibraBar = document.getElementById('card-fibra-bar');
    if (cardFibraBar) cardFibraBar.style.width = `${fibraPct}%`;

    const aguaPct = Math.min(100, Math.round((totals.agua / GOALS.agua) * 100));
    const cardAguaVal = document.getElementById('card-agua-val');
    if (cardAguaVal) cardAguaVal.textContent = totals.agua;
    const cardAguaSub = document.getElementById('card-agua-sub');
    if (cardAguaSub) cardAguaSub.textContent = `${aguaPct}% Meta`;
    const cardAguaGoal = document.getElementById('card-agua-goal');
    if (cardAguaGoal) cardAguaGoal.textContent = `Meta ${GOALS.agua} L`;
    const cardAguaBar = document.getElementById('card-agua-bar');
    if (cardAguaBar) cardAguaBar.style.width = `${aguaPct}%`;
  }

  function renderBarChart(barsData) {
    const width = 720;
    const height = 230;
    const padLeft = 46;
    const padRight = 20;
    const padTop = 32;
    const padBottom = 38;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const maxVal = Math.max(...barsData.map(b => b.kcal), 800) * 1.15;

    const yTicks = [0, Math.round(maxVal * 0.33), Math.round(maxVal * 0.66), Math.round(maxVal)];
    let gridLinesSvg = '';

    yTicks.forEach(tickVal => {
      const y = padTop + chartH - (tickVal / maxVal) * chartH;
      gridLinesSvg += `
        <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4,4" />
        <text x="${padLeft - 8}" y="${y + 3.5}" fill="currentColor" opacity="0.45" font-size="10" font-family="Plus Jakarta Sans, sans-serif" text-anchor="end">${tickVal}</text>
      `;
    });

    const numBars = barsData.length;
    const slotWidth = chartW / numBars;
    const barWidth = Math.min(slotWidth * 0.58, activePeriod === 'dia' ? 68 : activePeriod === 'semana' ? 44 : 54);

    let barsSvg = '';

    barsData.forEach((item, index) => {
      const cx = padLeft + (index * slotWidth) + (slotWidth / 2);
      const x = cx - (barWidth / 2);

      const cKcal = item.carbs * 4;
      const pKcal = item.protein * 4;
      const fKcal = item.fat * 9;
      const totalKcalCalc = cKcal + pKcal + fKcal || 1;

      const totalBarH = Math.max(12, (item.kcal / maxVal) * chartH);
      const carbsH = (cKcal / totalKcalCalc) * totalBarH;
      const protH = (pKcal / totalKcalCalc) * totalBarH;
      const fatH = (fKcal / totalKcalCalc) * totalBarH;

      const baseY = padTop + chartH;
      const carbsY = baseY - carbsH;
      const protY = carbsY - protH;
      const fatY = protY - fatH;

      barsSvg += `
        <g class="bar-group" data-index="${index}" style="cursor: pointer;">
          <rect x="${x - 8}" y="${padTop}" width="${barWidth + 16}" height="${chartH}" fill="transparent" />
          <rect class="bar-segment" x="${x}" y="${carbsY}" width="${barWidth}" height="${carbsH}" fill="#0284c7" rx="0" />
          <rect class="bar-segment" x="${x}" y="${protY}" width="${barWidth}" height="${protH}" fill="#10b981" rx="0" />
          <rect class="bar-segment" x="${x}" y="${fatY}" width="${barWidth}" height="${fatH}" fill="#f59e0b" rx="6" />
          <text x="${cx}" y="${fatY - 7}" fill="currentColor" opacity="0.85" font-size="11" font-weight="700" font-family="Plus Jakarta Sans, sans-serif" text-anchor="middle">
            ${item.kcal}
          </text>
          <text x="${cx}" y="${baseY + 18}" fill="currentColor" opacity="0.8" font-size="12" font-weight="600" font-family="Plus Jakarta Sans, sans-serif" text-anchor="middle">
            ${item.label}
          </text>
          ${item.time ? `
          <text x="${cx}" y="${baseY + 31}" fill="currentColor" opacity="0.45" font-size="10" font-family="Plus Jakarta Sans, sans-serif" text-anchor="middle">
            ${item.time}
          </text>` : ''}
        </g>
      `;
    });

    chartWrapper.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-56 sm:h-64 select-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
        ${gridLinesSvg}
        ${barsSvg}
      </svg>
    `;

    const barGroups = chartWrapper.querySelectorAll('.bar-group');
    barGroups.forEach(group => {
      const idx = parseInt(group.getAttribute('data-index'), 10);
      const data = barsData[idx];

      const showTooltip = (e) => {
        const rect = chartWrapper.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const posX = clientX - rect.left;
        const posY = clientY - rect.top;

        chartTooltip.innerHTML = `
          <div class="font-bold text-on-surface border-b border-surface-container-high/50 pb-1 flex items-center justify-between">
            <span>${data.label} ${data.time ? `(${data.time})` : ''}</span>
            <span class="text-primary font-black">${data.kcal} kcal</span>
          </div>
          <div class="flex items-center justify-between pt-1 text-[11px]">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#10b981]"></span>Proteínas:</span>
            <span class="font-bold text-on-surface">${data.protein}g <span class="opacity-60 font-normal">(${data.protein * 4} kcal)</span></span>
          </div>
          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>Carbos:</span>
            <span class="font-bold text-on-surface">${data.carbs}g <span class="opacity-60 font-normal">(${data.carbs * 4} kcal)</span></span>
          </div>
          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>Grasas:</span>
            <span class="font-bold text-on-surface">${data.fat}g <span class="opacity-60 font-normal">(${data.fat * 9} kcal)</span></span>
          </div>
        `;

        let tooltipLeft = posX - 80;
        if (tooltipLeft < 10) tooltipLeft = 10;
        if (tooltipLeft + 180 > rect.width) tooltipLeft = rect.width - 190;

        let tooltipTop = posY - 105;
        if (tooltipTop < 0) tooltipTop = posY + 20;

        chartTooltip.style.left = `${tooltipLeft}px`;
        chartTooltip.style.top = `${tooltipTop}px`;
        chartTooltip.style.opacity = '1';
      };

      group.addEventListener('mouseenter', showTooltip);
      group.addEventListener('mousemove', showTooltip);
      group.addEventListener('mouseleave', () => {
        chartTooltip.style.opacity = '0';
      });
      group.addEventListener('click', showTooltip);
      group.addEventListener('touchstart', showTooltip, { passive: true });
    });
  }

  async function updateView() {
    updatePeriodLabel();

    const data = await generateNutritionData();

    if (activePeriod === 'dia') {
      chartMainTitle.textContent = 'Distribución de Macronutrientes por Comida';
      chartSubTitle.textContent = 'Desglose calórico y gramos consumidos en cada momento del día';
      chartBadgePeriod.textContent = 'Vista Diaria';
      chartTotalKcal.textContent = `${data.totals.calorias.toLocaleString('es-ES')} kcal`;
    } else if (activePeriod === 'semana') {
      chartMainTitle.textContent = 'Consumo Diario de Macronutrientes';
      chartSubTitle.textContent = 'Comparativa de ingesta y equilibrio calórico de los 7 días de la semana';
      chartBadgePeriod.textContent = 'Vista Semanal';
      const sumWeek = data.bars.reduce((a, b) => a + b.kcal, 0);
      chartTotalKcal.textContent = `${sumWeek.toLocaleString('es-ES')} kcal (total)`;
    } else if (activePeriod === 'mes') {
      chartMainTitle.textContent = 'Consumo Semanal en el Mes';
      chartSubTitle.textContent = 'Evolución por semanas y adherencia al objetivo mensual';
      chartBadgePeriod.textContent = 'Vista Mensual';
      const sumMonth = data.bars.reduce((a, b) => a + b.kcal, 0);
      chartTotalKcal.textContent = `${sumMonth.toLocaleString('es-ES')} kcal (total)`;
    }

    if (insightAiText) insightAiText.textContent = data.insight;

    renderBarChart(data.bars);
    updateMetricCards(data.totals);
  }

  function setPeriod(period) {
    if (activePeriod === period) return;
    activePeriod = period;
    dateOffset = 0;

    [tabDia, tabSemana, tabMes].forEach(tab => {
      tab.className = 'flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-all';
    });

    if (period === 'dia') {
      tabDia.className = 'flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-primary-container text-on-primary shadow-sm';
    } else if (period === 'semana') {
      tabSemana.className = 'flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-primary-container text-on-primary shadow-sm';
    } else if (period === 'mes') {
      tabMes.className = 'flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-primary-container text-on-primary shadow-sm';
    }

    updateView();
  }

  tabDia.addEventListener('click', () => setPeriod('dia'));
  tabSemana.addEventListener('click', () => setPeriod('semana'));
  tabMes.addEventListener('click', () => setPeriod('mes'));

  btnPrev.addEventListener('click', () => {
    dateOffset--;
    updateView();
  });

  btnNext.addEventListener('click', () => {
    dateOffset++;
    updateView();
  });

  if (btnResetToday) {
    btnResetToday.addEventListener('click', () => {
      dateOffset = 0;
      updateView();
    });
  }
  if (btnTodayMobile) {
    btnTodayMobile.addEventListener('click', () => {
      dateOffset = 0;
      updateView();
    });
  }

  window.addEventListener('dia_platos_updated', () => {
    if (document.getElementById('chart-svg-wrapper')) {
      updateView();
    }
  });

  updateView();
};

// Auto-inicialización si se accede directamente a mi_progreso.html
if (typeof document !== 'undefined') {
  const initProgresoOnLoad = () => {
    const rawPath = window.location.pathname.split('/').pop() || '';
    const hash = (window.location.hash || '').replace('#', '').toLowerCase();
    if ((rawPath === 'mi_progreso.html' || hash === 'progreso') && typeof window.initMiProgreso === 'function') {
      window.initMiProgreso();
    }
    if ((rawPath === 'recordatorios.html' || hash === 'recordatorios') && typeof window.initRecordatoriosView === 'function') {
      window.initRecordatoriosView();
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgresoOnLoad);
  } else {
    initProgresoOnLoad();
  }
}

/**
 * Controlador global para la vista de Recordatorios de Comidas
 */
window.initRecordatoriosView = function () {
  if (!window.DiaRecordatorios) return;

  let currentFilter = 'todos';
  let deletingId = null;

  const grid = document.getElementById('reminders-list-grid');
  const badgeTotal = document.getElementById('rec-total-badge');
  const counterText = document.getElementById('rec-counter-text');
  const nextTimeEl = document.getElementById('rec-next-time');
  const nextNameEl = document.getElementById('rec-next-name');
  const nextTypeBadge = document.getElementById('rec-next-type-badge');
  const nextAnticipationEl = document.getElementById('rec-next-anticipation');
  const filterBtns = document.querySelectorAll('.btn-rec-filter');

  const modal = document.getElementById('modal-crear-recordatorio');
  const form = document.getElementById('form-recordatorio');
  const btnCloseModal = document.getElementById('btn-close-modal-rec');
  const btnCancelModal = document.getElementById('btn-cancel-modal-rec');
  const btnOpenCreate = document.getElementById('btn-open-create-reminder-page');
  const btnTestNotif = document.getElementById('btn-test-notif-page');
  const btnRequestPerm = document.getElementById('btn-request-pc-perm');

  const modalDelete = document.getElementById('modal-confirm-delete-rec');
  const btnConfirmDelete = document.getElementById('btn-confirm-delete-rec');
  const btnCancelDelete = document.getElementById('btn-cancel-delete-rec');
  const deleteInfoText = document.getElementById('delete-rec-info-text');

  // Helper formato dinámico (12h / 24h)
  function formatTime(timeStr) {
    if (window.DiaRecordatorios && typeof window.DiaRecordatorios.formatTime === 'function') {
      return window.DiaRecordatorios.formatTime(timeStr);
    }
    if (!timeStr) return '--:--';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hours12 = h % 12 || 12;
    const minutesStr = String(m).padStart(2, '0');
    return `${hours12}:${minutesStr} ${period}`;
  }

  // Sincronizar UI de estilos para los radio buttons de tipo de comida
  function syncMealRadioStyles() {
    if (!form) return;
    const radios = form.querySelectorAll('input[name="rec-titulo"]');
    radios.forEach((r) => {
      const box = r.closest('label').querySelector('.meal-option-box');
      if (!box) return;
      if (r.checked) {
        box.classList.add('border-primary', 'bg-primary-container/10', 'ring-2', 'ring-primary-container/30', 'shadow-sm');
        box.classList.remove('bg-surface-container-low', 'border-surface-container-high');
      } else {
        box.classList.remove('border-primary', 'bg-primary-container/10', 'ring-2', 'ring-primary-container/30', 'shadow-sm');
        box.classList.add('bg-surface-container-low', 'border-surface-container-high');
      }
    });
  }

  // Sincronizar UI de estilos para los checkboxes de días
  function syncDayCheckboxStyles() {
    if (!form) return;
    const checkboxes = form.querySelectorAll('input[name="rec-dias"]');
    checkboxes.forEach((chk) => {
      const box = chk.closest('label').querySelector('.day-box');
      if (!box) return;
      if (chk.checked) {
        box.classList.add('bg-primary-container', 'text-on-primary', 'border-primary-container', 'shadow-xs');
        box.classList.remove('bg-surface-container-low', 'text-on-surface-variant', 'border-surface-container-high');
      } else {
        box.classList.remove('bg-primary-container', 'text-on-primary', 'border-primary-container', 'shadow-xs');
        box.classList.add('bg-surface-container-low', 'text-on-surface-variant', 'border-surface-container-high');
      }
    });
  }

  // Actualizar Próximo Recordatorio del día
  function updateUpcomingReminder(reminders) {
    const activeList = reminders.filter((r) => r.activo);
    if (activeList.length === 0) {
      if (nextTimeEl) nextTimeEl.textContent = '--:--';
      if (nextNameEl) nextNameEl.textContent = 'Sin activos';
      if (nextTypeBadge) {
        nextTypeBadge.textContent = 'Pausados';
        nextTypeBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant';
      }
      if (nextAnticipationEl) nextAnticipationEl.textContent = 'Todos los recordatorios están desactivados.';
      return;
    }

    const now = new Date();
    const currentDayName = window.DiaRecordatorios.diasSemana[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Filtrar los que aplican hoy
    const todayReminders = activeList.filter((r) => !Array.isArray(r.dias) || r.dias.includes(currentDayName));

    // Buscar el próximo en lo que queda del día
    let next = null;
    let minDiff = Infinity;

    todayReminders.forEach((r) => {
      const [h, m] = (r.hora || '00:00').split(':').map(Number);
      const rMinutes = h * 60 + m;
      const diff = rMinutes - currentMinutes;
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        next = r;
      }
    });

    // Si ya pasaron todos hoy, tomar el primero de mañana
    if (!next) {
      const sorted = [...activeList].sort((a, b) => a.hora.localeCompare(b.hora));
      next = sorted[0];
    }

    if (next) {
      if (nextTimeEl) nextTimeEl.textContent = formatTime(next.hora);
      if (nextNameEl) nextNameEl.textContent = next.titulo;
      if (nextTypeBadge) {
        const config = window.DiaRecordatorios.tiposComida[next.titulo] || window.DiaRecordatorios.tiposComida.Almuerzo;
        nextTypeBadge.textContent = next.titulo;
        nextTypeBadge.className = `px-2.5 py-0.5 rounded-full text-[11px] font-bold ${config.colorBadge}`;
      }
      if (nextAnticipationEl) {
        nextAnticipationEl.textContent = next.anticipacion > 0
          ? `Te avisará ${next.anticipacion} minutos antes de comer.`
          : 'Te avisará a la hora exacta de la comida.';
      }
    }
  }

  // Renderizar tarjetas de recordatorios
  function renderList() {
    if (!grid) return;
    const allReminders = window.DiaRecordatorios.store.getAll();
    const activeCount = allReminders.filter((r) => r.activo).length;

    if (badgeTotal) {
      badgeTotal.textContent = `${activeCount} de ${allReminders.length} Activos`;
    }

    updateUpcomingReminder(allReminders);
    window.DiaRecordatorios.updatePermissionUI();

    // Filtrar según botón activo
    let filtered = allReminders;
    if (currentFilter !== 'todos') {
      filtered = allReminders.filter((r) => r.titulo.toLowerCase() === currentFilter.toLowerCase());
    }

    // Orden cronológico por hora
    filtered.sort((a, b) => (a.hora || '').localeCompare(b.hora || ''));

    if (counterText) {
      counterText.textContent = `Mostrando ${filtered.length} recordatorio${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.className = 'col-span-full mb-8';
      grid.innerHTML = `
        <div class="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 text-center shadow-xs">
          <div class="w-16 h-16 mx-auto mb-4 rounded-3xl bg-primary-container/15 text-primary flex items-center justify-center shadow-sm">
            <span class="material-symbols-outlined text-[36px]">alarm_off</span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-on-surface mb-1">
            ${currentFilter === 'todos' ? 'No tienes recordatorios creados' : `No hay recordatorios para ${currentFilter}`}
          </h3>
          <p class="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Programa alertas para tus comidas principales y mantén regularidad en tus tomas de glucosa y alimentos.
          </p>
          <button type="button" class="btn-create-first-rec px-6 py-3 rounded-2xl bg-primary-container text-on-primary font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">add_alarm</span>
            <span>Crear Recordatorio</span>
          </button>
        </div>
      `;

      const btnFirst = grid.querySelector('.btn-create-first-rec');
      if (btnFirst) {
        btnFirst.addEventListener('click', () => window.DiaRecordatorios.openCreateModal());
      }
      return;
    }

    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 mb-8';

    const DIAS_KEYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const DIAS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    grid.innerHTML = filtered
      .map((item) => {
        const config = window.DiaRecordatorios.tiposComida[item.titulo] || window.DiaRecordatorios.tiposComida.Almuerzo;
        const horaFormatted = formatTime(item.hora);
        const anticipacionTxt = item.anticipacion > 0 ? `⏰ Avisar ${item.anticipacion} min antes` : '🔔 A la hora exacta';

        const diasHtml = DIAS_KEYS.map((dKey, idx) => {
          const isSelected = Array.isArray(item.dias) && item.dias.includes(dKey);
          return `
            <span class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
              isSelected ? 'bg-primary-container text-on-primary shadow-2xs' : 'bg-surface-container text-on-surface-variant/40'
            }">
              ${DIAS_SHORT[idx]}
            </span>
          `;
        }).join('');

        return `
          <div class="relative rounded-3xl bg-surface-container-lowest border ${item.activo ? config.colorBorder : 'border-surface-container-high/60 opacity-80'} p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
            
            <!-- Fila superior: Tipo de comida y Toggle activo -->
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-2xl ${config.colorBg} ${config.colorText} flex items-center justify-center shrink-0 shadow-2xs">
                  <span class="material-symbols-outlined text-[22px]">${config.icono}</span>
                </div>
                <div>
                  <h4 class="font-bold text-sm sm:text-base text-on-surface font-headline-md">${item.titulo}</h4>
                  <span class="text-[11px] font-semibold text-on-surface-variant">${anticipacionTxt}</span>
                </div>
              </div>

              <!-- Switch Activo / Inactivo -->
              <label class="relative inline-flex items-center cursor-pointer select-none" title="${item.activo ? 'Desactivar recordatorio' : 'Activar recordatorio'}">
                <input type="checkbox" class="sr-only toggle-rec-active" data-id="${item.id}" ${item.activo ? 'checked' : ''} />
                <div class="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:bg-primary-container transition-colors"></div>
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-xs"></div>
              </label>
            </div>

            <!-- Hora destacada -->
            <div class="my-1">
              <div class="flex items-baseline gap-2">
                <span class="text-3xl sm:text-4xl font-black text-on-surface font-headline-xl tracking-tight">${horaFormatted}</span>
                <span class="text-xs font-bold text-on-surface-variant">(${item.hora} hrs)</span>
              </div>
              ${item.nota ? `<p class="text-xs text-on-surface-variant mt-1.5 italic bg-surface-container-low/50 p-2 rounded-xl border border-surface-container-high/40">"${item.nota}"</p>` : ''}
            </div>

            <!-- Días de la semana activos -->
            <div class="flex items-center gap-1 pt-1 border-t border-surface-container-high/40">
              ${diasHtml}
            </div>

            <!-- Botones de Acción de la tarjeta -->
            <div class="pt-3 border-t border-surface-container-high/40 flex items-center justify-between gap-2">
              <button 
                type="button" 
                class="btn-test-single-rec px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                data-id="${item.id}"
                title="Probar sonido y notificación de este recordatorio"
              >
                <span class="material-symbols-outlined text-[16px] text-primary">notifications_active</span>
                <span>Probar</span>
              </button>

              <div class="flex items-center gap-1.5">
                <button 
                  type="button" 
                  class="btn-edit-rec w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary flex items-center justify-center transition-all cursor-pointer"
                  data-id="${item.id}"
                  title="Editar este recordatorio"
                >
                  <span class="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button 
                  type="button" 
                  class="btn-delete-rec w-8 h-8 rounded-xl bg-surface-container hover:bg-error/15 text-on-surface-variant hover:text-error flex items-center justify-center transition-all cursor-pointer"
                  data-id="${item.id}"
                  title="Eliminar este recordatorio"
                >
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>

          </div>
        `;
      })
      .join('');

    // Vincular switches de activación
    grid.querySelectorAll('.toggle-rec-active').forEach((toggle) => {
      toggle.addEventListener('change', (e) => {
        const id = toggle.getAttribute('data-id');
        const newState = window.DiaRecordatorios.store.toggle(id);
        window.DiaRecordatorios.showToast(
          newState ? 'Recordatorio activado 🔔' : 'Recordatorio pausado ⏸️',
          'info'
        );
        renderList();
      });
    });

    // Vincular prueba de recordatorio individual
    grid.querySelectorAll('.btn-test-single-rec').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = window.DiaRecordatorios.store.getById(id);
        if (item) {
          const config = window.DiaRecordatorios.tiposComida[item.titulo] || window.DiaRecordatorios.tiposComida.Almuerzo;
          const anticipacionTxt = item.anticipacion > 0 ? ` (Aviso con ${item.anticipacion} min de antelación)` : '';
          window.DiaRecordatorios.engine.sendBrowserNotification(
            `🍽️ ${item.titulo} - ${formatTime(item.hora)}${anticipacionTxt}`,
            item.nota || config.sugerencia,
            `test-${item.id}`
          );
        }
      });
    });

    // Vincular edición
    grid.querySelectorAll('.btn-edit-rec').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = window.DiaRecordatorios.store.getById(id);
        if (item) {
          window.DiaRecordatorios.openCreateModal(item);
        }
      });
    });

    // Vincular eliminación
    grid.querySelectorAll('.btn-delete-rec').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = window.DiaRecordatorios.store.getById(id);
        if (item && modalDelete) {
          deletingId = id;
          if (deleteInfoText) {
            deleteInfoText.textContent = `¿Estás seguro de que deseas eliminar el recordatorio de "${item.titulo}" a las ${formatTime(item.hora)}?`;
          }
          modalDelete.classList.remove('hidden');
          modalDelete.classList.add('flex');
        }
      });
    });
  }

  // Vincular botones de filtro
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-xs');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-xs');
      btn.classList.remove('text-on-surface-variant');
      currentFilter = btn.getAttribute('data-filter') || 'todos';
      renderList();
    });
  });

  // Modal Abrir / Cerrar
  if (btnOpenCreate) {
    btnOpenCreate.addEventListener('click', () => window.DiaRecordatorios.openCreateModal());
  }
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => window.DiaRecordatorios.closeCreateModal());
  }
  if (btnCancelModal) {
    btnCancelModal.addEventListener('click', () => window.DiaRecordatorios.closeCreateModal());
  }

  // Probar notificación de PC
  if (btnTestNotif) {
    btnTestNotif.addEventListener('click', () => window.DiaRecordatorios.engine.testNotification());
  }
  if (btnRequestPerm) {
    btnRequestPerm.addEventListener('click', () => window.DiaRecordatorios.engine.requestPermission());
  }

  // Confirmar eliminación
  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
      if (deletingId) {
        window.DiaRecordatorios.store.delete(deletingId);
        window.DiaRecordatorios.showToast('Recordatorio eliminado correctamente 🗑️', 'info');
        deletingId = null;
      }
      if (modalDelete) {
        modalDelete.classList.add('hidden');
        modalDelete.classList.remove('flex');
      }
      renderList();
    });
  }
  if (btnCancelDelete) {
    btnCancelDelete.addEventListener('click', () => {
      deletingId = null;
      if (modalDelete) {
        modalDelete.classList.add('hidden');
        modalDelete.classList.remove('flex');
      }
    });
  }

  // Botones de selección rápida de días en modal
  const btnDaysAll = document.getElementById('btn-days-all');
  const btnDaysWeekdays = document.getElementById('btn-days-weekdays');
  const btnDaysWeekend = document.getElementById('btn-days-weekend');

  if (btnDaysAll) {
    btnDaysAll.addEventListener('click', () => {
      form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => (chk.checked = true));
      syncDayCheckboxStyles();
    });
  }
  if (btnDaysWeekdays) {
    btnDaysWeekdays.addEventListener('click', () => {
      form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => {
        chk.checked = chk.value !== 'Sábado' && chk.value !== 'Domingo';
      });
      syncDayCheckboxStyles();
    });
  }
  if (btnDaysWeekend) {
    btnDaysWeekend.addEventListener('click', () => {
      form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => {
        chk.checked = chk.value === 'Sábado' || chk.value === 'Domingo';
      });
      syncDayCheckboxStyles();
    });
  }

  // Listener para radios y checkboxes del formulario
  if (form) {
    form.querySelectorAll('input[name="rec-titulo"]').forEach((r) => {
      r.addEventListener('change', syncMealRadioStyles);
    });
    form.querySelectorAll('input[name="rec-dias"]').forEach((chk) => {
      chk.addEventListener('change', syncDayCheckboxStyles);
    });

    // Envío del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = document.getElementById('rec-id').value;
      const radioChecked = form.querySelector('input[name="rec-titulo"]:checked');
      const titulo = radioChecked ? radioChecked.value : 'Almuerzo';
      const hora = document.getElementById('rec-hora').value || '12:30';
      const anticipacion = Number(document.getElementById('rec-anticipacion').value) || 0;
      const nota = (document.getElementById('rec-nota').value || '').trim();

      const selectedDays = [];
      form.querySelectorAll('input[name="rec-dias"]:checked').forEach((chk) => {
        selectedDays.push(chk.value);
      });

      const recordatorioData = {
        titulo: titulo,
        hora: hora,
        dias: selectedDays.length > 0 ? selectedDays : [...window.DiaRecordatorios.diasSemana],
        anticipacion: anticipacion,
        nota: nota,
        activo: true
      };

      if (id) {
        window.DiaRecordatorios.store.update(id, recordatorioData);
        window.DiaRecordatorios.showToast(`Recordatorio de ${titulo} actualizado ✨`, 'success');
      } else {
        window.DiaRecordatorios.store.add(recordatorioData);
        window.DiaRecordatorios.showToast(`¡Nuevo recordatorio de ${titulo} guardado! 🔔`, 'success');
      }

      window.DiaRecordatorios.closeCreateModal();
      renderList();
    });
  }

  // Escuchar cambios de otros eventos
  window.addEventListener('dia_recordatorios_updated', () => {
    if (document.getElementById('reminders-list-grid')) {
      renderList();
    }
  });

  window.addEventListener('dia_time_format_changed', () => {
    if (document.getElementById('reminders-list-grid')) {
      renderList();
      if (window.DiaRecordatorios && typeof window.DiaRecordatorios.updateModalTimeFormatHint === 'function') {
        window.DiaRecordatorios.updateModalTimeFormatHint();
      }
    }
  });

  // Render inicial
  renderList();
  syncMealRadioStyles();
  syncDayCheckboxStyles();
  if (window.DiaRecordatorios && typeof window.DiaRecordatorios.updateModalTimeFormatHint === 'function') {
    window.DiaRecordatorios.updateModalTimeFormatHint();
  }
};

