import { verificarToken } from "./ruter.js";
verificarToken()
const url = "http://localhost:8080/api/usuario"
// Crear un nuevo usuario
const crearUsuario = async (usuario) => {
  try {
    const response = await axios.post(url+"/ingresar", usuario);
    const nuevoUsuario = response.data;
    console.log(nuevoUsuario);
    return nuevoUsuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const usuario = {
  email: "ejemplo@correo.com",
  contrasena: "123456",
  empleado: {
    id: 1, // Reemplaza con el ID del empleado correspondiente
  },
};

crearUsuario(usuario);
