document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCustomCursor();
    initAccordion();
    initScrollReveal();
    initScrollSpy();
    initFormInteractions();
    initProjectPreviewModal();
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
            card.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering-project');
                if (card.classList.contains('has-live-preview')) {
                    document.body.classList.add('hovering-preview-project');
                }
            });
            card.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering-project');
                document.body.classList.remove('hovering-preview-project');
            });
        });

        // Hide custom cursor when inside the live preview stage so native iframe cursor works seamlessly
        const previewStage = document.getElementById('preview-modal-stage');
        if (previewStage && !previewStage.dataset.cursorBound) {
            previewStage.dataset.cursorBound = 'true';
            previewStage.addEventListener('mouseenter', () => document.body.classList.add('in-iframe-stage'));
            previewStage.addEventListener('mouseleave', () => document.body.classList.remove('in-iframe-stage'));
        }
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

/* ==========================================================================
   Dark/Light Theme Toggle
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Function to update the icon based on current theme
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'bx bx-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'bx bx-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    }

    // Get current theme from <html> (which was set by inline script in head)
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

/* ==========================================================================
   Interactive Live Website Preview Modal
   ========================================================================== */
function initProjectPreviewModal() {
    const modal = document.getElementById('project-preview-modal');
    if (!modal) return;

    const backdrop = document.getElementById('preview-modal-backdrop');
    const closeBtn = document.getElementById('preview-close-btn');
    const dotClose = document.getElementById('preview-dot-close');
    const dotReset = document.getElementById('preview-dot-reset');
    const dotOpen = document.getElementById('preview-dot-open');
    const reloadBtn = document.getElementById('preview-reload-btn');
    const titleEl = document.getElementById('preview-modal-title');
    const urlTextEl = document.getElementById('preview-modal-url');
    const protocolIcon = document.getElementById('preview-protocol-icon');
    const externalLink = document.getElementById('preview-external-link');
    const stage = document.getElementById('preview-modal-stage');
    const viewportFrame = document.getElementById('preview-viewport-frame');
    const iframe = document.getElementById('preview-iframe');
    const loadingOverlay = document.getElementById('preview-loading');
    const loadingBg = document.getElementById('preview-loading-bg');
    const loadingUrl = document.getElementById('preview-loading-url');
    const fallbackOverlay = document.getElementById('preview-fallback');
    const fallbackImg = document.getElementById('preview-fallback-img');
    const fallbackBtn = document.getElementById('preview-fallback-btn');
    const deviceBtns = modal.querySelectorAll('.device-btn');

    let activeUrl = '';
    let loadTimeoutId = null;
    let closeCleanupTimeoutId = null;

    function setDeviceViewport(device) {
        deviceBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.device === device);
        });
        if (viewportFrame) {
            viewportFrame.setAttribute('data-viewport', device);
        }
        if (stage) {
            stage.classList.toggle('framed-device', device !== 'desktop');
        }
    }

    function loadUrlIntoFrame(url, previewImg) {
        if (!iframe) return;
        clearTimeout(loadTimeoutId);

        const isHttpsPage = window.location.protocol === 'https:';
        const isHttpTarget = url.startsWith('http://');

        if (loadingBg && previewImg) {
            loadingBg.src = previewImg;
        }
        if (fallbackImg && previewImg) {
            fallbackImg.src = previewImg;
        }
        if (loadingUrl) {
            loadingUrl.textContent = url;
        }

        // Browsers block mixed-content HTTP iframes inside HTTPS pages
        if (isHttpsPage && isHttpTarget) {
            loadingOverlay.classList.add('hidden');
            fallbackOverlay.hidden = false;
            iframe.src = 'about:blank';
            return;
        }

        fallbackOverlay.hidden = true;
        loadingOverlay.classList.remove('hidden');
        iframe.src = url;

        // Fallback timer so loading overlay doesn't hang if a third-party tracker delays window.onload
        loadTimeoutId = setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 4500);
    }

    if (iframe) {
        iframe.addEventListener('load', () => {
            if (!activeUrl || iframe.src === 'about:blank') return;
            clearTimeout(loadTimeoutId);
            loadingOverlay.classList.add('hidden');
        });
    }

    window.openProjectPreview = function(cardEl) {
        if (!cardEl) return;
        const url = cardEl.getAttribute('data-preview-url');
        if (!url) return;

        const title = cardEl.getAttribute('data-preview-title') || 'Live Preview';
        const img = cardEl.getAttribute('data-preview-img') || '';

        clearTimeout(closeCleanupTimeoutId);
        activeUrl = url;

        if (titleEl) titleEl.textContent = title;
        if (urlTextEl) urlTextEl.textContent = url;
        if (externalLink) externalLink.href = url;
        if (fallbackBtn) fallbackBtn.href = url;

        if (protocolIcon) {
            const isSecure = url.startsWith('https://');
            protocolIcon.className = isSecure
                ? 'bx bx-lock-alt preview-protocol-icon'
                : 'bx bx-globe preview-protocol-icon insecure';
        }

        setDeviceViewport('desktop');
        loadUrlIntoFrame(url, img);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('preview-modal-open');
        document.body.classList.remove('hovering-project', 'hovering-preview-project');
    };

    window.closeProjectPreview = function() {
        if (!modal.classList.contains('active')) return;
        clearTimeout(loadTimeoutId);
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('preview-modal-open', 'in-iframe-stage');

        closeCleanupTimeoutId = setTimeout(() => {
            activeUrl = '';
            if (iframe) iframe.src = 'about:blank';
        }, 350);
    };

    // Device size buttons
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setDeviceViewport(btn.dataset.device || 'desktop');
        });
    });

    // Reload button
    if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
            if (!activeUrl) return;
            const currentImg = loadingBg ? loadingBg.getAttribute('src') : '';
            if (iframe) iframe.src = 'about:blank';
            setTimeout(() => loadUrlIntoFrame(activeUrl, currentImg), 40);
        });
    }

    // Window traffic-light dots & close controls
    if (closeBtn) closeBtn.addEventListener('click', window.closeProjectPreview);
    if (backdrop) backdrop.addEventListener('click', window.closeProjectPreview);
    if (dotClose) dotClose.addEventListener('click', window.closeProjectPreview);
    if (dotReset) dotReset.addEventListener('click', () => setDeviceViewport('desktop'));
    if (dotOpen) {
        dotOpen.addEventListener('click', () => {
            if (activeUrl) window.open(activeUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            window.closeProjectPreview();
        }
    });
}