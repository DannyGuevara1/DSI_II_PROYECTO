export function verificarToken() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  // Si no hay token, redirigir a la página de login
  if (token === null) {
    window.location.href = "../pages/login.html";
    return; // Asegúrate de salir de la función para evitar ejecución adicional
  }

  // Si el rol es 1, permitir acceso solo a ciertas páginas
  if (rol === "1") {
    const allowedPages = ["index-employee.html", "email.html"]; // Lista de páginas permitidas

    // Obtener la página actual
    const currentPage = window.location.pathname.split("/").pop();

    // Si la página actual no está en la lista de páginas permitidas, redirigir a una página de acceso no permitido
    if (!allowedPages.includes(currentPage)) {
      window.location.href = "../pages/401.html";
    }
  }else if  (rol === "2") {
    const allowedPagesAdmin = [
      "index.html", 
      "create-employee.html",
      "attendance.html",
      "form-employee.html",
      "employee.html",
      "status.html",
      "user.html",
      "history.html",
      "edit-employee.html"]; // Lista de páginas permitidas

    // Obtener la página actual
    const currentPage = window.location.pathname.split("/").pop();

    // Si la página actual no está en la lista de páginas permitidas, redirigir a una página de acceso no permitido
    if (!allowedPagesAdmin.includes(currentPage)) {
      window.location.href = "../pages/401.html";
    }
  }
}

