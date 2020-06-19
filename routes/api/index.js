let router = require('koa-router')();
const user = require("./user.js");


router.get('/',async (ctx,next)=> {
	ctx.body = "哈哈哈啊";
});

router.use("/user",user.routes());



module.exports = router;