if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let c={};const r=e=>i(e,n),f={module:{uri:n},exports:c,require:r};a[n]=Promise.all(s.map((e=>f[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"efc79f09a1169d6f35cb8cb81a368171"},{url:"/_next/static/MzaRi-P73_PRVNEQuf_R4/_buildManifest.js",revision:"d0efbec59a8e3e16223d0cda77c767c9"},{url:"/_next/static/MzaRi-P73_PRVNEQuf_R4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/174-081f2613a27a3c21.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/285-4ffc9c46cf369004.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/4bd1b696-48067afed94ad926.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/517-37f58c09ee300984.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/729-ddc3c33021125ad3.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/738-c6342d60902e7683.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/743-65dd8eee0ae689f4.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/839-621cd4c2eba6b95f.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/(auth)/login/page-e2097c63f473873a.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/(auth)/register/confirm/%5Bmail%5D/page-7e2c00d3738a2544.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/(auth)/register/page-741c0b65aecae7e0.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/_not-found/page-1e3aab99790b6e90.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/add-course/page-4040cbcd78f2a162.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/api/auth/route-ab6b97fb14b79a9b.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/home/layout-4d614b5780a56af3.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/home/page-6154c152610e3bb8.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/layout-b8d6050b979d1726.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/onboarding/page-d6d5e8181cb358f2.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/page-6ad79f59f8646f70.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/planification/%5BsubjectId%5D/page-568eaa6d326928e5.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/planification/page-7589a0834c037753.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/(monitoring)/attendance/page-2a1bcd7d2ff7b108.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/(monitoring)/attitudinal/page-1b75b2d0ffd0a42e.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/(monitoring)/exam/page-ad2615dd67c378fe.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/(monitoring)/homework/page-d3bc870a54d99aeb.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/(monitoring)/layout-6f14904d8df344a3.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/config/page-7880d708a06f9742.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/app/students/page-fa7fc0b2a024d678.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/e80c4f76-7c1fea4451f05081.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/framework-58f97e80b1d6e3ea.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/main-0d7f5d8b1538a9f6.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/main-app-1a95778d57d5608f.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-aec7dd89d1301a1c.js",revision:"MzaRi-P73_PRVNEQuf_R4"},{url:"/_next/static/css/014dfbd8f7502d55.css",revision:"014dfbd8f7502d55"},{url:"/_next/static/css/70e13213c805a4d4.css",revision:"70e13213c805a4d4"},{url:"/_next/static/css/9cbfcc82d95fdb4e.css",revision:"9cbfcc82d95fdb4e"},{url:"/_next/static/css/a7d6a5e7eaf7ea49.css",revision:"a7d6a5e7eaf7ea49"},{url:"/_next/static/css/d987984f896d3f4e.css",revision:"d987984f896d3f4e"},{url:"/_next/static/css/dd35055f242c8ee6.css",revision:"dd35055f242c8ee6"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/dialog-box.cabed9f7.svg",revision:"648a6923b617fb98b9a898c1655efcb1"},{url:"/_next/static/media/fa-brands-400.86ee2658.woff2",revision:"86ee2658"},{url:"/_next/static/media/fa-brands-400.8eaf0c88.ttf",revision:"8eaf0c88"},{url:"/_next/static/media/fa-regular-400.849b82e2.woff2",revision:"849b82e2"},{url:"/_next/static/media/fa-regular-400.bd1cf947.ttf",revision:"bd1cf947"},{url:"/_next/static/media/fa-solid-900.7a5aa5ab.ttf",revision:"7a5aa5ab"},{url:"/_next/static/media/fa-solid-900.ee698398.woff2",revision:"ee698398"},{url:"/_next/static/media/fa-v4compatibility.59487ca3.woff2",revision:"59487ca3"},{url:"/_next/static/media/fa-v4compatibility.c63df8a6.ttf",revision:"c63df8a6"},{url:"/_next/static/media/globo_texto.a797bb4e.svg",revision:"eef833d10b1438369067492ea77143bf"},{url:"/_next/static/media/smile.e9c6f79c.svg",revision:"f1aec54859508f8c360636ab4ec09ae0"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"e52c08ce0a255991e9cbf23bd6828555"},{url:"/icons/calendar.svg",revision:"29b7205c99da7df16fba7deb4b5a2743"},{url:"/manifest.js",revision:"7570ce7c86bcb069d3760e5868c36470"},{url:"/media/img/arrow.png",revision:"2eb7d98dd142feabd097ce3b12961948"},{url:"/media/img/dialog-box.svg",revision:"648a6923b617fb98b9a898c1655efcb1"},{url:"/media/img/globo_texto.svg",revision:"eef833d10b1438369067492ea77143bf"},{url:"/media/img/mas-info.svg",revision:"69ee10d51968ddcc780e8a8665215344"},{url:"/media/img/no-data-s.png",revision:"f1dc0c12740dd9b54b0aecb0ab4cf2ef"},{url:"/media/img/ob-1.png",revision:"051d93264c60aebe9aa469808394db0e"},{url:"/media/img/ob-2.png",revision:"427174a2292d475b127a3d5a7656d681"},{url:"/media/img/ob-3.png",revision:"adf5b3014bd5f58d3c5ac844f2a6f5e4"},{url:"/media/img/ob-4.png",revision:"6f770744e1bfbdffc1a7e6ca85f94250"},{url:"/media/img/planification-reseources-image.svg",revision:"35ad4d099a681856f51bbe46bcdb6bcd"},{url:"/media/img/smile.svg",revision:"f1aec54859508f8c360636ab4ec09ae0"},{url:"/media/img/students.png",revision:"ee5ed27f31caaafc9b9a8d0abd84af55"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));