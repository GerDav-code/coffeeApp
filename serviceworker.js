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

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(archivos);
            })
    );

});


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


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
            .catch(() => caches.match(event.request))

    );

});