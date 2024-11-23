const express = require('express');
const router = express.Router();

class Passeio {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve,reject) => {
            this._db.all(
                'SELECT * FROM passeios',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os passeios!');
                    return resolve(resultados);
                }
            )
        });
    }

    adiciona(passeio) {
        return new Promise((resolve, reject) => {
            console.log('Valores do passeio:', passeio);
            this._db.run(`
                INSERT INTO passeios (
                        local,
                        valor,
                        descricao
                    ) VALUES (?, ?, ?)
                `,
                [ passeio.local, passeio.valor, passeio.descricao ],
                function (err) {
                    if (err) {        
                        console.log(err);
                        return reject('Não foi possível adicionar o passeio!');
                    }                    
                    resolve();
                } 
            )       
        });
    } 

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE FROM passeios WHERE id = ?`,
                [ id ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível excluir o passeio!');
                    }
                    resolve();
                } 
            )       
        });
    }    

    buscaPorId(id) { 
        return new Promise((resolve, reject) => {
            this._db.get(`
                SELECT * FROM passeios WHERE id = ?`,
                [ id ],
                (erro, resultado) => {
                    if (erro)
                        return reject('Não foi possível encontrar o passeio!');       
                    console.log(resultado);    
                    return resolve(resultado);
                } 
            )       
        });
    }

    atualiza(passeio) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE passeios                 
                SET     local    = ?,
                        valor     = ?,
                        descricao = ?
                WHERE  id        = ?       
                `,
                [
                    passeio.local,
                    passeio.valor, 
                    passeio.descricao,
                    passeio.id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível atualizar o passeio!');
                    }
    
                    resolve();
                } 
            )       
        });
    } 
}

module.exports = Passeio;