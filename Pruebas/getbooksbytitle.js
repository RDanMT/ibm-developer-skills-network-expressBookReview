const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function getBooksByTitle(title) {
    try {
        console.log(`⏳ Buscando libros con el título: "${title}"...\n`);

        // Hacemos la petición GET al endpoint /title/:title usando await
        const response = await axios.get(`${API_URL}/title/${title}`);

        // Verificamos si la respuesta trajo un arreglo vacío o con datos
        if (response.data.length > 0) {
            console.log(`✅ ¡Se encontraron ${response.data.length} libro(s) con el título "${title}"!\n`);
            // Imprimimos el resultado con formato JSON ordenado
            console.log(JSON.stringify(response.data, null, 4));
        } else {
            console.log(`❌ No se encontraron libros con el título: "${title}".`);
        }

    } catch (error) {
        console.error("❌ Error al buscar libros por título:", error.message);

        // Mensaje de ayuda si el servidor está apagado o hay error de red
        if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función con un título de prueba que sabemos que existe en booksdb.js
const tituloDePrueba = "The Divine Comedy";
getBooksByTitle(tituloDePrueba);

// Si quieres probar con un título que no existe, descomenta la siguiente línea:
// getBooksByTitle("Harry Potter");