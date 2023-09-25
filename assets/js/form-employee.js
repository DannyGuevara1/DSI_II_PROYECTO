import { verificarToken } from "./ruter.js";
verificarToken()
const btnGenerar = document.getElementById("btnGenerar");
btnGenerar.addEventListener("click", function () {
  axios
    .get("http://localhost:8080/api/empleados/todos")
    .then(function (response) {
      const empleados = response.data;

      // Obtener la fecha actual
      const fechaActual = new Date().toLocaleDateString("es-ES");

      // Crear el contenido HTML para la planilla
      let htmlContent = `
        <h1 class="text-2xl font-bold mb-4">Planilla de Empleados - ${fechaActual}</h1>
        <table class="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="bg-gray-200 border-b p-2">Nombre</th>
              <th class="bg-gray-200 border-b p-2">Nit</th>
              <th class="bg-gray-200 border-b p-2">Sub total</th>
              <th class="bg-gray-200 border-b p-2">Isss</th>
              <th class="bg-gray-200 border-b p-2">Afp</th>
              <th class="bg-gray-200 border-b p-2">Liquido a pagar</th>
              <th class="bg-gray-200 border-b p-2">Email</th>
              <th class="bg-gray-200 border-b p-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
      `;
        
      empleados.forEach(function (empleado) {
        let liquido = `${empleado.salarioBase} - ${empleado.montoIsss} - ${empleado.montoAfp}`
        let liquidoV = eval(liquido)
        htmlContent += `
            <tr>
              <td class="border-b p-2">${empleado.nombre}</td>
              <td class="border-b p-2">${empleado.nit}</td>
              <td class="border-b p-2">${empleado.salarioBase}</td>
              <td class="border-b p-2">${empleado.montoIsss}</td>
              <td class="border-b p-2">${empleado.montoAfp}</td>
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
      html2pdf().from(htmlContent).save(pdfName);
    })
    .catch(function (error) {
      console.log(error);
    });
});
