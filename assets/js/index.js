import { verificarToken } from "./ruter.js"

verificarToken()
axios.get("http://localhost:8080/api/empleados/cantidad")
.then(function (response){
  const cantidadEmpleados = document.getElementById("cantidadEmpleados")
  cantidadEmpleados.innerText = response.data;
})
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
  

