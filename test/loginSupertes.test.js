const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

describe('Login', () => {
    describe('POST /api/admin/login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/admin/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);

            //console.log('Resposta do servidor:', resposta.body);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.accessToken).to.be.a('string'); // Verifica accessToken
        });
    });
});