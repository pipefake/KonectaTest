const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

app.use('/registro', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send('Algo salió mal!');
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://127.0.0.1:${port}`);
});