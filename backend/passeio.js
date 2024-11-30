const express = require('express');
const router = express.Router();

class Passeio {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                `SELECT *,
                    CONCAT(CASE WHEN transporte IS NOT NULL THEN CONCAT(transporte, ', ') END, CASE WHEN alimentacao IS NOT NULL THEN CONCAT('alimentação', ', ') END, CASE WHEN cafedamanha IS NOT NULL THEN CONCAT('café da manhã', ', ') END, CASE WHEN almoco IS NOT NULL THEN CONCAT('almoço', ', ') END, CASE WHEN fotografia IS NOT NULL THEN CONCAT(fotografia, ', ') END, CASE WHEN primeirossocorros IS NOT NULL THEN CONCAT('primeiros socorros', ', ') END, CASE WHEN equipamentos IS NOT NULL THEN CONCAT(equipamentos, ', ') END, CASE WHEN lembrancas IS NOT NULL THEN CONCAT('lembranças', ', ') END, CASE WHEN criancas IS NOT NULL THEN CONCAT('crianças', ', ') END, CASE WHEN interprete IS NOT NULL THEN 'intérprete' END) AS servico
                FROM passeios`,
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os passeios!');
                    return resolve(resultados);
                }
            );
        });
     }

    adiciona(passeio) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO passeios (
                        local,
                        data,
                        valor,
                        vagas,
                        tipo,
                        idioma,
                        guia,
                        transporte,
                        alimentacao,
                        cafedamanha,
                        almoco,
                        fotografia,
                        primeirossocorros,
                        equipamentos,
                        lembrancas,
                        criancas,
                        interprete,
                        descricao
                    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [ passeio.local, passeio.valor, passeio.data, passeio.vagas, passeio.tipo, passeio.idioma, passeio.guia, passeio.transporte, passeio.alimentacao, passeio.cafedamanha, passeio.almoco, passeio.fotografia, passeio.primeirossocorros, passeio.equipamentos, passeio.lembrancas, passeio.criancas, passeio.interperte, passeio.descricao ],
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
                        data    = ?,
                        valor     = ?,
                        vagas     = ?,
                        tipo     = ?,
                        idioma     = ?,
                        guia     = ?,
                        transporte     = ?,
                        alimentacao     = ?,
                        cafedamanha     = ?,
                        almoco     = ?,
                        fotografia     = ?,
                        primeirossocorros     = ?,
                        equipamentos     = ?,
                        lembrancas     = ?,
                        criancas     = ?,
                        interprete     = ?,
                        descricao = ?
                WHERE  id        = ?       
                `,
                [
                    passeio.local,
                    passeio.data,
                    passeio.valor, 
                    passeio.vagas, 
                    passeio.tipo, 
                    passeio.idioma, 
                    passeio.guia, 
                    passeio.transporte, 
                    passeio.alimentacao, 
                    passeio.cafedamanha, 
                    passeio.almoco, 
                    passeio.fotografia, 
                    passeio.primeirossocorros, 
                    passeio.equipamentos, 
                    passeio.lembrancas, 
                    passeio.criancas, 
                    passeio.interperte, 
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
                } 
            )       
        });
    } 
}

module.exports = Passeio;
