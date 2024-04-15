const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Configurações do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'testeaula'
});

// Estabelecer conexão com o banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota para inserir dados no banco de dados
app.post('/', (req, res) => {
  const { nome, email } = req.body;

  if (!connection) {
    res.status(500).json({ error: 'Erro interno do servidor' });
    return;
  }

  const query = 'INSERT INTO usuario (nome, email) VALUES (?, ?)';
  connection.query(query, [nome, email], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    console.log('Dados inseridos com sucesso!');
    res.status(200).json({ message: 'Dados inseridos com sucesso!' });
  });
});


app.get('/', (req, res) => {
    if (!connection) {
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
  
    const query = 'Select * from usuario';
    connection.query(query, (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      console.log('Dados inseridos com sucesso!');
      res.status(200).json(result);
    });
});

// Porta em que o servidor irá escutar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
