document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initAccordion();
    initScrollReveal();
    initScrollSpy();
    initFormInteractions();
});

/* ==========================================================================
   Custom Follow Cursor (Lerp) & Background Glow Tracking
   ========================================================================== */
function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    if (!cursorDot || !cursorRing) return;

    // Reset styles to use translate3d
    cursorDot.style.left = '0px';
    cursorDot.style.top = '0px';
    cursorRing.style.left = '0px';
    cursorRing.style.top = '0px';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    // Smooth factor (0.1 = slower/smoother, 1.0 = instant)
    const lerpDot = 0.25;
    const lerpRing = 0.12;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dynamic CSS variables for body background glow
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Custom Cursor Loop
    function updateCursor() {
        // Linear Interpolation
        dotX += (mouseX - dotX) * lerpDot;
        dotY += (mouseY - dotY) * lerpDot;
        ringX += (mouseX - ringX) * lerpRing;
        ringY += (mouseY - ringY) * lerpRing;

        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(updateCursor);
    }
    
    requestAnimationFrame(updateCursor);

    // Hover Listeners
    const setupHoverListeners = () => {
        // Link hovers
        const linkElements = document.querySelectorAll('a, button, .social-btn, .accordion-header, .nav-link, .submit-btn, .skill-card');
        linkElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
        });

        // Project hovers
        const projectCards = document.querySelectorAll('.cursor-hover-project');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => document.body.classList.add('hovering-project'));
            card.addEventListener('mouseleave', () => document.body.classList.remove('hovering-project'));
        });
    };

    setupHoverListeners();

    // Re-bind hover listeners if DOM updates
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
}

/* ==========================================================================
   Accordion Toggle
   ========================================================================== */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        const roleEl = header.querySelector('.exp-role');
        const roleText = roleEl ? roleEl.textContent.trim() : '';
        const isPermanentOpen = roleText.includes('IT Applications Developer') || roleText === 'Software Engineer';
        
        if (isPermanentOpen) {
            // Force active class on load
            const item = header.parentElement;
            if (item) {
                item.classList.add('active');
            }
            
            // On click, prevent closing (always keep active)
            header.addEventListener('click', () => {
                const item = header.parentElement;
                if (item && !item.classList.contains('active')) {
                    item.classList.add('active');
                }
            });
        } else {
            // Standard toggle behavior for other experience cards
            header.addEventListener('click', () => {
                const item = header.parentElement;
                if (item) {
                    item.classList.toggle('active');
                }
            });
        }
    });
}

/* ==========================================================================
   Scroll Reveal Entrance Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* ==========================================================================
   ScrollSpy Navbar Highlights
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 180;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   Form Floating Label Focus Highlights
   ========================================================================== */
function initFormInteractions() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Toggle subject/border lines
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}