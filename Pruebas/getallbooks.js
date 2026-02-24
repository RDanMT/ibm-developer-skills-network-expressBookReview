const axios = require('axios');

// Asegúrate de que este puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function getAllBooks() {
    try {
        console.log("⏳ Solicitando todos los libros al servidor...\n");

        // Hacemos la petición GET al endpoint raíz ('/') usando await
        const response = await axios.get(`${API_URL}/`);

        console.log("✅ ¡Libros recuperados con éxito!\n");

        // Imprimimos los datos recuperados con un formato JSON ordenado
        console.log(JSON.stringify(response.data, null, 4));

    } catch (error) {
        console.error("❌ Error al obtener los libros:", error.message);

        // Mensaje de ayuda si el servidor está apagado
        if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función
getAllBooks();