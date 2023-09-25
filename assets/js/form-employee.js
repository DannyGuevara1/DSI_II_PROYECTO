import { verificarToken } from "./ruter.js";
verificarToken();

const btnGenerar = document.getElementById("btnGenerar");
btnGenerar.addEventListener("click", function () {
  axios
    .get("http://localhost:8080/api/empleados/todos")
    .then(function (response) {
      const empleados = response.data;

      // Obtener la fecha actual
      const fechaActual = new Date().toLocaleDateString("es-ES");
      const options = {
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }  // Configuración de orientación
      };
      // Crear el contenido HTML para la planilla
      let htmlContent = `
        <h1 class="text-2xl font-bold mb-4">Planilla de Empleados - ${fechaActual}</h1>
        <table class="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="bg-gray-200 border-b p-2">Nombre</th>
              <th class="bg-gray-200 border-b p-2">Apellido</th>
              <th class="bg-gray-200 border-b p-2">Nit</th>
              <th class="bg-gray-200 border-b p-2">Sub total</th>
              <th class="bg-gray-200 border-b p-2">Isss</th>
              <th class="bg-gray-200 border-b p-2">Afp</th>
              <th class="bg-gray-200 border-b p-2">Renta</th>
              <th class="bg-gray-200 border-b p-2">Liquido a pagar</th>
              <th class="bg-gray-200 border-b p-2">Email</th>
              <th class="bg-gray-200 border-b p-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
      `;

      empleados.forEach(function (empleado) {
        let liquido = `${empleado.salarioBase} - ${empleado.montoIsss} - ${empleado.montoAfp} - ${empleado.renta}`;
        let liquidoV = eval(liquido).toFixed(2);
        htmlContent += `
            <tr>
              <td class="border-b p-2">${empleado.nombre}</td>
              <td class="border-b p-2">${empleado.apellido}</td>
              <td class="border-b p-2">${empleado.nit}</td>
              <td class="border-b p-2">${empleado.salarioBase}</td>
              <td class="border-b p-2">${empleado.montoIsss}</td>
              <td class="border-b p-2">${empleado.montoAfp}</td>
              <td class="border-b p-2">${empleado.renta}</td>
              <td class="border-b p-2">${liquidoV}</td>
              <td class="border-b p-2">${empleado.email}</td>
              <td class="border-b p-2">${empleado.telefono}</td>
            </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
      `;

      // Convertir el contenido HTML a PDF
      const pdfName = `Planilla_${fechaActual}.pdf`;
      html2pdf().set(options).from(htmlContent).save(pdfName);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function obtenerEmpleados() {
  axios
    .get("http://localhost:8080/api/empleados/todos")
    .then(function (response) {
      let rolEmpleado = "";
      const empleados = response.data;
      const tablaEmpleados = document.getElementById("tabla-admin");

      const data = empleados.map((empleado) => {
        if (empleado.rol === 2) {
          rolEmpleado = "Administrador";
        } else {
          rolEmpleado = "Empleado";
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
          <div>
            <button
              id="btnGenerar${empleado.id_empleado}"
              class="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Generar pdf
            </button>
          </div>
        `,
          empleado: empleado, // Agregamos el email del empleado
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

      // Asociar evento click a los botones "Generar PDF"
      data.forEach((empleado) => {
        const boton = document.getElementById(
          `btnGenerar${empleado.empleado.id_empleado}`
        );
        console.log(empleado);
        boton.addEventListener("click", () => generarpdf(empleado.empleado));
      });

      $("#myTable_wrapper").addClass(
        "bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Lógica para generar el PDF con el ID del empleado
function generarpdf(empleado) {
  console.log("Generar PDF para el empleado con ID:", empleado.id_empleado);
  const fechaActual = new Date().toLocaleDateString("es-ES");
  const options = {
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }  // Configuración de orientación
  };
  let liquido = `${empleado.salarioBase} - ${empleado.montoIsss} - ${empleado.montoAfp} - ${empleado.renta}`;
  let salarioLiquido = eval(liquido).toFixed(2);
  let htmlContent = `
          <h1 class="text-2xl font-bold mb-4">Planilla de ${empleado.nombre} ${empleado.apellido} - ${fechaActual}</h1>
          <table class="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th class="bg-gray-200 border-b p-2">Nombre</th>
                <th class="bg-gray-200 border-b p-2">Apellido</th>
                <th class="bg-gray-200 border-b p-2">Nit</th>
                <th class="bg-gray-200 border-b p-2">Sub total</th>
                <th class="bg-gray-200 border-b p-2">Isss</th>
                <th class="bg-gray-200 border-b p-2">Afp</th>
                <th class="bg-gray-200 border-b p-2">RENTA</th>
                <th class="bg-gray-200 border-b p-2">Liquido a pagar</th>
                <th class="bg-gray-200 border-b p-2">Email</th>
                <th class="bg-gray-200 border-b p-2">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b p-2">${empleado.nombre}</td>
                <td class="border-b p-2">${empleado.apellido}</td>
                <td class="border-b p-2">${empleado.nit}</td>
                <td class="border-b p-2">${empleado.salarioBase}</td>
                <td class="border-b p-2">${empleado.montoIsss}</td>
                <td class="border-b p-2">${empleado.montoAfp}</td>
                <td class="border-b p-2">${empleado.renta}</td>
                <td class="border-b p-2">${salarioLiquido}</td>
                <td class="border-b p-2">${empleado.email}</td>
                <td class="border-b p-2">${empleado.telefono}</td>
              </tr>
            </tbody>
          </table>
        `;

  // Convertir el contenido HTML a PDF
  const pdfName = `Planilla_${empleado.nombre}_${empleado.apellido}_${fechaActual}.pdf`;
  html2pdf().set(options).from(htmlContent).save(pdfName);
}

document.addEventListener("DOMContentLoaded", function () {
  // Llamar a la función para obtener empleados
  obtenerEmpleados();
});
