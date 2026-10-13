const CACHE_NAME = "dev-coffee-v2";

const archivos = [
    "./",
    "./index.html",
    "./detalle.html",
    "./manifest.json",
    "./css/style.css",
    "./js/app.js",
    "./js/detalle.js"
];

// 1. Instalación (Precarga de Shell/Estáticos)
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(archivos))
    );
});

// 2. Activación (Limpieza de cachés obsoletas)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 3. Manejo de peticiones con Cache First y Network First
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // ESTRATEGIA 1: Network First (para APIs o datos dinámicos)
    if (url.pathname.includes("/api/") || event.request.headers.get("accept")?.includes("application/json")) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    // Opcional: Guardar copia actualizada en caché
                    if (networkResponse.ok) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                    }
                    return networkResponse;
                })
                .catch(() => caches.match(event.request)) // Fallback a caché si falla la red
        );
        return;
    }

    // ESTRATEGIA 2: Cache First (para recursos estáticos / App Shell)
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse; // Retorna desde caché si existe
                }
                // Si no está en caché, lo busca en la red
                return fetch(event.request).then(networkResponse => {
                    if (networkResponse.ok && event.request.method === "GET") {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                    }
                    return networkResponse;
                });
            })
    );
});