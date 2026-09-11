/**
 * CRUD y Gestión de Mis Platos - DIA Dashboard
 * Compatible con visualización directa y navegación instantánea SPA (switchAppView).
 */

(function () {
  const STORAGE_KEY = 'dia_mis_platos';
  const DEFAULT_MOCK_IDS = ['plato-1', 'plato-2', 'plato-3', 'plato-4'];

  const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 260' width='400' height='260'%3E%3Crect width='400' height='260' fill='%23eaedff'/%3E%3Cg fill='%23006c49'%3E%3Ccircle cx='200' cy='115' r='45' fill='none' stroke='%2310b981' stroke-width='6'/%3E%3Cpath d='M160 85v25a8 8 0 008 8v35h6v-35a8 8 0 008-8V85h-4v20h-4V85h-3v20h-4V85h-5zm65 0v30a8 8 0 008 8v30h6V85h-14z' fill='%2310b981'/%3E%3C/g%3E%3Ctext x='200' y='210' font-family='Plus Jakarta Sans, sans-serif' font-size='16' font-weight='700' fill='%233c4a42' text-anchor='middle'%3EPlatillo Nutritivo DIA%3C/text%3E%3C/svg%3E";

  // Modelo de datos en LocalStorage (sin datos simulados por defecto)
  const PlatosStore = {
    getAll: function () {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          return [];
        }
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filtrar y eliminar platillos de ejemplo mock iniciales si aún persisten
          const cleaned = parsed.filter(p => !DEFAULT_MOCK_IDS.includes(p.id));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
        return [];
      } catch (e) {
        console.warn('Error al leer de LocalStorage:', e);
        return [];
      }
    },
    saveAll: function (platos) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(platos));
        this.notifyChange();
        this.syncToServer(platos);
      } catch (e) {
        console.error('Error al guardar en LocalStorage:', e);
      }
    },
    syncToServer: async function(platos) {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        const res = await fetch('/api/platillos/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_persona: idPersona, platillos: platos })
        });
        if (res.ok) {
          console.log('[Mis Platos] Sincronizado con éxito al servidor.');
          // Recargar para obtener los datos actualizados (ej. calorías calculadas por IA)
          await this.syncFromServer();
          // syncFromServer ya llama a this.notifyChange(), lo que disparará el renderizado
        } else {
          console.error('[Mis Platos] Error sincronizando platos.', await res.text());
        }
      } catch (err) {
        console.error('[Mis Platos] Fallo de red sincronizando platos:', err);
      }
    },
    syncFromServer: async function() {
      const idPersona = localStorage.getItem('dia_id_persona');
      if (!idPersona) return;
      try {
        const res = await fetch(`/api/platillos/${idPersona}`);
        if (res.ok) {
          const dbPlatos = await res.json();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbPlatos));
          this.notifyChange();
        }
      } catch (e) {
        console.error('Error obteniendo platillos del servidor:', e);
      }
    },
    notifyChange: function () {
      try {
        window.dispatchEvent(new CustomEvent('dia_platos_updated'));
      } catch (e) {}
    },
    add: function (plato) {
      const list = this.getAll();
      plato.id = 'plato-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      plato.fecha = plato.fecha || new Date().toISOString();
      list.unshift(plato);
      this.saveAll(list);
      return plato;
    },
    update: function (id, data) {
      const list = this.getAll();
      const index = list.findIndex((p) => p.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...data, fechaActualizacion: new Date().toISOString() };
        this.saveAll(list);
        return list[index];
      }
      return null;
    },
    remove: function (id) {
      const list = this.getAll();
      const filtered = list.filter((p) => p.id !== id);
      this.saveAll(filtered);
      return filtered;
    },
    getById: function (id) {
      const list = this.getAll();
      return list.find((p) => p.id === id) || null;
    },
    getTodayTotals: function () {
      const list = this.getAll();
      const now = new Date();
      const isToday = (dateStr) => {
        if (!dateStr) return true;
        const d = new Date(dateStr);
        return d.getFullYear() === now.getFullYear() &&
               d.getMonth() === now.getMonth() &&
               d.getDate() === now.getDate();
      };

      const platosHoy = list.filter(p => isToday(p.fecha));

      let totalCal = 0;
      let totalProt = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      let totalFib = 0;

      const byCategory = {
        Desayuno: { carbs: 0, protein: 0, fat: 0, kcal: 0, items: [] },
        Almuerzo: { carbs: 0, protein: 0, fat: 0, kcal: 0, items: [] },
        Cena: { carbs: 0, protein: 0, fat: 0, kcal: 0, items: [] },
        Snack: { carbs: 0, protein: 0, fat: 0, kcal: 0, items: [] }
      };

      platosHoy.forEach(p => {
        let carbs = Number(p.carbohidratos) || 0;
        let prot = Number(p.proteinas) || 0;
        let fat = Number(p.grasas) || 0;
        const fib = Number(p.fibra) || 0;

        let kcal = Number(p.calorias) || 0;
        if (kcal <= 0 && (carbs > 0 || prot > 0 || fat > 0)) {
          kcal = Math.round((carbs * 4) + (prot * 4) + (fat * 9));
        } else if (kcal > 0 && carbs === 0 && prot === 0 && fat === 0) {
          // Si el plato solo tiene calorías ingresadas (sin desglose de macros),
          // estimar distribución estándar balanceada (50% carbs, 25% proteína, 25% grasas)
          // para que los gráficos y barras se calculen dinámicamente:
          carbs = Math.round((kcal * 0.50) / 4);
          prot = Math.round((kcal * 0.25) / 4);
          fat = Math.round((kcal * 0.25) / 9);
        }

        totalCal += kcal;
        totalProt += prot;
        totalCarbs += carbs;
        totalFat += fat;
        totalFib += fib;

        const cat = p.categoria && byCategory[p.categoria] ? p.categoria : 'Almuerzo';
        byCategory[cat].carbs += carbs;
        byCategory[cat].protein += prot;
        byCategory[cat].fat += fat;
        byCategory[cat].kcal += kcal;
        byCategory[cat].items.push(p);
      });

      return {
        calorias: totalCal,
        proteinas: totalProt,
        carbs: totalCarbs,
        grasas: totalFat,
        fibra: totalFib,
        platosHoy,
        byCategory
      };
    }
  };

  // Controlador de la vista
  async function initMisPlatos() {
    if (localStorage.getItem('dia_id_persona')) {
      await PlatosStore.syncFromServer();
    }
    const gridContainer = document.getElementById('platos-grid');
    const emptyState = document.getElementById('platos-empty-state');
    const searchInput = document.getElementById('platos-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');
    const categoryChips = document.querySelectorAll('.plato-category-chip');
    const countBadge = document.getElementById('platos-count-badge');
    
    // Botones para abrir modal de creación
    const btnCreateDish = document.getElementById('btn-create-dish');
    const btnEmptyCreate = document.getElementById('btn-empty-create');

    // Elementos del modal de plato
    const modal = document.getElementById('plato-modal');
    const modalBackdrop = document.getElementById('plato-modal-backdrop');
    const modalDialog = document.getElementById('plato-modal-dialog');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('plato-form');
    const btnCancel = document.getElementById('btn-modal-cancel');
    const btnCloseX = document.getElementById('btn-modal-close');

    // Campos del formulario
    const inputId = document.getElementById('plato-id');
    const inputNombre = document.getElementById('plato-nombre');
    const inputFoto = document.getElementById('plato-foto-url');
    const inputFile = document.getElementById('plato-foto-file');
    const btnSelectFile = document.getElementById('btn-select-file');
    const inputDescripcion = document.getElementById('plato-descripcion');
    const inputCalorias = document.getElementById('plato-calorias');
    const selectCategoria = document.getElementById('plato-categoria');
    const inputCarbs = document.getElementById('plato-carbs');
    const inputProtein = document.getElementById('plato-protein');
    const inputFat = document.getElementById('plato-fat');
    const inputFibra = document.getElementById('plato-fibra');
    const previewContainer = document.getElementById('plato-image-preview-container');
    const previewImg = document.getElementById('plato-image-preview');
    const btnRemoveImage = document.getElementById('btn-remove-preview-image');
    const presetImages = document.querySelectorAll('.preset-image-btn');

    // Cálculo automático de calorías a partir de macronutrientes (si los campos existen)
    function autoCalcCalories() {
      const c = parseFloat(inputCarbs ? inputCarbs.value : 0) || 0;
      const p = parseFloat(inputProtein ? inputProtein.value : 0) || 0;
      const f = parseFloat(inputFat ? inputFat.value : 0) || 0;
      if (c > 0 || p > 0 || f > 0) {
        const computed = Math.round((c * 4) + (p * 4) + (f * 9));
        if (inputCalorias) inputCalorias.value = computed;
      }
    }

    [inputCarbs, inputProtein, inputFat].forEach((inp) => {
      if (inp) {
        inp.addEventListener('input', autoCalcCalories);
      }
    });

    // Modal de confirmación de eliminación
    const deleteModal = document.getElementById('delete-modal');
    const deleteDishName = document.getElementById('delete-dish-name');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    let dishIdToDelete = null;

    if (!gridContainer || !modal) {
      // Elementos no presentes aún en el DOM
      return;
    }

    let activeCategory = 'Todos';
    let searchQuery = '';
    let currentImageData = '';

    // Renderizar lista de platillos
    function render() {
      const allPlatos = PlatosStore.getAll();
      const filtered = allPlatos.filter((p) => {
        const matchesCategory = activeCategory === 'Todos' || p.categoria === activeCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          (p.nombre && p.nombre.toLowerCase().includes(q)) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(q)) ||
          (p.categoria && p.categoria.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      });

      // Actualizar contador
      if (countBadge) {
        countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'platillo' : 'platillos'}`;
      }

      // Estado vacío
      if (filtered.length === 0) {
        gridContainer.classList.add('hidden');
        if (emptyState) {
          emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
        }
        return;
      }

      gridContainer.classList.remove('hidden');
      if (emptyState) {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
      }

      // Generar tarjetas
      gridContainer.innerHTML = filtered
        .map((plato) => {
          const fotoUrl = plato.foto || FALLBACK_IMAGE;
          const caloriasText = plato.calorias ? `${plato.calorias} kcal` : null;

          // Clases para badge según categoría
          let catBg = 'bg-primary-container/20 text-on-primary-container border-primary-container/30';
          if (plato.categoria === 'Desayuno') catBg = 'bg-amber-100 text-amber-900 border-amber-300';
          else if (plato.categoria === 'Almuerzo') catBg = 'bg-emerald-100 text-emerald-900 border-emerald-300';
          else if (plato.categoria === 'Cena') catBg = 'bg-indigo-100 text-indigo-900 border-indigo-300';
          else if (plato.categoria === 'Snack') catBg = 'bg-orange-100 text-orange-900 border-orange-300';

          const hasMacros = plato.carbohidratos > 0 || plato.proteinas > 0 || plato.grasas > 0;
          const macrosHtml = hasMacros
            ? `<div class="flex items-center gap-1.5 flex-wrap text-[11px] font-bold text-on-surface-variant/90 pt-1">
                <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">Carbs: ${plato.carbohidratos || 0}g</span>
                <span class="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300">Prot: ${plato.proteinas || 0}g</span>
                <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">Grasas: ${plato.grasas || 0}g</span>
              </div>`
            : '';

          return `
            <article class="group relative flex flex-col bg-surface-container-lowest rounded-3xl border border-surface-container-high/60 shadow-sm hover:shadow-xl hover:border-primary-container/40 transition-all duration-300 overflow-hidden" data-id="${escapeHtml(plato.id)}">
              <!-- CONTENEDOR DE LA IMAGEN CON EFECTO ZOOM SUAVE -->
              <div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-container-low">
                <img 
                  src="${escapeHtml(fotoUrl)}" 
                  alt="${escapeHtml(plato.nombre)}"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
                
                <!-- BADGE DE CATEGORÍA FLOTANTE (ARRIBA A LA IZQUIERDA) -->
                ${
                  plato.categoria
                    ? `<span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${catBg}">
                        ${escapeHtml(plato.categoria)}
                      </span>`
                    : ''
                }

                <!-- BADGE DE CALORÍAS FLOTANTE (ARRIBA A LA DERECHA) -->
                ${
                  caloriasText
                    ? `<span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black bg-surface-container-lowest/90 backdrop-blur-md text-tertiary border border-surface-container-high shadow-sm flex items-center gap-1">
                        <span class="material-symbols-outlined text-[15px] text-tertiary-fixed-dim fill-current" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
                        ${escapeHtml(caloriasText)}
                      </span>`
                    : ''
                }
              </div>

              <!-- CONTENIDO DE LA TARJETA -->
              <div class="p-5 flex-1 flex flex-col justify-between gap-3">
                <div class="flex flex-col gap-1.5">
                  <h3 class="font-headline-md text-lg font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    ${escapeHtml(plato.nombre)}
                  </h3>
                  <p class="font-body-md text-xs sm:text-[13px] text-on-surface-variant leading-relaxed line-clamp-3">
                    ${escapeHtml(plato.descripcion || 'Sin descripción ingresada.')}
                  </p>
                  ${macrosHtml}
                </div>

                <!-- ACCIONES DE LA TARJETA (EDITAR Y ELIMINAR) -->
                <div class="pt-3 mt-1 border-t border-surface-container-high/50 flex items-center justify-between gap-2">
                  <span class="text-[11px] font-semibold text-on-surface-variant/70 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">restaurant</span>
                    Plato DIA
                  </span>
                  <div class="flex items-center gap-1.5">
                    <button 
                      type="button" 
                      class="btn-edit-plato inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-primary-container/20 text-on-surface hover:text-primary active:scale-95 transition-all text-xs font-bold border border-surface-container-high/70"
                      data-id="${escapeHtml(plato.id)}"
                      aria-label="Editar ${escapeHtml(plato.nombre)}"
                    >
                      <span class="material-symbols-outlined text-[16px] pointer-events-none">edit</span>
                      <span class="pointer-events-none">Editar</span>
                    </button>
                    <button 
                      type="button" 
                      class="btn-delete-plato inline-flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container-low hover:bg-error/15 text-on-surface-variant hover:text-error active:scale-95 transition-all text-xs font-bold border border-surface-container-high/70"
                      data-id="${escapeHtml(plato.id)}"
                      data-name="${escapeHtml(plato.nombre)}"
                      aria-label="Eliminar ${escapeHtml(plato.nombre)}"
                      title="Eliminar plato"
                    >
                      <span class="material-symbols-outlined text-[17px] pointer-events-none">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          `;
        })
        .join('\n');

      // Vincular botones de edición
      gridContainer.querySelectorAll('.btn-edit-plato').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          openEditModal(id);
        });
      });

      // Vincular botones de eliminación
      gridContainer.querySelectorAll('.btn-delete-plato').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const name = btn.getAttribute('data-name') || 'este plato';
          openDeleteConfirm(id, name);
        });
      });
    }

    // Modal: Abrir para crear
    function openCreateModal() {
      form.reset();
      inputId.value = '';
      if (inputCarbs) inputCarbs.value = '';
      if (inputProtein) inputProtein.value = '';
      if (inputFat) inputFat.value = '';
      if (inputFibra) inputFibra.value = '';
      if (inputCalorias) inputCalorias.value = '';
      modalTitle.textContent = 'Crear Platillo';
      const submitText = document.getElementById('modal-submit-text');
      if (submitText) submitText.textContent = 'Guardar Platillo';
      currentImageData = '';
      updateImagePreview('');
      showModal();
      inputNombre.focus();
    }

    // Modal: Abrir para editar
    function openEditModal(id) {
      const plato = PlatosStore.getById(id);
      if (!plato) return;

      inputId.value = plato.id;
      inputNombre.value = plato.nombre || '';
      inputDescripcion.value = plato.descripcion || '';
      if (inputCalorias) inputCalorias.value = plato.calorias || '';
      if (selectCategoria) selectCategoria.value = plato.categoria || 'Almuerzo';
      
      if (inputCarbs) inputCarbs.value = plato.carbohidratos !== undefined && plato.carbohidratos !== null ? plato.carbohidratos : '';
      if (inputProtein) inputProtein.value = plato.proteinas !== undefined && plato.proteinas !== null ? plato.proteinas : '';
      if (inputFat) inputFat.value = plato.grasas !== undefined && plato.grasas !== null ? plato.grasas : '';
      if (inputFibra) inputFibra.value = plato.fibra !== undefined && plato.fibra !== null ? plato.fibra : '';

      inputFoto.value = plato.foto && !plato.foto.startsWith('data:') ? plato.foto : '';
      currentImageData = plato.foto || '';

      modalTitle.textContent = 'Editar Platillo';
      const submitText = document.getElementById('modal-submit-text');
      if (submitText) submitText.textContent = 'Actualizar Platillo';
      updateImagePreview(currentImageData);
      showModal();
      inputNombre.focus();
    }

    function showModal() {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (modalBackdrop) modalBackdrop.classList.remove('opacity-0');
        if (modalDialog) {
          modalDialog.classList.remove('opacity-0', 'scale-95');
          modalDialog.classList.add('opacity-100', 'scale-100');
        }
      }, 10);
    }

    function hideModal() {
      if (modalBackdrop) modalBackdrop.classList.add('opacity-0');
      if (modalDialog) {
        modalDialog.classList.remove('opacity-100', 'scale-100');
        modalDialog.classList.add('opacity-0', 'scale-95');
      }
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 200);
    }

    // Previsualización de imagen
    function updateImagePreview(src) {
      if (src) {
        previewImg.src = src;
        previewContainer.classList.remove('hidden');
      } else {
        previewImg.src = '';
        previewContainer.classList.add('hidden');
      }
    }

    // Modal de confirmación de eliminación
    function openDeleteConfirm(id, name) {
      dishIdToDelete = id;
      if (deleteDishName) deleteDishName.textContent = name;
      if (deleteModal) {
        deleteModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDeleteConfirm() {
      if (deleteModal) {
        deleteModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
      dishIdToDelete = null;
    }

    // Event Listeners: Apertura y Cierre Modal
    if (btnCreateDish) btnCreateDish.addEventListener('click', openCreateModal);
    if (btnEmptyCreate) btnEmptyCreate.addEventListener('click', openCreateModal);
    if (btnCancel) btnCancel.addEventListener('click', hideModal);
    if (btnCloseX) btnCloseX.addEventListener('click', hideModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', hideModal);

    // Escape para cerrar modal (vinculación única global)
    if (!window.__misPlatosKeydownBound) {
      window.__misPlatosKeydownBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const m = document.getElementById('plato-modal');
          const dm = document.getElementById('delete-modal');
          if (m && !m.classList.contains('hidden')) {
            const btn = document.getElementById('btn-modal-cancel');
            if (btn) btn.click();
          }
          if (dm && !dm.classList.contains('hidden')) {
            const btn = document.getElementById('btn-cancel-delete');
            if (btn) btn.click();
          }
        }
      });
    }

    // Eventos de foto: Input URL
    if (inputFoto) {
      inputFoto.addEventListener('input', () => {
        const url = inputFoto.value.trim();
        currentImageData = url;
        updateImagePreview(url);
      });
    }

    // Eventos de foto: Carga de archivo local
    if (btnSelectFile && inputFile) {
      btnSelectFile.addEventListener('click', () => inputFile.click());
      inputFile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (event) {
          currentImageData = event.target.result;
          if (inputFoto) inputFoto.value = '';
          updateImagePreview(currentImageData);
        };
        reader.readAsDataURL(file);
      });
    }

    // Quitar foto
    if (btnRemoveImage) {
      btnRemoveImage.addEventListener('click', () => {
        currentImageData = '';
        if (inputFoto) inputFoto.value = '';
        if (inputFile) inputFile.value = '';
        updateImagePreview('');
      });
    }

    // Presets rápidos de fotos nutritivas
    presetImages.forEach((btn) => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-img');
        if (url) {
          currentImageData = url;
          if (inputFoto) inputFoto.value = url;
          updateImagePreview(url);
        }
      });
    });

    // Envío del formulario
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const carbohidratos = inputCarbs && inputCarbs.value !== '' ? parseFloat(inputCarbs.value) : 0;
        const proteinas = inputProtein && inputProtein.value !== '' ? parseFloat(inputProtein.value) : 0;
        const grasas = inputFat && inputFat.value !== '' ? parseFloat(inputFat.value) : 0;
        const fibra = inputFibra && inputFibra.value !== '' ? parseFloat(inputFibra.value) : 0;
        let caloriasVal = 0; // Se calculará en el backend con QVAC

        const categoria = selectCategoria ? selectCategoria.value : 'Almuerzo';
        const id = inputId.value;

        if (!nombre) {
          inputNombre.focus();
          return;
        }

        const dishData = {
          nombre,
          descripcion,
          foto: currentImageData || FALLBACK_IMAGE,
          calorias: caloriasVal,
          carbohidratos,
          proteinas,
          grasas,
          fibra,
          categoria
        };

        if (id) {
          PlatosStore.update(id, dishData);
        } else {
          PlatosStore.add(dishData);
        }

        hideModal();
        render();
      });
    }

    // Confirmación de borrado
    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', () => {
        if (dishIdToDelete) {
          PlatosStore.remove(dishIdToDelete);
          closeDeleteConfirm();
          render();
        }
      });
    }
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', closeDeleteConfirm);
    }

    // Búsqueda en tiempo real
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (clearSearchBtn) {
          if (searchQuery) clearSearchBtn.classList.remove('hidden');
          else clearSearchBtn.classList.add('hidden');
        }
        render();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        searchInput.focus();
        render();
      });
    }

    // Filtro por categorías
    categoryChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        categoryChips.forEach((c) => {
          c.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
          c.classList.add('bg-surface-container-low', 'text-on-surface-variant');
        });
        chip.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');
        chip.classList.remove('bg-surface-container-low', 'text-on-surface-variant');

        activeCategory = chip.getAttribute('data-category') || 'Todos';
        render();
      });
    });

    // Escuchar eventos globales de actualización
    window.addEventListener('dia_platos_updated', () => {
      render();
    });

    // Exponer función de abrir modal para uso global y navegación SPA
    window.openCreatePlatoModal = openCreateModal;

    // Si se solicitó abrir automáticamente el formulario para registrar comida
    if (sessionStorage.getItem('dia_auto_open_create_dish') === 'true' || window.location.hash === '#crear') {
      sessionStorage.removeItem('dia_auto_open_create_dish');
      setTimeout(() => {
        openCreateModal();
      }, 50);
    }

    // Render inicial
    render();
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Exportar al ámbito global para SPA y script tag directo
  window.initMisPlatosView = initMisPlatos;
  window.PlatosStore = PlatosStore;

  // Si el DOM ya cargó y estamos en la vista de mis platos, inicializar de inmediato
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('platos-grid')) initMisPlatos();
    });
  } else {
    if (document.getElementById('platos-grid')) initMisPlatos();
  }
})();
