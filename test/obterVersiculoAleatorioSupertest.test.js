const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Versículo Aleatório', () => {
    describe('GET /api/versiculo', () => {
        it('Deve retornar 200 e um versículo válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/versiculo')
                .set('Content-Type', 'application/json');

            console.log('Resposta do servidor:', resposta.body);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('livro'); // Verifica se contém o livro
            expect(resposta.body).to.have.property('capitulo'); // Verifica se contém o capítulo
            expect(resposta.body).to.have.property('versiculo'); // Verifica se contém o versículo
            expect(resposta.body).to.have.property('texto'); // Verifica se contém o texto
        });

        it('Deve retornar versículos diferentes em múltiplas requisições', async () => {
            const resposta1 = await request(process.env.BASE_URL)
                .get('/api/versiculo')
                .set('Content-Type', 'application/json');

            const resposta2 = await request(process.env.BASE_URL)
                .get('/api/versiculo')
                .set('Content-Type', 'application/json');

            console.log('Versículo 1:', resposta1.body);
            console.log('Versículo 2:', resposta2.body);

            expect(resposta1.body.texto).to.not.equal(resposta2.body.texto); // Verifica aleatoriedade
        });
    });
});