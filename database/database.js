const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('./database/data.db');

const CRIAR_TABELA_PASSEIO = 
`
CREATE TABLE IF NOT EXISTS passeios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local TEXT NOT NULL, 
    valor REAL NOT NULL,
    data TEXT NOT NUL,
    vagas REAL NOT NULL,
    tipo TEXT NOT NULL,
    idioma TEXT NOT NULL,
    guia TEXT NOT NULL,
    transporte TEXT NOT NULL,
    alimentacao TEXT NOT NULL,
    cafedamanha TEXT NOT NULL,
    almoco TEXT NOT NULL,
    fotografia TEXT NOT NULL,
    primeirossocorros TEXT NOT NULL,
    equipamentos TEXT NOT NULL,
    lembrancas TEXT NOT NULL,
    criancas TEXT NOT NULL,
    interprete TEXT NOT NULL,
    descricao TEXT DEFAULT ('') NOT NULL
)
`;

bd.serialize(() => {
    bd.run(CRIAR_TABELA_PASSEIO);
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;