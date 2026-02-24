const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

async function getBookReview(isbn) {
    try {
        console.log(`⏳ Buscando las reseñas del libro con ISBN: ${isbn}...\n`);

        // Hacemos la petición GET al endpoint /isbn/:isbn usando await
        // (Si tu servidor tiene una ruta específica para reseñas, cambia esto a: `${API_URL}/review/${isbn}`)
        const response = await axios.get(`${API_URL}/isbn/${isbn}`);

        // Extraemos solo la parte de las reseñas del objeto del libro
        const reviews = response.data.reviews;

        // Verificamos si hay reseñas (si el objeto no está vacío)
        if (Object.keys(reviews).length > 0) {
            console.log(`✅ ¡Reseñas encontradas para el libro "${response.data.title}"!\n`);
            console.log(JSON.stringify(reviews, null, 4));
        } else {
            console.log(`ℹ️ El libro "${response.data.title}" aún no tiene reseñas. (Objeto vacío: {})`);
        }

    } catch (error) {
        console.error("❌ Error al obtener las reseñas:", error.message);

        // Mensajes de ayuda adicionales
        if (error.response && error.response.status === 404) {
            console.error(`El libro con el ISBN ${isbn} no existe.`);
        } else if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función con un ISBN de prueba (por ejemplo, el 1)
const isbnDePrueba = 1;
getBookReview(isbnDePrueba);

// Si quieres probar con otro libro, descomenta la siguiente línea:
// getBookReview(2);