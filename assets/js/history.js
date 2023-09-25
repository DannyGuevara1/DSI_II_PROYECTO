import { verificarToken } from "./ruter.js";
verificarToken()
// Obtener el ID del empleado de la URL
const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("id");
const url = "http://localhost:8080/api";
/**
 * Función para manejar la petciones de historial por empleado
 * @param {Ninguno}   
 * @return {nada} 
 */
function obtenerEmpleados() {
  axios
    .get(url + `/historial/empleado/${empleadoId}`)
    .then(function (response) {
      let rolEmpleado = "";
      const empleados = response.data;
      console.log(empleados);
      const tablaEmpleados = document.getElementById("tabla-historial");

      const data = empleados.map(empleado => {
        console.log(empleado)
        if (empleado.empleado.rol === 2) {
            rolEmpleado = "Administrador";
        } else {
            rolEmpleado = "Empleado";
        }


        return {
          html: `
            <div class="flex items-center text-sm">
              <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" class="object-cover w-8 h-8 rounded-full" loading="lazy">
              <div class="ml-3">
                <p class="font-semibold dark:text-white">${empleado.empleado.nombre} ${empleado.empleado.apellido}</p>
                <p class="text-gray-600 dark:text-gray-400">${rolEmpleado}</p>
              </div>
            </div>
          `,
          estado: `${
            empleado.estado === null ? '---' : empleado.estado.tipoEstado.tipoEstado
          }`,
          fecha: empleado.marca_tiempo,
          id: empleado.id_empleado // Agregamos el ID del empleado
        };
      });

      const columnas = [
        { title: "Empleado" },
        { title: "Estado" },
        { title: "Fecha" }
      ];

      const tabla = $('#myTableHistory').DataTable({
        data: data.map(item => Object.values(item)),
        columns: columnas,
        "pagingType": "simple_numbers",
        "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "Todos"]],
        "language": {
          "lengthMenu": "Mostrar _MENU_ registros por página",
          "zeroRecords": "No se encontraron registros",
          "info": "Mostrando página _PAGE_ de _PAGES_",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "search": "Buscar:",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },
        "rowCallback": function(row, data) {
          $(row).addClass('text-gray-700 dark:text-gray-400');
        },
        "createdRow": function (row, data, dataIndex) {
          const cells = $(row).find('td');
          $(cells[0]).addClass('clase-td-0');
          $(cells[1]).addClass('text-sm');
        }
      });

      $('#myTableHistory_wrapper').addClass('bg-white dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400');

      

    })
    .catch(function (error) {
      console.log(error);
    });
}
obtenerEmpleados();