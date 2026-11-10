(function () {
  // Dark/Light Mode Toggle
  const themeSwitch = document.getElementById('themeSwitch');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      document.body.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  }

  function toggleTheme() {
    if (document.body.classList.contains('dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark && prefersDark.matches) {
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
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => observer.observe(el));

  // Load reveals
  window.addEventListener('load', () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  });

  // ===== SKELETON SHIMMER LOGIC =====
  const skeletonItems = document.querySelectorAll('.skeleton-item');

  // Berikan class loading di awal
  skeletonItems.forEach(item => item.classList.add('loading'));

  // Hapus class loading setelah 1.5 detik
  window.addEventListener('load', () => {
    setTimeout(() => {
      skeletonItems.forEach(item => {
        item.classList.remove('loading');
        item.style.opacity = '0';

        requestAnimationFrame(() => {
          item.style.transition = 'opacity 0.5s ease';
          item.style.opacity = '1';
        });
      });
    }, 1500);
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== PARTICLES.JS (NETWORK PLEXUS ANIMATION) =====
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 55, // Jumlah titik yang pas dan seimbang
          "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#0ea5e9" }, // Menggunakan biru Cyan terang
        "shape": { "type": "circle" },
        "opacity": {
          "value": 0.6, // Titik lebih halus
          "random": false
        },
        "size": {
          "value": 3, // Ukuran titik pas dan elegan
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#0ea5e9", // Warna garis cyan
          "opacity": 0.5, // Opasitas garis pas
          "width": 1.2 // Ketebalan garis dikecilkan kembali agar elegan dan tidak terlalu tebal
        },
        "move": {
          "enable": true,
          "speed": 1.8,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 180,
            "line_linked": { "opacity": 0.8 } // Saat di-hover, garis menyala lembut
          },
          "push": { "particles_nb": 3 }
        }
      },
      "retina_detect": true
    });
  }

  // Network sphere animation fix
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