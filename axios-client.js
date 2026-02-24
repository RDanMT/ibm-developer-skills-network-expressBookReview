const axios = require('axios');

const API_URL = 'http://localhost:5000';

// Tarea 10: Obtener todos los libros usando Async/Await
async function getAllBooks() {
    try {
        const response = await axios.get(`${API_URL}/`);
        console.log("--- Todos los libros ---");
        console.log(response.data);
    } catch (error) {
        console.error("Error obteniendo los libros:", error.message);
    }
}

// Tarea 11: Buscar por ISBN usando Promesas
function getBookByISBN(isbn) {
    axios.get(`${API_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`\n--- Libro con ISBN ${isbn} ---`);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

// Tarea 12: Buscar por Autor usando Async/Await
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${API_URL}/author/${author}`);
        console.log(`\n--- Libros de ${author} ---`);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Tarea 13: Buscar por Título usando Async/Await
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${API_URL}/title/${title}`);
        console.log(`\n--- Libros con título "${title}" ---`);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Ejecutar las pruebas
async function runTests() {
    await getAllBooks();
    getBookByISBN(1);
    await getBooksByAuthor("Jane Austen");
    await getBooksByTitle("The Divine Comedy");
}

runTests();