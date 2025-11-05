# API Versículos Aleatórios

## Descrição
Esta é uma API REST para obter versículos aleatórios da Bíblia e gerenciar versículos. A API possui funcionalidades para usuários e administradores.

## Funcionalidades

### Para Usuários (sem autenticação):
- **Obter versículo aleatório**: Endpoint `GET /api/versiculo` retorna um versículo aleatório a cada chamada.

### Para Administradores (com autenticação JWT):
- **Login seguro**: Endpoint `POST /api/admin/login` para autenticação.
- **Inserir versículo**: Endpoint `POST /api/admin/versiculo` para adicionar novos versículos.
- **Editar versículo**: Endpoint `PUT /api/admin/versiculo/{id}` para editar versículos existentes.
- **Excluir versículo**: Endpoint `DELETE /api/admin/versiculo/{id}` para remover versículos.
- **Listar todos os versículos**: Endpoint `GET /api/admin/versiculos` para listar todos os versículos.

## Tecnologias Utilizadas
- Node.js
- Express
- JWT (JSON Web Token)
- Swagger para documentação

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/danicsl23/Portifolio-API-Versiculos.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd Portifolio-API-Versiculos
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor:
   ```bash
   node src/index.js
   ```

5. Acesse a API em `http://localhost:3000`.

## Documentação da API
A documentação da API está disponível em `http://localhost:3000/api-docs` após iniciar o servidor.

## Estrutura do Projeto
```
Portifolio-API-Versiculos/
├── src/
│   ├── index.js          # Arquivo principal do servidor
│   ├── routes/           # Rotas da aplicação
│   │   ├── versiculoRoutes.js
│   │   ├── adminRoutes.js
│   ├── controllers/      # Lógica dos controladores (futuro)
│   ├── services/         # Serviços da aplicação (futuro)
│   ├── models/           # Modelos de dados (futuro)
│   ├── middleware/       # Middleware de autenticação
│   │   ├── authMiddleware.js
├── resources/
│   ├── swagger.json      # Documentação Swagger
├── package.json          # Configurações do projeto
├── README.md             # Este arquivo
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença
Este projeto está licenciado sob a licença MIT.