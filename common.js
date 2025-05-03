window.onload = function () {
  /*===== SCROLL REVEAL ANIMATION =====*/
  const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
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

}



