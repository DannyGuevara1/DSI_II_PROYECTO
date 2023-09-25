const url = "http://localhost:8080/api";
/**
 * Función para manejar la peticiones y creacion de variables locales del navegador
 * como token
 * @param {Ninguno}   
 * @return {nada} 
 */
$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    const email = $("#email-input").val();
    const contra = $("#pass").val();
    const objeto = {
      email: email,
      contrasena: contra,
    };

    $.ajax({
      type: "POST",
      url: url + "/empleado/login",
      data: JSON.stringify(objeto),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          // Si la respuesta es exitosa, obtenemos el token del encabezado "Authorization".
          const token = data.headers["Authorization"][0];
          const empleado = data.empleado;
          localStorage.setItem("token", token);
          localStorage.setItem("id", empleado.id_empleado);
          localStorage.setItem("rol",empleado.rol);
          if (empleado.rol === 1) {
            encontrado = true;
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              text: "¡Bienvenido!",
              showCancelButton: false,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../index-employee.html";
              }
            });
          } else {
            encontrado = true;
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              text: "¡Bienvenido!",
              showCancelButton: false,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../index.html";
              }
            });
          }

          // Aquí puedes hacer lo que necesites con el token y el objeto Empleado.
          console.log("Token JWT:", token);
          console.log("Empleado:", empleado.rol);
          // $("#result").html("Inicio de sesión exitoso.");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", jqXHR.responseJSON);
        // $("#result").html("Error al iniciar sesión: " + jqXHR.responseJSON.message);
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Tus credenciales son inválidas.",
        });
      },
    });
  });
});