const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
  })
);

app.listen(3000, () => {
  console.log('Servidor proxy iniciado en el puerto 3000');
});
