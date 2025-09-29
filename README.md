# Prince Dwivedi Portfolio - Production Version

## Overview
This is the production-ready version of the Prince Dwivedi portfolio website. The site features two viewing modes: Developer Portfolio and Interactive Portfolio.

## Features
- Responsive design optimized for all devices
- PWA (Progressive Web App) support for offline use
- Performance optimized with lazy loading and code splitting
- Accessibility compliant
- SEO optimized
- Service worker for offline support
- Error handling and fallbacks

## Technologies Used
- HTML5 / CSS3
- JavaScript (ES6+)
- GSAP for animations
- tsParticles for background effects
- Service Worker for PWA functionality

## Structure
```
├── index.html               # Main entry point / mode selection
├── developer-portfolio-v2.html  # Developer mode portfolio
├── interactive-portfolio.html   # Interactive/business mode
├── script.js                # Main JavaScript file
├── script-prod.js           # Production-optimized JavaScript
├── styles.css               # Main stylesheet
├── service-worker.js        # Service worker for offline support
├── manifest.json            # Web app manifest for PWA
├── .htaccess                # Server configuration for Apache
├── 404.html                 # Custom 404 error page
├── 500.html                 # Custom 500 error page
├── offline.html             # Offline fallback page
└── assets/                  # Images, videos, and other assets
    ├── icons/               # PWA icons and SVG icons
    └── ...
```

## Production Optimizations
1. **Performance**
   - Minified CSS and JavaScript
   - Optimized images
   - Lazy loading for non-critical resources
   - Browser caching through .htaccess
   - Preconnect to external domains

2. **SEO**
   - Meta tags and descriptions
   - Structured data (schema.org)
   - Open Graph and Twitter Card support
   - Sitemap.xml and robots.txt

3. **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Skip to content link
   - Color contrast compliance

4. **PWA Features**
   - Service worker for offline support
   - Web app manifest
   - Installable on mobile devices
   - Offline fallback pages
   - Cache strategies

5. **Security**
   - Content Security Policy (CSP)
   - HTTPS enforcement
   - XSS protection headers
   - CORS policies

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest version)

## Deployment
This site is ready for deployment on any static hosting provider such as:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## Local Development
1. Clone the repository
2. Open index.html in your browser
3. For PWA features, use a local server (e.g., `npx serve`)

## Contact
For any questions or issues, please contact Prince Dwivedi.

---
© 2023 Prince Dwivedi. All Rights Reserved.