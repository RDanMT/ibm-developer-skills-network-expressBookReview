const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

function getBookByISBN(isbn) {
    console.log(`⏳ Buscando el libro con ISBN: ${isbn}...`);

    // Hacemos la petición GET usando Promesas (.then / .catch)
    axios.get(`${API_URL}/isbn/${isbn}`)
        .then(response => {
            console.log("✅ ¡Libro encontrado exitosamente!\n");
            // Imprimimos el resultado con formato JSON ordenado
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("❌ Error al buscar el libro:", error.message);

            // Manejo de error específico si el libro no se encuentra (Error 404)
            if (error.response && error.response.status === 404) {
                console.error(`El libro con el ISBN ${isbn} no existe en la base de datos.`);
            } else if (error.code === 'ECONNREFUSED') {
                console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener tu servidor principal corriendo.");
            }
        });
}

// Ejecutamos la función con un ISBN de prueba (por ejemplo, el 1 o el 2)
const isbnDePrueba = 1;
getBookByISBN(isbnDePrueba);

// Si quieres probar buscar un libro que no existe, descomenta la siguiente línea:
// getBookByISBN(999);