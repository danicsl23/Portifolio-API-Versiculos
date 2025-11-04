import http from 'k6/http';
import { check, sleep } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export const options = {
  vus: 200,
  duration: '50s',
  /*Stages: [
        { duration: '30s', target: 50 }, // Ramp-up para 10 usuários em 5 segundos
        { duration: '20s', target: 50 },  // Manter 10 usuários por 20 segundas
        { duration: '10s', target: 0 },  // Ramp-down para 0 usuários em 5 segundos
    ],

    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'], // 90% das requisições devem ser menores que 3s, máximo 5s
        http_req_failed: ['rate<0.01'], // Menos de 1% de falhas
    }*/
};

export default function () {
  const url = 'http://localhost:3000/api/admin/login';
  
  //postLogin.username = 'Davi';

  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response contains token': (r) => JSON.parse(r.body).accessToken !== undefined,
  });

  sleep(1);
}