require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
  target: process.env.TARGET,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
 }

const proxy = createProxyMiddleware(options);

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(morgan('dev'));
app.use('/api', proxy);
app.listen(PORT, HOST);