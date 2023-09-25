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

        agregarModal(empleado.email);
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

function agregarModal(email) {
  const modalHtml = `
      <div
        x-show="isModalOpen"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      >
        <!-- Modal -->
        <div
          x-show="isModalOpen"
          x-transition:enter="transition ease-out duration-150"
          x-transition:enter-start="opacity-0 transform translate-y-1/2"
          x-transition:enter-end="opacity-100"
          x-transition:leave="transition ease-in duration-150"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0  transform translate-y-1/2"
          @click.away="closeModal"
          @keydown.escape="closeModal"
          class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
          role="dialog"
          id="modal"
        >
          <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
          <header class="flex justify-end">
            <button
              class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
              aria-label="close"
              @click="closeModal"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          <!-- Modal body -->
          <div class="mt-4 mb-6">
            <!-- Modal title -->
            <p
              class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Destinatario
            </p>
            <!-- Modal description -->
            <label class="block text-sm">
              <input
              id="destino"
                disabled
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                value = ${email}
              />
            </label>
          </div>
          <footer
            class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
          >
            <button
              @click="closeModal"
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
            <button
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Accept
            </button>
          </footer>
        </div>
      </div>
    `;

  // Obtén el elemento con id "modal"
  const modalElement = document.getElementById("modal-f");

  // Inserta el contenido HTML en el elemento
  modalElement.innerHTML = modalHtml;

  const destino = document.getElementById("destino").value;
  console.log(destino);
}

{
  /* <a 
//           href="mailto:${empleado.email}?subject=Solicitud de permiso&body=Contenido del correo"
//           class="enviar-icono" title="Enviar">
//           <svg
//           class="w-5 h-5"
//           aria-hidden="true"
//           fill="none"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
//           ></path>
//         </svg>
//           </a> <div>
              <button
              id="abrir-${empleado.id_empleado}"
                @click="openModal"
                class="open-form-button px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                data-email="${empleado.email}"
                >
                Abrir formulario
              </button>
            </div>
          */
}
