const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurando o CORS e o parser de JSON
const  app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração de conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port:3307,
    database: 'animeflix' 
});

// Conectando ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota GET para listar todas as pessoas
app.get('/api/pessoa', (req, res) => {
    db.query('SELECT * FROM pessoa', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});

// Rota POST para adicionar uma nova pessoa
app.post('/api/pessoa', (req, res) => {
    const { nome, idade, email} = req.body;
    const sql = 'INSERT INTO pessoa (nome, idade, email) VALUES (?, ?, ?)';
    db.query(sql, [nome, idade, email], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados');
            return;
        }
        res.status(201).send('Pessoa adicionada com sucesso!');
    });
});

// Rota PUT para atualizar uma pessoa existente
app.put('/api/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, email } = req.body;
    const sql = 'UPDATE pessoa SET nome = ?, idade = ?, email = ? WHERE id_pessoa = ?';
    db.query(sql, [nome, idade, email, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar dados');
            return;
        }
        res.send('Pessoa atualizada com sucesso!');
    });
});

// Rota DELETE para remover uma pessoa existente
app.delete('/api/pessoa/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pessoa WHERE id_pessoa = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Érro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('Pessoa deletada com sucesso!');
    });
});

// Iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});