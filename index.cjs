const express = require('express');
const app = express();
const port = 3000;

// Rota para a página inicial
app.get('/', (_req, _res) => {
  _res.send('Bem-vindo à página inicial');
});

// Rota para consultar todos os produtos
app.get('/produtos', (_req, _res) => {
  // Lógica para consultar todos os produtos no banco de dados
  // e retornar a lista de produtos como resposta
});

// Rota para consultar um produto pelo ID
app.get('/produtos/:id', (_req, _res) => {
  const id = _req.params.id;
  // Lógica para consultar um produto específico pelo ID
  // e retornar o produto como resposta
});

// Rota para cadastrar um novo produto
app.post('/produtos', (_req, _res) => {
  // Lógica para cadastrar um novo produto no banco de dados
});

// Rota para alterar um produto pelo ID
app.put('/produtos/:id', (_req, _res) => {
  const id = _req.params.id;
  // Lógica para alterar um produto específico pelo ID
});

// Rota para deletar um produto pelo ID
app.delete('/produtos/:id', (_req, _res) => {
  const id = _req.params.id;
  // Lógica para deletar um produto específico pelo ID
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://15.228.18.0:${port}`);
});
