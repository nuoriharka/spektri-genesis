// Minimal service worker: cache-first for static assets, network-first for pages
const CACHE_NAME = 'spektri-pwa-v1'
const CORE_ASSETS = [
  '/',
  '/brand/favicon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET') return
  // Static assets: cache-first
  if (url.origin === location.origin && (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/public/') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp'))) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        const copy = res.clone()
        caches.open(CACHE_NAME).then((c) => c.put(request, copy))
        return res
      }))
    )
    return
  }
  // Pages: network-first with cache fallback
  event.respondWith(
    fetch(request).then((res) => {
      const copy = res.clone()
      caches.open(CACHE_NAME).then((c) => c.put(request, copy))
      return res
    }).catch(() => caches.match(request))
  )
})
