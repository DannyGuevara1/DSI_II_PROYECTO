import { verificarToken } from "./ruter.js"
verificarToken()
// Obtener el ID del empleado de la URL
const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("id");
const url = "http://localhost:8080/api";
function calcularISSS(salarioBase) {
  // Realiza el cálculo del ISSS
  // Por ejemplo, supongamos que el ISSS es el 3% del salario base
  return salarioBase * 0.0725;
}

function calcularAFP(salarioBase) {
  // Realiza el cálculo del AFP
  // Por ejemplo, supongamos que el AFP es el 7% del salario base
  return salarioBase * 0.03;
}


let btnEnviarEmpleado = document.getElementById("btnEnviarEmpleado");
btnEnviarEmpleado.addEventListener("click", function () {
  let nombre = document.getElementById("nombre-input").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let email = document.getElementById("email-input").value;
  let contrasena = document.getElementById("contrasena").value;
  let rol;
  

  let nit = document.getElementById("nit").value;
  let direccion = document.getElementById("direccion").value;

  let telefono = document.getElementById("telefono").value;
  ingresarEmpleado({
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    email: email,
    contrasena: contrasena,
    nit: nit,
    direccion: direccion,
    telefono: telefono,
    imgEmpleado: "p.jpg",
  });
});
function ingresarEmpleado({
    nombre,
    apellido,
    edad,
    email,
    contrasena,
    rol,
    nit,
    direccion,
    fechaContratacion,
    telefono,
    salarioBase,
    montoIsss,
    montoAfp,
    imgEmpleado,
  }) {
    // Obtener los valores actuales del empleado
    axios.get(url + `/empleado/${localStorage.getItem("id")}`)
      .then((response) => {
        const empleadoActual = response.data;
  
        // Actualizar solo los campos que se han ingresado nuevos
        const empleadoActualizado = {
          nombre: nombre || empleadoActual.nombre,
          apellido: apellido || empleadoActual.apellido,
          edad: edad || empleadoActual.edad,
          email: email || empleadoActual.email,
          contrasena: contrasena || empleadoActual.contrasena,
          rol: rol || empleadoActual.rol,
          nit: nit || empleadoActual.nit,
          direccion: direccion || empleadoActual.direccion,
          fechaContratacion: fechaContratacion || empleadoActual.fechaContratacion,
          telefono: telefono || empleadoActual.telefono,
          salarioBase: salarioBase || empleadoActual.salarioBase,
          montoIsss: montoIsss || empleadoActual.montoIsss,
          montoAfp: montoAfp || empleadoActual.montoAfp,
          renta:empleadoActual.renta,
          img: imgEmpleado || empleadoActual.img,
          estado: empleadoActual.estado
        };
  
        // Enviar la solicitud para actualizar el empleado
        axios.put(url + `/empleado/${localStorage.getItem("id")}/actualizar`, empleadoActualizado)
          .then((response) => {
            console.log("Solicitud enviada correctamente");
            // Manejar la respuesta del servidor si es necesario
            Swal.fire({
              icon: "success",
              title: "¡Solicitud enviada correctamente!",
              text: "Los datos se enviaron con éxito.",
            });
          })
          .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
            // Manejar el error si es necesario
          });
      })
      .catch((error) => {
        console.error("Error al obtener los datos del empleado:", error);
        // Manejar el error si es necesario
      });
  }