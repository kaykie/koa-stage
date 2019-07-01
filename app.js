const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
// const api = require('./routes/api');
const router = require('koa-router')();
const index = require('./routes/index.js');
// const users = require('./routes/users');
const logUtil = require('./utils/log_util');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
// const response_formatter = require('./middlewares/response_formatter');
// error handler
onerror(app);
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));



app.use(cors({
  origin: function (ctx) {
    // console.log(ctx)
    // console.log(ctx)
    // if (ctx.url === '/test') {
    //   return false;
    // }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 200,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept','usertype','ezo-userid'],
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// app.use(response_formatter);

// routes
router.use(index.routes(), index.allowedMethods());
// router.use(users.routes(), users.allowedMethods());
// router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
