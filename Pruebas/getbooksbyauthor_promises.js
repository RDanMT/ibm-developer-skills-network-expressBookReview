const axios = require('axios');

// Asegúrate de que el puerto coincida con tu servidor Express
const API_URL = 'http://localhost:5000';

/**
 * Función que busca libros por autor utilizando Promesas (.then / .catch).
 * No utiliza async/await ni callbacks.
 * 
 * @param {string} authorName - El nombre del autor a buscar
 */
function fetchBooksByAuthor_Promise(authorName) {
    console.log(`⏳ Buscando libros del autor: "${authorName}" usando Promesas...\n`);

    // axios.get() devuelve directamente una Promesa
    axios.get(`${API_URL}/author/${authorName}`)
        // .then() se ejecuta si la Promesa se resuelve exitosamente (HTTP 200)
        .then(response => {
            // Verificamos si la respuesta trajo un arreglo vacío o con datos
            if (response.data && response.data.length > 0) {
                console.log(`✅ ¡Se encontraron ${response.data.length} libro(s) de ${authorName} (Promesa resuelta)!\n`);
                console.log(JSON.stringify(response.data, null, 4));
            } else {
                console.log(`❌ La búsqueda fue exitosa, pero no se encontraron libros para el autor: "${authorName}".`);
            }
        })
        // .catch() se ejecuta si la Promesa es rechazada (Error de red o HTTP 4xx/5xx)
        .catch(error => {
            console.error("❌ Error al buscar libros por autor (Promesa rechazada):", error.message);

            // Manejo específico si el servidor responde con un error estructurado
            if (error.response) {
                console.error(`Detalle del servidor: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            }
            // Manejo específico si el servidor está apagado
            else if (error.code === 'ECONNREFUSED') {
                console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node Servidor/index.js' corriendo.");
            }
        });
}

// -------------------------------------------------------------
// EJECUCIÓN: Llamamos a la función pasando el autor que queremos buscar
// -------------------------------------------------------------
const autorDePrueba = "Jane Austen"; // Cambia este nombre para probar otros autores

fetchBooksByAuthor_Promise(autorDePrueba);

// Si quieres probar qué pasa cuando el autor no existe,
// descomenta la siguiente línea y vuelve a ejecutar el archivo:
// fetchBooksByAuthor_Promise("Autor Inexistente");