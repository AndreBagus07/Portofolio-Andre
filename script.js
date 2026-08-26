// script.js - Theme toggle + scroll reveal animations + skill bar dynamic
(function() {
  // Dark/Light Mode Toggle
  const themeSwitch = document.getElementById('themeSwitch');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  function toggleTheme() {
    if (document.body.classList.contains('dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  if (themeSwitch) {
    themeSwitch.addEventListener('click', toggleTheme);
  }
  
  // REVEAL ON SCROLL (Intersection Observer)
  const revealElements = document.querySelectorAll('.section-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // once revealed, stop observing
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  
  revealElements.forEach(el => observer.observe(el));
  
  // Force first load visible check
  window.addEventListener('load', () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
    // Additional: animate skill bars width if not yet animated, but they have inline width style.
    // improve skill bar animation reset on reveal? Already handled by CSS keyframes with initial 0.
    // we re-trigger for consistency: set width inline to final after reveal?
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const finalWidth = bar.style.width;
      if (finalWidth && finalWidth !== '0%') {
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = finalWidth; }, 200);
      }
    });
  });
  
  // Optional: smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Add floating animation to network sphere on hover
  const sphere = document.querySelector('.network-sphere');
  if (sphere) {
    sphere.addEventListener('mouseenter', () => {
      sphere.style.animation = 'pulseGlow 1s infinite alternate';
    });
    sphere.addEventListener('mouseleave', () => {
      sphere.style.animation = 'pulseGlow 3s infinite alternate';
    });
  }
})();