const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function registerUser(username, password) {
    try {
        console.log(`⏳ Intentando registrar al usuario: "${username}"...\n`);

        // Hacemos la petición POST al endpoint /register
        // El segundo parámetro es el objeto con los datos (body) que enviaremos
        const response = await axios.post(`${API_URL}/register`, {
            username: username,
            password: password
        });

        // Mostramos el mensaje de éxito enviado por el servidor
        console.log("✅ ¡Registro exitoso!\n");
        console.log(`Mensaje del servidor: "${response.data.message}"`);

    } catch (error) {
        console.error("❌ Error al intentar registrar el usuario:", error.message);

        // Manejamos los errores enviados por el servidor (ej: "El usuario ya existe")
        if (error.response) {
            console.error(`Detalle del error: ${error.response.data.message || error.response.data}`);
        } else if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Generamos un nombre de usuario aleatorio para evitar el error de "El usuario ya existe" 
// si ejecutas este archivo varias veces seguidas.
const randomId = Math.floor(Math.random() * 1000);
const nuevoUsuario = `usuario_prueba_${randomId}`;
const nuevaPassword = "superpassword123";

// Ejecutamos la función
registerUser(nuevoUsuario, nuevaPassword);

// Si quieres probar qué pasa cuando intentas registrar a alguien que ya existe,
// puedes forzar un nombre de usuario estático descomentando la línea de abajo
// y ejecutando el archivo dos veces:
// registerUser("juan_perez", "claveSegura!");  