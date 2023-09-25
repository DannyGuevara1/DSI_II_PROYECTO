import { verificarToken } from "./ruter.js";
verificarToken();
// Obtener el ID del empleado de la URL
const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("id");
let horaActual = 0;
let estado = "";
/**
 * Función para actulizar la hora constantemente
 * @param {ninguno}   
 * @return {nada} 
 */
function actualizarHora() {
  const inputHoraEntrada = document.getElementById("horaEntrada");
  const inputHoraSalida = document.getElementById("horaSalida");
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  const horaFormateada = `${hora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  inputHoraEntrada.value = horaFormateada;
  inputHoraSalida.value = horaFormateada;
}

// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);
/**
 * Función para ingresar la hora de entrada 
 * @param {empleadoId}   
 * @return {nada} 
 */
function ingresarHoraEntrada(empleadoId) {
  const fecha = new Date().toISOString().split("T")[0];
  const hora = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let estado = 0;
  const horaLimite = 7;
  const minutos = 0;

  const horaLimiteFormateada = `${horaLimite
    .toString()
    .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  if (hora > horaLimiteFormateada) {
    estado = 2;
  } else {
    estado = 1;
  }
  const asistencia = {
    fecha: fecha,
    horaEntrada: hora,
    horaSalida: hora,
    estado: estado,
    empleado: {
      id_empleado: empleadoId,
    },
  };

  axios
    .post("http://localhost:8080/api/asistencia/ingresar", asistencia)
    .then((response) => {
      console.log("Hora de entrada registrada correctamente");
      // Manejar la respuesta del servidor si es necesario
      Swal.fire({
        icon: "success",
        title: "¡Hora de entrada registrada correctamente!",
        text: "La hora de entrada se registró con éxito.",
      });
    })
    .catch((error) => {
      console.error("Error al registrar la hora de entrada:", error);
      // Manejar el error si es necesario
    });
}
/**
 * Función asincrona para obtener el id de la asistencia mas reciente  
 * @param {empleadoId}   
 * @return {nada} 
 */
async function obtenerIdAsistenciaMasReciente(empleadoId) {
  try {
    const response = await axios.get(
       `http://localhost:8080/api/asistencia/${empleadoId}/asistencia-recente`
    );
    console.log(response.data);
    return response.data.id;
  } catch (error) {
    console.error(error);
    // Manejo de errores
    throw error; // Puedes lanzar el error o retornar un valor predeterminado, según tus necesidades
  }
}

/**
 * Función para obtener el valor del estado
 * @param {ninguno}   
 * @return {nada} 
 */
async function obteneValorIdEstado() {
  try {
    const resultado = await obtenerIdAsistenciaMasReciente(empleadoId);
    console.log(resultado); // Debería imprimir el id
    actualizarHoraSalida(resultado);
    return resultado;
    // Realiza cualquier acción adicional con el resultado
  } catch (error) {
    console.error(error);
    // Manejo de errores
  }
}

/**
 * Función para ingresar la hora de salida, del mismo dia de registro 
 * de la hora de entrada
 * @param {asistenciaId}   
 * @return {nada} 
 */
async function actualizarHoraSalida(asistenciaId) {
  try {
    const fecha = new Date().toISOString().split("T")[0];
    const hora = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const empleadoResponse = await axios.get(`http://localhost:8080/api/asistencia/${asistenciaId}`);
    const asistencia = empleadoResponse.data;

    console.log(asistencia.horaSalida)
    asistencia.horaSalida = hora;
    asistencia.empleado = {
        id_empleado: empleadoId,
    }

    axios
      .put(
        `http://localhost:8080/api/asistencia/${asistenciaId}/actualizar`,
        asistencia
      )
      .then((response) => {
        console.log("Hora de salida actualizada correctamente");
        // Manejar la respuesta del servidor si es necesario
        Swal.fire({
          icon: "success",
          title: "¡Hora de salida actualizada correctamente!",
          text: "La hora de salida se actualizó con éxito.",
        });
      })
      .catch((error) => {
        console.error("Error al actualizar la hora de salida:", error);
        // Manejar el error si es necesario
      });
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
  }
}

// Al hacer clic en el botón de entrada
const btnEntrada = document.getElementById("btnEntrada");
btnEntrada.addEventListener("click", function () {
  ingresarHoraEntrada(empleadoId);
});

// Obtener la hora actual
const horaActualButon = new Date().getHours();
const minutosActual = new Date().getMinutes();

// Comprobar si la hora actual es mayor o igual a las 7:00 am
if (horaActualButon > 6) {
  btnEntrada.disabled = false; // Habilitar el botón

} else {
  btnEntrada.disabled = true; // Deshabilitar el botón
  // Elimina el atributo class del botón
  btnEntrada.removeAttribute("class");

  // Agrega las nuevas clases al botón
  btnEntrada.classList.add(
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "leading-5",
    "text-white",
    "transition-colors",
    "duration-150",
    "bg-purple-600",
    "border",
    "border-transparent",
    "rounded-lg",
    "opacity-50",
    "cursor-not-allowed",
    "focus:outline-none"
  );
}

// Al hacer clic en el botón de salida
const btnSalida = document.getElementById("btnSalida");
btnSalida.addEventListener("click", function () {
  obteneValorIdEstado();
});

// Obtén la fecha y hora actual
const fechaActual = new Date();
const horaActualSalida = fechaActual.getHours();
const minutosActualSalida = fechaActual.getMinutes();

// Define las horas y minutos de inicio y fin para habilitar el botón de salida
const horaInicio = 17; // 5:00 pm
const minutosInicio = 0;
const horaFin = 17; // 5:10 pm
const minutosFin = 10;

// Verifica si la hora actual está dentro del rango permitido para habilitar el botón de salida
// if (
//   horaActualSalida >= horaInicio &&
//   horaActualSalida <= horaFin &&
//   (horaActualSalida !== horaFin || minutosActual <= minutosFin)
// ) {
//   // Habilita el botón de salida
//   btnSalida.disabled = false;
// } else {
//   // Deshabilita el botón de salida
//   btnSalida.disabled = true;
//   // Elimina el atributo class del botón
//   btnSalida.removeAttribute("class");

//   // Agrega las nuevas clases al botón
//   btnSalida.classList.add(
//     "px-4",
//     "py-2",
//     "text-sm",
//     "font-medium",
//     "leading-5",
//     "text-white",
//     "transition-colors",
//     "duration-150",
//     "bg-purple-600",
//     "border",
//     "border-transparent",
//     "rounded-lg",
//     "opacity-50",
//     "cursor-not-allowed",
//     "focus:outline-none"
//   );
// }
