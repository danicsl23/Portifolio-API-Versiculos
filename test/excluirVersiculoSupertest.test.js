const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

let accessToken;

describe('Excluir Versículo', () => {
 
  before(async () => {
    const res = await request(process.env.BASE_URL)
      .post('/api/admin/login')
      .send(postLogin);

    accessToken = res.body.accessToken;
    expect(accessToken).to.be.a('string');
  });

  describe('DELETE /api/admin/versiculo/:id', () => {
    it('Deve retornar 204 ao excluir um versículo existente', async () => {
      const resposta = await request(process.env.BASE_URL)
        .delete('/api/admin/versiculo/1') 
        .set('Authorization', `Bearer ${accessToken}`);

      console.log('Resposta do servidor:', resposta.body);

      expect(resposta.status).to.equal(204); // Verifica se foi excluído com sucesso
      expect(resposta.body).to.be.empty;     // 204 geralmente retorna corpo vazio
    });
  });
});