const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function addAndShowReview() {
    const username = "lector_experto";
    const password = "password123";
    const isbn = 1; // Vamos a reseñar "Things Fall Apart"
    const reviewText = "¡Una obra maestra absoluta! Lo recomiendo al 100%.";

    try {
        console.log("1️⃣ Preparando usuario...");
        // Intentamos registrar al usuario (ignoramos el error si ya existe)
        try {
            await axios.post(`${API_URL}/register`, { username, password });
        } catch (err) { }

        // Iniciamos sesión para obtener la cookie de autorización
        const loginResponse = await axios.post(`${API_URL}/customer/login`, { username, password });

        // ¡Magia aquí! Capturamos la cookie que devuelve Express-Session
        const sessionCookie = loginResponse.headers['set-cookie'];

        if (!sessionCookie) {
            throw new Error("No se pudo obtener la cookie de sesión del servidor.");
        }

        console.log(`2️⃣ Añadiendo reseña al libro con ISBN ${isbn}...`);

        // Hacemos la petición PUT a la ruta protegida, enviando la cookie en los headers
        const reviewResponse = await axios.put(`${API_URL}/customer/auth/review/${isbn}`,
            { review: reviewText },
            {
                headers: {
                    Cookie: sessionCookie // Enviamos la cookie para demostrar que estamos autenticados
                }
            }
        );

        // Mostramos el mensaje de éxito del servidor
        console.log("✅ ¡Reseña añadida/modificada exitosamente!\n");
        console.log(`Mensaje del servidor: "${reviewResponse.data.message}"\n`);

        console.log("3️⃣ Obteniendo las reseñas actualizadas del servidor...");
        // Consultamos el libro nuevamente para ver los cambios
        const bookResponse = await axios.get(`${API_URL}/isbn/${isbn}`);

        console.log("📖 Reseñas actuales del libro:");
        console.log(JSON.stringify(bookResponse.data.reviews, null, 4));

    } catch (error) {
        console.error("❌ Error en el proceso:", error.message);
        if (error.response) {
            console.error(`Detalle del error:`, error.response.data);
        } else if (error.code === 'ECONNREFUSED') {
            console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node index.js' corriendo en OTRA ventana de la terminal.");
        }
    }
}

// Ejecutamos la función
addAndShowReview();