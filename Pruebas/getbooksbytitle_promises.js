const axios = require('axios');

// Asegúrate de que el puerto coincida con tu servidor Express
const API_URL = 'http://localhost:5000';

/**
 * Función que busca libros por título utilizando Promesas (.then / .catch).
 * No utiliza async/await ni callbacks.
 * 
 * @param {string} titleName - El título del libro a buscar
 */
function fetchBooksByTitle_Promise(titleName) {
    console.log(`⏳ Buscando libros con el título: "${titleName}" usando Promesas...\n`);

    // axios.get() devuelve una Promesa
    axios.get(`${API_URL}/title/${titleName}`)
        // .then() se ejecuta si la respuesta del servidor es exitosa (HTTP 200)
        .then(response => {
            // Verificamos si la respuesta contiene datos
            if (response.data && response.data.length > 0) {
                console.log(`✅ ¡Se encontraron ${response.data.length} libro(s) con el título "${titleName}" (Promesa resuelta)!\n`);
                console.log(JSON.stringify(response.data, null, 4));
            } else {
                console.log(`❌ La búsqueda fue exitosa, pero no se encontraron libros con el título: "${titleName}".`);
            }
        })
        // .catch() captura errores de red o respuestas de error del servidor (ej. 404, 500)
        .catch(error => {
            console.error("❌ Error al buscar libros por título (Promesa rechazada):", error.message);

            // Si el error viene del servidor (ej. 404 Not Found)
            if (error.response) {
                console.error(`Detalle del servidor: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            }
            // Si el servidor está apagado o hay un problema de conexión
            else if (error.code === 'ECONNREFUSED') {
                console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node Servidor/index.js' corriendo en otra terminal.");
            }
        });
}

// -------------------------------------------------------------
// EJECUCIÓN: Llamamos a la función pasando el título que queremos buscar
// -------------------------------------------------------------
const tituloDePrueba = "The Divine Comedy"; // Título que sabemos que existe

// Llamamos a la función
fetchBooksByTitle_Promise(tituloDePrueba);

// Si quieres probar qué pasa cuando el título no existe,
// descomenta la siguiente línea y vuelve a ejecutar el archivo:
// fetchBooksByTitle_Promise("El Quijote");