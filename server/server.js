const http = require('http');
const express = require('express');
const path = require('path');
const Rota = require('./rota');

class ServidorNode {
    static start() {
        const app = express();
        const port = process.env.PORT || 3001;

        app.set('view engine', 'ejs'); 
        app.set('views', path.join(__dirname, 'views'));
        
        app.use(express.static(path.join(__dirname, '../public')));

        Rota.iniciar(app);
        
        const server = http.createServer(app);

        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
}

module.exports = ServidorNode;
