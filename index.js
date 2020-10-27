require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

function checkEnv(key) {
  if (process.env[key]) return process.env[key];
  console.error(`Please, set ${key} environment variable`);
  process.exit(1);
}

const PORT = checkEnv(PORT);
const HOST = checkEnv(HOST);
const TARGET = checkEnv(HOST);

const options = {
  target: TARGET,
  changeOrigin: true,
 }

const proxy = createProxyMiddleware(options);

const app = express();

app.use(morgan('dev'));
app.use('/api', proxy);
app.listen(PORT, HOST);