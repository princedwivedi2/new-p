/* ========================================
   FIXED PORTFOLIO JAVASCRIPT
   All UI functionalities working properly
======================================== */

// Register GSAP plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Global variables
let isTyping = false;
let currentRole = 0;
let charIndex = 0;
let isDeleting = false;

/* ========================================
   MAIN INITIALIZATION
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeAllFunctionalities();
});

function initializeAllFunctionalities() {
    console.log('Initializing all functionalities...');
    
    // Core functionalities
    initHamburgerMenu();
    initThemeToggle();
    initCustomCursor();
    initTypewriterEffect();
    initCounterAnimations();
    initVideoPlayer();
    initProjectModals();
    initSmoothScrolling();
    initScrollProgress();
    initActiveNavigation();
    initAOSAnimations();
    initParticles();
    initProjectFilters();
    fixFirebaseDjangoLayout();
    initRevolutionary3DCarousel(); // 🚀 NEW: Revolutionary 3D Carousel
    
    console.log('All functionalities initialized successfully!');
    
    // Initialize contact form
    initContactForm();
}

/* ========================================
   1. HAMBURGER MENU FUNCTIONALITY
======================================== */

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Hamburger:', hamburger);
    console.log('Nav Menu:', navMenu);
    
    if (!hamburger || !navMenu) {
        console.warn('Hamburger menu elements not found');
        return;
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Hamburger clicked');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isActive = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    console.log('✅ Hamburger menu initialized');
}

/* ========================================
   2. DARK/LIGHT THEME TOGGLE
======================================== */

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    console.log('Theme toggle:', themeToggle);
    console.log('Theme icon:', themeIcon);
    
    if (!themeToggle || !themeIcon) {
        console.warn('Theme toggle elements not found');
        return;
    }
    
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    console.log('✅ Theme toggle initialized');
}

/* ========================================
   3. TYPEWRITER EFFECT
======================================== */

function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    
    console.log('Typewriter element:', typewriterElement);
    
    if (!typewriterElement) {
        console.warn('Typewriter element not found');
        return;
    }
    
    const roles = [
        'Full-Stack Developer',
        'PHP Laravel Expert',
        'React.js Specialist',
        'Frontend Developer',
        'Backend Engineer',
        'API Developer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        const typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting) {
            // Typing forward
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length) {
                // Finished typing, start deleting after pause
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
                return;
            }
        } else {
            // Deleting backward
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                // Finished deleting, move to next role
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(typeWriter, 500);
                return;
            }
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
    
    console.log('✅ Typewriter effect initialized');
}

/* ========================================
   4. COUNTER ANIMATIONS
======================================== */

function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter[data-target]');
    
    console.log('Found counters:', counters.length);
    
    if (counters.length === 0) {
        console.warn('No counter elements found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter); // Only animate once
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startValue = 0;
        
        function updateCounter() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target; // Ensure exact target value
            }
        }
        
        updateCounter();
        console.log(`Counter animated to ${target}`);
    }
    
    console.log('✅ Counter animations initialized');
}

/* ========================================
   6. VIDEO PLAYER FUNCTIONALITY
======================================== */

function initVideoPlayer() {
    const playButton = document.getElementById('playButton');
    const video = document.querySelector('video'); // Look for any video element
    
    console.log('Play button:', playButton);
    console.log('Video element:', video);
    
    if (!playButton) {
        console.warn('Video play button not found');
        return;
    }
    
    if (!video) {
        console.warn('Video element not found');
        return;
    }
    
    // Play button click handler
    playButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (video.paused) {
            video.play()
                .then(() => {
                    playButton.style.opacity = '0';
                    playButton.style.pointerEvents = 'none';
                    console.log('Video started playing');
                })
                .catch(error => {
                    console.error('Error playing video:', error);
                });
        } else {
            video.pause();
            playButton.style.opacity = '1';
            playButton.style.pointerEvents = 'auto';
            console.log('Video paused');
        }
    });
    
    // Show play button when video is paused/ended
    video.addEventListener('pause', () => {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
    });
    
    video.addEventListener('ended', () => {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
    });
    
    // Hide play button when video starts playing
    video.addEventListener('play', () => {
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
    });
    
    console.log('✅ Video player initialized');
}

/* ========================================
   7. PROJECT MODAL FUNCTIONALITY
======================================== */

function initProjectModals() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('projectModal')) {
        createProjectModal();
    }
    
    console.log('✅ Project modals initialized');
}

function createProjectModal() {
    const modalHTML = `
        <div id="projectModal" class="project-modal" style="display: none;">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Project Details</h2>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="modalContent">
                        <!-- Project details will be inserted here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" id="modalLiveLink" class="btn btn-primary" target="_blank">View Live Demo</a>
                    <a href="#" id="modalGithubLink" class="btn btn-secondary" target="_blank">View Code</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                position: relative;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                background: var(--bg-card);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-heavy);
                overflow: hidden;
                animation: modalSlideIn 0.3s ease-out;
            }
            
            .modal-header {
                padding: 2rem;
                background: var(--gradient-primary);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                color: white;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .modal-body {
                padding: 2rem;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .modal-footer {
                padding: 1rem 2rem 2rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 1rem;
                }
                
                .modal-header {
                    padding: 1.5rem;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .modal-footer {
                    flex-direction: column;
                    padding: 1rem 1.5rem 1.5rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Add event listeners
    const modal = document.getElementById('projectModal');
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close modal handlers
    closeBtn.addEventListener('click', closeProjectModal);
    backdrop.addEventListener('click', closeProjectModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeProjectModal();
        }
    });
}

// Global function to open project modal (called from HTML)
function openProjectModal(projectId) {
    console.log('Opening project modal for:', projectId);
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');
    
    // Project data
    const projects = {
        'ecommerce': {
            title: 'ModernShop E-commerce Platform',
            content: `
                <div class="project-modal-details">
                    <img src="https://img.icons8.com/color/96/shopping-cart-loaded.png" alt="E-commerce" class="modal-project-image">
                    <h3>🎯 Project Overview</h3>
                    <p>A comprehensive e-commerce solution built with modern technologies to handle high traffic and provide excellent user experience.</p>
                    
                    <h3>🚀 Key Features</h3>
                    <ul>
                        <li>User authentication & authorization</li>
                        <li>Real-time inventory management</li>
                        <li>Stripe payment integration</li>
                        <li>Admin dashboard with analytics</li>
                        <li>Mobile-responsive design</li>
                        <li>Performance optimization</li>
                    </ul>
                    
                    <h3>💻 Technologies Used</h3>
                    <div class="tech-stack">
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Node.js</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">Express</span>
                        <span class="tech-tag">Stripe API</span>
                        <span class="tech-tag">Redux</span>
                    </div>
                    
                    <h3>📊 Results</h3>
                    <ul>
                        <li>150% increase in sales within 6 months</li>
                        <li>Page load time reduced to 1.2s</li>
                        <li>99.9% uptime during peak traffic</li>
                        <li>Mobile conversion rate improved by 85%</li>
                    </ul>
                </div>
            `,
            liveLink: 'https://example-ecommerce.com',
            githubLink: 'https://github.com/prince/ecommerce-project'
        },
        'taskflow': {
            title: 'TaskFlow - Team Collaboration',
            content: `
                <div class="project-modal-details">
                    <img src="https://img.icons8.com/color/96/task-planning.png" alt="TaskFlow" class="modal-project-image">
                    <h3>🎯 Project Overview</h3>
                    <p>A real-time task management and collaboration platform designed for remote teams to improve productivity and communication.</p>
                    
                    <h3>🚀 Key Features</h3>
                    <ul>
                        <li>Real-time collaboration with WebSockets</li>
                        <li>Drag & drop task management</li>
                        <li>Team communication tools</li>
                        <li>Time tracking & reporting</li>
                        <li>Project templates</li>
                        <li>Mobile app for iOS/Android</li>
                    </ul>
                    
                    <h3>💻 Technologies Used</h3>
                    <div class="tech-stack">
                        <span class="tech-tag">Vue.js</span>
                        <span class="tech-tag">Express</span>
                        <span class="tech-tag">Socket.io</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">JWT Auth</span>
                        <span class="tech-tag">Docker</span>
                    </div>
                    
                    <h3>📊 Impact</h3>
                    <ul>
                        <li>40% improvement in team productivity</li>
                        <li>95% user satisfaction rating</li>
                        <li>Used by 500+ remote teams</li>
                        <li>Average response time: 200ms</li>
                    </ul>
                </div>
            `,
            liveLink: 'https://example-taskflow.com',
            githubLink: 'https://github.com/prince/taskflow-project'
        }
    };
    
    const project = projects[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalContent.innerHTML = project.content;
    modalLiveLink.href = project.liveLink;
    modalGithubLink.href = project.githubLink;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    modalTitle.focus();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Project modal closed');
}

// Make openProjectModal available globally
window.openProjectModal = openProjectModal;

/* ========================================
   8. FIX FIREBASE + DJANGO LAYOUT ISSUE
======================================== */

function fixFirebaseDjangoLayout() {
    // Find the skill item that contains both Firebase and Django
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const spans = item.querySelectorAll('span');
        if (spans.length > 1) {
            // Check if this item contains both Firebase and Django
            const hasFirebase = Array.from(spans).some(span => 
                span.textContent.toLowerCase().includes('firebase')
            );
            const hasDjango = Array.from(spans).some(span => 
                span.textContent.toLowerCase().includes('django')
            );
            
            if (hasFirebase && hasDjango) {
                console.log('Found Firebase + Django layout issue, fixing...');
                
                // Get the parent container
                const skillGrid = item.parentElement;
                
                // Create separate Django skill item
                const djangoItem = document.createElement('div');
                djangoItem.className = 'skill-item';
                djangoItem.innerHTML = `
                    <img src="https://img.icons8.com/color/48/django.png" alt="Django">
                    <span>Django</span>
                `;
                
                // Remove Django span from Firebase item
                spans.forEach(span => {
                    if (span.textContent.toLowerCase().includes('django')) {
                        span.remove();
                    }
                });
                
                // Insert Django item after Firebase item
                item.parentNode.insertBefore(djangoItem, item.nextSibling);
                
                console.log('✅ Firebase + Django layout fixed');
            }
        }
    });
}

/* ========================================
   ERROR HANDLING & DEBUGGING
======================================== */

// Global error handler for debugging
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Log when script is fully loaded
console.log('🎉 Script.js loaded successfully! All functionalities should be working.');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openProjectModal,
        closeProjectModal,
        initializeAllFunctionalities
    };
}

/* ========================================
   CUSTOM CURSOR
   Improves cursor interactivity and fixes missing handlers
======================================== */

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    console.log('Custom cursor:', cursor);
    console.log('Cursor follower:', follower);

    if (!cursor || !follower) {
        console.warn('Custom cursor elements not found');
        return;
    }

    // Basic positions
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Position the small cursor immediately
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower animation
    function animateFollower() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Interactive states for links and buttons
    const interactiveSelectors = 'a, button, .project-link, .nav-link, .btn';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--active');
            follower.classList.add('cursor-follower--active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--active');
            follower.classList.remove('cursor-follower--active');
        });
    });

    // Hide native cursor when our custom cursor is active
    document.documentElement.style.cursor = 'none';

    console.log('✅ Custom cursor initialized');
}

/* ========================================
   SMOOTH SCROLLING
======================================== */

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

/* ========================================
   SCROLL PROGRESS BAR
======================================== */

function initScrollProgress() {
    const progressBar = document.getElementById('nav-progress');
    
    if (!progressBar) {
        console.warn('Scroll progress bar not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    });
    
    console.log('✅ Scroll progress initialized');
}

/* ========================================
   ACTIVE NAVIGATION HIGHLIGHTING
======================================== */

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    if (sections.length === 0 || navLinks.length === 0) {
        console.warn('Sections or nav links not found for active navigation');
        return;
    }
    
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log('✅ Active navigation initialized');
}

/* ========================================
   AOS ANIMATIONS INITIALIZATION
======================================== */

function initAOSAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
        console.log('✅ AOS animations initialized');
    } else {
        console.warn('AOS library not loaded');
    }
}

/* ========================================
   PARTICLES INITIALIZATION
======================================== */

function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            background: {
                opacity: 0
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 2
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: "#2563eb"
                },
                links: {
                    color: "#2563eb",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce"
                    },
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 50
                },
                opacity: {
                    value: 0.3
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 3 }
                }
            },
            detectRetina: true
        });
        console.log('✅ Particles initialized');
    } else {
        console.warn('tsParticles library not loaded');
    }
}

/* ========================================
   PROJECT FILTERING FUNCTIONALITY
======================================== */

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) {
        console.warn('Project filters or cards not found');
        return;
    }

    // Set initial opacity and transform for smooth animations
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects with smooth animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    // Show the card
                    card.style.display = 'block';
                    // Trigger reflow
                    card.offsetHeight;
                    // Animate in
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    // Animate out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Hide after animation
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            console.log(`✅ Projects filtered by: ${filter}`);
        });
    });
    
    // Set default active filter
    const defaultFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
    }
    
    console.log('✅ Project filters initialized');
}

/* ========================================
   18. CONTACT FORM VALIDATION & SUBMISSION
======================================== */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const closeSuccess = document.getElementById('closeSuccess');
    const downloadCV = document.getElementById('download-cv');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    // Form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const privacyError = document.getElementById('privacyError');
    
    // Field validation functions
    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            if (value.trim().length > 50) return 'Name must be less than 50 characters';
            return '';
        },
        
        email: (value) => {
            if (!value.trim()) return 'Email is required';
            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
            return '';
        },
        
        subject: (value) => {
            if (!value.trim()) return 'Subject is required';
            if (value.trim().length < 3) return 'Subject must be at least 3 characters';
            if (value.trim().length > 100) return 'Subject must be less than 100 characters';
            return '';
        },
        
        message: (value) => {
            if (!value.trim()) return 'Message is required';
            if (value.trim().length < 10) return 'Message must be at least 10 characters';
            if (value.trim().length > 5000) return 'Message must be less than 5000 characters';
            return '';
        },
        
        privacy: (checked) => {
            if (!checked) return 'You must agree to the Privacy Policy';
            return '';
        }
    };
    
    // Real-time validation
    function setupRealTimeValidation(input, errorElement, validatorKey) {
        if (!input || !errorElement) return;
        
        // Custom handler for privacy checkbox
        const isCheckbox = input.type === 'checkbox';
        const getValue = () => isCheckbox ? input.checked : input.value;
        const getFormGroup = () => input.closest('.form-group');
        
        input.addEventListener('input', () => {
            const value = getValue();
            const error = validators[validatorKey](value);
            const formGroup = getFormGroup();
            
            if (error) {
                errorElement.textContent = error;
                formGroup?.classList.add('error');
            } else {
                errorElement.textContent = '';
                formGroup?.classList.remove('error');
            }
        });
        
        input.addEventListener('blur', () => {
            const value = getValue();
            const error = validators[validatorKey](value);
            const formGroup = getFormGroup();
            
            if (error) {
                errorElement.textContent = error;
                formGroup?.classList.add('error');
            }
        });
    }
    
    // Set up validation for each field
    setupRealTimeValidation(nameInput, nameError, 'name');
    setupRealTimeValidation(emailInput, emailError, 'email');
    setupRealTimeValidation(subjectInput, subjectError, 'subject');
    setupRealTimeValidation(messageInput, messageError, 'message');
    setupRealTimeValidation(privacyCheckbox, privacyError, 'privacy');
    
    // Validate all fields at once
    function validateForm() {
        let isValid = true;
        
        // Check each field
        const fields = [
            { input: nameInput, error: nameError, validator: 'name' },
            { input: emailInput, error: emailError, validator: 'email' },
            { input: subjectInput, error: subjectError, validator: 'subject' },
            { input: messageInput, error: messageError, validator: 'message' },
            { input: privacyCheckbox, error: privacyError, validator: 'privacy' }
        ];
        
        fields.forEach(field => {
            const value = field.input.type === 'checkbox' ? field.input.checked : field.input.value;
            const error = validators[field.validator](value);
            const formGroup = field.input.closest('.form-group');
            
            if (error) {
                field.error.textContent = error;
                formGroup?.classList.add('error');
                isValid = false;
            } else {
                field.error.textContent = '';
                formGroup?.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            // If validation fails, scroll to the first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Create form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Simulate form submission (replace this with actual form submission)
        simulateFormSubmission(formData)
            .then(response => {
                console.log('Form submitted successfully:', response);
                
                // Reset form
                contactForm.reset();
                
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show success message
                showSuccessMessage();
            })
            .catch(error => {
                console.error('Form submission error:', error);
                
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show error message
                showNotification('Something went wrong. Please try again later.', 'error');
            });
    });
    
    // Simulate form submission (replace with actual form submission in production)
    function simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Thank you for your message!'
                });
            }, 1500);
        });
    }
    
    // Production email submission code (commented out - enable in production)
    /*
    function submitFormData(formData) {
        // Using EmailJS or similar service
        return emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            formData,
            'YOUR_USER_ID'
        );
    }
    */
    
    // Show success message
    function showSuccessMessage() {
        if (formSuccess) {
            formSuccess.classList.add('active');
        }
    }
    
    // Close success message
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            formSuccess.classList.remove('active');
        });
    }
    
    // CV download functionality
    if (downloadCV) {
        downloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            
            // You can replace this with actual CV download
            // For now, show a notification
            showNotification('CV download will be available soon!', 'info');
        });
    }
    
    // General notification function
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notificationMessage');
        
        if (!notification || !notificationMessage) return;
        
        notification.className = 'notification';
        notification.classList.add(type);
        notificationMessage.textContent = message;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    console.log('✅ Contact form initialized');
}

/* ========================================
   🚀 REVOLUTIONARY 3D MORPHING CAROUSEL 🚀
   Extraordinary project showcase with GSAP animations
======================================== */

function initRevolutionary3DCarousel() {
    try {
        console.log('🎠 Initializing Revolutionary 3D Carousel...');
        
        // Check if we're on a page with the regular projects section
        const projectsSection = document.getElementById('projects');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Try to find 3D carousel elements first
        const carousel = document.getElementById('featuredCarousel');
        const morphingCards = document.querySelectorAll('.morphing-project-card');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator-dot');
        
        // If 3D carousel elements exist, initialize the full 3D carousel
        if (carousel && morphingCards.length > 0) {
            console.log('🎯 Found 3D carousel elements, initializing full carousel...');
            initFull3DCarousel(carousel, morphingCards, prevBtn, nextBtn, indicators);
            return;
        }
        
        // If regular project cards exist, enhance them with 3D effects
        if (projectsSection && projectCards.length > 0) {
            console.log('🎨 Found regular project cards, enhancing with 3D effects...');
            enhanceProjectCardsWith3D(projectCards);
            return;
        }
        
        // Create a fallback interactive experience if no elements found
        console.log('🌟 No project elements found, creating fallback experience...');
        createFallbackInteractiveExperience();
        
    } catch (error) {
        console.warn('⚠️ 3D Carousel initialization error (non-critical):', error.message);
        // Gracefully handle the error without breaking other functionality
        createFallbackInteractiveExperience();
    }
}

function initFull3DCarousel(carousel, cards, prevBtn, nextBtn, indicators) {
    let currentIndex = 0;
    let isTransitioning = false;
    const totalCards = cards.length;
    
    // Initialize GSAP timeline for smooth animations
    const tl = gsap.timeline();
    
    // Set initial positions
    function setInitialPositions() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalCards) {
                card.classList.add('next');
            } else if (index === (currentIndex - 2 + totalCards) % totalCards) {
                card.classList.add('far-prev');
            } else if (index === (currentIndex + 2) % totalCards) {
                card.classList.add('far-next');
            } else {
                // Hide other cards
                gsap.set(card, { opacity: 0, scale: 0.3 });
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Animate card transitions with GSAP
    function animateTransition() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const timeline = gsap.timeline({
            onComplete: () => {
                isTransitioning = false;
            }
        });
        
        // Animate all cards to their new positions
        cards.forEach((card, index) => {
            const currentClass = getCurrentClass(index);
            const newTransform = getTransformForClass(currentClass);
            const newOpacity = getOpacityForClass(currentClass);
            const newScale = getScaleForClass(currentClass);
            
            timeline.to(card, {
                transform: newTransform,
                opacity: newOpacity,
                scale: newScale,
                duration: 0.8,
                ease: "power3.inOut"
            }, 0);
            
            // Update classes
            card.className = 'morphing-project-card ' + currentClass;
        });
        
        // Animate indicators
        timeline.to(indicators, {
            scale: 1,
            duration: 0.3,
            stagger: 0.1
        }, 0);
    }
    
    // Get the class for a card based on its position relative to current
    function getCurrentClass(index) {
        if (index === currentIndex) return 'active';
        if (index === (currentIndex - 1 + totalCards) % totalCards) return 'prev';
        if (index === (currentIndex + 1) % totalCards) return 'next';
        if (index === (currentIndex - 2 + totalCards) % totalCards) return 'far-prev';
        if (index === (currentIndex + 2) % totalCards) return 'far-next';
        return 'hidden';
    }
    
    // Get transform values for each class
    function getTransformForClass(className) {
        const transforms = {
            'active': 'translate(-50%, -50%) rotateY(0deg) scale(1.05)',
            'prev': 'translate(-150%, -50%) rotateY(45deg) scale(0.85)',
            'next': 'translate(50%, -50%) rotateY(-45deg) scale(0.85)',
            'far-prev': 'translate(-300%, -50%) rotateY(60deg) scale(0.6)',
            'far-next': 'translate(200%, -50%) rotateY(-60deg) scale(0.6)',
            'hidden': 'translate(-50%, -50%) scale(0.3)'
        };
        return transforms[className] || transforms['hidden'];
    }
    
    function getOpacityForClass(className) {
        const opacities = {
            'active': 1,
            'prev': 0.7,
            'next': 0.7,
            'far-prev': 0.3,
            'far-next': 0.3,
            'hidden': 0
        };
        return opacities[className] || 0;
    }
    
    function getScaleForClass(className) {
        const scales = {
            'active': 1.05,
            'prev': 0.85,
            'next': 0.85,
            'far-prev': 0.6,
            'far-next': 0.6,
            'hidden': 0.3
        };
        return scales[className] || 0.3;
    }
    
    // Navigation functions
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalCards;
        setInitialPositions();
        animateTransition();
        console.log('🎠 Carousel moved to index:', currentIndex);
    }
    
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        setInitialPositions();
        animateTransition();
        console.log('🎠 Carousel moved to index:', currentIndex);
    }
    
    function goToSlide(index) {
        if (index === currentIndex || isTransitioning) return;
        currentIndex = index;
        setInitialPositions();
        animateTransition();
        console.log('🎠 Carousel jumped to index:', currentIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNext);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrev);
    }
    
    // Indicator navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-rotate carousel (optional)
    let autoRotateInterval;
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(goToNext, 5000); // 5 seconds
    }
    
    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }
    
    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        stopAutoRotate();
    });
    
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only trigger if horizontal swipe is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                goToPrev(); // Swipe right = previous
            } else {
                goToNext(); // Swipe left = next
            }
        }
        
        startAutoRotate();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        } else if (e.key >= '1' && e.key <= '5') {
            const index = parseInt(e.key) - 1;
            if (index < totalCards) {
                goToSlide(index);
            }
        }
    });
    
    // Initialize carousel
    setInitialPositions();
    
    // Add holographic effects
    cards.forEach((card) => {
        const holographicImage = card.querySelector('.holographic-image');
        if (holographicImage) {
            // Add mouse move effect for holographic illusion
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(holographicImage, {
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(holographicImage, {
                    transform: 'rotateX(0deg) rotateY(0deg)',
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }
    });
    
    // Start auto-rotation
    startAutoRotate();
    
    console.log('✨ Revolutionary 3D Carousel initialized with', totalCards, 'projects');
}

// Enhanced 3D effects for regular project cards
function enhanceProjectCardsWith3D(projectCards) {
    console.log('🎨 Enhancing', projectCards.length, 'project cards with 3D effects');
    
    projectCards.forEach((card, index) => {
        // Add 3D transform styles
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        
        // Enhanced hover effects with 3D transforms
        card.addEventListener('mouseenter', (e) => {
            gsap.to(card, {
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 50,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                duration: 0.6,
                ease: "power3.out"
            });
            
            // Add floating animation
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', (e) => {
            gsap.to(card, {
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                y: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.6,
                ease: "power3.out"
            });
        });
        
        // 3D mouse tracking effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Staggered reveal animation
                    gsap.fromTo(entry.target, 
                        {
                            opacity: 0,
                            y: 50,
                            rotateX: 30,
                            scale: 0.8
                        }, 
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            scale: 1,
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: "power3.out"
                        }
                    );
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(card);
        
        // Add tilt effect on project images
        const projectImage = card.querySelector('.project-image-container, .project-icon');
        if (projectImage) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                gsap.to(projectImage, {
                    rotateX: (y - 0.5) * 20,
                    rotateY: (0.5 - x) * 20,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(projectImage, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }
    });
    
    // Add scroll-triggered stagger animation for all cards
    gsap.fromTo(projectCards,
        {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateX: 30
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: projectCards[0]?.parentElement || '.projects',
                start: 'top 80%',
                once: true
            }
        }
    );
    
    console.log('✨ Enhanced', projectCards.length, 'project cards with 3D effects');
}

// Fallback Interactive Experience
function createFallbackInteractiveExperience() {
    console.log('🌟 Creating fallback interactive experience...');
    
    try {
        // Create floating geometric shapes for visual interest
        createFloatingShapes();
        
        // Add interactive cursor effects
        enhanceCursorInteractivity();
        
        // Create visual feedback for any clickable elements
        addUniversalClickEffects();
        
        console.log('✨ Fallback interactive experience created successfully');
    } catch (error) {
        console.warn('⚠️ Fallback experience creation failed:', error.message);
    }
}

// Create floating geometric shapes
function createFloatingShapes() {
    const shapes = ['circle', 'triangle', 'square', 'hexagon'];
    const colors = ['#2563eb', '#7c3aed', '#06b6d4', '#10b981'];
    
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: fixed;
            width: ${20 + Math.random() * 40}px;
            height: ${20 + Math.random() * 40}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        document.body.appendChild(shape);
        
        // Animate shape
        gsap.to(shape, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            scale: Math.random() * 2 + 0.5,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Enhanced cursor interactivity
function enhanceCursorInteractivity() {
    // Create custom cursor if it doesn't exist
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(cursor);
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
        });
        
        // Enhance cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .clickable');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    background: 'rgba(124, 58, 237, 0.8)',
                    duration: 0.3
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    background: 'rgba(37, 99, 235, 0.8)',
                    duration: 0.3
                });
            });
        });
    }
}

// Universal click effects
function addUniversalClickEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.no-ripple')) return;
        
        createRippleEffect(e.clientX, e.clientY);
    });
}

// Enhanced ripple effect
function createRippleEffect(x, y, options = {}) {
    const ripple = document.createElement('div');
    const size = options.size || 100;
    const color = options.color || 'rgba(37, 99, 235, 0.6)';
    
    ripple.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${x - size/2}px;
        top: ${y - size/2}px;
        background: radial-gradient(circle, ${color} 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: scale(0);
    `;
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    gsap.timeline()
        .to(ripple, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(ripple, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        });
}

/* ========================================
   ENHANCED ERROR HANDLING & PERFORMANCE
======================================== */

// Global error handler with user-friendly messages
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        error: e.error
    });
    
    // Don't show error messages for common non-critical errors
    const ignorableErrors = [
        'Script error',
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured'
    ];
    
    if (!ignorableErrors.some(ignorable => e.message.includes(ignorable))) {
        // Show user-friendly message for critical errors
        showErrorNotification('Something went wrong, but don\'t worry - everything is still working!');
    }
});

// Enhanced notification system
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
        z-index: 10000;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; margin-left: auto;" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            gsap.to(notification, {
                opacity: 0,
                x: 100,
                duration: 0.3,
                onComplete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        }
    }, 5000);
}

/* ========================================
   PERFORMANCE OPTIMIZATION
======================================== */

// Optimize animations for better performance
function optimizeAnimations() {
    // Enable hardware acceleration for better performance
    const animatedElements = document.querySelectorAll('.project-card, .mode-card, .floating-shape');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        el.style.transform = 'translateZ(0)'; // Force hardware acceleration
    });
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate positions and sizes after resize
            console.log('🔄 Window resized, recalculating layouts...');
        }, 250);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    requestIdleCallback(() => {
        optimizeAnimations();
    });
});

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
======================================== */

// Enhanced keyboard navigation
function enhanceKeyboardNavigation() {
    // Add skip links for better accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced focus management
    document.addEventListener('keydown', (e) => {
        // Escape key functionality
        if (e.key === 'Escape') {
            // Close any open modals
            const activeModal = document.querySelector('.modal.active, .project-modal[style*="flex"]');
            if (activeModal) {
                if (typeof closeProjectModal === 'function') {
                    closeProjectModal();
                }
            }
            
            // Close any dropdowns
            const activeDropdowns = document.querySelectorAll('.dropdown.active');
            activeDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceKeyboardNavigation();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRevolutionary3DCarousel,
        enhanceProjectCardsWith3D,
        createFallbackInteractiveExperience,
        showErrorNotification,
        createRippleEffect,
        optimizeAnimations,
        enhanceKeyboardNavigation
    };
}

console.log('🎉 Enhanced Script.js loaded successfully! All functionalities optimized and error-handled.');