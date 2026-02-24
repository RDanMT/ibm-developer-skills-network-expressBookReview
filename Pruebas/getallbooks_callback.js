const axios = require('axios');

// Asegúrate de que el puerto coincida con tu servidor Express
const API_URL = 'http://localhost:5000';

/**
 * Función que obtiene todos los libros y utiliza un callback para retornar el resultado.
 * Sigue la convención de Node.js: callback(error, data)
 */
function fetchAllBooks(callback) {
    console.log("⏳ Solicitando todos los libros al servidor usando un callback...\n");

    axios.get(`${API_URL}/`)
        .then(response => {
            // Si la petición es exitosa, llamamos al callback con error=null y los datos
            callback(null, response.data);
        })
        .catch(error => {
            // Si hay un error, llamamos al callback pasando el error
            callback(error, null);
        });
}

// -------------------------------------------------------------
// EJECUCIÓN: Llamamos a la función y le pasamos nuestra función "callback"
// -------------------------------------------------------------
fetchAllBooks(function (err, data) {
    // Esta es la función de devolución de llamada (callback)

    if (err) {
        console.error("❌ Ocurrió un error al obtener los libros:", err.message);

        if (err.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo.");
        }
        return; // Salimos de la función si hubo error
    }

    // Si no hubo error, procesamos los datos
    console.log("✅ ¡Libros recuperados con éxito mediante callback!\n");
    console.log(JSON.stringify(data, null, 4));
});