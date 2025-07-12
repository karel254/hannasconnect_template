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
          const cache = await caches.open('pages');
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        // If network fails, try cache, else offline.html
        const cache = await caches.open('pages');
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

} else {
  console.log('Workbox could not be loaded. No offline support.');
}

// Push notification event listener
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'You have a new notification!',
      icon: data.icon || '/images/favicon.ico',
      badge: data.badge || '/images/favicon.ico',
      image: data.image,
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
      data: data.data || {}
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'HannaSConnect', options)
    );
  }
});

// Notification click event listener
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action) {
    // Handle specific action clicks
    console.log('Action clicked:', event.action);
  } else {
    // Default click behavior - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 