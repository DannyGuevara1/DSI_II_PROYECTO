import { verificarToken } from "./ruter.js"

verificarToken()
const url = "http://localhost:8080/api";
function obtenerEmpleados() {
  axios
    .get(url + "/empleados/todos")
    .then(function (response) {
      let rolEmpleado = "";
      const empleados = response.data;

      empleados.forEach(function (empleado) {
        // Crear el elemento <tr> con la clase "text-gray-700 dark:text-gray-400"
        const tr = document.createElement("tr");
        tr.classList.add("text-gray-700", "dark:text-gray-400");

        // Crear la primera columna <td> con la clase "px-4 py-3"
        const td1 = document.createElement("td");
        td1.classList.add("px-4", "py-3");

        // Crear el contenedor <div> con la clase "flex items-center text-sm"
        const div1 = document.createElement("div");
        div1.classList.add("flex", "items-center", "text-sm");

        // Crear el contenedor <div> con la clase "relative hidden w-8 h-8 mr-3 rounded-full md:block"
        const div2 = document.createElement("div");
        div2.classList.add(
          "relative",
          "hidden",
          "w-8",
          "h-8",
          "mr-3",
          "rounded-full",
          "md:block"
        );

        // Crear la imagen <img> con la clase "object-cover w-full h-full rounded-full" y el atributo src
        const img = document.createElement("img");
        img.classList.add("object-cover", "w-full", "h-full", "rounded-full");
        img.src =
          "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ";
        img.alt = "";
        img.loading = "lazy";

        // Crear el contenedor <div> con la clase "absolute inset-0 rounded-full shadow-inner"
        const div3 = document.createElement("div");
        div3.classList.add(
          "absolute",
          "inset-0",
          "rounded-full",
          "shadow-inner"
        );
        div3.setAttribute("aria-hidden", "true");

        // Añadir la imagen y el contenedor a div2
        div2.appendChild(img);
        div2.appendChild(div3);

        // Crear el segundo contenedor <div>
        const div4 = document.createElement("div");

        // Crear el párrafo <p> con la clase "font-semibold"
        const p1 = document.createElement("p");
        p1.classList.add("font-semibold");
        p1.textContent = empleado.nombre;

        // Crear el segundo párrafo <p> con la clase "text-xs text-gray-600 dark:text-gray-400"
        const p2 = document.createElement("p");
        p2.classList.add("text-xs", "text-gray-600", "dark:text-gray-400");
        if (empleado.rol === 2) {
          rolEmpleado = "Administrador";
        } else {
          rolEmpleado = "Empleado";
        }
        p2.textContent = rolEmpleado;

        // Añadir los párrafos al segundo contenedor <div>
        div4.appendChild(p1);
        div4.appendChild(p2);

        // Añadir los elementos creados al primer contenedor <div>
        div1.appendChild(div2);
        div1.appendChild(div4);

        // Añadir el primer contenedor <div> a la primera columna <td>
        td1.appendChild(div1);

        // Crear la segunda columna <td> con la clase "px-4 py-3" y contenido "$ 863.45"
        const td2 = document.createElement("td");
        td2.classList.add("px-4", "py-3");
        td2.textContent = "$ " + empleado.salarioBase;

        // Crear la tercera columna <td> con la clase "px-4 py-3 text-xs"
        const td3 = document.createElement("td");
        td3.classList.add("px-4", "py-3", "text-xs");

        // Crear el elemento <span> con la clase "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" y contenido "Approved"
        const span = document.createElement("span");
        span.classList.add(
          "px-2",
          "py-1",
          "font-semibold",
          "leading-tight",
          "text-green-700",
          "bg-green-100",
          "rounded-full",
          "dark:bg-green-700",
          "dark:text-green-100"
        );
        if(empleado.estado === null){
            span.textContent = "-";
        }else{
            span.textContent = empleado.estado.tipo;
        }
        

        // Añadir el elemento <span> a la tercera columna <td>
        td3.appendChild(span);

        // Crear la cuarta columna <td> con la clase "px-4 py-3 text-sm" y contenido "6/10/2020"
        const td4 = document.createElement("td");
        td4.classList.add("px-4", "py-3", "text-sm");
        const fecha = new Date(empleado.fechaContratacion);
        const fechaFormateada = fecha.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        td4.textContent = fechaFormateada;

        // Crear la quinta columna <td> con la clase "px-4 py-3"
        const td5 = document.createElement("td");
        td5.classList.add("px-4", "py-3");

        // Crear el contenedor <div> con la clase "flex items-center space-x-4 text-sm"
        const div5 = document.createElement("div");
        div5.classList.add("flex", "items-center", "space-x-4", "text-sm");

        // Crear el primer botón <button> con la clase "flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400" y el atributo aria-label
        const button1 = document.createElement("button");
        button1.classList.add(
          "flex",
          "items-center",
          "justify-between",
          "px-2",
          "py-2",
          "text-sm",
          "font-medium",
          "leading-5",
          "text-purple-600",
          "rounded-lg",
          "dark:text-gray-400"
        );
        button1.setAttribute("aria-label", "Edit");
        // Capturar evento de clic en la fila
        button1.addEventListener('click', function () {
          const empleadoId = empleado.id_empleado;
          // Redirigir a otra página con el ID del empleado en la URL
          window.location.href = '../pages/edit-employee.html?id=' + empleadoId;
        });
        // Crear el icono SVG para el botón de edición
        const svg1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg1.classList.add("w-5", "h-5");
        svg1.setAttribute("aria-hidden", "true");
        svg1.setAttribute("fill", "currentColor");
        svg1.setAttribute("viewBox", "0 0 20 20");

        // Crear el path del icono SVG para el botón de edición
        const path1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path1.setAttribute(
          "d",
          "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
        );

        // Añadir el path al SVG del botón de edición
        svg1.appendChild(path1);

        // Añadir el SVG al botón de edición
        button1.appendChild(svg1);

        // Crear el segundo botón <button> con la clase "flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400" y el atributo aria-label
        const button2 = document.createElement("button");
        button2.classList.add(
          "flex",
          "items-center",
          "justify-between",
          "px-2",
          "py-2",
          "text-sm",
          "font-medium",
          "leading-5",
          "text-purple-600",
          "rounded-lg",
          "dark:text-gray-400"
        );
        button2.setAttribute("id", empleado.id_empleado);
        button2.setAttribute("aria-label", "Delete");

        // Crear el icono SVG para el botón de eliminación
        const svg2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg2.classList.add("w-5", "h-5");
        svg2.setAttribute("aria-hidden", "true");
        svg2.setAttribute("fill", "currentColor");
        svg2.setAttribute("viewBox", "0 0 20 20");

        // Crear el path del icono SVG para el botón de eliminación
        const path2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path2.setAttribute("fill-rule", "evenodd");
        path2.setAttribute(
          "d",
          "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        );
        path2.setAttribute("clip-rule", "evenodd");

        // Añadir el path al SVG del botón de eliminación
        svg2.appendChild(path2);

        // Añadir el SVG al botón de eliminación
        button2.appendChild(svg2);

        // Añadir los botones al contenedor <div>
        div5.appendChild(button1);
        div5.appendChild(button2);

        // Añadir el contenedor <div> a la quinta columna <td>
        td5.appendChild(div5);

        // Añadir las columnas <td> a la fila <tr>
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        // Agregar el evento click al botón de eliminación
        button2.addEventListener("click", handleDelete);

        // Agregar la fila <tr> a la tabla o a otro elemento HTML según sea necesario
        // Por ejemplo, si tienes una tabla con el ID "my-table", puedes hacer lo siguiente:
        const table = document.getElementById("tabla-empleados");
        table.appendChild(tr);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
obtenerEmpleados();
// Función para manejar el evento de eliminación
function handleDelete() {
  // Obtener la fila padre del botón de eliminación
  const row = this.closest("tr");
  const empleadoId = this.id;
  // Mostrar la alerta de confirmación antes de eliminar al empleado
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará al empleado de forma permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Realizar la solicitud de eliminación del empleado
      axios
        .delete(url+`/empleado/eliminar/${empleadoId}`)
        .then((response) => {
          // Eliminar la fila de la tabla
          row.remove();
          Swal.fire(
            "Empleado eliminado",
            "El empleado ha sido eliminado exitosamente.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error al eliminar el empleado", error);
          Swal.fire(
            "Error",
            "Ocurrió un error al eliminar al empleado.",
            "error"
          );
        });
    }
  });
}

