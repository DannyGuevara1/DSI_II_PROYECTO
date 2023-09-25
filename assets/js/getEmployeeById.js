import { verificarToken } from "./ruter.js";
verificarToken()

const btnHistorial = document.getElementById("btnHistorial");
btnHistorial.addEventListener("click",function(){
  window.location.href = './history.html?id=' + empleadoId;
})
let estadoSelecionado = 0;
// Obtener el ID del empleado de la URL
const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("id");
const url = "http://localhost:8080/api";

let selectPermisos = document.getElementById("selectPermisos");
let OPCION_POR_DEFECTO = document.createElement("option")
OPCION_POR_DEFECTO.text = "--Selecione una opcion--";
OPCION_POR_DEFECTO.value = 0;
selectPermisos.add(OPCION_POR_DEFECTO);
//Realizar peticion de tipos de estados y agregarlos al select
axios.get(url + "/tiposEstados/todos")
.then(function(reponse){
  const tipoEstado = reponse.data;
 
  tipoEstado.forEach(element => {
    let option = document.createElement("option")
    option.text = element.tipoEstado;
    option.value = element.id_tipoEstado;
    selectPermisos.add(option);
  });
  console.log(tipoEstado)
})
//Se realiza una funcion change para cambiar el valor de la opcion selecionada
selectPermisos.addEventListener("change",function(){
  estadoSelecionado = selectPermisos.value;
  console.log(estadoSelecionado)
})




// Realizar una solicitud a la API para obtener los detalles del empleado
axios
  .get(url + `/empleado/${empleadoId}`)
  .then(function (response) {
    const empleado = response.data;

    // Mostrar los datos del empleado en la página
    const nombreElement = document.getElementById("nombre");
    const puestoElement = document.getElementById("puesto");
    const emailElement = document.getElementById("email");
    
    if(empleado.puesto === 1){
      puestoElement.textContent = "Puesto: Empleado";
    }else{
      puestoElement.textContent = "Puesto: Administrador";
    }
    nombreElement.textContent = empleado.nombre;
    
    emailElement.textContent = empleado.email;
  })
  .catch(function (error) {
    console.log(error);
  });

/**
 * Función asincrona para manejar la peticion de actualizacion del estado del empleado
 * @param {empleadoId, nuevoIdEstado} -> se usa para asignar el nuevo estado al historial    
 * @return {nada} 
 */
async function actualizarIdEstado(empleadoId, nuevoIdEstado) {
  try {
    const empleadoResponse = await axios.post(url + `/asignarEstado/${empleadoId}/${nuevoIdEstado}`);
    const empleado = empleadoResponse.data;

    console.log(empleado)

    // Enviar datos a la tabla de historial
    let dataTime = obtenerFechaHoraFormateada();
    const datosHistorial = {
      empleado: {
        id_empleado: empleadoId
      },
      estado:{
        id_estado: nuevoIdEstado
      },
      marca_tiempo: dataTime
    };

    const respuesta = await enviarDatosHistorial(url, datosHistorial);
    console.log("Datos de historial ingresados");

  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
  }
}
/**
 * Función para formatear la hora actual
 * @param {Ninguno}   
 * @return {nada} 
 */
function obtenerFechaHoraFormateada() {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Añadir 1 porque enero es 0
  const dia = ahora.getDate().toString().padStart(2, '0');
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const segundos = ahora.getSeconds().toString().padStart(2, '0');

  return `${anio}/${mes}/${dia} ${horas}:${minutos}:${segundos}`;
}
/**
 * Función asincrona para manejar la peticion de envios de datos de historial
 * @param {url, datos} 
 * @return {nada} 
 */
async function enviarDatosHistorial(url, datos) {
  try {
    const respuesta = await axios.post(url + `/historial/ingresar`, datos);
    console.log("Datos de historial enviados con éxito:", respuesta.data);
  } catch (error) {
    console.error("Error al enviar datos de historial:", error);
  }
}


/**
 * Función asincrona para manejar la peticion de envios de los datos para ingresar el estado
 * @param {url,id, datos} 
 * @return {nada} 
 */
async function enviarDatos(url,id, datos) {
  try {
    const respuesta = await axios.post(url + `/estado/ingresar/${id}`, datos);
    console.log("Datos enviados con éxito:", respuesta.data);
    actualizarIdEstado(empleadoId,respuesta.data.id_estado);
    Swal.fire({
      icon: "success",
      title: "¡Solicitud enviada correctamente!",
      text: "Los datos se enviaron con éxito.",
    });
  } catch (error) {
    console.error("Error al enviar datos:", error);
    Swal.fire({
      icon: "error",
      title: "Error al enviar los datos",
      text: "Hubo un error al enviar la solicitud.",
    });
  }
}



// Evento click para enviar estado
let btnEnviarEstado = document.getElementById("btnEnviarEstado");
btnEnviarEstado.addEventListener("click", async function () {
  // Recolectar valor del select de permisos
  const selectElement = document.getElementById("selectPermisos");
  const valorSeleccionado = selectElement.value;

  // Variables de fecha permiso
  let inputFechaInicio = document.getElementById("fechaInicio");
  let fechaInicio = inputFechaInicio.value;
  let fechaInicioFormateada;

  let inputFechaFinal = document.getElementById("fechaFinal");
  let fechaFinal = inputFechaFinal.value;
  let fechaFinalFormateada;

  // Validar datos
  let error = false; // Bandera para indicar si se encontraron errores

  if (estadoSelecionado === 0) {
    console.log("Seleccione un permiso");
    error = true;
  }

  if (!fechaInicio) {
    console.log("Fecha de inicio no seleccionada");
    error = true;
  } else {
    let fechaInicioObjeto = new Date(fechaInicio);
    if (isNaN(fechaInicioObjeto.getTime())) {
      console.log("Fecha de inicio inválida");
      error = true;
    } else {
      var diaInicio = fechaInicioObjeto.getDate() + 2;
      var mesInicio = fechaInicioObjeto.getMonth() + 1;
      var anioInicio = fechaInicioObjeto.getFullYear();

      // Agregar ceros iniciales si es necesario
      diaInicio = diaInicio < 10 ? "0" + diaInicio : diaInicio;
      mesInicio = mesInicio < 10 ? "0" + mesInicio : mesInicio;

      fechaInicioFormateada = anioInicio + "-" + mesInicio + "-" + diaInicio;
      
    }
  }

  if (!fechaFinal) {
    console.log("Fecha final no seleccionada");
    error = true;
  } else {
    let fechaFinalObjeto = new Date(fechaFinal);
    if (isNaN(fechaFinalObjeto.getTime())) {
      console.log("Fecha final inválida");
      error = true;
    } else {
      var diaFinal = fechaFinalObjeto.getDate() + 2;
      var mesFinal = fechaFinalObjeto.getMonth() + 1;
      var anioFinal = fechaFinalObjeto.getFullYear();

      // Agregar ceros iniciales si es necesario
      diaFinal = diaFinal < 10 ? "0" + diaFinal : diaFinal;
      mesFinal = mesFinal < 10 ? "0" + mesFinal : mesFinal;

      fechaFinalFormateada = anioFinal + "-" + mesFinal + "-" + diaFinal;
      
    }
  }

  // Enviar la solicitud solo si no se encontraron errores
  if (!error) {
    
    const datos = {
      fecha_inicio: fechaInicioFormateada,
      fecha_final: fechaFinalFormateada,
    };

    try {
      

      enviarDatos(url, estadoSelecionado, datos);
      
    } catch (error) {
      console.error(error);
    }
  } else {
    // Mostrar mensaje de error al usuario
    Swal.fire({
      icon: "error",
      title: "Error en los datos",
      text: "Por favor, complete los campos correctamente.",
    });
  }
});
