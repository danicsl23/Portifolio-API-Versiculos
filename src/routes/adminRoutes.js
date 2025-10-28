const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Dados simulados para os versículos
let versiculos = [
  {
    id: 1,
    livro: 'João',
    capitulo: 3,
    versiculo: 16,
    texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...'
  },
  {
    id: 2,
    livro: 'Salmos',
    capitulo: 23,
    versiculo: 1,
    texto: 'O Senhor é o meu pastor; nada me faltará.'
  }
];

// 🔐 Login seguro para administradores
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulação de autenticação
  if (username === 'Dani' && password === '2307') {
    const user = { name: username };
    const accessToken = jwt.sign(user, 'secreta-chave', { expiresIn: '1h' });
    return res.json({ accessToken });
  }

  res.status(401).json({ message: 'Credenciais inválidas' });
});

// ➕ Inserir novo versículo
router.post('/versiculo', authenticateToken, (req, res) => {
  const { livro, capitulo, versiculo, texto } = req.body;

  if (!livro || !capitulo || !versiculo || !texto) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const novoVersiculo = {
    id: versiculos.length + 1,
    livro,
    capitulo,
    versiculo,
    texto
  };

  versiculos.push(novoVersiculo);
  res.status(201).json(novoVersiculo);
});

// ✏️ Editar versículo existente
router.put('/versiculo/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { livro, capitulo, versiculo, texto } = req.body;
  const index = versiculos.findIndex(v => v.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Versículo não encontrado' });
  }

  versiculos[index] = {
    id: parseInt(id),
    livro,
    capitulo,
    versiculo,
    texto
  };

  res.json(versiculos[index]);
});

// 🗑️ Excluir versículo
router.delete('/versiculo/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = versiculos.findIndex(v => v.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Versículo não encontrado' });
  }

  versiculos.splice(index, 1);
  res.status(204).send();
});

// 📋 Listar todos os versículos
router.get('/versiculos', authenticateToken, (req, res) => {
  res.json(versiculos);
});

module.exports = router;