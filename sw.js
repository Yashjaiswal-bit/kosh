/* Kosh service worker — cache-first for the shell, so the ledger opens instantly
   and works with no network at all. Your data never comes through here: it lives
   in localStorage, which the service worker cannot see or send anywhere. */

const VERSION = 'kosh-v2';
const SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon-maskable-512.png',
  'assets/apple-touch-icon.png',
  'fonts/caprasimo-latin.woff2',
  'fonts/caprasimo-latin-ext.woff2',
  'fonts/figtree-latin.woff2',
  'fonts/figtree-latin-ext.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  /* Navigations: serve the cached shell, fall back to the network. */
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then(hit => hit || fetch(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        /* keep same-origin responses for next time */
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
    })
  );
});
