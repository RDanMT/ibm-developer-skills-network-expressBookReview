const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function getBooksByAuthor(authorName) {
    try {
        console.log(`⏳ Buscando libros del autor: "${authorName}"...\n`);

        // Hacemos la petición GET al endpoint /author/:author usando await
        const response = await axios.get(`${API_URL}/author/${authorName}`);

        // Verificamos si la respuesta trajo un arreglo vacío o con datos
        if (response.data.length > 0) {
            console.log(`✅ ¡Se encontraron ${response.data.length} libro(s) de ${authorName}!\n`);
            // Imprimimos el resultado con formato JSON ordenado
            console.log(JSON.stringify(response.data, null, 4));
        } else {
            console.log(`❌ No se encontraron libros para el autor: "${authorName}".`);
        }

    } catch (error) {
        console.error("❌ Error al buscar libros por autor:", error.message);

        // Mensaje de ayuda si el servidor está apagado
        if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función con un autor de prueba que sabemos que existe en booksdb.js
const autorDePrueba = "Jane Austen";
getBooksByAuthor(autorDePrueba);

// Si quieres probar con un autor que no existe, descomenta la siguiente línea:
// getBooksByAuthor("Stephen King");