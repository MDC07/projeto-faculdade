const express = require('express');
const path = require('path');
const Rota = require('./server/rota');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

Rota.iniciar(app);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

