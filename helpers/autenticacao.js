import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export default function obterToken() {
  const url = 'http://localhost:3000/api/admin/login';

  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  return res.json().accessToken;
}