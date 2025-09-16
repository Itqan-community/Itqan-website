const CACHE_NAME = 'itqan-v1';
const RUNTIME_CACHE = 'itqan-runtime';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/en',
  '/ar',
  '/logo.svg',
  '/fonts/Fustat-VariableFont_wght.ttf',
  '/fonts/Rubik-VariableFont_wght.ttf',
  '/images/home/hero-bg.avif',
  '/images/home/hero-card-mushaf.svg',
  '/images/home/hero-card-laptop.svg',
  '/images/home/hero-card-headset.svg',
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Force waiting service worker to become active
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Claim all clients
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // CRITICAL: Never cache Sanity API calls to preserve real-time updates
  // This ensures that:
  // 1. SanityLive component can receive real-time updates
  // 2. sanityFetch always gets fresh data (useCdn: false is respected)
  // 3. Content changes in Sanity Studio reflect immediately
  if (url.hostname.includes('sanity.io') || 
      url.hostname.includes('apicdn.sanity.io') ||
      url.hostname.includes('api.sanity.io') ||
      url.pathname.includes('/v1/') ||
      url.pathname.includes('/v2021-') ||
      url.pathname.includes('/v2023-') ||
      url.pathname.includes('/v2024-') ||
      url.pathname.includes('/v2025-') ||
      url.search.includes('perspective=published') ||
      url.search.includes('perspective=previewDrafts')) {
    return; // Let Sanity requests go through without any caching
  }

  // Skip other cross-origin requests 
  if (url.origin !== location.origin) {
    return;
  }

  // Different strategies for different types of requests
  if (request.destination === 'image') {
    // Images: Cache first with fallback
    event.respondWith(cacheFirstStrategy(request));
  } else if (request.destination === 'font') {
    // Fonts: Cache first (they rarely change)
    event.respondWith(cacheFirstStrategy(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // JS/CSS: Stale while revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    // HTML pages: Network first with cache fallback
    event.respondWith(networkFirstStrategy(request));
  }
});

// Cache first strategy - for static assets
async function cacheFirstStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first strategy failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy - for JS/CSS
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Network first strategy - for HTML pages
async function networkFirstStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await cache.match('/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    return new Response('Offline', { status: 503 });
  }
}
