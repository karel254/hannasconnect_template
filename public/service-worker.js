importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  // Precache the offline fallback page
  workbox.precaching.precacheAndRoute([
    { url: '/offline.html', revision: null },
  ]);

  // Custom networkFirst for navigations that NEVER caches offline.html
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    async ({ event }) => {
      try {
        const response = await fetch(event.request);
        // If we get a valid response, clone and cache it
        if (response && response.ok && response.type === 'basic') {
          const cache = await caches.open('pages-v2');
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        // If network fails, try cache, else offline.html
        const cache = await caches.open('pages-v2');
        const cached = await cache.match(event.request);
        if (cached) return cached;
        return caches.match('/offline.html');
      }
    }
  );

  // Cache images
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-v2',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 100 }),
      ],
    })
  );

  // Cache fonts
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: 'fonts-v2',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 20 }),
      ],
    })
  );

  // Cache CSS/JS assets
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources-v2',
    })
  );

} else {
  console.log('Workbox could not be loaded. No offline support.');
} 