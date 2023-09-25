import { verificarToken } from "./ruter.js"

verificarToken()
// // Obtener el parámetro 'id' de la URL
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id');

// // Obtener todos los elementos <a> en la página
// const links = document.querySelectorAll('a');

// // Recorrer cada enlace y agregar el parámetro 'id' si está presente
// links.forEach(link => {
//   if (id) {
//     const href = link.getAttribute('href');
//     link.setAttribute('href', `${href}?id=${id}`);
//   }
// });
document
  .getElementById("btnCreateEmployee")
  .addEventListener("click", function () {
    // Agregar clase 'sending' al botón para activar la animación
    this.classList.add("sending");

    // Simular una demora antes de redireccionar
    setTimeout(function () {
      // Redireccionar a otra página dentro del proyecto
      window.location.href = "../pages/create-employee.html";
    }, 520); // 500 ms = 0.5 segundos (tiempo de duración de la animación)
  });
  

