/* ========================================
   PORTFOLIO JAVASCRIPT - PRODUCTION VERSION
   Optimized for performance and accessibility
   Version: 2.0.0
   Author: Prince Dwivedi
======================================== */

// Performance monitoring
const PERFORMANCE_MARKS = {};

// Mark script start
if (window.performance && performance.mark) {
    performance.mark('scriptStart');
    PERFORMANCE_MARKS.scriptStart = performance.now();
}

// Check for basic browser features to provide polyfills if needed
const SUPPORTS = {
    IntersectionObserver: 'IntersectionObserver' in window,
    CustomEvent: 'CustomEvent' in window,
    classList: 'classList' in document.documentElement,
    querySelector: 'querySelector' in document,
    localStorage: (function() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    })()
};

// Import the original script functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (PERFORMANCE_MARKS) PERFORMANCE_MARKS.domLoaded = performance.now();
        
        // Setup error handling and offline detection
        setupErrorHandling();
        setupOfflineDetection();
        
        // Initialize accessibility improvements
        initAccessibility();
        
        // Register service worker if available
        registerServiceWorker();
        
    } catch (error) {
        console.error('Critical initialization error:', error);
        showErrorNotification('Something went wrong while loading the page. Please refresh.');
    }
});

window.addEventListener('load', function() {
    if (PERFORMANCE_MARKS) {
        PERFORMANCE_MARKS.windowLoaded = performance.now();
        logPerformanceMetrics();
    }
});

function logPerformanceMetrics() {
    if (!PERFORMANCE_MARKS.scriptStart) return;
    
    console.group('Performance Metrics');
    console.log(`Script Initialization: ${(PERFORMANCE_MARKS.domLoaded - PERFORMANCE_MARKS.scriptStart).toFixed(2)}ms`);
    console.log(`Total Page Load: ${(PERFORMANCE_MARKS.windowLoaded - PERFORMANCE_MARKS.scriptStart).toFixed(2)}ms`);
    console.groupEnd();
    
    // Send metrics to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'performance', {
            'page_load_time': PERFORMANCE_MARKS.windowLoaded - PERFORMANCE_MARKS.scriptStart,
            'script_init_time': PERFORMANCE_MARKS.domLoaded - PERFORMANCE_MARKS.scriptStart
        });
    }
}

/* ========================================
   ERROR HANDLING AND NOTIFICATIONS
======================================== */

function setupErrorHandling() {
    window.addEventListener('error', function(event) {
        console.error('Global error caught:', event.error);
        
        // Check if it's a critical error
        if (isCriticalError(event.error)) {
            showErrorNotification('Something went wrong. Please refresh the page.');
        }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
    });
}

function isCriticalError(error) {
    if (!error) return false;
    
    // Define what constitutes a critical error
    const criticalErrorTypes = [
        'TypeError', 'ReferenceError', 'SyntaxError'
    ];
    
    const criticalErrorMessages = [
        'undefined is not a function',
        'null is not an object',
        'cannot read property',
        'is not defined'
    ];
    
    // Check error type
    if (criticalErrorTypes.includes(error.name)) {
        return true;
    }
    
    // Check error message
    if (error.message && typeof error.message === 'string') {
        return criticalErrorMessages.some(msg => 
            error.message.toLowerCase().includes(msg.toLowerCase())
        );
    }
    
    return false;
}

function showErrorNotification(message) {
    // Create error notification element if it doesn't exist
    let errorElement = document.getElementById('error-notification');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error-notification';
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'assertive');
        
        // Style the error notification
        Object.assign(errorElement.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '4px',
            zIndex: '9999',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '80%',
            textAlign: 'center',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        });
        
        document.body.appendChild(errorElement);
    }
    
    // Set error message
    errorElement.innerHTML = `
        <span>${message}</span>
        <button aria-label="Close notification" style="background: none; border: none; color: white; cursor: pointer; margin-left: 15px; font-size: 18px;">×</button>
    `;
    
    // Add close button functionality
    const closeButton = errorElement.querySelector('button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            errorElement.remove();
        });
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

/* ========================================
   OFFLINE DETECTION
======================================== */

function setupOfflineDetection() {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}

function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    
    // Create or get status display element
    let statusDisplay = document.getElementById('online-status-display');
    if (!statusDisplay) {
        statusDisplay = document.createElement('div');
        statusDisplay.id = 'online-status-display';
        
        Object.assign(statusDisplay.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: '1000',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
        });
        
        document.body.appendChild(statusDisplay);
    }
    
    if (isOnline) {
        statusDisplay.textContent = 'Back online';
        statusDisplay.style.background = 'rgba(0, 255, 0, 0.2)';
        statusDisplay.style.color = '#00ff00';
        statusDisplay.style.opacity = '1';
        
        // Hide the status after 3 seconds if online
        setTimeout(() => {
            statusDisplay.style.opacity = '0';
        }, 3000);
    } else {
        statusDisplay.textContent = 'You are offline';
        statusDisplay.style.background = 'rgba(255, 0, 0, 0.2)';
        statusDisplay.style.color = '#ff5555';
        statusDisplay.style.opacity = '1';
        
        // Show more detailed offline message if important features are affected
        showErrorNotification('You are currently offline. Some features may not work properly.');
    }
}

/* ========================================
   ACCESSIBILITY IMPROVEMENTS
======================================== */

function initAccessibility() {
    // Add proper focus states and keyboard navigation
    improveKeyboardNavigation();
    
    // Fix any missing ARIA attributes
    fixAriaAttributes();
    
    // Add skip to content link if not present
    addSkipToContentLink();
    
    // Improve form accessibility
    improveFormAccessibility();
    
    // Make images more accessible with proper alt text
    improveImageAccessibility();
}

function improveKeyboardNavigation() {
    // Make all interactive elements properly focusable
    const interactiveElements = document.querySelectorAll('.project-card, .social-icon, .theme-toggle');
    
    interactiveElements.forEach(element => {
        // Only add tabindex if the element doesn't already have one
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners for enter/space activation
        if (!element.hasAttribute('data-keyboard-handler')) {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
            element.setAttribute('data-keyboard-handler', 'true');
        }
    });
}

function fixAriaAttributes() {
    // Fix hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger && !hamburger.hasAttribute('aria-label')) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    
    // Fix modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        if (!trigger.hasAttribute('aria-haspopup')) {
            trigger.setAttribute('aria-haspopup', 'dialog');
        }
    });
    
    // Fix modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (!modal.hasAttribute('role')) {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            
            // Find modal title and link with aria-labelledby
            const modalTitle = modal.querySelector('.modal-title, h2, h3');
            if (modalTitle) {
                const titleId = modalTitle.id || `modal-title-${Math.random().toString(36).substr(2, 9)}`;
                modalTitle.id = titleId;
                modal.setAttribute('aria-labelledby', titleId);
            }
        }
    });
}

function addSkipToContentLink() {
    // Check if skip link already exists
    if (document.querySelector('.skip-link')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    // Style the skip link
    Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '0',
        padding: '8px',
        background: '#0099ff',
        color: 'white',
        zIndex: '100',
        transition: 'top 0.3s',
        textDecoration: 'none',
        fontSize: '14px'
    });
    
    // Add focus/blur handlers
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Ensure there's a main content section with id
    const mainContent = document.querySelector('main, .main-content, section:first-of-type');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

function improveFormAccessibility() {
    // Fix form labels
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Skip inputs that already have properly associated labels
        const id = input.id;
        if (id && document.querySelector(`label[for="${id}"]`)) return;
        
        // Try to find a label element as a sibling or parent
        let label = input.previousElementSibling;
        if (label && label.tagName.toLowerCase() === 'label') {
            const newId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
            input.id = newId;
            label.setAttribute('for', newId);
        }
    });
    
    // Add required field indicators
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        // Find associated label
        const id = input.id;
        if (!id) return;
        
        const label = document.querySelector(`label[for="${id}"]`);
        if (label && !label.querySelector('.required-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'required-indicator';
            indicator.textContent = '*';
            indicator.setAttribute('aria-hidden', 'true');
            indicator.style.color = 'red';
            indicator.style.marginLeft = '4px';
            label.appendChild(indicator);
            
            // Add screen reader text
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = '(required)';
            srText.style.position = 'absolute';
            srText.style.width = '1px';
            srText.style.height = '1px';
            srText.style.padding = '0';
            srText.style.margin = '-1px';
            srText.style.overflow = 'hidden';
            srText.style.clip = 'rect(0, 0, 0, 0)';
            srText.style.whiteSpace = 'nowrap';
            srText.style.border = '0';
            label.appendChild(srText);
        }
    });
}

function improveImageAccessibility() {
    // Find all images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    
    images.forEach(img => {
        // Try to generate alt text based on filename or surrounding context
        const src = img.src;
        const filename = src.split('/').pop().split('.')[0].replace(/[_-]/g, ' ');
        
        // Check if image is in a figure with figcaption
        const figure = img.closest('figure');
        let altText = '';
        
        if (figure && figure.querySelector('figcaption')) {
            const figcaption = figure.querySelector('figcaption');
            altText = figcaption.textContent.trim();
        } else if (img.title) {
            altText = img.title;
        } else {
            // Format filename to be more readable
            altText = filename.charAt(0).toUpperCase() + filename.slice(1);
        }
        
        // Set alt text
        img.alt = altText;
    });
    
    // Make decorative images explicitly decorative
    const decorativeImages = document.querySelectorAll('.decorative-img, .bg-image');
    decorativeImages.forEach(img => {
        img.alt = '';
        img.setAttribute('role', 'presentation');
    });
}

/* ========================================
   SERVICE WORKER REGISTRATION
======================================== */

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered with scope:', registration.scope);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const installingWorker = registration.installing;
                    
                    if (installingWorker) {
                        installingWorker.addEventListener('statechange', () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    }
                });
            })
            .catch(error => {
                console.error('ServiceWorker registration failed:', error);
            });
            
        // Listen for controller change to refresh page
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }
}

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.setAttribute('role', 'alert');
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 247, 255, 0.9)',
        color: '#0a0a1a',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    });
    
    notification.innerHTML = `
        <div>New version available!</div>
        <button id="refreshApp" style="background: rgba(255, 255, 255, 0.3); border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Refresh</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listener to refresh button
    document.getElementById('refreshApp').addEventListener('click', () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
        }
    });
}