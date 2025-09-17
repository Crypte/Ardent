export async function registerStatsServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering stats service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw-stats.js', {
        scope: '/'
      });
      
      if (registration.installing) {
        console.log('Stats service worker installing');
      } else if (registration.waiting) {
        console.log('Stats service worker installed');
      } else if (registration.active) {
        console.log('Stats service worker active');
      }
      
      // Écouter les mises à jour du service worker
      registration.addEventListener('updatefound', () => {
        console.log('Stats service worker update found');
      });
      
      return registration;
    } catch (error) {
      console.error('Failed to register stats service worker:', error);
    }
  } else {
    console.log('Service workers not supported');
  }
}

export async function unregisterStatsServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration('/');
      if (registration) {
        await registration.unregister();
        console.log('Stats service worker unregistered');
      }
    } catch (error) {
      console.error('Failed to unregister stats service worker:', error);
    }
  }
}