const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

let accessToken;

describe('Versículos', () => {
  // 🔐 Autenticação antes dos testes
  before(async () => {
    const res = await request(process.env.BASE_URL)
      .post('/api/admin/login')
      .send(postLogin);

    accessToken = res.body.accessToken;
    expect(accessToken).to.be.a('string');
  });

  describe('GET /api/admin/versiculos', () => {
    it('Deve retornar 200 e uma lista de versículos', async () => {
      const resposta = await request(process.env.BASE_URL)
        .get('/api/admin/versiculos')
        .set('Authorization', `Bearer ${accessToken}`);

      //console.log('Resposta do servidor:', resposta.body);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array'); // Verifica se é uma lista
      expect(resposta.body.length).to.be.greaterThan(0); // Verifica se há pelo menos um versículo
      expect(resposta.body[0]).to.have.property('id'); // Verifica se os itens têm estrutura esperada
      expect(resposta.body[0]).to.have.property('texto');
    });
  });
});