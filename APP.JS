/* ========================================
   Enhanced Portfolio JavaScript
   with GSAP Animations & tsParticles
======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let isLoading = true;
let customCursor = null;
let customCursorFollower = null;

/* ========================================
   MAIN INITIALIZATION
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
    
    setTimeout(() => {
        hideLoadingScreen();
        initializeApp();
    }, 2000);
});

function initializeApp() {
    initCustomCursor();
    initNavigation();
    initScrollProgress();
    initTypewriter();
    initParticles();
    initGSAPAnimations();
    initFormValidation();
    initSmoothScrolling();
    initCounters();
    initNotifications();
    initVideoPlayer();
    initImageOptimization();
    initDarkMode();
    
    // Initialize AOS as fallback
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

/* ========================================
   LOADING SCREEN
======================================== */

function showLoadingScreen() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoadingScreen() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.remove();
            isLoading = false;
        }, 500);
    }
}

/* ========================================
   CUSTOM CURSOR
======================================== */

function initCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    customCursor = document.querySelector('.cursor');
    customCursorFollower = document.querySelector('.cursor-follower');
    
    if (!customCursor || !customCursorFollower) {
        console.log('Cursor elements not found');
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    
    // Initialize cursor visibility
    customCursor.style.opacity = '1';
    customCursorFollower.style.opacity = '0.7';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
        customCursorFollower.style.left = mouseX + 'px';
        customCursorFollower.style.top = mouseY + 'px';
    });
    
    // Enhanced hover elements selection
    function updateHoverElements() {
        const hoverElements = document.querySelectorAll(`
            a, button, input, textarea, select,
            .btn, .nav-link, .social-icon, .social-link,
            .skill-item, .project-card, .service-card,
            .play-button, .feature-item, .floating-icon,
            [role="button"], [tabindex]:not([tabindex="-1"]),
            .cursor-hover, .interactive
        `);
        
        console.log(`Found ${hoverElements.length} hover elements`);
        
        hoverElements.forEach(element => {
            // Remove existing listeners to prevent duplicates
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add new listeners
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });
    }
    
    function handleMouseEnter() {
        customCursor.classList.add('hover');
        customCursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        console.log('Mouse enter - hover activated');
    }
    
    function handleMouseLeave() {
        customCursor.classList.remove('hover');
        customCursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        console.log('Mouse leave - hover deactivated');
    }
    
    // Initial setup
    updateHoverElements();
    
    // Re-scan for new elements after DOM changes
    const observer = new MutationObserver(() => {
        updateHoverElements();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        customCursor.style.opacity = '0';
        customCursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        customCursor.style.opacity = '1';
        customCursorFollower.style.opacity = '0.7';
    });
    
    console.log('Custom cursor initialized successfully');
}

/* ========================================
   NAVIGATION
======================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (navLink) navLink.classList.add('active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ========================================
   SCROLL PROGRESS BAR
======================================== */

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ========================================
   TYPEWRITER EFFECT
======================================== */

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const roles = [
        'PHP Laravel Developer',
        'Full Stack Developer',
        'Frontend Specialist', 
        'React.js Developer',
        'Backend Engineer',
        'API Developer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting) {
            // Typing
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length + 1) {
                isDeleting = true;
                typeSpeed = 50;
                setTimeout(typeWriter, 2000); // Pause before deleting
                return;
            }
        } else {
            // Deleting
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeSpeed = 100;
                setTimeout(typeWriter, 500); // Pause before typing next
                return;
            }
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 1500);
}

/* ========================================
   TSPARTICLES INITIALIZATION
======================================== */

async function initParticles() {
    try {
        await tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#6366f1", "#ec4899", "#10b981"],
                },
                links: {
                    color: "#6366f1",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    directions: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 50,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        });
    } catch (error) {
        console.warn('tsParticles failed to load:', error);
    }
}

/* ========================================
   GSAP ANIMATIONS
======================================== */

function initGSAPAnimations() {
    // Set initial states
    gsap.set(['.title-line', '.title-name', '.title-role', '.hero-description', '.hero-buttons', '.hero-social'], {
        opacity: 0,
        y: 50
    });
    
    gsap.set('.profile-img', { 
        opacity: 0, 
        scale: 0,
        rotation: 180
    });
    
    gsap.set('.floating-icon', { 
        opacity: 0, 
        scale: 0 
    });
    
    // Hero section timeline
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl
        .to('.title-line', { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        })
        .to('.title-name', { 
            duration: 1, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        }, '-=0.6')
        .to('.title-role', { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        }, '-=0.4')
        .to('.hero-description', { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        }, '-=0.4')
        .to('.hero-buttons', { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        }, '-=0.4')
        .to('.hero-social', { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            ease: 'power2.out' 
        }, '-=0.6')
        .to('.profile-img', { 
            duration: 1.2, 
            opacity: 1, 
            scale: 1, 
            rotation: 0, 
            ease: 'elastic.out(1, 0.8)' 
        }, '-=1')
        .to('.floating-icon', { 
            duration: 0.6, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.1, 
            ease: 'back.out(1.7)' 
        }, '-=0.5');
    
    // Scroll-triggered animations
    animateOnScroll();
    
    // Parallax effects
    initParallax();
    
    // Floating icons orbit
    initFloatingIcons();
    
    // Button hover effects
    initButtonAnimations();
}

function animateOnScroll() {
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });
    });
    
    // Section lines
    gsap.utils.toArray('.section-line').forEach(line => {
        gsap.from(line, {
            scrollTrigger: {
                trigger: line,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            scaleX: 0,
            ease: 'power2.out',
            delay: 0.3
        });
    });
    
    // About section
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.about-services',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Skills section
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        ease: 'back.out(1.7)'
    });
    
    // Demo section
    gsap.from('.demo-video', {
        scrollTrigger: {
            trigger: '.demo-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.demo-text', {
        scrollTrigger: {
            trigger: '.demo-section',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.3
    });
    
    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.demo-features',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Projects section
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Contact section
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.glass-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.3
    });
}

function initParallax() {
    // Hero background parallax
    gsap.to('.hero::before', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        yPercent: -50,
        ease: 'none'
    });
    
    // Hero shapes parallax
    gsap.utils.toArray('.shape').forEach((shape, index) => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 2
            },
            yPercent: -30 * (index + 1),
            ease: 'none'
        });
    });
}

function initFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
        const duration = 15 + (index * 2); // Different speeds for each icon
        
        gsap.to(icon, {
            rotation: 360,
            duration: duration,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 175px'
        });
        
        // Hover effect
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.3,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
}

function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
}

/* ========================================
   SMOOTH SCROLLING
======================================== */

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: targetPosition,
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

/* ========================================
   ANIMATED COUNTERS
======================================== */

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Trigger counter animation when stats section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ========================================
   FORM VALIDATION
======================================== */

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectInput.addEventListener('blur', () => validateSubject());
    messageInput.addEventListener('blur', () => validateMessage());
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            return false;
        }
        hideError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        hideError(emailError);
        return true;
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject.length < 5) {
            showError(subjectError, 'Subject must be at least 5 characters long');
            return false;
        }
        hideError(subjectError);
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            return false;
        }
        hideError(messageError);
        return true;
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add error styling to input
        const input = errorElement.previousElementSibling;
        input.style.borderColor = '#ef4444';
        
        // Shake animation
        gsap.fromTo(input, 
            { x: 0 }, 
            { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'power2.inOut' }
        );
    }
    
    function hideError(errorElement) {
        errorElement.classList.remove('show');
        
        // Remove error styling from input
        const input = errorElement.previousElementSibling;
        input.style.borderColor = '';
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show success notification
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Form submission animation
                gsap.fromTo(contactForm, 
                    { scale: 1 }, 
                    { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }
                );
            }, 2000);
        }
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
            
            gsap.to(this.parentElement, {
                y: -5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
            
            gsap.to(this.parentElement, {
                y: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
}

/* ========================================
   NOTIFICATIONS
======================================== */

function initNotifications() {
    const notification = document.getElementById('notification');
    const closeBtn = document.getElementById('closeNotification');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideNotification);
    }
    
    // Auto-hide notification after 5 seconds
    let notificationTimeout;
    
    window.showNotification = function(message, type = 'success') {
        const notificationMessage = document.getElementById('notificationMessage');
        if (notificationMessage) {
            notificationMessage.textContent = message;
        }
        
        if (notification) {
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            clearTimeout(notificationTimeout);
            notificationTimeout = setTimeout(hideNotification, 5000);
        }
    };
    
    window.hideNotification = function() {
        if (notification) {
            notification.classList.remove('show');
        }
        clearTimeout(notificationTimeout);
    };
}

/* ========================================
   SOCIAL MEDIA ANIMATIONS
======================================== */

function initSocialAnimations() {
    const socialIcons = document.querySelectorAll('.social-icon, .social-link');
    
    socialIcons.forEach((icon, index) => {
        // Entrance animation
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            scale: 0,
            rotation: 180,
            ease: 'back.out(1.7)',
            delay: index * 0.1
        });
        
        // Hover animations
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
    });
}

/* ========================================
   PERFORMANCE OPTIMIZATIONS
======================================== */

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Add any scroll-dependent code here
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(() => {
    // Reinitialize certain features on resize
    if (window.innerWidth <= 768) {
        // Disable certain desktop features on mobile
        if (customCursor) {
            customCursor.style.display = 'none';
        }
        if (customCursorFollower) {
            customCursorFollower.style.display = 'none';
        }
    } else {
        // Re-enable desktop features
        if (customCursor) {
            customCursor.style.display = 'block';
        }
        if (customCursorFollower) {
            customCursorFollower.style.display = 'block';
        }
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Reduce motion for accessibility
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.1);
    
    // Disable particles for reduced motion
    const particlesContainer = document.getElementById('tsparticles');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
}

/* ========================================
   EASTER EGGS & SPECIAL EFFECTS
======================================== */

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg: Make everything rainbow!
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        showNotification('🎉 Konami Code activated! Rainbow mode enabled!', 'success');
    }
});

// Add rainbow keyframes to document
const rainbowStyles = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rainbowStyles;
document.head.appendChild(styleSheet);

// Initialize social animations after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSocialAnimations, 1000);
});

/* ========================================
   VIDEO PLAYER FUNCTIONALITY
======================================== */

function initVideoPlayer() {
    const playButton = document.getElementById('playButton');
    const codingVideo = document.querySelector('.coding-video');
    
    if (!playButton || !codingVideo) return;
    
    playButton.addEventListener('click', () => {
        if (codingVideo.paused) {
            codingVideo.play();
            playButton.style.display = 'none';
        } else {
            codingVideo.pause();
            playButton.style.display = 'flex';
        }
    });
    
    // Show/hide play button based on video state
    codingVideo.addEventListener('play', () => {
        playButton.style.display = 'none';
    });
    
    codingVideo.addEventListener('pause', () => {
        playButton.style.display = 'flex';
    });
    
    codingVideo.addEventListener('ended', () => {
        playButton.style.display = 'flex';
    });
    
    // Video hover effects
    const videoContainer = document.querySelector('.demo-video');
    
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', () => {
            gsap.to(videoContainer, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        videoContainer.addEventListener('mouseleave', () => {
            gsap.to(videoContainer, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

/* ========================================
   IMAGE OPTIMIZATION & LAZY LOADING
======================================== */

function initImageOptimization() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[src*="assets/"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading effect
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                
                img.onload = () => {
                    gsap.to(img, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                };
                
                // Stop observing this image
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add hover effects to 3D assets
    const assetImages = document.querySelectorAll('.profile-img, .service-icon img, .feature-img');
    
    assetImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.1,
                rotation: 5,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Profile image special effects
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        // Continuous gentle floating animation
        gsap.to(profileImg, {
            y: -10,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
        
        // Subtle rotation on scroll
        gsap.to(profileImg, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 2
            },
            rotation: 15,
            ease: 'none'
        });
    }
}

console.log('🚀 Enhanced Portfolio Loaded Successfully!');

/* ========================================
   DARK MODE FUNCTIONALITY
======================================== */

function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDarkMode = savedTheme === 'dark';
    
    // Apply theme
    applyTheme(isDarkMode);
    updateThemeIcon(isDarkMode);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const isDark = newTheme === 'dark';
        
        // Create theme transition effect
        createThemeTransition(() => {
            applyTheme(isDark);
            updateThemeIcon(isDark);
            localStorage.setItem('theme', newTheme);
            
            // Update particles color scheme
            updateParticlesTheme(isDark);
        });
    });
    
    function applyTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        // Update favicon based on theme (optional)
        updateFavicon(isDark);
        
        console.log(`Theme changed to: ${isDark ? 'dark' : 'light'}`);
    }
    
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    
    function createThemeTransition(callback) {
        // Create transition element
        const transition = document.createElement('div');
        transition.className = 'theme-transition';
        document.body.appendChild(transition);
        
        // Get toggle button position
        const rect = themeToggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Position transition element
        transition.style.left = x + 'px';
        transition.style.top = y + 'px';
        
        // Trigger transition
        requestAnimationFrame(() => {
            transition.classList.add('active');
        });
        
        // Apply theme change halfway through animation
        setTimeout(() => {
            callback();
        }, 400);
        
        // Remove transition element
        setTimeout(() => {
            transition.remove();
        }, 800);
    }
    
    function updateParticlesTheme(isDark) {
        // Update tsParticles colors based on theme
        if (typeof tsParticles !== 'undefined') {
            const particleColors = isDark 
                ? ["#6366f1", "#ec4899", "#10b981"]
                : ["#6366f1", "#ec4899", "#10b981"];
                
            const linkColor = isDark ? "#6366f1" : "#6366f1";
            
            // You could reload particles with new colors here if needed
            // This is a simplified version
        }
    }
    
    function updateFavicon(isDark) {
        // Optional: Change favicon based on theme
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            // You could have different favicons for light/dark mode
            // favicon.href = isDark ? '/favicon-dark.ico' : '/favicon-light.ico';
        }
    }
}

/* ========================================
   ENHANCED RESPONSIVE BEHAVIOR
======================================== */

// Enhanced window resize handler
window.addEventListener('resize', debounce(() => {
    // Recalculate cursor behavior
    if (window.innerWidth <= 768) {
        if (customCursor) customCursor.style.display = 'none';
        if (customCursorFollower) customCursorFollower.style.display = 'none';
    } else {
        if (customCursor) customCursor.style.display = 'block';
        if (customCursorFollower) customCursorFollower.style.display = 'block';
        // Reinitialize cursor if needed
        if (!customCursor.style.opacity) {
            initCustomCursor();
        }
    }
    
    // Refresh GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250));

console.log('🎨 Dark Mode & Enhanced Features Initialized!');
console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA');

// GSAP Animations
function initGSAPAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl.from('.title-line', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    })
    .from('.title-name', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.title-role', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-buttons .btn', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.2')
    .from('.profile-img', {
        duration: 1,
        scale: 0,
        rotation: 180,
        ease: 'elastic.out(1, 0.8)'
    }, '-=0.8')
    .from('.floating-icon', {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.4');

    // Section animations on scroll
    gsap.utils.toArray('section:not(#home)').forEach(section => {
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });

        gsap.from(section.querySelector('.section-line'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            scaleX: 0,
            ease: 'power2.out',
            delay: 0.3
        });
    });

    // About section animations
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.5
    });

    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.about-services',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.7
    });

    // Stats counter animation
    gsap.from('.stat h4', {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 2,
        textContent: 0,
        snap: { textContent: 1 },
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Skills section animations
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    // Projects section animations
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Contact section animations
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.3
    });

    // Parallax effect for hero background
    gsap.to('.hero::before', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        yPercent: -50,
        ease: 'none'
    });

    // Floating icons orbit animation
    gsap.set('.floating-icon', { transformOrigin: '50% 150px' });
    
    gsap.to('.icon-1', {
        rotation: 360,
        duration: 10,
        ease: 'none',
        repeat: -1
    });

    gsap.to('.icon-2', {
        rotation: 360,
        duration: 12,
        ease: 'none',
        repeat: -1
    });

    gsap.to('.icon-3', {
        rotation: 360,
        duration: 14,
        ease: 'none',
        repeat: -1
    });

    gsap.to('.icon-4', {
        rotation: 360,
        duration: 16,
        ease: 'none',
        repeat: -1
    });

    // Mouse follower effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const cursorPos = { x: 0, y: 0 };
    const cursorSpeed = 0.15;

    window.addEventListener('mousemove', (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;
    });

    gsap.ticker.add(() => {
        gsap.to(cursor, {
            duration: cursorSpeed,
            x: cursorPos.x,
            y: cursorPos.y
        });
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 2,
                backgroundColor: 'rgba(99, 102, 241, 0.3)'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            });
        });
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            gsap.to(contactForm, {
                duration: 0.5,
                y: -20,
                opacity: 0.5,
                ease: 'power2.out'
            });

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                
                gsap.to(contactForm, {
                    duration: 0.5,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                });

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 500);
        }, 2000);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                borderColor: '#6366f1',
                scale: 1.02,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                borderColor: 'transparent',
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 70
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        gsap.to(scrollIndicator, {
            duration: 0.3,
            width: scrollPercent + '%',
            ease: 'power2.out'
        });
    });
}

// Typewriter effect for hero title
function initTypewriter() {
    const titleRole = document.querySelector('.title-role');
    const roles = ['Full Stack Developer', 'Web Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting) {
            titleRole.textContent = currentRole.substring(0, currentCharIndex);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length + 1) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        } else {
            titleRole.textContent = currentRole.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            }
        }
        
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    // Start typewriter effect after initial animation
    setTimeout(typeWriter, 3000);
}

// Particle system for background
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);

        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });

        gsap.to(particle, {
            duration: Math.random() * 20 + 10,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const optimizeAnimations = debounce(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
        gsap.globalTimeline.timeScale(0.1);
    }
}, 100);

window.addEventListener('resize', optimizeAnimations);

// Add custom cursor styles
const cursorStyles = `
.cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(99, 102, 241, 0.1);
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.3s ease;
}

.scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    z-index: 9999;
    border-radius: 0 2px 2px 0;
}

.particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(99, 102, 241, 0.3);
    border-radius: 50%;
}

@media (max-width: 768px) {
    .cursor {
        display: none;
    }
    
    .particles {
        display: none;
    }
}
`;

// Inject cursor styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// Add mobile navigation styles
const mobileNavStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-top: 2rem;
        transition: all 0.3s ease;
        gap: 2rem;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .hamburger {
        cursor: pointer;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
}
`;

const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileNavStyles;
document.head.appendChild(mobileStyleSheet);
