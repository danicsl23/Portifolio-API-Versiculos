const express = require('express');
const router = express.Router();

// Dados simulados para os versículos
const versiculos = [
  { livro: 'João', capitulo: 3, versiculo: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
  { livro: 'Salmos', capitulo: 23, versiculo: 1, texto: 'O Senhor é o meu pastor; nada me faltará.' },
  { livro: 'Provérbios', capitulo: 3, versiculo: 5, texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.' }
];

// Endpoint para obter um versículo aleatório
router.get('/versiculo', (req, res) => {
  const randomIndex = Math.floor(Math.random() * versiculos.length);
  const versiculoAleatorio = versiculos[randomIndex];
  res.json(versiculoAleatorio);
});

module.exports = router;