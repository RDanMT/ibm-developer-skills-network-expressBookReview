const axios = require('axios');

// Asegúrate de que el puerto coincida con tu servidor Express
const API_URL = 'http://localhost:5000';

/**
 * Función que busca un libro por ISBN utilizando Promesas (.then / .catch).
 * No utiliza async/await ni callbacks.
 * 
 * @param {number|string} isbn - El ISBN del libro a buscar
 */
function fetchBookByISBN_Promise(isbn) {
    console.log(`⏳ Buscando el libro con ISBN: ${isbn} usando Promesas...\n`);

    // axios.get() devuelve directamente una Promesa
    axios.get(`${API_URL}/isbn/${isbn}`)
        // .then() se ejecuta si la Promesa se resuelve exitosamente (HTTP 200)
        .then(response => {
            console.log("✅ ¡Libro encontrado exitosamente (Promesa resuelta)!\n");

            // response.data contiene el objeto del libro
            console.log(JSON.stringify(response.data, null, 4));
        })
        // .catch() se ejecuta si la Promesa es rechazada (Error de red o HTTP 4xx/5xx)
        .catch(error => {
            console.error("❌ Error al buscar el libro (Promesa rechazada):", error.message);

            // Manejo específico si el servidor responde que no existe el libro (404 Not Found)
            if (error.response && error.response.status === 404) {
                console.error(`Detalle: El libro con el ISBN ${isbn} no existe en la base de datos.`);
            }
            // Manejo específico si el servidor está apagado
            else if (error.code === 'ECONNREFUSED') {
                console.error("💡 Sugerencia: El servidor no responde. Asegúrate de tener 'node Servidor/index.js' corriendo.");
            }
        });
}

// -------------------------------------------------------------
// EJECUCIÓN: Llamamos a la función pasando el ISBN que queremos buscar
// -------------------------------------------------------------
const isbnDePrueba = 1; // "Things Fall Apart"

fetchBookByISBN_Promise(isbnDePrueba);

// Si quieres probar qué pasa cuando la Promesa es rechazada (error 404),
// descomenta la siguiente línea y vuelve a ejecutar el archivo:
// fetchBookByISBN_Promise(999);