document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');

    // --- Typing Effect Removed ---

    // --- Staggered Animations ---
    const grids = document.querySelectorAll('.skills-grid, .projects-grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('animate-on-scroll', 'fade-in-up');
            // Add delay based on index (max 500ms to prevent too long waits)
            const delay = Math.min((index + 1) * 100, 500);
            child.style.animationDelay = `${delay}ms`;
        });
    });

    // --- Scroll Reveal ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .hero-title, .hero-subtitle, .about-text, .contact-text, .animate-on-scroll');

    animatedElements.forEach(el => {
        // Ensure initial state is hidden if not already handled by CSS class
        if (!el.classList.contains('animate-on-scroll')) {
            el.classList.add('animate-on-scroll', 'fade-in-up');
        }
        el.style.animationPlayState = 'paused'; // Pause animation until visible
        observer.observe(el);
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // --- Animated KPI Counters ---
    const kpiCounters = document.querySelectorAll('.kpi-number');

    if (kpiCounters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    if (isNaN(target)) return;

                    // Avoid re-running animation
                    if (el.dataset.animated === 'true') {
                        obs.unobserve(el);
                        return;
                    }
                    el.dataset.animated = 'true';

                    const duration = 1400;
                    const startTime = performance.now();

                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const value = Math.floor(progress * target);
                        el.textContent = value.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target.toLocaleString();
                        }
                    };

                    requestAnimationFrame(animate);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        kpiCounters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // --- Subtle Tilt Effect on KPI Card ---
    const heroKpiCard = document.querySelector('.hero-kpi-card');
    if (heroKpiCard) {
        heroKpiCard.addEventListener('mousemove', (e) => {
            const rect = heroKpiCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = (-y * 6).toFixed(2);
            const rotateY = (x * 6).toFixed(2);

            heroKpiCard.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        heroKpiCard.addEventListener('mouseleave', () => {
            heroKpiCard.style.transform =
                'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }

});
