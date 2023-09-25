const url = "http://localhost:8080/api";
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

/////////////////////////////////////////////////////////////////////////////////////
// const url = "http://localhost:8080/api";
// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("email-input").value;
//   const contra = document.getElementById("pass").value;
//   const objeto = {
//     email : email,
//     contrasena : contra
//   }
//   console.log(objeto)
//   // Realizar una solicitud POST a la API para iniciar sesión utilizando Axios
//   axios.post(url+"/empleado/login", objeto)
//       .then(response => {
//           if (response.status === 200) {
//               // Si la respuesta es exitosa, obtenemos el token y el objeto Empleado.
//               console.log(response)
//               const token = response.headers.authorization;
//               const empleado = response.data;

//               // Aquí puedes hacer lo que necesites con el token y el objeto Empleado.
//               console.log("Token JWT:", token);
//               console.log("Empleado:", empleado);
//               //document.getElementById("result").innerHTML = "Inicio de sesión exitoso.";
//           }
//       })
//       .catch(error => {
//           console.error("Error:", error.response.data);
//           //document.getElementById("result").innerHTML = "Error al iniciar sesión: " + error.response.data;
//       });
// });
//////////////////////////////////////////////////////////////////////////////////////////
// const btnlogin = document.getElementById("btnlogin");
// btnlogin.addEventListener("click", validar);

// function validar() {
//   // Realizar la solicitud de inicio de sesión utilizando Axios
//   // Obtener los valores del formulario
//   const username = document.getElementById("email-input").value;
//   const password = document.getElementById("pass").value;
//   try {
//     // Realizar una solicitud a la API para obtener los detalles del empleado
//     axios
//       .get(url + `/empleado/login`)
//       .then(function (response) {

//         const empleado = response.data;
//         let encontrado = false; // Variable para realizar un seguimiento de si se encontró una coincidencia

//         empleado.forEach(function (empleado) {
//           console.log("ingresado: " + username);
//           console.log("api: " + empleado.email);
//           if (username == empleado.email && password == empleado.contrasena) {
//             if (empleado.rol === 1) {
//               encontrado = true;
//               Swal.fire({
//                 icon: "success",
//                 title: "Inicio de sesión exitoso",
//                 text: "¡Bienvenido!",
//                 showCancelButton: false,
//                 confirmButtonText: "OK",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   window.location.href =
//                     "../index-employee.html?id=" + empleado.id_empleado;
//                 }
//               });
//             } else {
//               encontrado = true;
//               Swal.fire({
//                 icon: "success",
//                 title: "Inicio de sesión exitoso",
//                 text: "¡Bienvenido!",
//                 showCancelButton: false,
//                 confirmButtonText: "OK",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   window.location.href =
//                     "../index.html?id=" + empleado.id_empleado;
//                 }
//               });
//             }

//             return; // Detener la iteración aquí
//           }
//         });

//         // Verificar si se encontró una coincidencia
//         if (!encontrado) {
//           Swal.fire({
//             icon: "error",
//             title: "Error al enviar los datos",
//             text: "Tus credenciales son inválidas.",
//           });
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } catch (error) {
//     // Manejar el error de inicio de sesión
//     console.error("Error de inicio de sesión:", error);
//     // Mostrar un mensaje de error al usuario, por ejemplo:
//     // const errorMessage = document.getElementById('errorMessage');
//     // errorMessage.textContent = 'Credenciales inválidas';
//   }
// }
