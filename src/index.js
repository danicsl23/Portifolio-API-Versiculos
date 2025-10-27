const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Versículos Aleatórios está funcionando!');
});

const versiculoRoutes = require('./routes/versiculoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

// Registrar rotas
app.use('/api', versiculoRoutes);
// Registrar rotas de administrador
app.use('/api/admin', adminRoutes);

// Endpoint para documentação Swagger
app.use(['/api-docs', '/api-docs/'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});