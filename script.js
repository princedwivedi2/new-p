/* ========================================
   FIXED PORTFOLIO JAVASCRIPT
   All UI functionalities working properly
======================================== */

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