// Working JavaScript - Simple & Effective
document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // NAVIGATION FUNCTIONALITY
    // =============================================

    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTopBtn.style.display = 'block';
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.style.display = 'none';
        }
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =============================================
    // TYPING ANIMATION
    // =============================================

    const typingText = document.getElementById('typing-text');
    const texts = [
        'Certified Laravel Expert',
        'Full Stack Developer',
        'API Development Specialist',
        'eCommerce Solutions Provider',
        'Problem Solving Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingText) return;

        const currentText = texts[textIndex];
        const speed = isDeleting ? 50 : 100;

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = speed;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // =============================================
    // COUNTER ANIMATION
    // =============================================

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (target === 25 ? '' : '+');
                }
            };

            updateCounter();
        });
    }

    // =============================================
    // SKILL BARS ANIMATION
    // =============================================

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
                bar.classList.add('animated');
            }, index * 200);
        });
    }

    // =============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Trigger specific animations
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }

                if (entry.target.closest('#skills')) {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animate-in class
    document.querySelectorAll('.animate-in').forEach(el => {
        observer.observe(el);
    });

    // Also observe hero stats and skills section
    const heroStats = document.querySelector('.hero-stats');
    const skillsSection = document.querySelector('#skills');

    if (heroStats) observer.observe(heroStats);
    if (skillsSection) observer.observe(skillsSection);

    // =============================================
    // NAVBAR ACTIVE LINK
    // =============================================

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =============================================
    // SCROLL EVENT HANDLER
    // =============================================

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // =============================================
    // CARD HOVER EFFECTS
    // =============================================

    // Enhanced hover effects for service cards
    document.querySelectorAll('.service-card, .highlight-card, .skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // =============================================
    // CONTACT FORM ENHANCEMENT
    // =============================================

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // PERFORMANCE MONITORING
    // =============================================

    // Log performance
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 Website loaded successfully');
        console.log('⚡ All animations initialized');
        console.log('📱 Bootstrap responsive design active');
        console.log('🎨 Teal color scheme applied');
    }

    // =============================================
    // ACCESSIBILITY ENHANCEMENTS
    // =============================================

    // Keyboard navigation for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        scrollIndicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        scrollIndicator.setAttribute('tabindex', '0');
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('aria-label', 'Scroll to about section');
    }

    // =============================================
    // WINDOW LOAD OPTIMIZATIONS
    // =============================================

    // Preload critical animations
    window.addEventListener('load', function() {
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');

        // Initialize hero animations
        const heroElements = document.querySelectorAll('.hero .animate-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('in-view');
            }, index * 100);
        });

        // Trigger initial scroll check
        handleScroll();
        updateActiveNavLink();
    });

    // =============================================
    // REDUCED MOTION SUPPORT
    // =============================================

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }

    // =============================================
    // ERROR HANDLING
    // =============================================

    // Global error handler for graceful degradation
    window.addEventListener('error', function(e) {
        console.warn('Non-critical error occurred:', e.error);
        // Continue execution - don't break the site
    });

    // =============================================
    // EXTERNAL API FUNCTIONS
    // =============================================

    // Export functions for external use
    window.NikhilBhatiaWebsite = {
        scrollToSection: (sectionId) => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },

        openWhatsApp: () => {
            window.open('https://api.whatsapp.com/send?phone=919429149829&text=Hi,%20I%27d%20like%20to%20discuss%20a%20project', '_blank');
        },

        sendEmail: () => {
            window.location.href = 'mailto:hello@nikhilbhatia.in?subject=Project%20Inquiry';
        },

        animateSkills: () => {
            animateSkillBars();
        },

        animateCounters: () => {
            animateCounters();
        }
    };

    // =============================================
    // INITIALIZATION COMPLETE
    // =============================================

    console.log('✅ Nikhil Bhatia Website: All systems operational');

});