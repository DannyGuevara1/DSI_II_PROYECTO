import { verificarToken } from "./ruter.js";

verificarToken();
axios
  .get("http://localhost:8080/api/empleados/cantidad")
  .then(function (response) {
    const cantidadEmpleados = document.getElementById("cantidadEmpleados");
    cantidadEmpleados.innerText = response.data;
  });
document
  .getElementById("btnCreateEmployee")
  .addEventListener("click", function () {
    // Agregar clase 'sending' al botón para activar la animación
    this.classList.add("sending");

    // Simular una demora antes de redireccionar
    setTimeout(function () {
      // Redireccionar a otra página dentro del proyecto
      window.location.href = "../pages/create-employee.html";
    }, 520); // 500 ms = 0.5 segundos (tiempo de duración de la animación)
  });

document.addEventListener("DOMContentLoaded", function () {
  axios.get("http://localhost:8080/api/historiales").then(function (response) {
    console.log(response.data);
    /**
     * Array of event objects for the calendar.
     * @typedef {Object} EventObject
     * @property {string} title - The name of the employee associated with the event.
     * @property {string} start - The start date and time of the event.
     * @property {string} end - The end date and time of the event.
     * @property {string} color - The color of the event on the calendar.
     */

    /**
     * Array of event objects for the calendar.
     * @type {EventObject[]}
     */
    let eventsResponse = response.data.map(function (historial) {
      let color = "";
      if (historial.estado.tipoEstado.tipoEstado === "Vacaciones") {
        color = "green";
      }
      return {
        title: historial.empleado.nombre + " " + historial.empleado.apellido,
        start: historial.estado.fecha_inicio,
        end: historial.estado.fecha_final,
        color: color,
      };
    });
    
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      eventClick: function (info) {
        var eventObj = info.event;

        if (eventObj.url) {
          alert(
            "Clicked " +
              eventObj.title +
              ".\n" +
              "Will open " +
              eventObj.url +
              " in a new tab"
          );

          window.open(eventObj.url);

          info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
        } else {
          
          Swal.fire({
            title: eventObj.title,
            icon: "info",
            html: `<h2><b>Fecha de inicio:</b> ${eventObj.startStr}</h2> <br/>
                  <h2><b>Fecha de final:</b> ${eventObj.endStr === "" ? eventObj.startStr: eventObj.endStr}</h2>`,
            showCloseButton: true,
            showCancelButton: false,
          });
        }
      },
      events: eventsResponse,
    });
    calendar.render();
  });
});
