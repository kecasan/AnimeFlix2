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
    port: 3307,
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
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('Pessoa deletada com sucesso!');
    });
});

app.get('/api/anime', (req, res) => {
    db.query('SELECT * FROM anime', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});

app.post('/api/anime', (req, res) => {
    const { titulo, genero, ano_lancamento} = req.body;
    const sql = 'INSERT INTO anime (titulo, genero, ano_lancamento) VALUES (?, ?, ?)';
    db.query(sql, [titulo, genero, ano_lancamento], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados');
            return;
        }
        res.status(201).send('Anime adicionado com sucesso!');
    });
});

app.put('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano_lancamento } = req.body;
    const sql = 'UPDATE anime SET titulo = ?, genero = ?, ano_lancamento = ? WHERE id_anime = ?';
    db.query(sql, [titulo, genero, ano_lancamento, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar dados');
            return;
        }
        res.send('Anime atualizado com sucesso!');
    });
});

app.delete('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM anime WHERE id_anime = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.send('Anime deletado com sucesso!');
    });
});

/*app.get('/api/assiste', (req, res) => {
    db.query('SELECT * FROM assiste', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });    
});*/

app.get('/api/assiste', (req, res) => {
    db.query('SELECT pessoa.nome FROM pessoa JOIN assiste ON pessoa.id_pessoa = assiste.id_pessoa JOIN anime ON assiste.id_anime = anime.id_anime', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});

app.get('/api/assiste', (req, res) => {
    db.query('SELECT anime.titulo FROM anime JOIN assiste ON assiste.id_anime = anime.id_anime JOIN pessoa ON assiste.id_pessoa = pessoa.id_pessoa;', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});

app.get('/api/assiste', (req, res) => {
    db.query('SELECT assiste.data_assistiu FROM assiste JOIN pessoa ON pessoa.id_pessoa = assiste.id_pessoa;', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.send(results);
    });
});

// Iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});