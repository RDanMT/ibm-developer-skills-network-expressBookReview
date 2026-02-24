const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function deleteAndShowReview() {
    const username = "lector_experto";
    const password = "password123";
    const isbn = 1;

    try {
        console.log("1️⃣ Preparando usuario y asegurando que exista una reseña para borrar...");

        // Intentamos registrar al usuario por si el servidor se reinició
        try { await axios.post(`${API_URL}/register`, { username, password }); } catch (err) { }

        // Iniciamos sesión para obtener la cookie
        const loginResponse = await axios.post(`${API_URL}/customer/login`, { username, password });
        const sessionCookie = loginResponse.headers['set-cookie'];

        // Añadimos una reseña rápidamente para asegurarnos de tener algo que borrar
        await axios.put(`${API_URL}/customer/auth/review/${isbn}`,
            { review: "Reseña temporal que será eliminada en unos segundos." },
            { headers: { Cookie: sessionCookie } }
        );

        console.log(`2️⃣ Eliminando la reseña del usuario "${username}" para el libro con ISBN ${isbn}...`);

        // Hacemos la petición DELETE a la ruta protegida, enviando la cookie de sesión
        const deleteResponse = await axios.delete(`${API_URL}/customer/auth/review/${isbn}`, {
            headers: {
                Cookie: sessionCookie
            }
        });

        // Mostramos el mensaje de éxito enviado por el servidor
        console.log("\n✅ ¡Reseña eliminada con éxito!");
        console.log(`Mensaje del servidor: "${deleteResponse.data.message}"\n`);

        console.log("3️⃣ Comprobando las reseñas actuales del libro...");

        // Consultamos el libro nuevamente para verificar que la reseña desapareció
        const bookResponse = await axios.get(`${API_URL}/isbn/${isbn}`);
        const currentReviews = bookResponse.data.reviews;

        if (Object.keys(currentReviews).length === 0) {
            console.log("📖 Reseñas actuales: {} (El libro ya no tiene reseñas)");
        } else {
            console.log("📖 Reseñas actuales:");
            console.log(JSON.stringify(currentReviews, null, 4));
        }

    } catch (error) {
        console.error("❌ Error al intentar eliminar la reseña:", error.message);
        if (error.response) {
            console.error(`Detalle del error:`, error.response.data);
        } else if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función
deleteAndShowReview();