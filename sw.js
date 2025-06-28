// Service Worker for CCIE Master
const CACHE_NAME = 'ccie-master-v2.0.0';
const STATIC_CACHE = 'ccie-master-static-v2';
const DYNAMIC_CACHE = 'ccie-master-dynamic-v2';
const IMAGE_CACHE = 'ccie-master-images-v2';

// Critical resources to cache immediately
const STATIC_CACHE_URLS = [
    '/',
    '/courses/',
    '/success-stories/',
    '/contact/',
    '/js/mobile-styles.css',
    '/js/mobile-menu.js',
    '/js/performance-optimizations.css',
    '/js/performance-optimizations.js',
    '/js/promotions-config.js',
    '/js/form-validation.js'
];

// Network-first resources (always try network first)
const NETWORK_FIRST_URLS = [
    '/contact/',
    '/sw.js'
];

// Image resources for separate caching
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

// Cache size limits
const CACHE_LIMITS = {
    [STATIC_CACHE]: 50,
    [DYNAMIC_CACHE]: 100,
    [IMAGE_CACHE]: 200
};

// Helper function to limit cache size
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
        await cache.delete(keys[0]);
        await limitCacheSize(cacheName, maxItems);
    }
}

// Helper function to determine cache strategy
function getCacheStrategy(url) {
    const urlPath = new URL(url).pathname;
    
    if (NETWORK_FIRST_URLS.some(pattern => urlPath.includes(pattern))) {
        return 'network-first';
    }
    
    if (IMAGE_EXTENSIONS.some(ext => urlPath.includes(ext))) {
        return 'cache-first-image';
    }
    
    if (urlPath.includes('.css') || urlPath.includes('.js')) {
        return 'stale-while-revalidate';
    }
    
    return 'cache-first';
}

// Cache critical resources on install
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then((cache) => {
                return cache.addAll(STATIC_CACHE_URLS);
            }),
            self.skipWaiting()
        ])
    );
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
    const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
    
    event.waitUntil(
        Promise.all([
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!currentCaches.includes(cacheName)) {
                            // console.log('Deleting old cache:', cacheName); // Disabled for production
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});

// Advanced fetch handling with multiple strategies
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    const strategy = getCacheStrategy(event.request.url);
    
    switch (strategy) {
        case 'network-first':
            event.respondWith(networkFirst(event.request));
            break;
        case 'cache-first-image':
            event.respondWith(cacheFirstImage(event.request));
            break;
        case 'stale-while-revalidate':
            event.respondWith(staleWhileRevalidate(event.request));
            break;
        default:
            event.respondWith(cacheFirst(event.request));
    }
});

// Network-first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            await limitCacheSize(DYNAMIC_CACHE, CACHE_LIMITS[DYNAMIC_CACHE]);
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || await caches.match('/');
    }
}

// Cache-first strategy for images
async function cacheFirstImage(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
            await limitCacheSize(IMAGE_CACHE, CACHE_LIMITS[IMAGE_CACHE]);
        }
        return networkResponse;
    } catch (error) {
        // Return a placeholder or error response for images
        return new Response('Image not available offline', { status: 404 });
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const networkResponsePromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => null);
    
    return cachedResponse || await networkResponsePromise;
}

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            await limitCacheSize(DYNAMIC_CACHE, CACHE_LIMITS[DYNAMIC_CACHE]);
        }
        return networkResponse;
    } catch (error) {
        // Provide offline fallback for HTML pages
        if (request.headers.get('accept')?.includes('text/html')) {
            return await caches.match('/');
        }
        return new Response('Content not available offline', { status: 503 });
    }
} 