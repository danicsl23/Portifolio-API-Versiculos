const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

let accessToken;

describe('Editar Versículo', () => {
  
  before(async () => {
    const bodyLogin = { ...postLogin };

    const res = await request(process.env.BASE_URL)
      .post('/api/admin/login')
      .send(bodyLogin);

    accessToken = res.body.accessToken;
    expect(accessToken).to.be.a('string');
  });

  describe('PUT /api/admin/versiculo/:id', () => {
    it('Deve retornar 200 ao editar um versículo existente', async () => {
      const versiculoAtualizado = {
        texto: 'Atualização do versículo...',
        referencia: 'Salmos 23:1'
      };

      const resposta = await request(process.env.BASE_URL)
        .put('/api/admin/versiculo/2') 
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json')
        .send(versiculoAtualizado);

      //console.log('Resposta do servidor:', resposta.body);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('id');
    });
  });
});