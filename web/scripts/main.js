// =============================================
// SISTEMA FÉNIX — main.js
// Interacciones generales de la landing
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Intersection Observer para fade-in ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- Navbar: scroll effect ----
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.borderBottomColor = 'rgba(255,107,0,0.2)';
    } else {
      nav.style.borderBottomColor = 'var(--gris-borde)';
    }
  });

  // ---- Año actual en footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Scroll suave a sección simulación ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
