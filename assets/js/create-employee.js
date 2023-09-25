import { verificarToken } from "./ruter.js";
verificarToken()
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
function calcularDescuentoRenta(salario) {
  if (salario <= 472.0) {
    return 0.0;
  } else if (salario <= 895.24) {
    return (salario - 472.0) * 0.10 + 17.67;
  } else if (salario <= 2038.10) {
    return (salario - 895.24) * 0.20 + 60.00;
  } else {
    return (salario - 2038.10) * 0.30 + 288.57;
  }
}
let salarioBaseInput = document.getElementById("salarioBase");
let isssInput = document.getElementById("isss");
let afpInput = document.getElementById("afp");
let rentaInput = document.getElementById("renta");
let isssValue = 0;
let afpValue = 0;
let salarioBase = 0;
let rentaValue = 0;
salarioBaseInput.addEventListener("input", function () {
  salarioBase = salarioBaseInput.value;
  isssValue = calcularISSS(salarioBase);
  afpValue = calcularAFP(salarioBase);
  rentaValue = calcularDescuentoRenta(salarioBase);
  isssInput.value = isssValue.toFixed(2);
  afpInput.value = afpValue.toFixed(2);
  rentaInput.value = rentaValue.toFixed(2);
});
let btnEnviarEmpleado = document.getElementById("btnEnviarEmpleado");
btnEnviarEmpleado.addEventListener("click", function () {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let email = document.getElementById("email").value;
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
    renta: rentaValue,
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
  renta,
  imgEmpleado,
}) {
  const estudiante = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    email: email,
    contrasena: contrasena,
    rol: rol,
    nit: nit,
    direccion: direccion,
    fechaContratacion: fechaContratacion,
    telefono: telefono,
    salarioBase: salarioBase,
    montoIsss: montoIsss,
    montoAfp: montoAfp,
    renta:renta,
    img: imgEmpleado,
  };
  axios
    .post(url + "/empleado/ingresar", estudiante)
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
}
