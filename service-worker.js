// Service Worker for offline support and PWA functionality
const CACHE_NAME = 'portfolio-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/developer-portfolio-v2.html',
  '/interactive-portfolio.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  // Include essential assets
  '/assets/3d-casual-life-smiling-man-with-laptop-waving-hand.png',
  '/assets/3d-casual-life-young-man-pointing-at-search-bar.png',
  '/assets/3d-mini-boy.png',
  '/assets/3d-techny-business-analytics-on-tablet-screen.png',
  '/assets/3d-techny-business-tools-for-risk-assessment-and-management-1.png',
  '/assets/3d-techny-lettering-css-and-laptop-with-program-code-text.gif',
  '/assets/3d-techny-online-doctors-consultation-or-telemedicine.png',
  '/assets/3d-techny-searching-the-web-on-tablet-1.png',
  '/assets/attending-online-meeting-on-laptop.png',
  '/assets/cute-robot-using-laptop-friendly-ai-chatbot-illustration-colorful-tech-mascot-drawing.png',
  '/assets/grapy-software-developer-coding-with-two-monitors.png',
  '/assets/online-translator-on-smartphone.png',
  '/assets/techny-user-profile-on-phone-screen.png',
  '/assets/icons/sprite.svg',
  // External resources
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js'
];

// Install event - cache assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.') && 
      !event.request.url.startsWith('https://cdnjs.') &&
      !event.request.url.startsWith('https://cdn.jsdelivr.net/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
            
            // For HTML requests, show offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});