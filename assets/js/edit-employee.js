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
let salarioBaseInput = document.getElementById("salarioBase");
let isssInput = document.getElementById("isss");
let afpInput = document.getElementById("afp");
let isssValue = 0;
let afpValue = 0;
let salarioBase = 0;
salarioBaseInput.addEventListener("input", function () {
  salarioBase = salarioBaseInput.value;
  isssValue = calcularISSS(salarioBase);
  afpValue = calcularAFP(salarioBase);
  isssInput.value = isssValue.toFixed(2);
  afpInput.value = afpValue.toFixed(2);
});
let btnEnviarEmpleado = document.getElementById("btnEnviarEmpleado");
btnEnviarEmpleado.addEventListener("click", function () {
  let nombre = document.getElementById("nombre-input").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let email = document.getElementById("email-input").value;
  let contrasena = document.getElementById("contrasena").value;
  let rol;
  // Obtener el elemento de radio seleccionado
  const opcionSeleccionada = document.querySelector(
    'input[name="accountType"]:checked'
  );

  // Verificar si hay una opción seleccionada
  if (opcionSeleccionada) {
    // Obtener el valor seleccionado
    rol = opcionSeleccionada.value;

    // Hacer algo con el valor seleccionado
    console.log("Valor seleccionado:", rol);
  } else {
    console.log("Ninguna opción seleccionada");
  }

  let nit = document.getElementById("nit").value;
  let direccion = document.getElementById("direccion").value;

  let telefono = document.getElementById("telefono").value;
  let inputFecha = document.getElementById("fechaContratacion");
  let fecha = inputFecha.value;
  let fechaFormateada;
  if (fecha) {
    let fechaObjeto = new Date(fecha);
    if (isNaN(fechaObjeto.getTime())) {
      console.log("Fecha inválida");
    } else {
      var dia = fechaObjeto.getDate();
      var mes = fechaObjeto.getMonth() + 1; // Los meses son indexados desde 0
      var anio = fechaObjeto.getFullYear();

      // Agregar ceros iniciales si es necesario
      dia = dia < 10 ? "0" + dia : dia;
      mes = mes < 10 ? "0" + mes : mes;

      fechaFormateada = anio + "-" + mes + "-" + dia;
      console.log(fechaFormateada);
    }
  } else {
    console.log("Fecha no seleccionada");
  }
  ingresarEmpleado({
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    email: email,
    contrasena: contrasena,
    rol: rol,
    nit: nit,
    direccion: direccion,
    fechaContratacion: fechaFormateada,
    telefono: telefono,
    salarioBase: salarioBase,
    montoIsss: isssValue,
    montoAfp: afpValue,
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
    axios.get(url + `/empleado/${empleadoId}`)
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
          img: imgEmpleado || empleadoActual.img,
          estado: empleadoActual.estado
        };
  
        // Enviar la solicitud para actualizar el empleado
        axios.put(url + `/empleado/${empleadoId}/actualizar`, empleadoActualizado)
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