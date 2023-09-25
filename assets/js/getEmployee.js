import { verificarToken } from "./ruter.js";
verificarToken()
const url = "http://localhost:8080/api";

/**
 * Función para manejar la petciones de empleados 
 * @param {Ninguno}   
 * @return {nada} 
 */
function obtenerEmpleados() {
  axios
    .get(url + "/empleados/todos")
    .then(function (response) {
      let rolEmpleado = "";
      const empleados = response.data;
      const tablaEmpleados = document.getElementById("tabla-empleados");

      const data = empleados.map(empleado => {
        if (empleado.rol === 2) {
            rolEmpleado = "Administrador";
        } else {
            rolEmpleado = "Empleado";
        }

        const fecha = new Date(empleado.fechaContratacion);
        const fechaFormateada = fecha.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        return {
          html: `
            <div class="flex items-center text-sm">
              <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" class="object-cover w-8 h-8 rounded-full" loading="lazy">
              <div class="ml-3">
                <p class="font-semibold dark:text-white">${empleado.nombre} ${empleado.apellido}</p>
                <p class="text-gray-600 dark:text-gray-400">${rolEmpleado}</p>
              </div>
            </div>
          `,
          salario: `$ ${empleado.salarioBase}`,
          estado: `${
            empleado.estado === null ? '---' : empleado.estado.tipoEstado.tipoEstado
          }`,
          fecha: fechaFormateada,
          id: empleado.id_empleado // Agregamos el ID del empleado
        };
      });

      const columnas = [
        { title: "Empleado" },
        { title: "Salario" },
        { title: "Estado" },
        { title: "Fecha de Contratación" }
      ];

      const tabla = $('#myTable').DataTable({
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
          $(cells[1]).addClass('px-4 py-3 text-sm');
        }
      });

      $('#myTable_wrapper').addClass('bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400');

      // Agregar evento de clic a la fila
      /**
     * Función para agregar evento click a cada item de la tabla 
     * @param {data} -> datos del objeto dataTable 
     * @return {nada} 
     */
      function agregarEventoClic(data) {
        $('#myTable tbody').on('click', 'tr', function () {
          const rowData = data[tabla.row(this).index()];
          const idEmpleado = rowData.id;
          window.location.href = '../pages/user.html?id=' + idEmpleado;
        });
      }

      // Llamar a la función para agregar el evento de clic
      agregarEventoClic(data);

    })
    .catch(function (error) {
      console.log(error);
    });
}

// Llamar a la función para obtener empleados
obtenerEmpleados();




//
document
  .getElementById("btnCreateStatus")
  .addEventListener("click", function () {
    // Agregar clase 'sending' al botón para activar la animación
    this.classList.add("sending");

    // Simular una demora antes de redireccionar
    setTimeout(function () {
      // Redireccionar a otra página dentro del proyecto
      window.location.href = "../pages/create-status.html";
    }, 520); // 500 ms = 0.5 segundos (tiempo de duración de la animación)
  });