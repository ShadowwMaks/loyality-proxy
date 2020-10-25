const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
    target: 'http://newDomain.com',
    ws: true,
    pathRewrite: {
        '^/old-path': '/new-path',
        '^/remove/path': '/path',
      } 
}

const exampleProxy = createProxyMiddleware(options);

const app = express();

app.use(morgan('dev'));
app.use('/', exampleProxy);
app.listen(3000);