document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.producto-card');
  const filtroInput = document.getElementById('filtro-productos');

  // Verificar si estamos en "modo admin" a través de un parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') {
    document.body.classList.add('admin-mode');
  }

  // Funcionalidad de filtro de productos
  if (filtroInput) {
    filtroInput.addEventListener('input', () => {
      const texto = filtroInput.value.toLowerCase();
      cards.forEach(card => {
        const nombre = card.querySelector('h3').textContent.toLowerCase();
        if (nombre.includes(texto)) {
          card.style.display = '';
          // card.classList.add('resaltado'); // Efecto de resaltado opcional
        } else {
          card.style.display = 'none';
          // card.classList.remove('resaltado');
        }
      });
    });
  }

  // Funcionalidad para los botones de "Elegir Imagen"
  document.querySelectorAll('.toggle-image-upload-btn').forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.producto-card, .servicio-card');
      if (card) {
        const fileInput = card.querySelector('.image-upload-input');
        if (fileInput) {
          fileInput.click(); // Dispara el diálogo de selección de archivo del input oculto
        }
      }
    });
  });

  // Funcionalidad para cargar imágenes en tarjetas de producto y servicio
  document.querySelectorAll('.image-upload-input').forEach(input => {
    input.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (!file) {
        // Si el usuario cancela la selección de archivo, no hacemos nada.
        return;
      }

      const card = event.target.closest('.producto-card, .servicio-card');
      if (!card) {
        console.warn("El input de carga de imagen no está dentro de una tarjeta (.producto-card o .servicio-card).");
        return;
      }

      const imageElement = card.querySelector('img'); // Asume la imagen principal de la tarjeta
      if (!imageElement) {
        console.warn("No se encontró etiqueta <img> en la tarjeta para actualizar:", card);
        return; // Si no hay etiqueta de imagen, no podemos continuar.
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        imageElement.src = e.target.result;
        imageElement.style.display = 'block'; // Asegura que la imagen sea visible
        // Determinar el texto alternativo basado en el tipo de tarjeta
        if (card.classList.contains('servicio-card')) {
          imageElement.alt = "Previsualización de imagen del servicio cargada";
        } else {
          imageElement.alt = "Previsualización de imagen del producto cargada";
        }
      };
      reader.readAsDataURL(file); // Esta línea es crucial y faltaba en el lugar correcto.
    });
  });

  // Asignar la función volverAtras a los botones con la clase js-btn-volver
  document.querySelectorAll('.js-btn-volver').forEach(button => {
    button.addEventListener('click', volverAtras);
  });
});

// Funcionalidad botón atrás global
function volverAtras() {
  window.history.back();
}
