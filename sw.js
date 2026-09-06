// Flo Service Worker v7 — network-first for HTML + manifest + icons, Web Push
const CACHE = 'flo-v11';

// Nothing is precached. Icons and the manifest must always be fetched fresh so
// a redeployed icon actually reaches the phone; the cache is only an offline
// fallback, filled as things load.
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Always go to network for Supabase and HTML (index.html always fresh)
  if (url.includes('supabase.co') || e.request.mode === 'navigate') return;

  // Network-first for manifest and icons, cache only as an offline fallback.
  // Cache-first here is what makes a redeployed icon never show up.
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        if (resp && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{});
        }
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});

// ── WEB PUSH ────────────────────────────────────────────────
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (err) { d = {}; }

  const title = d.title || 'Flo';
  const options = {
    body:  d.body  || 'You have a commitment due soon.',
    icon:  '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag:   d.tag || 'flo-reminder',
    renotify: true,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: { commitmentId: d.commitmentId || null, url: d.url || '/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping the notification opens Flo on that commitment
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const id = event.notification.data && event.notification.data.commitmentId;
  const target = id ? `/?commitment=${id}` : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Focus an already-open Flo window and tell it which commitment to show
      for (const client of list) {
        if ('focus' in client) {
          client.postMessage({ type: 'OPEN_COMMITMENT', commitmentId: id });
          return client.focus();
        }
      }
      // Nothing open — launch the app
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
