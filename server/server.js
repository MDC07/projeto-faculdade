
class Server {

    static start(app) {

        app.listen(3000, function() {
            console.log('Servidor rodando na porta 3000');
        });

    }
}

module.exports = Server;
