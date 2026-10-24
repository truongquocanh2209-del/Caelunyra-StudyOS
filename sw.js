'use strict';

/*
 * Caelunyra StudyOS offline app shell.
 * This worker caches only the same-origin application shell. It does not cache
 * external learning resources, user-linked destinations, or arbitrary API data.
 */
const CACHE_PREFIX = 'orilynth-app-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v1.20.0`;
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=1.20.0',
  './app.js?v=1.20.0',
  './manifest.webmanifest',
  './favicon.svg',
  './caelunyra-mark.svg',
  './caelunyra-icon-192.png',
  './caelunyra-icon-512.png'
];

const absoluteUrl = path => new URL(path, self.registration.scope).href;
const inScope = url => url.origin === self.location.origin && url.pathname.startsWith(new URL(self.registration.scope).pathname);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL.map(absoluteUrl));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!inScope(url)) return;

  // Navigation is network-first so deployments can update normally, with a
  // cached index fallback when the network is unavailable.
  if (request.mode === 'navigate') {
    const scopeUrl = new URL(self.registration.scope);
    const appIndexPath = new URL('./index.html', self.registration.scope).pathname;
    // Only the application entry point needs SPA-style offline fallback; do not
    // replace README or other same-origin documents with the app shell.
    if (url.pathname !== scopeUrl.pathname && url.pathname !== appIndexPath) return;
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request)) || (await caches.match(absoluteUrl('./index.html'))) || Response.error();
      }
    })());
    return;
  }

  // Same-origin application assets are cache-first after the initial install.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      return Response.error();
    }
  })());
});
