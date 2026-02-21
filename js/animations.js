document.documentElement.classList.remove("no-js");
// Animaciones suaves al hacer scroll usando IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  // Si el navegador no soporta IntersectionObserver, mostramos todo
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // se anima una vez y listo
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
});

// Navbar: ocultar al bajar, mostrar al subir
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  const threshold = 10; // evita parpadeos por micro-scroll

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    // Si estás arriba del todo, que se vea siempre
    if (currentScrollY <= 0) {
      header.classList.remove("nav-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    // Si baja -> ocultar
    if (delta > threshold) {
      header.classList.add("nav-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    // Si sube -> mostrar
    if (delta < -threshold) {
      header.classList.remove("nav-hidden");
      lastScrollY = currentScrollY;
      return;
    }
  }, { passive: true });
});

// Scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.querySelector(".scroll-top");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});