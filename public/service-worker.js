const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    'manifest.webmanifest',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0'
  ];

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// Function that handles caching the FILES TO CACHE.
const cacheResources = async () => {
    
    const cache = await caches.open(PRECACHE);
    return cache.addAll(FILES_TO_CACHE)

}

// Caches files on service worker install.
self.addEventListener('install', (event) => {

    event.waitUntil( cacheResources() );

    self.skipWaiting()
})

const cleanCache = async () => {

    const currentCaches = [PRECACHE, RUNTIME]

    const cacheNames = await caches.keys();

    return cacheNames
    .filter( (cacheName) => !currentCaches.includes(cacheName) )
    .map( (cacheName) => caches.delete(cacheName) );
}

self.addEventListener('activate', (event) => {

    event.waitUntil( cleanCache() );

    self.clients.claim();
})