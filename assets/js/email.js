import { verificarToken } from "./ruter.js";
verificarToken();
const url = "http://localhost:8080/api";
let valorInput;
function obtenerEmpleados() {
  axios
    .get(url + "/empleados/admin")
    .then(function (response) {
      let rolEmpleado = "";
      const empleados = response.data;
      const tablaEmpleados = document.getElementById("tabla-admin");

      const data = empleados.map((empleado) => {
        if (empleado.rol === 2) {
          rolEmpleado = "Administrador";
        }

        
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
          estado: `${
            empleado.estado === null
              ? "---"
              : empleado.estado.tipoEstado.tipoEstado
          }`,
          acciones: `
          <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=${
            empleado.email
          }&subject=${encodeURIComponent(
            "Solicitud de permiso"
          )}&body=${encodeURIComponent(`Estimado/@ ${empleado.nombre}${empleado.apellido}, Espero que se encuentre bien. Me dirijo a usted para solicitar un permiso en el trabajo debido a [indica la razón específica de tu solicitud, (como una cita médica, asuntos familiares, un evento importante, etc.) La fecha y hora para la que necesito el permiso son las siguientes: Fecha: [Fecha] Hora de inicio: [Hora de inicio] Hora de finalización: [Hora de finalización] Estoy comprometido/a a garantizar una transición sin problemas durante mi ausencia. He tomado las medidas necesarias para asegurarme de que mis responsabilidades sean atendidas en mi ausencia, con la delegación de tareas y la planificación anticipada. ya proporcione capacitación y instrucciones adicionales a un compañero de equipo para garantizar que las operaciones continúen sin interrupciones. Entiendo la importancia de la comunicación y estaré disponible por correo electrónico o teléfono en caso de que surja alguna emergencia o se requiera mi consulta durante mi ausencia. Aprecio su consideración de mi solicitud y estoy comprometido/a a seguir las políticas y procedimientos de la empresa durante este período. Por favor, hágamelo saber si necesita información adicional. Gracias por su comprensión y apoyo. Atentamente [Tu nombre] [Tu puesto] [Tu número de contacto]`)}"
          class="enviar-icono" title="Enviar">
          <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          ></path>
        </svg>
          </a>
          
          
        `,
          email: empleado.email, // Agregamos el email del empleado
        };
      });

      const columnas = [
        { title: "Empleado" },
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
obtenerEmpleados();


