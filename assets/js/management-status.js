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
function actualizarEmpleado(id) {
  alert("id"+ id); 
}
async function  obtenerEmpleados() {
  await axios
    .get(url + "/tiposEstados/todos")
    .then(function (response) {
      let rolEmpleado = "";
      const estados = response.data;
      const tablaEmpleados = document.getElementById("tabla-admin");

      const data = estados.map((estado) => {
        

        
        return {
          estado: `${
            estado.tipoEstado
          }`,
          acciones: `
          <div class="flex items-center space-x-4 text-sm">
            <button id="btn${estado.id_tipoEstado}" onclick="actualizarEmpleado('${estado.id_tipoEstado}')" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400" title="Actualizar">Actualizar</button>
            <button onclick="eliminarEmpleado('${estado.id_tipoEstado}')" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400" title="Eliminar">Eliminar</button>
          </div>
        ` // Agregamos el email del empleado
        };
      });

      const columnas = [
        { title: "Estado" },
        { title: "Acciones" },
      ];

      const tabla = $("#myTable").DataTable({
        data: data.map((item) => Object.values(item)),
        columns: columnas,
        pagingType: "simple_numbers",
        lengthMenu: [
          [5, 10, 25, -1],
          [5, 10, 25, "Todos"],
        ],
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(filtrado de un total de _MAX_ registros)",
          search: "Buscar:",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
        rowCallback: function (row, data) {
          $(row).addClass("text-gray-700 dark:text-gray-400");
        },
        createdRow: function (row, data, dataIndex) {
          const cells = $(row).find("td");
          $(cells[0]).addClass("clase-td-0");
          $(cells[1]).addClass("px-4 py-3 text-sm");
        },
      });

      $("#myTable_wrapper").addClass(
        "bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
      );
      
    })
    .catch(function (error) {
      console.log(error);
    });
}



// Llamar a la función para obtener empleados
obtenerEmpleados()



