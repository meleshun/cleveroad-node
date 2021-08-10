const Koa = require('koa');
const path = require('path');
const router = require('./router');
const config = require('./config/app');

const app = new Koa();

app.use(require('./middlewares/validationFileSize'));

app.use(require('koa-body')({
  multipart: true,
  json: true,
  formLimit: config.maxBodySize,
  textLimit: config.maxBodySize,
  formidable: {
    maxFileSize: config.maxBodySize,
  },
}));

app.use(require('koa-static')(path.join(__dirname, 'images')));

app.use(require('./middlewares/logger'));
app.use(require('./middlewares/session'));
app.use(require('./middlewares/error'));
app.use(require('./middlewares/login'));

app.use(router.allowedMethods());
app.use(router.routes());

module.exports = app;
