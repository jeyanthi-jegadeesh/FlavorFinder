const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();
const PORT = 3000;


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT} `));
