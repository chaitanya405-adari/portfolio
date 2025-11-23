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
});
