// @ts-nocheck
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

console.log('Hello from serviceWorker.ts');
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

//variable global para la pantalla de instalacion de la webapp
let deferredPrompt;
let publicPath = {
  path_url:undefined,
  get path(){
      this.path_url = process.env.PUBLIC_URL ?? '';
      console.log("sw:process.env.PUBLIC_URL:" , process.env.PUBLIC_URL);
      return this.path_url;
  }
}

export function register(config, {useLocal}) {

    if(!useLocal)
      if ('serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(publicPath.path, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
          // Our service worker won't work if PUBLIC_URL is on a different origin
          // from what our page is served on. This might happen if a CDN is used to
          // serve assets; see https://github.com/facebook/create-react-app/issues/2374
        return;
        }
      }
    //YOUTUBE:https://www.youtube.com/watch?v=LWRdBywm4Zo
    window.addEventListener('appinstalled', (evt) => {
      console.log('a2hs installed');
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      
      // Prevent Chrome 76 and later from showing the mini-infobar
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;

      //hacer que la ui muestre un dialog o un boton de instalación
      if(config && config.showInstallPromotion)
        config.showInstallPromotion(deferredPrompt);
    })

    window.addEventListener('load', () => {

      window.addEventListener('online', function(){
          console.log("RUN_ONLINE");
          window.document.body.classList.remove("tf-offline-now");
          if(config && config.runOnline)
          config.runOnline();
      });

      window.addEventListener('offline', function(){
        console.log("RUN_OFFLINE");
        window.document.body.classList.add("tf-offline-now");
        if(config && config.runOffline)
          config.runOffline();
      });

      const swUrl = `${publicPath.path}/service-worker.js`;
      console.log("REGISTRANDO:SW:"+ swUrl);
      if(useLocal === true){
        //Si queremos usarlo de forma local. Just register service worker
        registerValidSW(`${publicPath.path}/dev-service-worker.js`, config);
      }
      else if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      }
      else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }

    })
    
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {

        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version
      

      if(config && config.onRegister)
          config.onRegister(registration);
      
      
      registration.onupdatefound = () => {
        console.log("serviceWorker:registration:onupdatefound", registration);
        const installingWorker = registration.installing;
        // if (installingWorker == null) {
        //   return;
        // }

        if(config && config.onInstalling)
          config.onInstalling(registration);

        installingWorker.onstatechange = () => {
          console.log("InstallingSWorker:on:statechanged: ", installingWorker.state);
          if(config && config.onIstallingUpdate)
          config.onIstallingUpdate(installingWorker);

          if (installingWorker.state === 'activated'){
            console.log("window.location.reload(); HERE!");
            //window.location.reload();
            if(config && config.onShouldReload)
              config.onShouldReload(installingWorker);
          }
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              // probar que pasa con esto
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }

              if (config && config.onInstalled)
                config.onInstalled(registration);

              if(config && config.onSkipWaitingAndRefresh)
                config.onSkipWaitingAndRefresh();

              // console.log("installingWorker.postMessage({ type: 'SKIP_WAITING' })");
              // installingWorker.postMessage({ type: 'SKIP_WAITING' });
              // installingWorker.postMessage({ action: 'skipWaiting' });

            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess)
                config.onSuccess(registration);
              
            }
          }
        };
      };

    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  //fetch(swUrl)  //<-- esta me funcionaba.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
    .then(registration => {
      registration.unregister();
    })
    .catch(error => {
      console.error(error.message);
    });
  }
}
