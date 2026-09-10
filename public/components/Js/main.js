// main.js completo y actualizado
document.addEventListener('DOMContentLoaded', () => {
    const modalOnboarding = document.getElementById('onboarding-modal');
    const formOnboarding = document.getElementById('onboarding-form');
    const btnCerrarOnboarding = document.getElementById('btn-cerrar-onboarding');
    
    const selectGenero = document.getElementById('genero');
    const selectTipoDiabetes = document.getElementById('tipo_diabetes');

    const headerNombreDesktop = document.getElementById('header-nombre-desktop');
    const headerNombreMovil = document.getElementById('header-nombre-movil');
    const desktopSaludo = document.getElementById('desktop-saludo');
    const mobileSaludo = document.getElementById('mobile-saludo');
    const topRightSaludo = document.getElementById('top-right-saludo');
    const topRightNombre = document.getElementById('top-right-nombre');

    const getApiUrl = (endpoint) => {
        if (window.location.protocol.startsWith('http')) {
            return endpoint;
        }
        return `http://localhost:3000${endpoint}`;
    };

    async function cargarCatalogos() {
        try {
            const resGeneros = await fetch(getApiUrl('/api/generos'));
            const generos = await resGeneros.json();
            if (selectGenero && Array.isArray(generos)) {
                selectGenero.innerHTML = '<option value="" disabled selected>Seleccione su género</option>';
                generos.forEach(g => {
                    selectGenero.innerHTML += `<option value="${g.id_genero}">${g.nom_genero}</option>`;
                });
            }

            const resDiabetes = await fetch(getApiUrl('/api/tipos-diabetes'));
            const tiposDiabetes = await resDiabetes.json();
            if (selectTipoDiabetes && Array.isArray(tiposDiabetes)) {
                selectTipoDiabetes.innerHTML = '<option value="" disabled selected>Seleccione tipo de diabetes</option>';
                tiposDiabetes.forEach(td => {
                    selectTipoDiabetes.innerHTML += `<option value="${td.id_tipodiabetes}">${td.nom_tipodiabetes}</option>`;
                });
            }
        } catch (error) {
            console.error("Error al cargar catálogos:", error);
        }
    }

    // Saludo dinámico según la hora actual (Mañana: 6-12, Tarde: 12-19, Noche: 19 en adelante)
    function obtenerSaludoDinamico() {
        const hora = new Date().getHours();
        if (hora >= 6 && hora < 12) return "¡Buenos días";
        if (hora >= 12 && hora < 19) return "¡Buenas tardes";
        return "¡Buenas noches";
    }

    const loadUserData = async () => {
        const hasCompletedOnboarding = localStorage.getItem('dia_user_configured');
        const savedName = localStorage.getItem('dia_nombre');

        if (hasCompletedOnboarding === 'true') {
            if (modalOnboarding) modalOnboarding.style.display = 'none';
            if (savedName) {
                const primerNombre = savedName.trim().split(' ')[0];
                const saludoActual = obtenerSaludoDinamico();
                
                // Actualizar nombres y saludos en la interfaz principal
                if (headerNombreDesktop) headerNombreDesktop.textContent = savedName;
                if (headerNombreMovil) headerNombreMovil.textContent = primerNombre;
                if (desktopSaludo) desktopSaludo.textContent = saludoActual;
                if (mobileSaludo) {
                    mobileSaludo.innerHTML = `${saludoActual}! <span class="inline-block animate-pulse text-xs">✨</span>`;
                }
                
                // Actualizar la esquina superior derecha funcional
                if (topRightSaludo) topRightSaludo.textContent = `${saludoActual}!`;
                if (topRightNombre) topRightNombre.textContent = savedName;

                const containerSaludo = document.getElementById('dashboard-saludo-container'); 
                if (containerSaludo) {
                    containerSaludo.innerHTML = `${saludoActual}, ${savedName} ! <span class="text-amber-500">✨</span>`;
                }
            }
        } else {
            await cargarCatalogos();
            if (modalOnboarding) modalOnboarding.style.display = 'flex';
        }
    };

    loadUserData();

    if (formOnboarding) {
        formOnboarding.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                edad: document.getElementById('edad').value,
                altura: document.getElementById('altura').value,
                peso: document.getElementById('peso').value,
                genero: selectGenero.value,
                tipo_diabetes: selectTipoDiabetes.value,
                insulina: document.getElementById('insulina').checked
            };

            try {
                const response = await fetch(getApiUrl('/api/perfil'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Error al guardar en el servidor');

                localStorage.setItem('dia_nombre', formData.nombre);
                localStorage.setItem('dia_edad', formData.edad);
                localStorage.setItem('dia_altura', formData.altura);
                localStorage.setItem('dia_peso', formData.peso);
                localStorage.setItem('dia_genero', formData.genero);
                localStorage.setItem('dia_tipo_diabetes', formData.tipo_diabetes);
                localStorage.setItem('dia_insulina', formData.insulina);
                localStorage.setItem('dia_user_configured', 'true');
                if (data.id_persona) {
                    localStorage.setItem('dia_id_persona', data.id_persona);
                }
                
                loadUserData();

                modalOnboarding.classList.add('opacity-0');
                setTimeout(() => {
                    modalOnboarding.style.display = 'none';
                    modalOnboarding.classList.remove('opacity-0');
                }, 300);

            } catch (error) {
                console.error("Error al registrar perfil:", error);
                alert("No se pudo guardar la información en la base de datos.");
            }
        });
    }

    // Funcionalidad para abrir el modal de edición al hacer clic en el perfil superior superior derecho
    const abrirModalEdicion = async () => {
        if (!document.getElementById('nombre')) return;

        await cargarCatalogos();

        document.getElementById('nombre').value = localStorage.getItem('dia_nombre') || '';
        document.getElementById('edad').value = localStorage.getItem('dia_edad') || '';
        document.getElementById('altura').value = localStorage.getItem('dia_altura') || '';
        document.getElementById('peso').value = localStorage.getItem('dia_peso') || '';
        selectGenero.value = localStorage.getItem('dia_genero') || '';
        selectTipoDiabetes.value = localStorage.getItem('dia_tipo_diabetes') || '';
        document.getElementById('insulina').checked = localStorage.getItem('dia_insulina') === 'true';

        if (btnCerrarOnboarding) btnCerrarOnboarding.classList.remove('hidden');
        if (modalOnboarding) modalOnboarding.style.display = 'flex';
    };

    const userProfileHeaderArea = document.getElementById('user-profile-header-area');
    const userProfileHeaderAreaMobile = document.getElementById('user-profile-header-area-mobile');
    const botonesPerfil = document.querySelectorAll('.btn-editar-perfil');

    if (userProfileHeaderArea) userProfileHeaderArea.addEventListener('click', abrirModalEdicion);
    if (userProfileHeaderAreaMobile) userProfileHeaderAreaMobile.addEventListener('click', abrirModalEdicion);
    botonesPerfil.forEach(btn => btn.addEventListener('click', abrirModalEdicion));

    if (btnCerrarOnboarding) {
        btnCerrarOnboarding.addEventListener('click', () => {
            if (modalOnboarding) modalOnboarding.style.display = 'none';
        });
    }

    // Inicializar dashboard si existen sus elementos
    if (typeof initDashboard === 'function') {
        initDashboard();
    }
});

// =========================================================================
// DASHBOARD NUTRICIONAL DINÁMICO (Cálculo de macros, calorías y platillos)
// =========================================================================
function abrirModalPlatoDashboard() {
    const modal = document.getElementById('plato-modal');
    const backdrop = document.getElementById('plato-modal-backdrop');
    const dialog = document.getElementById('plato-modal-dialog');
    const form = document.getElementById('plato-form');
    if (!modal) {
        window.location.href = 'mis_platos.html';
        return;
    }
    if (form) form.reset();
    const idInput = document.getElementById('plato-id');
    if (idInput) idInput.value = '';
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.textContent = 'Crear Platillo';
    const previewContainer = document.getElementById('plato-image-preview-container');
    if (previewContainer) previewContainer.classList.add('hidden');

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        if (backdrop) backdrop.classList.remove('opacity-0');
        if (dialog) {
            dialog.classList.remove('opacity-0', 'scale-95');
            dialog.classList.add('opacity-100', 'scale-100');
        }
    });
}

function cerrarModalPlatoDashboard() {
    const modal = document.getElementById('plato-modal');
    const backdrop = document.getElementById('plato-modal-backdrop');
    const dialog = document.getElementById('plato-modal-dialog');
    if (!modal) return;
    if (backdrop) backdrop.classList.add('opacity-0');
    if (dialog) {
        dialog.classList.remove('opacity-100', 'scale-100');
        dialog.classList.add('opacity-0', 'scale-95');
    }
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function bindDashboardModalEvents() {
    const openButtons = document.querySelectorAll('.btn-open-create-dish-dashboard, #btn-open-create-dish-desktop');
    openButtons.forEach(btn => {
        if (btn.dataset.boundModal) return;
        btn.dataset.boundModal = 'true';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('dia_auto_open_create_dish', 'true');
            if (typeof switchAppView === 'function') {
                switchAppView('mis_platos.html', e);
            } else {
                window.location.href = 'mis_platos.html';
            }
        });
    });

    const scanButtons = document.querySelectorAll('.btn-scan-ai-dashboard');
    scanButtons.forEach(btn => {
        if (btn.dataset.boundScan) return;
        btn.dataset.boundScan = 'true';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('dia_auto_open_camera', 'true');
            if (typeof switchAppView === 'function') {
                switchAppView('asistente.html', e);
                const photoInput = document.getElementById('photo-file-input');
                if (photoInput) {
                    try {
                        photoInput.click();
                        sessionStorage.removeItem('dia_auto_open_camera');
                    } catch (err) {}
                }
            } else {
                window.location.href = 'asistente.html';
            }
        });
    });

    const modal = document.getElementById('plato-modal');
    if (!modal) return;

    if (!document.getElementById('platos-grid') && !modal.dataset.dashboardBound) {
        modal.dataset.dashboardBound = 'true';
        
        const btnClose = document.getElementById('btn-modal-close');
        const btnCancel = document.getElementById('btn-modal-cancel');
        const backdrop = document.getElementById('plato-modal-backdrop');
        const form = document.getElementById('plato-form');
        const carbsInput = document.getElementById('plato-carbs');
        const protInput = document.getElementById('plato-protein');
        const fatInput = document.getElementById('plato-fat');
        const calInput = document.getElementById('plato-calorias');
        const inputFoto = document.getElementById('plato-foto-url');
        const inputFile = document.getElementById('plato-foto-file');
        const btnSelectFile = document.getElementById('btn-select-file');
        const previewContainer = document.getElementById('plato-image-preview-container');
        const previewImg = document.getElementById('plato-image-preview');
        const btnRemovePreview = document.getElementById('btn-remove-preview-image');
        const presetImages = document.querySelectorAll('.preset-image-btn');

        [btnClose, btnCancel, backdrop].forEach(el => {
            if (el) el.addEventListener('click', cerrarModalPlatoDashboard);
        });

        // Cálculo de calorías en tiempo real
        const autoCalc = () => {
            const c = parseFloat(carbsInput?.value) || 0;
            const p = parseFloat(protInput?.value) || 0;
            const f = parseFloat(fatInput?.value) || 0;
            if (calInput && (c > 0 || p > 0 || f > 0)) {
                calInput.value = Math.round((c * 4) + (p * 4) + (f * 9));
            }
        };
        [carbsInput, protInput, fatInput].forEach(inp => {
            if (inp) inp.addEventListener('input', autoCalc);
        });

        // Vista previa de imagen
        const updatePreview = (url) => {
            if (previewContainer && previewImg) {
                if (url) {
                    previewImg.src = url;
                    previewContainer.classList.remove('hidden');
                } else {
                    previewContainer.classList.add('hidden');
                    previewImg.src = '';
                }
            }
        };

        if (inputFoto) {
            inputFoto.addEventListener('input', () => updatePreview(inputFoto.value.trim()));
        }

        if (btnSelectFile && inputFile) {
            btnSelectFile.addEventListener('click', () => inputFile.click());
            inputFile.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        if (inputFoto) inputFoto.value = evt.target.result;
                        updatePreview(evt.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (btnRemovePreview) {
            btnRemovePreview.addEventListener('click', () => {
                if (inputFoto) inputFoto.value = '';
                if (inputFile) inputFile.value = '';
                updatePreview('');
            });
        }

        presetImages.forEach(btn => {
            btn.addEventListener('click', () => {
                const img = btn.getAttribute('data-img');
                if (img) {
                    if (inputFoto) inputFoto.value = img;
                    updatePreview(img);
                }
            });
        });

        // Envío de formulario
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const nombre = document.getElementById('plato-nombre')?.value?.trim();
                if (!nombre) return;

                const c = parseFloat(carbsInput?.value) || 0;
                const p = parseFloat(protInput?.value) || 0;
                const f = parseFloat(fatInput?.value) || 0;
                const fib = parseFloat(document.getElementById('plato-fibra')?.value) || 0;
                let cal = parseInt(calInput?.value, 10);
                if (isNaN(cal) || cal <= 0) {
                    cal = Math.round((c * 4) + (p * 4) + (f * 9));
                }

                const nuevoPlato = {
                    nombre,
                    foto: inputFoto?.value?.trim() || '',
                    categoria: document.getElementById('plato-categoria')?.value || 'Almuerzo',
                    calorias: cal,
                    carbohidratos: c,
                    proteinas: p,
                    grasas: f,
                    fibra: fib,
                    descripcion: document.getElementById('plato-descripcion')?.value?.trim() || '',
                    fecha: new Date().toISOString()
                };

                if (window.PlatosStore) {
                    window.PlatosStore.add(nuevoPlato);
                }
                cerrarModalPlatoDashboard();
                form.reset();
            });
        }
    }
}

function initDashboard() {
    const misComidasContainer = document.getElementById('mis-comidas-container');
    const donutSvg = document.getElementById('dashboard-donut-svg');
    if (!misComidasContainer && !donutSvg) return;

    // Obtener datos consolidados de PlatosStore
    const totals = (window.PlatosStore && typeof window.PlatosStore.getTodayTotals === 'function')
        ? window.PlatosStore.getTodayTotals()
        : { calorias: 0, proteinas: 0, carbs: 0, grasas: 0, fibra: 0, platosHoy: [], byCategory: {} };

    const consumedCal = totals.calorias || 0;
    const goalCal = 2100;
    const remainingCal = Math.max(0, goalCal - consumedCal);
    const pct = Math.min(100, Math.round((consumedCal / goalCal) * 100));

    // Comprobar unidades configuradas
    let isKj = false;
    let isOz = false;
    try {
        const savedUnits = localStorage.getItem('dia_app_units');
        if (savedUnits) {
            const parsed = JSON.parse(savedUnits);
            if (parsed.energy === 'kJ') isKj = true;
            if (parsed.portion === 'oz') isOz = true;
        }
    } catch (e) {}

    const consumedDisplay = isKj ? Math.round(consumedCal * 4.184).toLocaleString('es-ES') : consumedCal.toLocaleString('es-ES');
    const remainingDisplay = isKj ? Math.round(remainingCal * 4.184).toLocaleString('es-ES') : remainingCal.toLocaleString('es-ES');
    const unitDisplay = isKj ? 'kJ' : 'kcal';

    // 1. Encabezado Desktop y Restante
    const headerRemainingKcal = document.getElementById('header-remaining-kcal');
    if (headerRemainingKcal) headerRemainingKcal.textContent = remainingDisplay;

    const remainingKcalEls = document.querySelectorAll('.remaining-calories-val');
    remainingKcalEls.forEach(el => el.textContent = remainingDisplay);

    const remainingUnitEls = document.querySelectorAll('.remaining-calories-unit');
    remainingUnitEls.forEach(el => el.textContent = `${unitDisplay} libres`);

    // 2. Consumo y Barra de Meta
    const consumedKcalEls = document.querySelectorAll('.consumed-calories-val');
    consumedKcalEls.forEach(el => el.textContent = consumedDisplay);

    const consumedUnitEls = document.querySelectorAll('.consumed-calories-unit');
    consumedUnitEls.forEach(el => el.textContent = `${unitDisplay} consumidas`);

    const consumedBar = document.getElementById('consumed-calories-bar');
    if (consumedBar) consumedBar.style.width = `${pct}%`;

    const targetTotalEls = document.querySelectorAll('.target-calories-total');
    targetTotalEls.forEach(el => {
        el.textContent = isKj ? '/ 8,786 kJ' : '/ 2,100 kcal';
    });

    // 3. Tarjeta de Racha y Progreso
    const streakPct = document.getElementById('streak-meta-pct');
    if (streakPct) streakPct.textContent = `${pct}%`;

    const streakBadge = document.getElementById('streak-meta-badge');
    if (streakBadge) streakBadge.textContent = `${pct}% META`;

    const streakCircle = document.getElementById('streak-circle-progress');
    if (streakCircle) {
        const offset = 226 - (226 * (pct / 100));
        streakCircle.setAttribute('stroke-dashoffset', offset.toFixed(1));
    }

    // 4. Gráfico Donut de Macronutrientes y Barras
    const carbsG = totals.carbs || 0;
    const protG = totals.proteinas || 0;
    const fatG = totals.grasas || 0;
    const totalMacroGrams = carbsG + protG + fatG;

    const segCarbs = document.getElementById('donut-segment-carbs');
    const segProt = document.getElementById('donut-segment-prot');
    const segFat = document.getElementById('donut-segment-fat');

    const barCarbs = document.getElementById('macro-carbs-bar');
    const barProt = document.getElementById('macro-prot-bar');
    const barFat = document.getElementById('macro-fat-bar');

    const valCarbs = document.querySelector('.macro-carbs-val');
    const valProt = document.querySelector('.macro-prot-val');
    const valFat = document.querySelector('.macro-fat-val');

    if (totalMacroGrams === 0) {
        if (segCarbs) { segCarbs.setAttribute('stroke-dasharray', '0 251.2'); segCarbs.removeAttribute('transform'); }
        if (segProt) { segProt.setAttribute('stroke-dasharray', '0 251.2'); segProt.removeAttribute('transform'); }
        if (segFat) { segFat.setAttribute('stroke-dasharray', '0 251.2'); segFat.removeAttribute('transform'); }

        if (barCarbs) barCarbs.style.width = '0%';
        if (barProt) barProt.style.width = '0%';
        if (barFat) barFat.style.width = '0%';

        if (valCarbs) valCarbs.innerHTML = `0${isOz ? ' oz' : 'g'} <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span>`;
        if (valProt) valProt.innerHTML = `0${isOz ? ' oz' : 'g'} <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span>`;
        if (valFat) valFat.innerHTML = `0${isOz ? ' oz' : 'g'} <span class="text-on-surface-variant font-normal text-[11px]">(0%)</span>`;
    } else {
        const carbsPct = Math.round((carbsG / totalMacroGrams) * 100);
        const protPct = Math.round((protG / totalMacroGrams) * 100);
        const fatPct = Math.max(0, 100 - carbsPct - protPct);

        const lenCarbs = (carbsG / totalMacroGrams) * 251.2;
        const lenProt = (protG / totalMacroGrams) * 251.2;
        const lenFat = (fatG / totalMacroGrams) * 251.2;

        const rotProt = (lenCarbs / 251.2) * 360;
        const rotFat = ((lenCarbs + lenProt) / 251.2) * 360;

        if (segCarbs) {
            segCarbs.setAttribute('stroke-dasharray', `${lenCarbs.toFixed(1)} ${(251.2 - lenCarbs).toFixed(1)}`);
            segCarbs.removeAttribute('transform');
        }
        if (segProt) {
            segProt.setAttribute('stroke-dasharray', `${lenProt.toFixed(1)} ${(251.2 - lenProt).toFixed(1)}`);
            segProt.setAttribute('transform', `rotate(${rotProt.toFixed(1)} 50 50)`);
        }
        if (segFat) {
            segFat.setAttribute('stroke-dasharray', `${lenFat.toFixed(1)} ${(251.2 - lenFat).toFixed(1)}`);
            segFat.setAttribute('transform', `rotate(${rotFat.toFixed(1)} 50 50)`);
        }

        if (barCarbs) barCarbs.style.width = `${carbsPct}%`;
        if (barProt) barProt.style.width = `${protPct}%`;
        if (barFat) barFat.style.width = `${fatPct}%`;

        const carbsStr = isOz ? (carbsG * 0.035274).toFixed(1) + ' oz' : `${carbsG}g`;
        const protStr = isOz ? (protG * 0.035274).toFixed(1) + ' oz' : `${protG}g`;
        const fatStr = isOz ? (fatG * 0.035274).toFixed(1) + ' oz' : `${fatG}g`;

        if (valCarbs) valCarbs.innerHTML = `${carbsStr} <span class="text-on-surface-variant font-normal text-[11px]">(${carbsPct}%)</span>`;
        if (valProt) valProt.innerHTML = `${protStr} <span class="text-on-surface-variant font-normal text-[11px]">(${protPct}%)</span>`;
        if (valFat) valFat.innerHTML = `${fatStr} <span class="text-on-surface-variant font-normal text-[11px]">(${fatPct}%)</span>`;
    }

    // 5. Mis comidas de hoy
    if (misComidasContainer) {
        const platos = totals.platosHoy || [];
        const bottomBtnContainer = document.getElementById('bottom-registrar-comida-container');

        if (platos.length === 0) {
            if (bottomBtnContainer) {
                bottomBtnContainer.classList.add('hidden');
            }
            misComidasContainer.innerHTML = `
                <div class="p-8 bg-surface-container-lowest rounded-2xl border border-dashed border-surface-container-high/80 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
                    <div class="w-14 h-14 rounded-2xl bg-primary-fixed/30 text-primary flex items-center justify-center">
                        <span class="material-symbols-outlined text-[32px]">restaurant</span>
                    </div>
                    <div class="max-w-xs">
                        <h4 class="font-headline-md text-base font-bold text-on-surface">No has registrado comidas hoy</h4>
                        <p class="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">Registra tus platillos para calcular tus calorías y macronutrientes en tiempo real.</p>
                    </div>
                    <button type="button" class="btn-open-create-dish-dashboard mt-2 px-4 py-2 rounded-xl bg-primary-container text-on-primary font-bold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer">
                        <span class="material-symbols-outlined text-[18px]">add</span>
                        <span>Registrar platillo</span>
                    </button>
                </div>
            `;
        } else {
            if (bottomBtnContainer) {
                bottomBtnContainer.classList.remove('hidden');
            }
            misComidasContainer.innerHTML = platos.map(plato => {
                const pKcal = plato.calorias || (Math.round((Number(plato.carbohidratos||0)*4) + (Number(plato.proteinas||0)*4) + (Number(plato.grasas||0)*9)));
                const pCarbs = Number(plato.carbohidratos) || 0;
                const pProt = Number(plato.proteinas) || 0;
                const pFat = Number(plato.grasas) || 0;
                const pFoto = plato.foto;
                return `
                    <div class="group flex items-center justify-between p-card-padding bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-md hover:bg-surface-container-low/60 border border-surface-container-high/30 transition-all">
                        <div class="flex items-center gap-space-md min-w-0">
                            <div class="w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-surface-container flex-shrink-0 flex items-center justify-center">
                                ${pFoto ? `<img alt="${plato.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" src="${pFoto}" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-primary text-[24px]\\'>restaurant</span>';" />` : `<span class="material-symbols-outlined text-primary text-[24px]">restaurant</span>`}
                            </div>
                            <div class="flex flex-col min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="font-title-sm text-title-sm text-on-surface font-bold truncate">${plato.nombre}</span>
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-[11px] font-bold">
                                        ${plato.categoria || 'Comida'}
                                    </span>
                                </div>
                                <p class="font-body-sm text-[13px] text-on-surface-variant line-clamp-1 mt-0.5">${plato.descripcion || 'Sin descripción'}</p>
                                <div class="flex items-center gap-2 text-tertiary pt-1 flex-wrap">
                                    <div class="flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[15px]">local_fire_department</span>
                                        <span class="font-body-sm text-[12px] font-bold text-tertiary">${pKcal} kcal</span>
                                    </div>
                                    <span class="text-on-surface-variant/40 text-xs">•</span>
                                    <div class="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant">
                                        <span class="text-[#10b981]">C:${pCarbs}g</span>
                                        <span class="text-[#0284c7]">P:${pProt}g</span>
                                        <span class="text-[#f59e0b]">G:${pFat}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" data-dish-id="${plato.id}" class="btn-delete-dish-dashboard w-9 h-9 rounded-full bg-surface-container hover:bg-error/15 hover:text-error text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2" title="Eliminar platillo">
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>
                `;
            }).join('');

            misComidasContainer.querySelectorAll('.btn-delete-dish-dashboard').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const dishId = btn.getAttribute('data-dish-id');
                    if (dishId && window.PlatosStore) {
                        window.PlatosStore.remove(dishId);
                    }
                });
            });
        }
    }

    // 6. Platos Favoritos
    const favContainer = document.getElementById('favoritos-container');
    if (favContainer && window.PlatosStore) {
        const allDishes = window.PlatosStore.getAll();
        const favDishes = allDishes.filter(d => d.esFavorito);
        const displayFavs = favDishes.length > 0 ? favDishes.slice(0, 3) : allDishes.slice(0, 3);

        if (displayFavs.length === 0) {
            favContainer.innerHTML = `
                <div class="py-4 text-center text-xs text-on-surface-variant">
                    No tienes platillos guardados. Agrega comidas desde <a href="mis_platos.html" class="text-primary font-bold underline">Mis Platos</a>.
                </div>
            `;
        } else {
            favContainer.innerHTML = displayFavs.map(fav => {
                const fKcal = fav.calorias || (Math.round((Number(fav.carbohidratos||0)*4) + (Number(fav.proteinas||0)*4) + (Number(fav.grasas||0)*9)));
                return `
                    <div class="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors group">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-11 h-11 rounded-xl overflow-hidden shadow-xs bg-surface-container shrink-0 flex items-center justify-center">
                                ${fav.foto ? `<img alt="${fav.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" src="${fav.foto}" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-primary text-[20px]\\'>restaurant</span>';" />` : `<span class="material-symbols-outlined text-primary text-[20px]">restaurant</span>`}
                            </div>
                            <div class="flex flex-col min-w-0">
                                <span class="font-title-sm text-[13px] text-on-surface font-bold line-clamp-1 truncate">${fav.nombre}</span>
                                <span class="font-body-sm text-[11px] text-tertiary font-bold">${fKcal} kcal</span>
                            </div>
                        </div>
                        <a href="mis_platos.html" aria-label="Ver platillo" class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all shrink-0">
                            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                        </a>
                    </div>
                `;
            }).join('');
        }
    }

    bindDashboardModalEvents();
}

window.initDashboard = initDashboard;
window.addEventListener('dia_platos_updated', () => {
    if (typeof window.initDashboard === 'function') {
        window.initDashboard();
    }
});