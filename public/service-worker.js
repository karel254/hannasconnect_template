importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  // Precache the offline fallback page
  workbox.precaching.precacheAndRoute([
    { url: '/offline.html', revision: null },
  ]);

  // Use ONLY Workbox's networkFirst for navigations
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    async ({ event }) => {
      try {
        // Always try the network first
        return await workbox.strategies.networkFirst({
          cacheName: 'pages',
          plugins: [
            new workbox.expiration.ExpirationPlugin({ maxEntries: 50 }),
          ],
        }).handle({ event });
      } catch (error) {
        // Only serve offline.html if network fails
        return caches.match('/offline.html');
      }
    }
  );

  // Cache images
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 100 }),
      ],
    })
  );

  // Cache fonts
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: 'fonts',
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
      cacheName: 'static-resources',
    })
  );

  // REMOVE redundant fetch event listener for navigations
} else {
  console.log('Workbox could not be loaded. No offline support.');
} 