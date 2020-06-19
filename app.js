const Koa = require('koa'); // Koa 为一个class
const Router = require('koa-router'); // koa 路由中间件
const api = require("./routes/api/index.js");
const admin = require("./routes/admin/index");
const bodyParser = require('koa-bodyparser'); // 处理post请求，把 koa2 上下文的表单数据解析到 ctx.request.body 中
const DB = require("./module/db.js");
const koaBody = require('koa-body');


const app = new Koa();
const router = new Router(); // 实例化路由

//设置跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

app.use(koaBody({
	multipart: true,  // 允许上传多个文件
}));

//app.use(bodyParser())

router.post("/",async (ctx, next) => {
	console.log(ctx.request.body);
	 let data = await DB.insert("admin",{"username":"admin","password":"123456"});
	 console.log(data.result);
	 ctx.body = "Hello Anonymous";
});

//配置层级路由
router.use("/api",api.routes());
router.use("/admin",admin.routes());


//启动路由
app.use(router.routes()) //启动路由
	.use(router.allowedMethods());

app.use(require('koa-static')(__dirname + '/public'));

app.listen(3001, () => {
  console.log('This server is running at http://localhost:' + 3001)
})