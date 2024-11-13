const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('./database/data.db');

const CRIAR_TABELA_PASSEIO = 
`
CREATE TABLE IF NOT EXISTS passeios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local TEXT NOT NULL, 
    valor REAL NOT NULL,
    descricao TEXT DEFAULT ('') NOT NULL
)
`;

const INSERIR_PASSEIO_1 = 
`
INSERT INTO passeios (
    local,
    valor,
    descricao
) SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' WHERE NOT EXISTS (SELECT * FROM passeios WHERE local = 'Node na prática')
`;

const INSERIR_PASSEIO_2 = 
`
INSERT INTO passeios (
    local, 
    valor,
    descricao
) SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' WHERE NOT EXISTS (SELECT * FROM passeios WHERE titulo = 'JavaScript na prática')
`;

bd.serialize(() => {
    bd.run(CRIAR_TABELA_PASSEIO);
    bd.run(INSERIR_PASSEIO_1);
    bd.run(INSERIR_PASSEIO_2);
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;