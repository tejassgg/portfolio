// Theme toggle functionality
let currentTheme = localStorage.getItem('theme') || 'dark';

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    setTheme(currentTheme);
    updateThemeIcon();
});

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
    updateThemeIcon();
    localStorage.setItem('theme', currentTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (currentTheme === 'light') {
        themeIcon.className = 'bx bx-sun';
    } else {
        themeIcon.className = 'bx bx-moon';
    }
}

window.onload = function () {
  /*===== SCROLL REVEAL ANIMATION =====*/
  const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true,
    mobile: true
  });

  /*SCROLL HOME*/
  sr.reveal('.profile-card, .topNavDiv', {});
  sr.reveal('.Home', { delay: 200 });
  sr.reveal('.Education', { delay: 400 });
  
  sr.reveal('.Experiences', { delay: 300 });
  sr.reveal('.experience', { interval: 150 });
  
  sr.reveal('.Tools', { delay: 300 });
  sr.reveal('.tool-card', { interval: 50 });

  sr.reveal('.Projects', { delay: 300 });
  sr.reveal('.project-card', {delay:50, easing:"ease-out", interval: 50, scale:1.1 });

  sr.reveal('.Contact', { delay: 300 });
  sr.reveal('.input-div', { interval: 150 });
  sr.reveal('.about-right-data', { delay: 300 });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle (if needed in future)
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Add mobile-specific functionality here if needed
    console.log('Mobile device detected');
  }
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  const isMobile = window.innerWidth <= 768;
  // Add any resize-specific functionality here
});

// Form submission function (if not already defined)
function SubmitForm(button) {
  // Add your form submission logic here
  console.log('Form submitted');
  // You can add actual form submission logic here
  alert('Thank you for your message! I will get back to you soon.');
}