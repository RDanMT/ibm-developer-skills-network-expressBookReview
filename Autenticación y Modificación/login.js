const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function loginUser(username, password) {
    try {
        console.log(`⏳ Intentando iniciar sesión con el usuario: "${username}"...\n`);

        // Hacemos la petición POST al endpoint /customer/login
        const response = await axios.post(`${API_URL}/customer/login`, {
            username: username,
            password: password
        });

        // El servidor devuelve un texto confirmando el inicio de sesión
        console.log("✅ ¡Inicio de sesión exitoso!\n");
        console.log(`Mensaje del servidor: "${response.data}"`);

    } catch (error) {
        console.error("❌ Error al intentar iniciar sesión:", error.message);

        // Si las credenciales son inválidas, mostramos el mensaje del servidor
        if (error.response) {
            console.error(`Detalle del error: ${error.response.data.message || error.response.data}`);
        } else if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Función auxiliar para probar el proceso completo
async function ejecutarPrueba() {
    const usuarioDePrueba = "usuario_login_123";
    const passwordDePrueba = "miClaveSecreta";

    try {
        // 1. Registramos al usuario primero para asegurar que exista en la memoria del servidor
        await axios.post(`${API_URL}/register`, {
            username: usuarioDePrueba,
            password: passwordDePrueba
        });
    } catch (error) {
        // Si el usuario ya existe, el servidor lanzará un error 404, lo ignoramos y seguimos
    }

    // 2. Ahora sí, iniciamos sesión con el usuario que acabamos de asegurar que existe
    await loginUser(usuarioDePrueba, passwordDePrueba);
}

// Ejecutamos la prueba
ejecutarPrueba();