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
    html: "<!-- HEADER M\u00d3VIL (Visible \u00fanicamente en m\u00f3vil < lg) -->\n        <div class=\"lg:hidden flex items-center justify-between pt-safe pb-5\">\n          <div class=\"flex items-center gap-space-sm\">\n            <div class=\"relative w-12 h-12 rounded-full overflow-hidden shadow-sm bg-surface-container ring-2 ring-primary/20\" title=\"[Foto de perfil]\">\n              <img alt=\"[Foto de perfil de usuario]\" class=\"w-full h-full object-cover\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e2e8f0'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%2394a3b8'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24z' fill='%2394a3b8'/%3E%3C/svg%3E\" />\n            </div>\n            <div class=\"flex flex-col\">\n              <span class=\"font-label-md text-label-md text-on-surface-variant flex items-center gap-1\">\n                \u00a1Buenos d\u00edas!\n                <span class=\"inline-block animate-pulse text-xs\">\u2728</span>\n              </span>\n              <span class=\"font-headline-md text-headline-md text-on-surface\">[Nombre del Usuario]</span>\n            </div>\n          </div>\n          <!-- Acciones R\u00e1pidas M\u00f3viles -->\n          <div class=\"flex items-center gap-space-xs\">\n            <button aria-label=\"Notificaciones\" class=\"relative w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[22px]\">notifications</span>\n              <span class=\"absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest\"></span>\n            </button>\n            <button aria-label=\"Ajustes y preferencias\" class=\"w-11 h-11 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(15,23,42,0.06)] flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[22px]\">settings</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- ENCABEZADO DE SECCI\u00d3N PRINCIPAL PARA ESCRITORIO CON ACCIONES R\u00c1PIDAS -->\n        <div class=\"hidden lg:flex items-center justify-between mb-6\">\n          <div class=\"flex flex-col\">\n            <h1 class=\"font-headline-xl text-2xl xl:text-3xl text-on-surface flex items-center gap-2\">\n              \u00a1Buenos d\u00edas, [Nombre del Usuario]! <span class=\"text-xl\">\u2728</span>\n            </h1>\n            <p class=\"font-body-md text-on-surface-variant mt-1\">\n              Est\u00e1s a <span class=\"font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed/40\">460 kcal</span> de completar tu objetivo del d\u00eda\n            </p>\n          </div>\n          <!-- Acciones Principales -->\n          <div class=\"flex items-center gap-3\">\n            <a href=\"#asistente-ia\" class=\"px-4 py-2.5 rounded-full bg-surface-container-lowest border border-primary-container/30 text-on-surface hover:bg-surface-container-low font-headline-md text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-primary text-[20px]\">photo_camera</span>\n              <span class=\"text-primary font-bold\">Escanear con IA</span>\n              <span class=\"material-symbols-outlined text-on-surface-variant text-[16px]\">chevron_right</span>\n            </a>\n            <button class=\"px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-sm flex items-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all\">\n              <span class=\"material-symbols-outlined text-[20px]\">add</span>\n              <span>Registrar Comida</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- CUADR\u00cdCULA DE 2 COLUMNAS PARA ESCRITORIO (En m\u00f3vil fluye en 1 columna) -->\n        <div class=\"grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start\">\n          \n          <!-- COLUMNA PRINCIPAL / IZQUIERDA (lg:col-span-7 xl:col-span-8) -->\n          <div class=\"lg:col-span-7 xl:col-span-8 flex flex-col gap-6\">\n            \n            <!-- 1. Tarjeta de Racha Diaria & Progreso -->\n            <div class=\"relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-fixed via-primary-container to-secondary p-card-padding shadow-[0_12px_28px_-6px_rgba(16,185,129,0.3)]\">\n              <!-- C\u00edrculo decorativo difuso -->\n              <div class=\"absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/20 blur-2xl pointer-events-none\"></div>\n              <div class=\"relative z-10 flex items-center justify-between\">\n                <div class=\"flex flex-col gap-space-2xs max-w-[62%] sm:max-w-[70%]\">\n                  <div class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/30 backdrop-blur-md w-fit\">\n                    <span class=\"material-symbols-outlined text-on-primary-container text-[16px]\">bolt</span>\n                    <span class=\"font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider font-bold\">Racha diaria</span>\n                  </div>\n                  <h2 class=\"font-headline-lg text-lg sm:text-xl lg:text-2xl text-on-primary-container pt-1 font-extrabold\">\n                    Tu progreso: 15 D\u00cdAS de racha activa \ud83d\udd25\n                  </h2>\n                  <p class=\"font-body-sm text-body-sm text-on-primary-container/85 leading-relaxed\">\n                    \u00a1Completaste el <strong>85%</strong> de tu meta cal\u00f3rica de hoy! Mant\u00e9n la consistencia para alcanzar tu r\u00e9cord personal de 21 d\u00edas consecutivos.\n                  </p>\n                </div>\n                <!-- Gr\u00e1fico Circular con D\u00edas e \u00cdcono de Fuego -->\n                <div class=\"relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0\">\n                  <svg class=\"w-full h-full -rotate-90\" viewBox=\"0 0 88 88\">\n                    <circle cx=\"44\" cy=\"44\" fill=\"none\" r=\"36\" stroke=\"rgba(255,255,255,0.3)\" stroke-width=\"7\"></circle>\n                    <circle cx=\"44\" cy=\"44\" fill=\"none\" r=\"36\" stroke=\"#ffffff\" stroke-dasharray=\"226\" stroke-dashoffset=\"34\" stroke-linecap=\"round\" stroke-width=\"7\"></circle>\n                  </svg>\n                  <div class=\"absolute inset-0 flex flex-col items-center justify-center text-center\">\n                    <span class=\"text-[10px] font-bold text-on-primary uppercase tracking-tight\">85% META</span>\n                    <div class=\"flex items-center justify-center gap-0.5 mt-0.5\">\n                      <span class=\"font-numeric-hero text-xl sm:text-2xl text-on-primary font-black leading-none\">15</span>\n                      <span class=\"material-symbols-outlined text-[16px] text-tertiary-fixed fill-current\" style=\"font-variation-settings: &quot;FILL&quot; 1\">local_fire_department</span>\n                    </div>\n                    <span class=\"font-label-sm text-[10px] text-on-primary/90 font-semibold uppercase tracking-wide\">d\u00edas</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- 2. Secci\u00f3n Calendario Semanal -->\n            <div class=\"flex flex-col gap-space-sm\">\n              <div class=\"flex items-center justify-between\">\n                <div class=\"flex items-center gap-2\">\n                  <span class=\"material-symbols-outlined text-on-surface-variant text-[20px]\">calendar_today</span>\n                  <h3 class=\"font-headline-md text-headline-md text-on-surface\">Agosto 2025</h3>\n                  <span class=\"px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-wider\">Semana 33</span>\n                </div>\n                <div class=\"flex items-center gap-space-xs\">\n                  <span class=\"hidden sm:inline font-title-sm text-body-sm text-on-surface-variant font-medium\">10 \u2013 16 Ago</span>\n                  <div class=\"flex items-center gap-1 bg-surface-container-low rounded-full p-0.5\">\n                    <button aria-label=\"Semana anterior\" class=\"w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n                      <span class=\"material-symbols-outlined text-[18px]\">chevron_left</span>\n                    </button>\n                    <button aria-label=\"Semana siguiente\" class=\"w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all\">\n                      <span class=\"material-symbols-outlined text-[18px]\">chevron_right</span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Tira Semanal de D\u00edas -->\n              <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30\">\n                <div class=\"grid grid-cols-7 gap-1.5 sm:gap-2 text-center\">\n                  <!-- DOM 07: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">DOM</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">07</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- LUN 08: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">LUN</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">08</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- MAR 09: Completado -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant font-semibold\">MAR</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">09</span>\n                    <span class=\"material-symbols-outlined text-primary text-[14px]\" style=\"font-variation-settings: &quot;FILL&quot; 1\">check_circle</span>\n                  </button>\n                  <!-- HOY 10: Activo Destacado -->\n                  <button class=\"flex flex-col items-center gap-1 py-2 rounded-2xl bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(16,185,129,0.4)] scale-105\">\n                    <span class=\"text-[10px] font-black uppercase tracking-wider text-on-primary/90\">\u25cf HOY</span>\n                    <span class=\"font-title-sm text-title-sm text-on-primary font-extrabold\">10</span>\n                    <span class=\"text-[11px] font-bold text-on-primary/95\">1,640 kcal</span>\n                  </button>\n                  <!-- JUE 11: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">JUE</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">11</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                  <!-- VIE 12: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">VIE</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">12</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                  <!-- S\u00c1B 13: Futuro -->\n                  <button class=\"flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-surface-container-low transition-colors\">\n                    <span class=\"font-label-md text-label-md text-on-surface-variant\">S\u00c1B</span>\n                    <span class=\"font-title-sm text-title-sm text-on-surface-variant\">13</span>\n                    <span class=\"w-2 h-2 rounded-full bg-surface-container\"></span>\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <!-- 3. Secci\u00f3n Bit\u00e1cora Diaria (\"Mis comidas de hoy\") -->\n            <div class=\"flex flex-col gap-space-sm\">\n              <div class=\"flex flex-col sm:flex-row sm:items-center justify-between gap-1\">\n                <div>\n                  <span class=\"font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold\">Bit\u00e1cora Diaria</span>\n                  <h3 class=\"font-headline-md text-headline-md text-on-surface\">Mis comidas de hoy</h3>\n                </div>\n                <div class=\"flex flex-col sm:items-end\">\n                  <div class=\"flex items-center gap-1\">\n                    <span class=\"font-headline-md text-lg text-primary font-black\">1,640</span>\n                    <span class=\"font-body-md text-on-surface-variant font-medium\">/ 2,100 kcal</span>\n                  </div>\n                  <div class=\"w-36 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1\">\n                    <div class=\"h-full bg-primary-container rounded-full\" style=\"width: 78%;\"></div>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Lista de Comidas del D\u00eda -->\n              <div class=\"flex flex-col gap-space-sm\">\n                <!-- Card: Desayuno -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Desayuno]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Desayuno</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del plato / Ingredientes del desayuno]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">480 \u2013 520 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">08:30 AM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de desayuno\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Almuerzo -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Almuerzo]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Almuerzo</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del plato / Ingredientes del almuerzo]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">650 \u2013 710 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">01:45 PM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de almuerzo\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Snack / Refacci\u00f3n -->\n                <div class=\"group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0\" title=\"[Foto de comida]\">\n                      <img alt=\"[Foto de comida: Snack]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Refacci\u00f3n / Snack</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold\">\n                          <span class=\"material-symbols-outlined text-[13px]\">check_circle</span>\n                          Registrado con \u00e9xito\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5\">[Nombre del snack / Ingredientes de la refacci\u00f3n]</p>\n                      <div class=\"flex items-center gap-3 text-tertiary pt-1\">\n                        <div class=\"flex items-center gap-1\">\n                          <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                          <span class=\"font-body-sm text-[12px] font-bold text-tertiary\">210 \u2013 240 kcal</span>\n                        </div>\n                        <span class=\"text-on-surface-variant/40 text-xs\">\u2022</span>\n                        <span class=\"font-body-sm text-[12px] text-on-surface-variant\">05:15 PM</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button aria-label=\"Ver detalles de refacci\u00f3n\" class=\"w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:bg-primary-container/20 transition-all shrink-0\">\n                    <span class=\"material-symbols-outlined text-[20px]\">chevron_right</span>\n                  </button>\n                </div>\n\n                <!-- Card: Cena (A\u00fan no registrada) -->\n                <div class=\"group flex flex-col sm:flex-row sm:items-center justify-between p-card-padding bg-surface-container-low/40 rounded-2xl border-2 border-dashed border-surface-container-high hover:border-primary-container/60 hover:bg-surface-container-lowest transition-all gap-4\">\n                  <div class=\"flex items-center gap-space-md\">\n                    <div class=\"w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant flex-shrink-0\">\n                      <span class=\"material-symbols-outlined text-[28px] text-primary\">restaurant</span>\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <div class=\"flex items-center gap-2\">\n                        <span class=\"font-title-sm text-title-sm text-on-surface font-bold\">Cena</span>\n                        <span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-medium\">\n                          <span class=\"material-symbols-outlined text-[13px]\">schedule</span>\n                          A\u00fan no registrada\n                        </span>\n                      </div>\n                      <p class=\"font-body-sm text-[13px] text-on-surface-variant mt-0.5\">Sugerido para tu objetivo: [Sugerencia de comida / Men\u00fa recomendado]</p>\n                      <div class=\"flex items-center gap-1 text-on-surface-variant pt-1\">\n                        <span class=\"material-symbols-outlined text-[15px]\">local_fire_department</span>\n                        <span class=\"font-body-sm text-[12px] font-semibold\">Sugerido: 450 \u2013 550 kcal</span>\n                      </div>\n                    </div>\n                  </div>\n                  <button class=\"px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary/90 active:scale-95 transition-all self-end sm:self-center shrink-0\">\n                    <span class=\"material-symbols-outlined text-[16px]\">add</span>\n                    <span>Registrar cena</span>\n                  </button>\n                </div>\n              </div>\n\n              <!-- Bot\u00f3n Destacado CTA: + Registrar Comida -->\n              <div class=\"pt-2\">\n                <button class=\"w-full py-3.5 px-card-padding rounded-2xl bg-primary-container hover:bg-secondary text-on-primary font-headline-md text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] active:scale-[0.99] transition-all\">\n                  <span class=\"material-symbols-outlined text-[22px]\">add_circle</span>\n                  <span>Registrar Comida</span>\n                </button>\n              </div>\n            </div>\n          </div>\n\n          <!-- COLUMNA LATERAL DERECHA (lg:col-span-5 xl:col-span-4) -->\n          <div class=\"lg:col-span-5 xl:col-span-4 flex flex-col gap-6\">\n            \n            <!-- PANEL 1: \"Mi progreso\" (Macros de Hoy & Balance Nutricional) -->\n            <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-4\">\n              <!-- Encabezado con t\u00edtulo \"Mi progreso\" y bot\u00f3n que redirige a mi_progreso.html -->\n              <div class=\"flex items-center justify-between border-b border-surface-container-high/50 pb-3\">\n                <div class=\"flex flex-col\">\n                  <span class=\"font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold\">Balance Nutricional</span>\n                  <h3 class=\"font-headline-md text-lg text-on-surface font-bold\">Mi progreso</h3>\n                </div>\n                <!-- Bot\u00f3n estilo navegaci\u00f3n Mi Progreso hacia mi_progreso.html -->\n                <a href=\"mi_progreso.html\" aria-label=\"Ir a Mi progreso\" class=\"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container/15 text-primary hover:bg-primary-container hover:text-on-primary transition-all font-title-sm text-xs font-bold group\">\n                  <span class=\"material-symbols-outlined text-[18px]\">trending_up</span>\n                  <span>Mi progreso</span>\n                  <span class=\"material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform\">chevron_right</span>\n                </a>\n              </div>\n\n              <!-- Calor\u00edas Restantes -->\n              <div class=\"flex items-center justify-between bg-surface-container-low/70 rounded-xl p-3\">\n                <div class=\"flex flex-col\">\n                  <span class=\"font-body-sm text-xs text-on-surface-variant\">Calor\u00edas restantes</span>\n                  <div class=\"flex items-baseline gap-1 mt-0.5\">\n                    <span class=\"font-headline-lg text-2xl font-black text-primary\">460</span>\n                    <span class=\"font-body-sm text-xs text-on-surface-variant font-semibold\">kcal libres</span>\n                  </div>\n                </div>\n                <div class=\"w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center\">\n                  <span class=\"material-symbols-outlined text-[20px]\">flag</span>\n                </div>\n              </div>\n\n              <!-- Gr\u00e1fico Donut de Calor\u00edas -->\n              <div class=\"relative w-40 h-40 mx-auto my-1 flex items-center justify-center\">\n                <svg class=\"w-full h-full -rotate-90\" viewBox=\"0 0 100 100\">\n                  <!-- C\u00edrculo de fondo -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#f2f3ff\" stroke-width=\"10\"></circle>\n                  <!-- Progreso Grasas (20%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#ffb95f\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"200\" stroke-linecap=\"round\" stroke-width=\"10\" transform=\"rotate(270 50 50)\"></circle>\n                  <!-- Progreso Prote\u00ednas (30%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#6bff8f\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"175\" stroke-linecap=\"round\" stroke-width=\"10\" transform=\"rotate(160 50 50)\"></circle>\n                  <!-- Progreso Carbohidratos (50%) -->\n                  <circle cx=\"50\" cy=\"50\" fill=\"none\" r=\"40\" stroke=\"#10b981\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"125\" stroke-linecap=\"round\" stroke-width=\"10\"></circle>\n                </svg>\n                <div class=\"absolute inset-0 flex flex-col items-center justify-center text-center\">\n                  <span class=\"font-label-sm text-[10px] text-on-surface-variant font-bold uppercase tracking-wider\">Total</span>\n                  <span class=\"font-headline-md text-xl font-black text-on-surface leading-tight\">1,640</span>\n                  <span class=\"font-body-sm text-[11px] text-on-surface-variant font-semibold\">kcal consumidas</span>\n                </div>\n              </div>\n\n              <!-- Desglose de Macronutrientes -->\n              <div class=\"flex flex-col gap-2.5 pt-1\">\n                <!-- Carbohidratos -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#10b981]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Carbohidratos</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">220g <span class=\"text-on-surface-variant font-normal text-[11px]\">(50%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#10b981] rounded-full\" style=\"width: 50%;\"></div>\n                  </div>\n                </div>\n\n                <!-- Prote\u00ednas -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#6bff8f]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Prote\u00ednas</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">135g <span class=\"text-on-surface-variant font-normal text-[11px]\">(30%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#6bff8f] rounded-full\" style=\"width: 30%;\"></div>\n                  </div>\n                </div>\n\n                <!-- Grasas -->\n                <div class=\"flex flex-col gap-1\">\n                  <div class=\"flex items-center justify-between text-xs\">\n                    <div class=\"flex items-center gap-2\">\n                      <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffb95f]\"></span>\n                      <span class=\"font-title-sm text-on-surface font-semibold\">Grasas</span>\n                    </div>\n                    <span class=\"font-title-sm font-bold text-on-surface\">52g <span class=\"text-on-surface-variant font-normal text-[11px]\">(20%)</span></span>\n                  </div>\n                  <div class=\"w-full h-2 bg-surface-container rounded-full overflow-hidden\">\n                    <div class=\"h-full bg-[#ffb95f] rounded-full\" style=\"width: 20%;\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- PANEL 2: \"Acceso R\u00e1pido Asistente IA\" -->\n            <div id=\"asistente-ia\" class=\"relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-surface-container-low/60 to-primary-fixed/20 rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-primary-fixed/40 flex flex-col gap-3\">\n              <div class=\"flex items-center justify-between\">\n                <div class=\"w-11 h-11 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30\">\n                  <span class=\"material-symbols-outlined text-[24px]\">photo_camera</span>\n                </div>\n                <span class=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-[11px] font-bold\">\n                  <span class=\"material-symbols-outlined text-[14px]\">auto_awesome</span>\n                  Visi\u00f3n IA\n                </span>\n              </div>\n              <div>\n                <h3 class=\"font-headline-md text-base text-on-surface font-bold\">Acceso R\u00e1pido Asistente IA</h3>\n                <p class=\"font-body-sm text-[13px] text-on-surface-variant mt-1 leading-relaxed\">\n                  Sube o toma una foto de tu plato para desglosar ingredientes, gramos y calor\u00edas autom\u00e1ticamente en 3 segundos.\n                </p>\n              </div>\n              <button class=\"w-full mt-1 py-2.5 px-4 rounded-xl bg-surface-container-lowest border border-primary-container/40 text-primary font-title-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary shadow-sm active:scale-95 transition-all\">\n                <span class=\"material-symbols-outlined text-[18px]\">document_scanner</span>\n                <span>Escanear Plato con IA</span>\n              </button>\n            </div>\n\n            <!-- PANEL 3: \"Platos Favoritos\" -->\n            <div class=\"bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-surface-container-high/30 flex flex-col gap-3\">\n              <div class=\"flex items-center justify-between border-b border-surface-container-high/40 pb-2.5\">\n                <div class=\"flex items-center gap-2\">\n                  <span class=\"material-symbols-outlined text-primary text-[20px]\">bookmark</span>\n                  <h3 class=\"font-headline-md text-base text-on-surface font-bold\">Platos Favoritos</h3>\n                </div>\n                <a href=\"#\" class=\"font-label-sm text-xs text-primary hover:underline font-bold\">Ver todos</a>\n              </div>\n\n              <!-- Lista de 3 Platos Favoritos -->\n              <div class=\"flex flex-col gap-2.5\">\n                <!-- Favorito 1 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 1]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 1]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">380 kcal</span>\n                    </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 1]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>\n                </div>\n\n                <!-- Favorito 2 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 2]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 2]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">510 kcal</span>\n                    </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 2]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>\n                </div>\n\n                <!-- Favorito 3 -->\n                <div class=\"flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group\">\n                  <div class=\"flex items-center gap-3\">\n                    <div class=\"w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0\" title=\"[Foto de plato favorito]\">\n                      <img alt=\"[Foto de plato favorito 3]\" class=\"w-full h-full object-cover group-hover:scale-105 transition-transform\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cg fill='%2394a3b8'%3E%3Ccircle cx='50' cy='42' r='20' fill='none' stroke='%2394a3b8' stroke-width='3'/%3E%3Cpath d='M25 28v12a4 4 0 004 4v20h3V44a4 4 0 004-4V28h-2v10h-2V28h-1v10h-2V28h-2zm46 0v16a4 4 0 004 4v16h3V28h-7z'/%3E%3C/g%3E%3Ctext x='50' y='82' font-family='system-ui,sans-serif' font-size='8' font-weight='bold' fill='%2364748b' text-anchor='middle'%3E[FOTO PLATO]%3C/text%3E%3C/svg%3E\" />\n                    </div>\n                    <div class=\"flex flex-col\">\n                      <span class=\"font-title-sm text-[13px] text-on-surface font-bold line-clamp-1\">[Plato Favorito 3]</span>\n                      <span class=\"font-body-sm text-[11px] text-tertiary font-bold\">290 kcal</span>\n                    </div>\n                  </div>\n                  <button aria-label=\"Agregar [Plato Favorito 3]\" class=\"w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all\">\n                    <span class=\"material-symbols-outlined text-[18px]\">add</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n        </div>"
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
        <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-primary-fixed/20 border border-primary-fixed/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 shrink-0">
              <span class="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-headline-md text-base font-bold text-on-surface">Diagnóstico IA del Período</h3>
                <span class="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-primary text-[10px] font-extrabold uppercase tracking-wide">Óptimo</span>
              </div>
              <p id="insight-ai-text" class="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                ¡Gran progreso! Tu ingesta de proteínas está en el rango ideal para regeneración muscular. Te sugerimos mantener una hidratación continua antes de la cena.
              </p>
            </div>
          </div>
          <a href="asistente.html" class="px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-primary-container/40 text-primary hover:bg-primary-container hover:text-on-primary font-title-sm text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all whitespace-nowrap self-end sm:self-center">
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
    html: "<!-- ENCABEZADO SUPERIOR CON BOTÓN PRINCIPAL \"CREAR PLATILLO\" -->\n        <div class=\"p-5 sm:p-6 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6\">\n          <div class=\"flex items-center gap-3.5\">\n            <div class=\"w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md shadow-primary-container/30 shrink-0\">\n              <span class=\"material-symbols-outlined text-[28px]\">restaurant_menu</span>\n            </div>\n            <div>\n              <div class=\"flex items-center gap-2\">\n                <h1 class=\"text-xl sm:text-2xl font-bold font-headline-xl text-on-surface\">Mis Platos y Recetas</h1>\n                <span id=\"platos-count-badge\" class=\"px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed/40 text-primary border border-primary-container/30\">\n                  Cargando...\n                </span>\n              </div>\n              <p class=\"text-xs sm:text-sm text-on-surface-variant mt-0.5\">Colección de tus comidas registradas con fotos, recetas y macronutrientes</p>\n            </div>\n          </div>\n\n          <!-- BOTÓN SUPERIOR: + CREAR PLATILLO (Acción Principal Destacada) -->\n          <button \n            id=\"btn-create-dish\" \n            type=\"button\" \n            class=\"px-5 py-3 rounded-2xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-headline-md text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0\"\n          >\n            <span class=\"material-symbols-outlined text-[22px]\">add_circle</span>\n            <span>Crear Platillo</span>\n          </button>\n        </div>\n\n        <!-- BARRA DE FILTROS Y BÚSQUEDA -->\n        <div class=\"flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6\">\n          \n          <!-- BUSCADOR CON ICONO DE LUPA -->\n          <div class=\"relative flex-1 max-w-md\">\n            <span class=\"material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none\">\n              search\n            </span>\n            <input \n              type=\"text\" \n              id=\"platos-search\" \n              placeholder=\"Buscar por nombre, descripción o ingrediente...\" \n              class=\"w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border border-surface-container-high/80 rounded-2xl text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs\"\n            />\n            <button \n              id=\"btn-clear-search\" \n              type=\"button\" \n              aria-label=\"Limpiar búsqueda\" \n              class=\"hidden absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center text-xs transition-colors\"\n            >\n              <span class=\"material-symbols-outlined text-[16px]\">close</span>\n            </button>\n          </div>\n\n          <!-- CHIPS DE FILTRO POR CATEGORÍA -->\n          <div class=\"flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1\">\n            <button type=\"button\" class=\"plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-primary-container text-on-primary shadow-sm cursor-pointer whitespace-nowrap\" data-category=\"Todos\">\n              Todos\n            </button>\n            <button type=\"button\" class=\"plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap\" data-category=\"Desayuno\">\n              Desayuno\n            </button>\n            <button type=\"button\" class=\"plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap\" data-category=\"Almuerzo\">\n              Almuerzo\n            </button>\n            <button type=\"button\" class=\"plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap\" data-category=\"Cena\">\n              Cena\n            </button>\n            <button type=\"button\" class=\"plato-category-chip px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer whitespace-nowrap\" data-category=\"Snack\">\n              Snack\n            </button>\n          </div>\n        </div>\n\n        <!-- CUADRÍCULA DE CARTAS DE PLATILLOS (GRID RESPONSIVE: 1 col móvil, 2 tablet, 3-4 PC) -->\n        <div id=\"platos-grid\" class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6\">\n          <!-- Las tarjetas de platos se renderizan dinámicamente aquí -->\n        </div>\n\n        <!-- ESTADO VACÍO (Si no hay platos registrados o coincidentes) -->\n        <div id=\"platos-empty-state\" class=\"hidden flex-col items-center justify-center text-center py-16 px-4 bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm my-6\">\n          <div class=\"w-20 h-20 rounded-3xl bg-primary-fixed/30 text-primary flex items-center justify-center mb-4\">\n            <span class=\"material-symbols-outlined text-[42px]\">set_meal</span>\n          </div>\n          <h2 class=\"text-xl font-bold font-headline-md text-on-surface\">No se encontraron platillos</h2>\n          <p class=\"text-sm text-on-surface-variant max-w-sm mt-1.5 mb-6\">\n            Aún no has registrado ningún plato en esta categoría o no coincide con tu búsqueda.\n          </p>\n          <button \n            id=\"btn-empty-create\" \n            type=\"button\" \n            class=\"px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-bold text-sm flex items-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer\"\n          >\n            <span class=\"material-symbols-outlined text-[20px]\">add</span>\n            <span>Registrar mi primer platillo</span>\n          </button>\n        </div>\n\n        <!-- ======================================================== -->\n        <!-- VENTANA MODAL PARA INTRODUCIR / EDITAR INFORMACIÓN DE CADA PLATO -->\n        <!-- ======================================================== -->\n        <div id=\"plato-modal\" class=\"hidden fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\">\n          \n          <!-- FONDO TRASLÚCIDO OSCURO (BACKDROP) -->\n          <div id=\"plato-modal-backdrop\" class=\"fixed inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 transition-opacity duration-200\"></div>\n\n          <!-- CONTENEDOR DIÁLOGO MODAL -->\n          <div id=\"plato-modal-dialog\" class=\"relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/80 overflow-hidden z-10 opacity-0 scale-95 transition-all duration-200 flex flex-col max-h-[92vh]\">\n            \n            <!-- CABECERA DEL MODAL -->\n            <div class=\"flex items-center justify-between px-6 py-4 border-b border-surface-container-high/60 bg-surface/50\">\n              <div class=\"flex items-center gap-2.5\">\n                <div class=\"w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center\">\n                  <span class=\"material-symbols-outlined text-[22px]\">restaurant</span>\n                </div>\n                <div>\n                  <h2 id=\"modal-title\" class=\"font-headline-md text-lg font-bold text-on-surface\">Crear Platillo</h2>\n                  <p class=\"text-xs text-on-surface-variant\">Introduce los detalles de tu comida o receta</p>\n                </div>\n              </div>\n              <button \n                id=\"btn-modal-close\" \n                type=\"button\" \n                aria-label=\"Cerrar modal\" \n                class=\"w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer\"\n              >\n                <span class=\"material-symbols-outlined text-[20px]\">close</span>\n              </button>\n            </div>\n\n            <!-- CUERPO DEL FORMULARIO (SCROLLABLE EN PANTALLAS PEQUEÑAS) -->\n            <form id=\"plato-form\" class=\"p-6 space-y-4 overflow-y-auto flex-1 text-on-surface\">\n              <!-- Campo ID Oculto para Edición -->\n              <input type=\"hidden\" id=\"plato-id\" />\n\n              <!-- 1. NOMBRE DEL PLATILLO -->\n              <div>\n                <label for=\"plato-nombre\" class=\"block text-xs font-bold text-on-surface mb-1.5\">\n                  Nombre del platillo <span class=\"text-error\">*</span>\n                </label>\n                <input \n                  type=\"text\" \n                  id=\"plato-nombre\" \n                  required \n                  placeholder=\"Ej. Salmón a la plancha con vegetales\" \n                  class=\"w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium\"\n                />\n              </div>\n\n              <!-- 2. FOTO DEL PLATILLO (URL, ARCHIVO LOCAL O SUGERENCIA RÁPIDA) -->\n              <div class=\"space-y-2\">\n                <label class=\"block text-xs font-bold text-on-surface\">\n                  Foto del platillo\n                </label>\n                \n                <div class=\"flex flex-col sm:flex-row gap-2\">\n                  <input \n                    type=\"url\" \n                    id=\"plato-foto-url\" \n                    placeholder=\"Pega el enlace de la imagen (https://...)\" \n                    class=\"flex-1 px-3.5 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-all\"\n                  />\n                  <input type=\"file\" id=\"plato-foto-file\" accept=\"image/*\" class=\"hidden\" />\n                  <button \n                    type=\"button\" \n                    id=\"btn-select-file\" \n                    class=\"px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-primary-container/40 text-primary hover:bg-primary-container/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0\"\n                  >\n                    <span class=\"material-symbols-outlined text-[18px]\">photo_camera</span>\n                    <span>Subir foto</span>\n                  </button>\n                </div>\n\n                <!-- FOTOS SUGERIDAS RÁPIDAS -->\n                <div class=\"pt-1\">\n                  <span class=\"text-[11px] font-semibold text-on-surface-variant/80 block mb-1.5\">O elige una foto sugerida:</span>\n                  <div class=\"flex items-center gap-2 overflow-x-auto no-scrollbar pb-1\">\n                    <button type=\"button\" class=\"preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all\" data-img=\"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80\" title=\"Salmón\">\n                      <img src=\"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=120&q=60\" class=\"w-full h-full object-cover\" alt=\"Salmón\" />\n                    </button>\n                    <button type=\"button\" class=\"preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all\" data-img=\"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80\" title=\"Pollo y Quinoa\">\n                      <img src=\"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60\" class=\"w-full h-full object-cover\" alt=\"Bowl Saludable\" />\n                    </button>\n                    <button type=\"button\" class=\"preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all\" data-img=\"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80\" title=\"Ensalada\">\n                      <img src=\"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=60\" class=\"w-full h-full object-cover\" alt=\"Ensalada\" />\n                    </button>\n                    <button type=\"button\" class=\"preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all\" data-img=\"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80\" title=\"Bowl de Avena\">\n                      <img src=\"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=120&q=60\" class=\"w-full h-full object-cover\" alt=\"Avena\" />\n                    </button>\n                    <button type=\"button\" class=\"preset-image-btn shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-1 ring-surface-container-high hover:ring-2 hover:ring-primary transition-all\" data-img=\"https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80\" title=\"Tostadas con Aguacate\">\n                      <img src=\"https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=120&q=60\" class=\"w-full h-full object-cover\" alt=\"Tostadas\" />\n                    </button>\n                  </div>\n                </div>\n\n                <!-- VISTA PREVIA DE LA FOTO SELECCIONADA -->\n                <div id=\"plato-image-preview-container\" class=\"hidden relative rounded-2xl overflow-hidden border border-surface-container-high/80 aspect-[16/9] max-h-44 bg-surface-container-low\">\n                  <img id=\"plato-image-preview\" src=\"\" alt=\"Vista previa del plato\" class=\"w-full h-full object-cover\" />\n                  <button \n                    type=\"button\" \n                    id=\"btn-remove-preview-image\" \n                    title=\"Quitar foto\" \n                    class=\"absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-error text-white flex items-center justify-center transition-colors cursor-pointer\"\n                  >\n                    <span class=\"material-symbols-outlined text-[16px]\">close</span>\n                  </button>\n                </div>\n              </div>\n\n              <!-- 3. CATEGORÍA Y CALORÍAS (EN 2 COLUMNAS) -->\n              <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3\">\n                <div>\n                  <label for=\"plato-categoria\" class=\"block text-xs font-bold text-on-surface mb-1.5\">\n                    Categoría\n                  </label>\n                  <select \n                    id=\"plato-categoria\" \n                    class=\"w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface focus:outline-none focus:border-primary transition-all font-medium cursor-pointer\"\n                  >\n                    <option value=\"Almuerzo\">Almuerzo</option>\n                    <option value=\"Desayuno\">Desayuno</option>\n                    <option value=\"Cena\">Cena</option>\n                    <option value=\"Snack\">Snack / Refacción</option>\n                  </select>\n                </div>\n\n                <div>\n                  <label for=\"plato-calorias\" class=\"block text-xs font-bold text-on-surface mb-1.5\">\n                    Calorías estimadas (kcal)\n                  </label>\n                  <input \n                    type=\"number\" \n                    id=\"plato-calorias\" \n                    min=\"0\" \n                    max=\"5000\" \n                    placeholder=\"Ej. 480\" \n                    class=\"w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-all font-medium\"\n                  />\n                </div>\n              </div>\n\n              <!-- 4. BREVE DESCRIPCIÓN -->\n              <div>\n                <label for=\"plato-descripcion\" class=\"block text-xs font-bold text-on-surface mb-1.5\">\n                  Breve descripción <span class=\"text-error\">*</span>\n                </label>\n                <textarea \n                  id=\"plato-descripcion\" \n                  rows=\"3\" \n                  required \n                  placeholder=\"Describe los ingredientes principales, preparación o beneficios nutricionales de este plato...\" \n                  class=\"w-full px-3.5 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none leading-relaxed\"\n                ></textarea>\n              </div>\n\n              <!-- PIE DE ACCIONES DEL FORMULARIO -->\n              <div class=\"pt-3 border-t border-surface-container-high/60 flex items-center justify-end gap-2.5\">\n                <button \n                  type=\"button\" \n                  id=\"btn-modal-cancel\" \n                  class=\"px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-bold text-sm transition-all cursor-pointer\"\n                >\n                  Cancelar\n                </button>\n                <button \n                  type=\"submit\" \n                  class=\"px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-sm flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer\"\n                >\n                  <span class=\"material-symbols-outlined text-[19px]\">check</span>\n                  <span id=\"modal-submit-text\">Guardar Platillo</span>\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n\n        <!-- ======================================================== -->\n        <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR PLATILLO -->\n        <!-- ======================================================== -->\n        <div id=\"delete-modal\" class=\"hidden fixed inset-0 z-50 flex items-center justify-center p-4\" role=\"alertdialog\" aria-modal=\"true\">\n          <div class=\"fixed inset-0 bg-slate-900/60 backdrop-blur-xs\"></div>\n          <div class=\"relative w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container-high/80 z-10 flex flex-col items-center text-center\">\n            <div class=\"w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center mb-3\">\n              <span class=\"material-symbols-outlined text-[26px]\">delete_forever</span>\n            </div>\n            <h3 class=\"font-headline-md text-base font-bold text-on-surface\">¿Eliminar platillo?</h3>\n            <p class=\"text-xs text-on-surface-variant mt-1 mb-4 leading-relaxed\">\n              ¿Estás seguro de que deseas eliminar <strong id=\"delete-dish-name\" class=\"text-on-surface\">este platillo</strong> de tu colección? Esta acción no se puede deshacer.\n            </p>\n            <div class=\"flex items-center gap-2 w-full\">\n              <button \n                type=\"button\" \n                id=\"btn-cancel-delete\" \n                class=\"flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs transition-all cursor-pointer\"\n              >\n                Cancelar\n              </button>\n              <button \n                type=\"button\" \n                id=\"btn-confirm-delete\" \n                class=\"flex-1 py-2.5 rounded-xl bg-error text-on-error font-bold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer\"\n              >\n                Eliminar\n              </button>\n            </div>\n          </div>\n        </div>",
    init: function() {
      if (window.initMisPlatosView) {
        window.initMisPlatosView();
      } else {
        const s = document.createElement('script');
        s.src = 'components/mis_platos.js';
        s.onload = () => { if (window.initMisPlatosView) window.initMisPlatosView(); };
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
    mainClass: 'flex-1 flex flex-col min-h-0 max-w-4xl w-full mx-auto px-3 sm:px-6 relative overflow-hidden lg:h-[calc(100vh-73px)] lg:max-h-[calc(100vh-73px)]',
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
                  <span class="font-bold text-sm text-on-surface">DIA NutriBot</span>
                  <span class="text-[11px] text-on-surface-variant/80">Ahora mismo</span>
                </div>
                <p class="text-sm leading-relaxed mb-3">
                  ¡Hola, Carlos! 👋 Soy tu copiloto nutricional inteligente. Puedes preguntarme sobre el valor calórico de tus comidas, pedirme recomendaciones para cumplir tu objetivo diario de <strong class="text-primary font-bold">1,850 kcal</strong>, o subir una foto usando el icono de la cámara para analizar tu plato en segundos.
                </p>

                <!-- Tarjeta destacada de sugerencia con cámara -->
                <div class="rounded-2xl p-3 bg-surface-container-low/70 border border-primary-container/20 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[20px]">photo_camera</span>
                  </div>
                  <div class="flex-1 text-xs">
                    <span class="font-bold text-on-surface block">¿Tienes tu comida enfrente?</span>
                    <span class="text-on-surface-variant">Toca la cámara abajo para analizar calorías y macros automáticamente.</span>
                  </div>
                </div>
              </div>

              <!-- CHIPS DE CONSULTAS RÁPIDAS -->
              <div class="mt-3 flex flex-wrap gap-2">
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-primary-container/60 hover:bg-primary-fixed/20 text-xs font-semibold text-on-surface-variant hover:text-primary transition-all shadow-2xs flex items-center gap-1.5" data-prompt="¿Cuántas calorías y proteínas tiene un tazón de avena con plátano y nueces?">
                  <span>🥣 Avena con plátano y nueces</span>
                </button>
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-primary-container/60 hover:bg-primary-fixed/20 text-xs font-semibold text-on-surface-variant hover:text-primary transition-all shadow-2xs flex items-center gap-1.5" data-prompt="Recomiéndame una cena ligera y saciante de menos de 400 kcal para hoy.">
                  <span>🥗 Cena ligera < 400 kcal</span>
                </button>
                <button type="button" class="quick-prompt-btn px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-primary-container/60 hover:bg-primary-fixed/20 text-xs font-semibold text-on-surface-variant hover:text-primary transition-all shadow-2xs flex items-center gap-1.5" data-prompt="¿Cómo voy con mi distribución de macronutrientes hoy?">
                  <span>📊 Balance de macronutrientes</span>
                </button>
              </div>
            </div>
          </div>

          <!-- MENSAJE DE EJEMPLO DEL USUARIO -->
          <div class="flex items-start justify-end gap-3 animate-message">
            <div class="flex flex-col items-end max-w-xl">
              <div class="p-4 rounded-3xl rounded-tr-sm bg-primary-container text-on-primary shadow-md shadow-primary-container/20">
                <p class="text-sm font-medium leading-relaxed">
                  ¿El pollo a la plancha con quinoa y ensalada verde es una buena opción para mi almuerzo?
                </p>
              </div>
              <span class="text-[11px] text-on-surface-variant/70 mt-1 mr-2">12:32 PM</span>
            </div>
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden shrink-0 ring-2 ring-primary/20 shadow-sm mt-0.5">
              <img alt="Carlos Méndez" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdBGBgBFgZj2fQlLiT_ED280sddWbYDN1WfjanfIHUk_-m2cS6xx2_R0iWFQPwXcIsPyBTf7vVaXQp9sB0EMyi_JmNSt0oeEEqp8T36PB6bditByVo5lzaDqGGidOv0FXWlbPH4MZr9nN4tDaVZHDVZbCJd9r_F_nJ-0F2-64haWUYsTDzCyazcBG8NbcwUvpVAx2VRbyu9dJaht06f3gXZ46tUXSFnNKQElfVYzVLuC5tYDIgGyvR" />
            </div>
          </div>

          <!-- RESPUESTA DE EJEMPLO DE LA IA -->
          <div class="flex items-start gap-3 animate-message">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span class="material-symbols-outlined text-[20px] sm:text-[22px]">smart_toy</span>
            </div>
            <div class="flex-1 max-w-2xl">
              <div class="p-4 sm:p-5 rounded-3xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-sm text-on-surface space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-sm text-on-surface">DIA NutriBot</span>
                    <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed/30 text-primary">
                      <span class="material-symbols-outlined text-[13px]">check_circle</span> Análisis completado
                    </span>
                  </div>
                  <span class="text-[11px] text-on-surface-variant/80">12:33 PM</span>
                </div>

                <p class="text-sm leading-relaxed">
                  ¡Excelente elección, Carlos! Es un almuerzo <strong class="text-primary font-bold">altamente equilibrado</strong> que encaja perfectamente en tu objetivo diario de déficit controlado.
                </p>

                <!-- Tarjetas de Macros del plato -->
                <div class="grid grid-cols-4 gap-2 py-1">
                  <div class="bg-surface-container-low rounded-2xl p-2.5 text-center border border-surface-container-high/50">
                    <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Calorías</span>
                    <span class="font-numeric-hero text-base sm:text-lg font-black text-on-surface">~485</span>
                    <span class="text-[10px] text-on-surface-variant block">kcal</span>
                  </div>
                  <div class="bg-primary-fixed/25 rounded-2xl p-2.5 text-center border border-primary-fixed/60">
                    <span class="text-[10px] uppercase font-bold text-primary block">Proteína</span>
                    <span class="font-numeric-hero text-base sm:text-lg font-black text-primary">42g</span>
                    <span class="text-[10px] text-primary/80 block">Alta</span>
                  </div>
                  <div class="bg-tertiary-fixed/30 rounded-2xl p-2.5 text-center border border-tertiary-fixed/50">
                    <span class="text-[10px] uppercase font-bold text-tertiary block">Carbos</span>
                    <span class="font-numeric-hero text-base sm:text-lg font-black text-tertiary">45g</span>
                    <span class="text-[10px] text-tertiary/80 block">Complejos</span>
                  </div>
                  <div class="bg-surface-container-low rounded-2xl p-2.5 text-center border border-surface-container-high/50">
                    <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Grasas</span>
                    <span class="font-numeric-hero text-base sm:text-lg font-black text-on-surface">11g</span>
                    <span class="text-[10px] text-on-surface-variant block">Saludables</span>
                  </div>
                </div>

                <ul class="text-xs space-y-1.5 text-on-surface-variant">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[16px]">done</span>
                    <span>La <strong>quinoa</strong> aporta fibra prebiótica y carbohidratos de absorción lenta.</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[16px]">done</span>
                    <span>La <strong>pechuga de pollo</strong> cubre el 40% de tu meta de proteína diaria.</span>
                  </li>
                </ul>
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

        <!-- BARRA INFERIOR DE ENTRADA DE MENSAJES (CHIP + INPUT BARRA FIJA) -->
        <div class="shrink-0 w-full pt-2 pb-24 lg:pb-4 bg-surface z-20">
          
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
            <input type="file" id="photo-file-input" accept="image/*" class="hidden" />

            <!-- 1. ÍCONO DE CÁMARA A LA IZQUIERDA PARA SUBIR FOTO -->
            <button 
              type="button" 
              id="btn-trigger-camera" 
              aria-label="Subir o tomar foto de alimento" 
              title="Subir foto de alimento"
              class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[24px]">photo_camera</span>
              <!-- Indicador badge si hay foto cargada -->
              <span id="camera-attached-badge" class="hidden absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
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

        // Disparar selector de cámara / archivo
        btnTriggerCamera.addEventListener('click', () => {
          photoFileInput.click();
        });

        // Manejar selección de foto
        photoFileInput.addEventListener('change', (e) => {
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
        });

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
          btn.addEventListener('click', () => {
            const prompt = btn.getAttribute('data-prompt');
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
            if (e.isComposing || e.keyCode === 229) return;
            if (lastCompositionEndAt !== null && Math.abs(e.timeStamp - lastCompositionEndAt) < 50) return;
            chatForm.requestSubmit();
          }
        });

        // Enviar mensaje al enviar el formulario
        chatForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const text = chatInput.value.trim();
          const hasImage = !!selectedImageDataUrl;

          if (!text && !hasImage) return;

          // 1. Renderizar mensaje del usuario
          renderUserMessage(text, selectedImageDataUrl);

          // Guardar referencia para simular IA
          const submittedText = text;
          const submittedImage = selectedImageDataUrl;

          // Limpiar input y adjuntos
          chatInput.value = '';
          clearImageSelection();
          scrollToBottom();

          // 2. Mostrar indicador de escritura y simular respuesta de la IA
          typingIndicator.classList.remove('hidden');
          typingIndicator.classList.add('flex');
          scrollToBottom();

          setTimeout(() => {
            typingIndicator.classList.add('hidden');
            typingIndicator.classList.remove('flex');
            renderAiResponse(submittedText, submittedImage);
            scrollToBottom();
          }, 1200);
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

        function renderAiResponse(queryText, withImage) {
          const wrapper = document.createElement('div');
          wrapper.className = 'flex items-start gap-3 animate-message';

          let responseBodyHtml = '';

          if (withImage) {
            // Respuesta de visión de plato
            responseBodyHtml = `
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-on-surface">DIA NutriBot</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed/30 text-primary">
                    <span class="material-symbols-outlined text-[13px]">image_search</span> Reconocimiento visual
                  </span>
                </div>
                <span class="text-[11px] text-on-surface-variant/80">${getCurrentTime()}</span>
              </div>
              <p class="text-sm leading-relaxed mb-3">
                He examinado la imagen que subiste. He detectado los siguientes ingredientes principales: <strong>Salmón fresco a la plancha</strong>, <strong>espárragos salteados</strong> y <strong>arroz integral con semillas de sésamo</strong>.
              </p>

              <!-- Resumen nutricional generado -->
              <div class="grid grid-cols-4 gap-2 py-1 mb-3">
                <div class="bg-surface-container-low rounded-2xl p-2.5 text-center border border-surface-container-high/50">
                  <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Calorías</span>
                  <span class="font-numeric-hero text-base sm:text-lg font-black text-on-surface">~520</span>
                  <span class="text-[10px] text-on-surface-variant block">kcal est.</span>
                </div>
                <div class="bg-primary-fixed/25 rounded-2xl p-2.5 text-center border border-primary-fixed/60">
                  <span class="text-[10px] uppercase font-bold text-primary block">Proteína</span>
                  <span class="font-numeric-hero text-base sm:text-lg font-black text-primary">38g</span>
                  <span class="text-[10px] text-primary/80 block">Alta</span>
                </div>
                <div class="bg-tertiary-fixed/30 rounded-2xl p-2.5 text-center border border-tertiary-fixed/50">
                  <span class="text-[10px] uppercase font-bold text-tertiary block">Carbos</span>
                  <span class="font-numeric-hero text-base sm:text-lg font-black text-tertiary">35g</span>
                  <span class="text-[10px] text-tertiary/80 block">Fibra 6g</span>
                </div>
                <div class="bg-surface-container-low rounded-2xl p-2.5 text-center border border-surface-container-high/50">
                  <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Grasas</span>
                  <span class="font-numeric-hero text-base sm:text-lg font-black text-on-surface">19g</span>
                  <span class="text-[10px] text-on-surface-variant block">Omega-3</span>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-primary-fixed/15 border border-primary-container/20 flex items-center justify-between">
                <span class="text-xs font-semibold text-on-surface">¿Deseas registrar este plato en tu diario de hoy?</span>
                <button type="button" class="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow-sm hover:brightness-105 active:scale-95 transition-all">
                  + Registrar plato
                </button>
              </div>
            `;
          } else {
            // Respuesta a consulta de texto
            const lower = (queryText || '').toLowerCase();
            let advice = 'Es un alimento muy balanceado. Recuerda mantener un consumo adecuado de agua y controlar las porciones de acuerdo con tus calorías diarias recomendadas.';

            if (lower.includes('avena') || lower.includes('desayuno')) {
              advice = 'La avena con plátano y nueces aporta aproximadamente <strong>360-410 kcal</strong>, 12g de proteína, 58g de carbohidratos saludables y grasas insaturadas de las nueces. Es una de las mejores combinaciones para energía sostenida.';
            } else if (lower.includes('cena') || lower.includes('ligera')) {
              advice = 'Para una cena de <strong>&lt; 400 kcal</strong>, te sugiero: Pechuga de pavo o tofu salteado con calabacines, champiñones y una cucharadita de aceite de oliva virgen extra. Te aportará 28g de proteína y facilitará una digestión ligera antes de dormir.';
            } else if (lower.includes('macro') || lower.includes('balance')) {
              advice = 'Hoy llevas acumulado el <strong>68% de tus proteínas</strong> y el <strong>72% de tus carbohidratos</strong>. Para tu cena te convendría priorizar fuentes magras de proteína con vegetales verdes para no exceder las grasas.';
            }

            responseBodyHtml = `
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-on-surface">DIA NutriBot</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed/30 text-primary">
                    <span class="material-symbols-outlined text-[13px]">auto_awesome</span> Respuesta IA
                  </span>
                </div>
                <span class="text-[11px] text-on-surface-variant/80">${getCurrentTime()}</span>
              </div>
              <p class="text-sm leading-relaxed mb-2">${advice}</p>
              <div class="flex items-center gap-3 pt-2 text-xs text-on-surface-variant/80 border-t border-surface-container-high/50">
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-primary">check</span> Basado en tu perfil metabólico</span>
              </div>
            `;
          }

          wrapper.innerHTML = `
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span class="material-symbols-outlined text-[20px] sm:text-[22px]">smart_toy</span>
            </div>
            <div class="flex-1 max-w-2xl">
              <div class="p-4 sm:p-5 rounded-3xl rounded-tl-sm bg-surface-container-lowest border border-surface-container-high/60 shadow-sm text-on-surface">
                ${responseBodyHtml}
              </div>
            </div>
          `;
          dynamicMessages.appendChild(wrapper);

          // Guardar interacción en el historial del asistente
          recordInteractionToHistory(queryText, withImage, typeof advice !== 'undefined' ? advice : '');
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
            let calories = 0;
            let macros = null;
            let aiMsgText = adviceText || '';

            if (withImage) {
              category = 'Visión IA';
              icon = 'photo_camera';
              calories = 520;
              aiMsgText = 'He examinado la imagen que subiste. He detectado Salmón fresco a la plancha, espárragos salteados y arroz integral (~520 kcal, 38g proteína).';
              macros = { calorias: 520, proteina: 38, carbos: 35, grasas: 19 };
            } else {
              const lower = (queryText || '').toLowerCase();
              if (lower.includes('avena') || lower.includes('desayuno')) {
                category = 'Desayuno';
                icon = 'breakfast_dining';
                calories = 395;
                macros = { calorias: 395, proteina: 12, carbos: 58, grasas: 14 };
              } else if (lower.includes('cena') || lower.includes('ligera')) {
                category = 'Cena';
                icon = 'dinner_dining';
                calories = 360;
                macros = { calorias: 360, proteina: 28, carbos: 18, grasas: 9 };
              } else if (lower.includes('macro') || lower.includes('balance')) {
                category = 'Balance Macros';
                icon = 'monitoring';
              }
            }

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
                calorias: calories,
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
              text: aiMsgText,
              time: timeStr,
              macros: macros
            });

            localStorage.setItem(historyKey, JSON.stringify(history));
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

