// Archivo JavaScript para manejar el cambio de tema y animaciones de fondo

document.addEventListener('DOMContentLoaded', function() {
  // Variables para el tema
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Función para aplicar el tema oscuro
  function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="ti-sun"></i>';
    }
  }
  
  // Función para aplicar el tema claro
  function enableLightMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="ti-moon"></i>';
    }
  }
  
  // Verificar la preferencia guardada del usuario
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    enableDarkMode();
  } else if (currentTheme === 'light') {
    enableLightMode();
  } else if (prefersDarkScheme.matches) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
  
  // Agregar el botón de cambio de tema si no existe
  if (!themeToggle) {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.innerHTML = body.classList.contains('dark-mode') ? '<i class="ti-sun"></i>' : '<i class="ti-moon"></i>';
    document.body.appendChild(toggleButton);
  }
  
  // Manejar el cambio de tema al hacer clic en el botón
  document.addEventListener('click', function(e) {
    if (e.target.closest('#theme-toggle')) {
      if (body.classList.contains('dark-mode')) {
        enableLightMode();
      } else {
        enableDarkMode();
      }
    }
  });
  
  // Animación para elementos al entrar en viewport
  const animatedElements = document.querySelectorAll('.animated-element');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated', 'fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    animatedElements.forEach(element => {
      element.classList.add('animated', 'fadeInUp');
    });
  }
  
  // Sincronizar animaciones de gradiente
  const gradientElements = document.querySelectorAll('.hero-area, .experience-section, .stats-section');
  gradientElements.forEach(element => {
    // Asegurarse de que todas las animaciones estén sincronizadas
    element.style.animationDelay = '0s';
  });
});