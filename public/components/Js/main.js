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
});