const proxy = require('http-proxy-middleware');
const apiMocker = require('mocker-api')
const path = require('path');

module.exports = function(app) {

  apiMocker(app, path.resolve('./src/mock'))

  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};