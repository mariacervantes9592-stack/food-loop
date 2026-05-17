self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("foodloop-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "app.js",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});