const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const books = require('./booksdb.js');

const app = express();
app.use(express.json());

// Configuración de la sesión
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Base de datos de usuarios simulada
let users = [];

// Middleware de Autenticación para las rutas protegidas (/customer/auth/*)
app.use("/customer/auth", function auth(req, res, next) {
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        jwt.verify(token, "super_secret_key", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Token válido, pasa a la siguiente ruta
            } else {
                return res.status(403).json({ message: "Usuario no autenticado" });
            }
        });
    } else {
        return res.status(403).json({ message: "Usuario no ha iniciado sesión" });
    }
});

// ==========================================
// RUTAS PÚBLICAS (No requieren autenticación)
// ==========================================

// Obtener todos los libros
app.get('/', (req, res) => {
    res.status(200).json(books);
});

// Obtener libro por ISBN (ID)
app.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).json(books[isbn]);
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
});

// Obtener libros por Autor
app.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();
    const filteredBooks = Object.values(books).filter(b => b.author.toLowerCase() === author);
    res.status(200).json(filteredBooks);
});

// Obtener libros por Título
app.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const filteredBooks = Object.values(books).filter(b => b.title.toLowerCase() === title);
    res.status(200).json(filteredBooks);
});

// ==========================================
// RUTAS DE USUARIO (Registro y Login)
// ==========================================

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        if (!users.find(u => u.username === username)) {
            users.push({ username, password });
            return res.status(200).json({ message: "Usuario registrado exitosamente" });
        } else {
            return res.status(404).json({ message: "El usuario ya existe" });
        }
    }
    return res.status(404).json({ message: "No se proporcionó usuario o contraseña" });
});

app.post('/customer/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generar JWT Token
        let accessToken = jwt.sign({ data: password }, "super_secret_key", { expiresIn: 60 * 60 });
        // Guardar token en la sesión
        req.session.authorization = { accessToken, username };
        return res.status(200).send("Usuario ha iniciado sesión correctamente");
    } else {
        return res.status(208).json({ message: "Credenciales inválidas" });
    }
});

// ==========================================
// RUTAS PROTEGIDAS (Requieren autenticación)
// ==========================================

// Agregar o modificar una reseña
app.put('/customer/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;

    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: `Reseña del libro con ISBN ${isbn} ha sido añadida/actualizada.` });
    } else {
        return res.status(404).json({ message: "Libro no encontrado" });
    }
});

// Eliminar una reseña
app.delete('/customer/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: `Reseña del usuario ${username} eliminada con éxito.` });
    } else {
        return res.status(404).json({ message: "No se encontró la reseña o el libro." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));