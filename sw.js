"use strict";

const CACHE="karteikasten";
const DATEIEN=[
  "./","index.html","svenska.html","karteikasten.css","karteikasten.js",
  "manifest-deutsch.webmanifest","manifest-svenska.webmanifest",
  "icons/icon-180.png","icons/icon-192.png","icons/icon-512.png",
  "fonts/barlow-condensed-400.woff2","fonts/barlow-condensed-500.woff2","fonts/barlow-condensed-600.woff2",
  "fonts/source-serif-4.woff2","fonts/source-serif-4-italic.woff2",
  "svenska/enett.js","svenska/bestamd.js","svenska/plural.js","svenska/adjektiv.js","svenska/pronomen.js",
  "svenska/sin.js","svenska/ordfoljd.js","svenska/prep.js","svenska/tid.js","svenska/verb.js",
  "svenska/tempus.js","svenska/ligga.js","svenska/reflexiv.js","svenska/sverb.js","svenska/partikel.js",
  "svenska/att.js","svenska/vanner.js"
];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(DATEIEN.map(d=>new Request(d,{cache:"no-cache"})))));
  self.skipWaiting();
});

self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));

// Answer from the cache right away and fetch a fresh copy for the next visit.
self.addEventListener("fetch",e=>{
  const anfrage=e.request;
  if(anfrage.method!=="GET"||new URL(anfrage.url).origin!==location.origin) return;
  const frisch=fetch(anfrage,{cache:"no-cache"}).then(antwort=>{
    if(antwort.ok){
      const kopie=antwort.clone();
      caches.open(CACHE).then(c=>c.put(anfrage,kopie));
    }
    return antwort;
  });
  e.waitUntil(frisch.catch(()=>{}));
  e.respondWith(caches.match(anfrage,{ignoreSearch:true}).then(alt=>alt||frisch));
});
