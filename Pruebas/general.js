const axios = require('axios');

// Asegúrate de que el puerto coincida con el de tu servidor Express
const API_URL = 'http://localhost:5000';

// -------------------------------------------------------------
// 1. Obtener todos los libros usando Async/Await (Tarea 10)
// -------------------------------------------------------------
async function getAllBooks() {
    try {
        const response = await axios.get(`${API_URL}/`);
        console.log("\n--- 📚 TODOS LOS LIBROS ---");
        console.log(JSON.stringify(response.data, null, 4));
    } catch (error) {
        console.error("❌ Error obteniendo todos los libros:", error.message);
    }
}

// -------------------------------------------------------------
// 2. Obtener libro por ISBN usando Promesas .then() (Tarea 11)
// -------------------------------------------------------------
function getBookByISBN(isbn) {
    // Retornamos la promesa para poder esperarla (await) más adelante
    return axios.get(`${API_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`\n--- 📖 LIBRO CON ISBN: ${isbn} ---`);
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error(`❌ Error obteniendo el libro con ISBN ${isbn}:`, error.message);
        });
}

// -------------------------------------------------------------
// 3. Obtener libros por Autor usando Async/Await (Tarea 12)
// -------------------------------------------------------------
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${API_URL}/author/${author}`);
        console.log(`\n--- ✍️  LIBROS DEL AUTOR: "${author}" ---`);
        console.log(JSON.stringify(response.data, null, 4));
    } catch (error) {
        console.error(`❌ Error obteniendo libros del autor ${author}:`, error.message);
    }
}

// -------------------------------------------------------------
// 4. Obtener libros por Título usando Async/Await (Tarea 13)
// -------------------------------------------------------------
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${API_URL}/title/${title}`);
        console.log(`\n--- 🏷️  LIBROS CON EL TÍTULO: "${title}" ---`);
        console.log(JSON.stringify(response.data, null, 4));
    } catch (error) {
        console.error(`❌ Error obteniendo libros con el título ${title}:`, error.message);
    }
}

// -------------------------------------------------------------
// EJECUCIÓN CONJUNTA
// -------------------------------------------------------------
async function ejecutarConsultasGenerales() {
    console.log("🚀 Iniciando consultas generales a la API...\n");

    // Ejecutamos una por una usando await para que la consola se vea ordenada
    await getAllBooks();

    // Funciona con await porque getBookByISBN retorna una Promesa
    await getBookByISBN(2);

    await getBooksByAuthor("Jane Austen");

    await getBooksByTitle("The Divine Comedy");

    console.log("\n✅ Consultas generales finalizadas.");
}

// Iniciar el script
ejecutarConsultasGenerales();