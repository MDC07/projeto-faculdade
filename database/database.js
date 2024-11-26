const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('./database/data.db');

const CRIAR_TABELA_PASSEIO = 
`
CREATE TABLE IF NOT EXISTS passeios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local TEXT NOT NULL, 
    valor REAL NOT NULL,
    data TEXT NOT NULL,
    vagas REAL NOT NULL,
    tipo TEXT NOT NULL,
    idioma TEXT NOT NULL,
    guia TEXT NOT NULL,
    transporte TEXT,
    alimentacao TEXT,
    cafedamanha TEXT,
    almoco TEXT,
    fotografia TEXT,
    primeirossocorros TEXT,
    equipamentos TEXT,
    lembrancas TEXT,
    criancas TEXT,
    interprete TEXT,
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