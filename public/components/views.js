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
    html: "<!-- HEADER M\u00d3VIL (Visible \u00fanicamente en m\u00f3vil < lg) -->\n        <div class=\"lg:hidden flex items-center justify-between pt-safe pb-5\">\n          <div class=\"flex items-center gap-space-sm\">\n            <div class=\"relative w-12 h-12 rounded-full overflow-hidden shadow-sm bg-surface-container ring-2 ring-primary/20\" title=\"[Foto de perfil]\">\n              <img alt=\"[Foto de perfil de usuario]\" class=\"w-full h-full object-cover\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e2e8f0'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%2394a3b8'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24z' fill='%2394a3b8'/%3E%3C/svg%3E\" />\n            </div>\n            <div class=\"flex flex-col\">\n              <span class=\"font-label-md text-label-md text-on-surface-variant flex items-center gap-1\">\n                \u00a1Buenos d\u00edas!\n                <span class=\"inline-block animate-pulse text-xs\">\u2728</span>\n              </span>\n              <span class=\"font-headline-md text-headline-md text-on-surface\">[Nombre del Usuario]</span>\n            </div>\n          </div>\n          <!-- Acciones R\u00e1pidas M\u00f3viles -->\n          <div class=\"flex items-center gap-space-xs\">\n            <button aria-label=\"Notificaciones\" class=\"relative w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[22px]\">notifications</span>\n              <span class=\"absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest\"></span>\n            </button>\n            <button aria-label=\"Ajustes y preferencias\" class=\"w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[22px]\">settings</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- ENCABEZADO DE SECCI\u00d3N PRINCIPAL PARA ESCRITORIO CON ACCIONES R\u00c1PIDAS -->\n        <div class=\"hidden lg:flex items-center justify-between mb-6\">\n          <div class=\"flex flex-col\">\n            <h1 class=\"font-headline-xl text-2xl xl:text-3xl text-on-surface flex items-center gap-2\">\n              \u00a1Buenos d\u00edas, [Nombre del Usuario]! <span class=\"text-xl\">\u2728</span>\n            </h1>\n            <p class=\"font-body-md text-on-surface-variant mt-1\">\n              Est\u00e1s a <span class=\"font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed/40\">460 kcal</span> de completar tu objetivo del d\u00eda\n            </p>\n          </div>\n          <!-- Acciones Principales -->\n          <div class=\"flex items-center gap-3\">\n            <a href=\"#asistente-ia\" class=\"px-4 py-2.5 rounded-full bg-surface-container-lowest border border-primary-container/30 text-on-surface hover:bg-surface-container-low font-headline-md text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-primary text-[20px]\">photo_camera</span>\n              <span class=\"text-primary font-bold\">Escanear con IA</span>\n              <span class=\"material-symbols-outlined text-on-surface-variant text-[16px]\">chevron_right</span>\n            </a>\n            <button class=\"px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-sm flex items-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[20px]\">add</span>\n              <span>Registrar Comida</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- CUADR\u00cdCULA DE 2 COLUMNAS PARA ESCRITORIO (En m\u00f3vil fluye en 1 columna) -->\n        <div class=\"grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start\">\n          \n          <!-- COLUMNA PRINCIPAL / IZQUIERDA (lg:col-span-7 xl:col-span-8) -->\n          <div class=\"lg:col-span-7 xl:col-span-8 flex flex-col gap-6\">\n            \n            <!-- 1. Tarjeta de Racha Diaria & Progreso -->\n            <div class=\"relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-fixed via-primary-container to-secondary p-card-padding shadow-[0_12px_28px_-6px_rgba(16,185,129,0.3)]\">\n              <!-- C\u00edrculo decorativo difuso -->\n              <div class=\"absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/20 blur-2xl pointer-events-none\"></div>\n              <div class=\"relative z-10 flex items-center justify-between\">\n                <div class=\"flex flex-col gap-space-2xs max-w-[62%] sm:max-w-[70%]\">\n                  <div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/30 backdrop-blur-md w-fit\">\n                    <span class=\"material-symbols-outlined text-on-primary-container text-[16px]\">bolt</span>\n                    <span class=\"font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-bold\">Racha diaria</span>\n                  </div>\n                  <h2 class=\"font-headline-lg text-lg sm:text-xl lg:text-2xl text-on-primary-container pt-1 font-extrabold\">\n                    Tu progreso: 15 D\u00cdAS de racha activa \ud83d\udd25\n                  </h2>\n                  <p class=\"font-body-sm text-body-sm text-on-primary-container/85 leading-relaxed\">\n                    \u00a1Completaste el <strong>85%</strong> de tu meta cal\u00f3rica de hoy! Mant\u00e9n la consistencia para alcanzar tu r\u00e9cord personal de 21 d\u00edas consecutivos.\n                  </p>\n                </div>\n                <!-- Gr\u00e1fico Circular con D\u00edas e \u00cdcono de Fuego -->\n                <div class=\"relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0\">\n                  <svg class=\"w-full h-full -rotate-90\" viewBox=\"0 0 88 88\">\n                    <circle cx=\"44\" cy=\"44\" fill=\"none\" r=\"36\" stroke=\"rgba(255,255,255,0.3)\" stroke-width=\"7\"></circle>\n                    <circle cx=\"44\" cy=\"44\" fill=\"none\" r=\"36\" stroke=\"#ffffff\" stroke-dasharray=\"226\" stroke-dashoffset=\"34\" stroke-linecap=\"round\" stroke-width=\"7\"></circle>\n                  </svg>\n                  <div class=\"absolute inset-0 flex flex-col items-center justify-center text-center\">\n                    <span class=\"text-[10px] font-bold text-on-primary uppercase tracking-tight\">85% META</span>\n                    <div class=\"flex items-center justify-center gap-0.5 mt-0.5\">\n                      <span class=\"font-numeric-hero text-xl sm:text-2xl text-on-primary font-black leading-none\">15</span>\n                      <span class=\"material-symbols-outlined text-[16px] text-tertiary-fixed fill-current\" style=\"font-variation-settings: &quot;FILL&quot; 1\">local_fire_department</span>\n                    </div>\n                    <span class=\"font-label-sm text-[10px] text-on-primary/90 font-semibold uppercase tracking-wide\">d\u00edas</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- 2. Secci\u00f3n Calendario Semanal -->\n            <div class=\"flex flex-col gap-space-sm\">\n              <div class=\"flex items-center justify-between\">\n                <div class=\"flex items-center gap-2\">\n                  <span class=\"material-symbols-outlined text-on-surface-variant text-[20px]\">calendar_today</span>\n                  <h3 class=\"font-headline-md text-headline-md text-on-surface\">Agosto 2025</h3>\n                  <span class=\"px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-wider\">Semana 33</span>\n                </div>\n                <div class=\"flex items-center gap-space-xs\">\n                  <span class=\"hidden sm:inline font-title-sm text-body-sm text-on-surface-variant font-medium\">10 \u2013 16 Ago</span>\n                  <div class=\"flex items-center gap-1 bg-surface-container-low rounded-full p-0.5\">\n                    <button aria-label=\"Semana anterior\" class=\"w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n                      <span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n                    </button>\n                    <button aria-label=\"Semana siguiente\" class=\"w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n                      <span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Tira Semanal de D\u00edas -->\n              <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30\">\n                <div class=\"grid grid-cols-7 gap-1.5 sm:gap-2 text-center\">\n                  <!-- DOM 07: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">DOM</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">07</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- LUN 08: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">LUN</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">08</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- MAR 09: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">MAR</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">09</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- HOY 10: Activo Destacado -->\n                  <button class=\"flex flex-col items-center gap-1 py-2 rounded-2xl bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(16,185,129,0.4)] scale-105\">\n                    <span class=\"text-[10px] font-black uppercase tracking-wider text-on-primary/90\">\u25cf HOY</span>\n                    <span class=\"font-title-sm text-title-sm text-on-primary font-extrabold\">10</span>\n                    <span class=\"text-[11px] font-bold text-on-primary/95\">1,640 kcal</span>\n                  </button>\n                  <!-- JUE 11: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">JUE</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">11</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                  <!-- VIE 12: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">VIE</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">12</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                  <!-- SÁB 13: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">S\u00c1B</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">13</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <!-- 3. Secci\u00f3n Bit\u00e1cora Diaria (\"Mis comidas de hoy\") -->\n            <div class=\"flex flex-col gap-space-sm\">\n              <div class=\"flex flex-col sm:flex-row sm:items-center justify-between gap-1\">\n                <div>\n                  <span class=\"font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold\">Bit\u00e1cora Diaria</span>\n                  <h3 class=\"font-headline-md text-headline-md text-on-surface\">Mis comidas de hoy</h3>\n                </div>\n                <div class=\"flex flex-col sm:items-end\">\n                  <div class=\"flex items-center gap-1\">\n                    <span class=\"font-headline-md text-lg text-primary font-black\">1,640</span>\n                    <span class=\"font-body-md text-on-surface-variant font-medium\">/ 2,100 kcal</span>\n                  </div>\n                  <div class=\"w-36 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1\">\n                    <div class=\"h-full bg-primary-container rounded-full\" style=\"width: 78%;\"></div>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Lista de Comidas del D\u00eda -->\n              <div class=\"flex flex-col gap-space-sm\">\n                <!-- Card: Desayuno -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Desayuno]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Desayuno</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del plato / Ingredientes del desayuno]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">480 \u2013 520 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">08:30 AM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de desayuno\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Almuerzo -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Almuerzo]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Almuerzo</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del plato / Ingredientes del almuerzo]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">650 \u2013 710 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">01:45 PM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de almuerzo\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Snack / Refacci\u00f3n -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Snack]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Refacci\u00f3n / Snack</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del snack / Ingredientes de la refacci\u00f3n]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">210 \u2013 240 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">05:15 PM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de refacci\u00f3n\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Cena (A\u00fan no registrada) -->\n                <div class=\"group flex flex-col sm:flex-row sm:items-center justify-between p-card-padding bg-surface-container-low/40 rounded-2xl border-2 border-dashed border-surface-container-high hover:border-primary-container/60 hover:bg-surface-container-lowest transition-all gap-4\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0\">\n                      <span class=\"material-symbols-outlined text-[28px] text-primary\">restaurant</span>\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Cena</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-medium\">\n                          <span class=\"material-symbols-outlined text-[13px]\">schedule</span>\n                          A\u00fan no registrada\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant mt-0.5\">Sugerido para tu objetivo: [Sugerencia de comida / Men\u00fa recomendado]</p>\n                      <div class=\"flex items-center gap-1 text-on-surface-variant pt-1\">\n                        <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                        <span class=\"font-body-sm text-[12px] font-semibold\">Sugerido: 450 \u2013 550 kcal</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button class=\"px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary/90 active:scale-95 transition-all self-end sm:self-center shrink-0\">\n                    <span class=\"material-symbols-outlined text-[16px]\">add</span>\n                    <span>Registrar cena</span>\n                  </button>\n                </div>\n              </div>\n\n              <!-- Bot\u00f3n Destacado CTA: + Registrar Comida -->\n              <div class=\"pt-2\">\n                <button class=\"w-full py-3.5 px-card-padding rounded-2xl bg-primary-container hover:bg-secondary text-on-primary font-headline-md text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] active:scale-[0.99] transition-all\">\n                  <span class=\"material-symbols-outlined text-[22px]\">add_circle</span>\n                  <span>Registrar Comida</span>\n                </button>\n              </div>\n            </div>\n          </div>\n\n          <!-- COLUMNA LATERAL DERECHA (lg:col-span-5 xl:col-span-4) -->\n          <div class=\"lg:col-span-5 xl:col-span-4 flex flex-col gap-6\">\n            \n            <!-- PANEL 1: \"Mi progreso\" (Macros de Hoy & Balance Nutricional) -->\n            <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-4\">\n              <!-- Encabezado con t\u00edtulo \"Mi progreso\" y bot\u00f3n que redirige a mi_progreso.html -->\n              <div class=\"flex items-center justify-between border-b border-surface-container-high/50 pb-3\">\n                <div class=\"flex flex-col\">\n                  <span class=\"font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold\">Balance Nutricional</span>\n                  <h3 class=\"font-headline-md text-lg text-on-surface font-bold\">Mi progreso</h3>\n                </div>\n                <!-- Bot\u00f3n estilo navegaci\u00f3n Mi Progreso hacia mi_progreso.html -->\n                <a href=\"mi_progreso.html\" aria-label=\"Ir a Mi progreso\" class=\"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container/15 text-primary hover:bg-primary-container hover:text-on-primary transition-all font-title-sm text-xs font-bold group\">\n                  <span class=\"material-symbols-outlined text-[18px]\">trending_up</span>\n                  <span>Mi progreso</span>\n                  <span class=\"material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform\">chevron_right</span>\n                </a>\n              </div>\n\n              <!-- Calor\u00edas Restantes -->\n              <div class=\"flex items-center justify-between bg-surface-container-low/70 rounded-xl p-3\">\n                <div class=\"flex flex-col\">\n                  <span class=\"font-body-sm text-xs text-on-surface-variant\">Calor\u00edas restantes</span>\n                  <div class=\"flex items-baseline gap-1 mt-0.5\">\n                    <span class=\"font-headline-lg text-2xl font-black text-primary\">460</span>\n                    <span class=\"font-body-sm text-xs text-on-surface-variant font-semibold\">kcal libres</span>\n                  </div>\n                </div>\n                <div class=\"w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center\">\n                  <span class=\"material-symbols-outlined text-[20px]\">flag</span>\n                </div>\n              </div>\n\n              <!-- Gr\u00e1fico Donut de Calor\u00edas -->\n              <div class=\"relative w-40 h-40 mx-auto my-1 flex items-center justify-center\">\n                <svg class=\"w-full h-full -rotate-90\" viewBox=\"0 0 100 100\">\n                  <!-- C\u00edrculo de fondo -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#f2f3ff\" stroke-width=\"10\"></circle>\n                  <!-- Progreso Grasas (20%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#ffb95f\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"200\" stroke-linecap=\"round\" stroke-width=\"10\" transform=\"rotate(270 50 50)\"></circle>\n                  <!-- Progreso Prote\u00ednas (30%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#6bff8f\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"175\" stroke-linecap=\"round\" stroke-width=\"10\" transform=\"rotate(160 50 50)\"></circle>\n                  <!-- Progreso Carbohidratos (50%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#10b981\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"125\" stroke-linecap=\"round\" stroke-width=\"10\"></circle>\n                </svg>\n                <div class=\"absolute inset-0 flex flex-col items-center justify-center text-center\">\n                  <span class=\"font-label-sm text-[10px] text-on-surface-variant font-bold uppercase tracking-wider\">Total</span>\n                  <span class=\"font-headline-md text-xl font-black text-on-surface leading-tight\">1,640</span>\n                  <span class=\"font-body-sm text-[11px] text-on-surface-variant font-semibold\">kcal consumidas</span>\n                </div>\n              </div>\n\n              <!-- Desglose de Macronutrientes -->\n              <div class=\"flex flex-col gap-2.5 pt-1\">\n                <!-- Carbohidratos -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#10b981]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Carbohidratos</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">220g <span class=\"text-on-surface-variant font-normal text-[11px]\">(50%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#10b981] rounded-full\" style=\"width: 50%;\"></div>\n                  </div>\n                </div>\n\n                <!-- Prote\u00ednas -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#6bff8f]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Prote\u00ednas</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">135g <span class=\"text-on-surface-variant font-normal text-[11px]\">(30%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#6bff8f] rounded-full\" style=\"width: 30%;\"></div>\n                  </div>\n                </div>\n\n                <!-- Grasas -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffb95f]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Grasas</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">52g <span class=\"text-on-surface-variant font-normal text-[11px]\">(20%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#ffb95f] rounded-full\" style=\"width: 20%;\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- PANEL 2: \"Acceso R\u00e1pido Asistente IA\" -->\n            <div id=\"asistente-ia\" class=\"relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-surface-container-low/60 to-primary-fixed/20 rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-primary-fixed/40 flex flex-col gap-3\">\n              <div class=\"flex items-center justify-between\">\n                <div class=\"w-11 h-11 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30\">\n                  <span class=\"material-symbols-outlined text-[24px]\">photo_camera</span>\n                </div>\n                <span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-[11px] font-bold\">\n                  <span class=\"material-symbols-outlined text-[14px]\">auto_awesome</span>\n                  Visi\u00f3n IA\n                </span>\n              </div>\n              <div>\n                <h3 class=\"font-headline-md text-base text-on-surface font-bold\">Acceso R\u00e1pido Asistente IA</h3>\n                <p class=\"font-body-sm text-[13px] text-on-surface-variant mt-1 leading-relaxed\">\n                  Sube o toma una foto de tu plato para desglosar ingredientes, gramos y calor\u00edas autom\u00e1ticamente en 3 segundos.\n                </p>\n              </div>\n              <button class=\"w-full mt-1 py-2.5 px-4 rounded-xl bg-surface-container-lowest border border-primary-container/40 text-primary font-title-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary shadow-sm active:scale-95 transition-all\">\n                <span class=\"material-symbols-outlined text-[18px]\">document_scanner</span>\n                <span>Escanear Plato con IA</span>\n              </button>\n            </div>\n\n            <!-- PANEL 3: \"Platos Favoritos\" -->\n            <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-3\">\n              <div class=\"flex items-center justify-between border-b border-surface-container-high/40 pb-2.5\">\n                <div class=\"flex items-center gap-2\">\n                  <span class=\"material-symbols-outlined text-primary text-[20px]\">bookmark</span>\n                  <h3 class=\"font-headline-md text-base text-on-surface font-bold\">Platos Favoritos</h3>\n                </div>\n                <a href=\"#\" class=\"font-label-sm text-xs text-primary hover:underline font-bold\">Ver todos</a>\n              </div>\n\n              <!-- Lista de 3 Platos Favoritos -->\n              <div class=\"flex flex-col gap-2.5\">\n                <!-- Favorito 1 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 1]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 1]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">380 kcal</span>\n                    </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 1]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>\n                </div>\n\n                <!-- Favorito 2 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 2]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 2]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">510 kcal</span>\n                    </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 2]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>
                </div>\n\n                <!-- Favorito 3 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 3]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 3]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">290 kcal</span>\n                      </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 3]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n        </div>"
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

  function generateNutritionData() {
    const seed = Math.abs((dateOffset * 37) + (activePeriod === 'dia' ? 11 : activePeriod === 'semana' ? 23 : 47)) % 100;
    const variation = (seed - 50) / 100;

    if (activePeriod === 'dia') {
      if (dateOffset === 0) {
        return {
          totals: { calorias: 1640, proteinas: 135, carbs: 220, grasas: 52, fibra: 28, agua: 2.4 },
          bars: [
            { label: 'Desayuno', time: '08:30', carbs: 65, protein: 38, fat: 14, kcal: 538 },
            { label: 'Almuerzo', time: '13:45', carbs: 92, protein: 58, fat: 21, kcal: 789 },
            { label: 'Merienda', time: '17:15', carbs: 35, protein: 14, fat: 6, kcal: 250 },
            { label: 'Cena', time: 'Pendiente', carbs: 28, protein: 25, fat: 11, kcal: 311 }
          ],
          insight: '¡Gran consistencia! Estás a 460 kcal de tu objetivo calórico diario con un excelente balance de proteínas (90%).'
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
    if (cardCalGoal) cardCalGoal.textContent = `Meta ${GOALS.calorias}`;
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

  function updateView() {
    updatePeriodLabel();

    const data = generateNutritionData();

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

  updateView();
};