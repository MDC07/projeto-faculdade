class SampleController {
    exemploMetodo() {
        return (req, res) => {
            res.send('Exemplo de Método');
        };
    }
}

module.exports = SampleController;
