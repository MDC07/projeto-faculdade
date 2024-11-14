let Rotas = require('./server/rota');

class Main {

    static iniciar() {

        Main.iniciarRotas();
        Main.iniciarServidor();
    }

    static iniciarRotas() {

        Main.ROTAS.iniciar();
    }

    static iniciarServidor() {
        
        const ServidorNode = require('./server/server');
        ServidorNode.start(Main.ROTAS.APP);
    }

    static get ROTAS() {

        return Rotas;
    }
}

Main.iniciar();