const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados
const db = new sqlite3.Database('./vendas.db');

// Cria as tabelas se não existirem
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Tecido (
      id_tecido INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      segmento TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Venda (
      id_venda INTEGER PRIMARY KEY AUTOINCREMENT,
      id_tecido INTEGER NOT NULL,
      quantidade DECIMAL(5,2) NOT NULL,
      preco_por_metro DECIMAL(6,2) NOT NULL,
      data_venda DATE NOT NULL,
      FOREIGN KEY (id_tecido) REFERENCES Tecido(id_tecido)
    )
  `);
});

// Rota para registrar venda
app.post('/api/vendas', (req, res) => {
  const { segmento, nomeTecido, quantidade, preco, data } = req.body;

  db.get('SELECT id_tecido FROM Tecido WHERE nome = ? AND segmento = ?', [nomeTecido, segmento], (err, row) => {
    if (err) return res.status(500).send({ error: err.message });

    const inserirVenda = (id_tecido) => {
      db.run(
        `INSERT INTO Venda (id_tecido, quantidade, preco_por_metro, data_venda) VALUES (?, ?, ?, ?)`,
        [id_tecido, quantidade, preco, data],
        function (err) {
          if (err) return res.status(500).send({ error: err.message });
          res.send({ message: 'Venda registrada com sucesso!' });
        }
      );
    };

    if (row) {
      inserirVenda(row.id_tecido);
    } else {
      db.run('INSERT INTO Tecido (nome, segmento) VALUES (?, ?)', [nomeTecido, segmento], function (err) {
        if (err) return res.status(500).send({ error: err.message });
        inserirVenda(this.lastID);
      });
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
