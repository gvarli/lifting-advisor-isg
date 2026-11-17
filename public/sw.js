const CACHE_NAME = 'lifting-advisor-v2';
const OFFLINE_URL = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/encyclopedia',
  '/calculator',
  '/standards',
  '/ai-consultant',
  '/export-center',
];

// Install Event - Pre-cache offline shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets for offline-first operation');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate for local assets, Network-only with fallback for AI
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass non-GET requests (e.g. POST for AI streams or exports)
  if (request.method !== 'GET') {
    return;
  }

  // AI API Endpoints: Network-only, fail gracefully when offline
  if (url.pathname.startsWith('/api/ai')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            error: 'AI servisi internet bağlantısı gerektirir. Lütfen bağlantınızı kontrol edin veya lokal hesaplama modüllerini kullanın.',
          }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      })
    );
    return;
  }

  // Static assets & navigation: Cache-First with Network Fallback & Background Update
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to keep cache updated
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {/* Ignore background fetch failure when offline */});

        return cachedResponse;
      }

      // If not in cache, fetch from network and cache
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(async () => {
        // Fallback for navigation requests
        if (request.mode === 'navigate') {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(OFFLINE_URL)) || (await cache.match('/'));
        }
        return new Response('Offline content unavailable', { status: 503 });
      });
    })
  );
});
