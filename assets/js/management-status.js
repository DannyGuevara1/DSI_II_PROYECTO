import { verificarToken } from "./ruter.js";

verificarToken();
const url = "http://localhost:8080/api";

//Capturar datos del usuario y validarlos
let btnEnviarTipoEstado = document.getElementById("btnEnviarTipoEstado");
btnEnviarTipoEstado.addEventListener("click", function () {
    var inputCreateStatus = document.getElementById("inputCreateStatus").value;
  // Expresión regular para letras solamente
  var regex = /^[A-Za-z]+$/;

  // Verifica si el valor del campo de entrada solo contiene letras
  if (regex.test(inputCreateStatus)) {
    // Si es válido, puedes limpiar la cadena eliminando caracteres no deseados
    var cleanInput = inputCreateStatus.replace(/[^A-Za-z]/g, "");

    // Limpia el campo de entrada con el valor limpio
    document.getElementById("inputCreateStatus").value = cleanInput;
  } else {
    // Si el valor no es válido, puedes mostrar un mensaje de error o tomar alguna otra acción
    alert("El campo debe contener solo letras.");
  }
  console.trace(inputCreateStatus);
  agregarTipoEstado({ tipoEstado: cleanInput });
});

/**
 * Funcion para ingresar un nuevo tipo de estado.
 * @param  object <- el objeto contiene le informacion del tipo de estado
 * @return {void} <- la funcion solo muestra una alerta informativa(error,ingresado)
 */

function agregarTipoEstado({ tipoEstado }) {
  const estado = {
    tipoEstado,
  };
  axios
    .post(url + "/tipoEstado/ingresar", estado)
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
