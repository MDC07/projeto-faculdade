const Passeio = require('../../backend/passeio');

const db = require('../../database/conexao');

const passeio = new Passeio(db);

class PasseioControlador {
    apresentaPaginaInicial() {
        return function(req, res) {
            res.render('menuPrincipal', {passeio: {}});
        }
    }    

    listaPasseios() {
        return function(req, res) {
            passeio.lista()
                 .then(passeios => res.render('formConsulta', {passeios: passeios}))
                 .catch(erro => console.log(erro));
        };
    }

    apresentaFormCadastroPasseio() {
        return function(req, res) {
            res.render('formCadastra', {passeio: {}});
        }
    }

    adicionaPasseio() {
        return function(req, res) {  
        passeio.adiciona(req.body)
             .then(res.redirect('/passeios'))
             .catch(erro => console.log(erro));
        }
    }

    removePasseio() {
        return function(req, res) {
            const ids = req.body;
            const valores =  Object.values(ids)[0];

            if (Array.isArray(valores)){ 
              for (let i = 0; i < valores.length; i++) {
                passeio.remove(valores[i])
                     .catch(erro => console.log(erro));
              }
              res.redirect('/passeios');
            } else {          
                passeio.remove(valores)
                     .then(res.redirect('/passeios'))
                     .catch(erro => console.log(erro));
            }        
        }
    }

    recuperaPasseioPorId() {
        return function(req, res) {
            const id = req.params.id;
            passeio.buscaPorId(id)
                 .then(passeio => res.render('formAtualiza', {passeio: passeio}))
                 .catch(erro => console.log(erro));   
        }
    }   

    atualizaPasseio() {
        return function(req, res) { 
            passeio.atualiza(req.body)
                 .then(res.redirect('/passeios'))
                 .catch(erro => console.log(erro));
        }
    }   
}

module.exports = PasseioControlador;