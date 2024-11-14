
let express = require('express');
let methodOverride = require('method-override');
let app = express();

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('views'));

const PasseioControlador = require('./controlador/passeio-controlador');
const passeioControlador = new PasseioControlador();


class Rota {

    static iniciar() {

      this.definirRotaPaginaInicial(app); 
      this.definirRotaCadastro(app);
      this.definirRotaConsulta(app);  
      this.definirRotaExclusao(app);                       
      this.definirRotaAtualizacao(app); 
    }

    static definirRotaPaginaInicial(app) {
     
      app.get('/', passeioControlador.apresentaPaginaInicial());        
    }

    static definirRotaCadastro(app) {

      app.route('/passeios/form')
         .get(passeioControlador.apresentaFormCadastroPasseio())
         .post(passeioControlador.adicionaPasseio());              
   }

   static definirRotaConsulta(app) {

        app.route('/passeios/form')
            .get(passeioControlador.apresentaFormConsultaPasseio())
            .post(passeioControlador.consultaPasseio());              
}

   static definirRotaExclusao(app) {

      app.delete('/passeios/remover', passeioControlador.removePasseio());    
   }

   static definirRotaAtualizacao(app) {

      app.get('/passeios/form/:id', passeioControlador.recuperaPasseioPorId());
      app.put('/passeios/form/atualizar', passeioControlador.atualizaPasseio());
   }

   static get APP() {

      return app;
   }

}

module.exports = Rota;
p