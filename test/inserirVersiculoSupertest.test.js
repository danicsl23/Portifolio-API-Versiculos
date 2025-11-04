const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

let accessToken;

describe('Excluir Versículo', () => {
  let versiculoId;

  before(async () => {
    // Login e obtenção do token
    const res = await request(process.env.BASE_URL)
      .post('/api/admin/login')
      .send(postLogin);

    accessToken = res.body.accessToken;
    expect(accessToken).to.be.a('string');

    // Inserir um versículo para depois excluir
    const novoVersiculo = {
      texto: 'Versículo temporário para exclusão',
      referencia: 'Salmos 119:105',
      livro: 'Salmos',
      capitulo: 119,
      versiculo: 105
    };

    const resposta = await request(process.env.BASE_URL)
      .post('/api/admin/versiculo')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send(novoVersiculo);

    versiculoId = resposta.body.id;
    expect(versiculoId).to.be.a('number');
  });

  describe('DELETE /api/admin/versiculo/:id', () => {
    it('Deve retornar 204 ao excluir um versículo existente', async () => {
      const resposta = await request(process.env.BASE_URL)
        .delete(`/api/admin/versiculo/${versiculoId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      console.log('Resposta do servidor:', resposta.body);

      expect(resposta.status).to.equal(204);
      expect(resposta.body).to.be.empty;
    });
  });
});