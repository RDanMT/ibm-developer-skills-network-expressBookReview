const axios = require('axios');

// Asegúrate de que el puerto coincida con tu servidor Express
const API_URL = 'http://localhost:5000';

/**
 * Función que busca libros por autor y utiliza un callback para retornar el resultado.
 * Sigue la convención de Node.js: callback(error, data)
 * 
 * @param {string} authorName - El nombre del autor a buscar
 * @param {function} callback - La función de devolución de llamada
 */
function fetchBooksByAuthor(authorName, callback) {
    console.log(`⏳ Buscando libros del autor: "${authorName}" usando un callback...\n`);

    // Hacemos la petición a la API
    axios.get(`${API_URL}/author/${authorName}`)
        .then(response => {
            // Si la petición es exitosa (HTTP 200 OK), pasamos los datos al callback
            // El primer parámetro (error) es null
            callback(null, response.data);
        })
        .catch(error => {
            // Si hay un error (ej. problema de red o error del servidor 4xx/5xx)
            // Pasamos el error al callback y null para los datos
            callback(error, null);
        });
}

// -------------------------------------------------------------
// EJECUCIÓN: Llamamos a la función con un autor y nuestra función "callback"
// -------------------------------------------------------------
const autorDePrueba = "Jane Austen"; // Cambia este nombre para probar otros autores

fetchBooksByAuthor(autorDePrueba, function (err, librosEncontrados) {
    // Esta es la función de devolución de llamada (callback) que se ejecuta al terminar

    // 1. Manejo de Errores
    if (err) {
        console.error("❌ Ocurrió un error al buscar por autor:", err.message);

        if (err.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node Servidor/index.js' corriendo.");
        } else if (err.response) {
            // Error devuelto por el servidor (ej. 404 No encontrado)
            console.error(`Detalle del servidor: ${err.response.data.message || err.response.statusText}`);
        }
        return; // Salimos de la función si hubo error
    }

    // 2. Procesamiento de Éxito
    // Verificamos si la API devolvió un arreglo con datos o un arreglo vacío
    if (librosEncontrados && librosEncontrados.length > 0) {
        console.log(`✅ ¡Se encontraron ${librosEncontrados.length} libro(s) de ${autorDePrueba}!\n`);
        console.log(JSON.stringify(librosEncontrados, null, 4));
    } else {
        console.log(`❌ La búsqueda fue exitosa, pero no hay libros registrados para el autor: "${autorDePrueba}".`);
    }
});