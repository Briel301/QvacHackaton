/**
 * DIA NutriBot - Service Worker para soporte PWA y modo sin conexión (Fallback)
 */

const CACHE_NAME = 'dia-nutribot-cache-v1';

// Recursos críticos de la aplicación para almacenar en caché
const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/asistente.html',
  '/mi_progreso.html',
  '/mis_platos.html',
  '/historial.html',
  '/recordatorios.html',
  '/style.css',
  '/tailwind-generated.css',
  '/tailwind.cdn.js',
  '/tailwind.config.js',
  '/manifest.json',
  '/components/navigation.js',
  '/components/settings.js',
  '/components/views.js',
  '/components/mis_platos.js',
  '/components/recordatorios.js',
  '/components/historial.js',
  '/components/Js/main.js',
  '/components/Js/asistente.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(APP_SHELL_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[PWA] Error al precargar assets en cache:', err);
      })
  );
});

// Activación y limpieza de versiones antiguas de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Intercepción de solicitudes de red
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // 1. Las solicitudes a la API de backend (/api/*) SIEMPRE van por la red (Network Only / Network First)
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({
            error: 'Modo sin conexión. El servidor local no está accesible en este momento.',
            offline: true,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 503,
          }
        );
      })
    );
    return;
  }

  // 2. Recursos estáticos y vistas: Estrategia Cache-First con Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // En segundo plano intentamos actualizar la caché con la versión fresca de red
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Si es una navegación HTML y no hay red ni caché específica, servir index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});
