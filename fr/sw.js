const vertion = 'V1';

self.addEventListener("install", (event) => {
    
    event.waitUntil((async () => {
    caches.open(vertion)
    .then(cache => {
        cache.addAll(["https://pyrolamacraft.github.io/fr/off/offline.html", "https://pyrolamacraft.github.io/fr/off/offline.css","https://pyrolamacraft.github.io/fr/off/back.png"]); // it stores two resources
    });
    }));
    console.log(vertion, "est en cour d'instalation");
});


self.addEventListener("activate", () => {
    clients.claim();
    console.log(vertion, "a ete activer");
});


self.addEventListener('fetch', (event) =>{
    console.log(vertion, 'get url:',event.request.url,'mode url:',event.request.mode);
    66
    if (event.request.mode == "navigate") {
        event.respondWith((async () => {
            try{
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                };

                return await fetch(event.request);
            } catch (e) {
                const cache = await caches.open(vertion);
                return await cache.match('https://pyrolamacraft.github.io/fr/off/offline.html');
            };
        })(

        ));
    };
});
