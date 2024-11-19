const Passeio = require('../../backend/passeio');

const db = require('../../database/database');

const passeio = new Passeio(db);

class PasseioControlador {
    apresentaPaginaInicial() {
        return function(req, resp) {
            resp.render('menuPrincipal', {passeio: {}});
        }
    }    

    listaPasseios() {
        return function(req, resp) {
            passeio.lista()
                 .then(passeios => resp.render('formConsulta', { passeio: passeios }))
                 .catch(erro => console.log(erro));
        };
    }

    apresentaFormCadastroPasseio() {
        return function(req, resp) {
            resp.render('formCadastro', {passeio: {}});
        }
    }

    adicionaPasseio() {
        return function(req, resp) {  
        passeio.adiciona(req.body)
             .then(resp.redirect('/passeios'))
             .catch(erro => console.log(erro));
        }
    }

    removePasseio() {
        return function(req, resp) {
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
                     .then(resp.redirect('/passeios'))
                     .catch(erro => console.log(erro));
            }        
        }
    }

    recuperaPasseioPorId() {
        return function(req, resp) {
            const id = req.params.id;
            passeio.buscaPorId(id)
                 .then(passeio => resp.render('formAtualiza', {passeio: passeio}))
                 .catch(erro => console.log(erro));   
        }
    }   

    atualizaPasseio() {
        return function(req, resp) { 
            passeio.atualiza(req.body)
                 .then(resp.redirect('/passeios'))
                 .catch(erro => console.log(erro));
        }
    }   
}

module.exports = PasseioControlador;