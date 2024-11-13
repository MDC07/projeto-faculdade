const express = require('express');
const PasseioControlador = require('./controlador/passeio-controlador');
const passeioControlador = new PasseioControlador();

class Rota {
    static iniciar(app) {
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(express.static('public'));
        app.set('view engine', 'ejs');

        this.definirRotaPaginaInicial(app); 
        this.definirRotaCadastro(app);
        this.definirRotaConsulta(app);  
        this.definirRotaExclusao(app);                       
        this.definirRotaAtualizacao(app); 
    }

    static definirRotaPaginaInicial(app) {
        app.get('/', passeioControlador.apresentaPaginaInicial);        
    }

    static definirRotaCadastro(app) {
        app.route('/passeios/formCadastro')
           .get((req, res) => {
               res.render('formCadastro');
           })
           .post(passeioControlador.adicionaPasseio);
    }

    static definirRotaConsulta(app) {
        app.get('/passeios/formConsulta', passeioControlador.listaPasseios);
    }

    static definirRotaExclusao(app) {
        app.delete('/passeios/remover', passeioControlador.removePasseio);    
    }

    static definirRotaAtualizacao(app) {
        app.get('/passeios/formAtualiza/:id', passeioControlador.recuperaPasseioPorId);
        app.put('/passeios/form/atualizar', passeioControlador.atualizaPasseio);
    }
}

module.exports = Rota;