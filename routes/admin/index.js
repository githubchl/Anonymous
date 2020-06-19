let router = require('koa-router')();
const DB = require("../../module/db")
// const user = require("./user.js");


router.post('/login',async (ctx,next)=> {
    let result = {
        code: 200,
        data: {
            msg: '登录成功',
        }
    };
    let param = ctx.request.body;
    if(!param.username){
        result.code = -1;
        result.data.msg = "手机号码为空";
        ctx.body = result;
        return;
    }
    if(!param.password){
        result.code = -1;
        result.data.msg = "密码为空";
        ctx.body = result;
        return;
    }
    try{
        let data = await DB.find("admin",param);
        if (data.length==0){
            result.code = -1;
            result.data.msg ="登录失败";
        }
    }catch(err){

        result.code = -1;
        result.data.msg = "登录失败";
    }
    ctx.body = result;
});

// router.use("/user",user.routes());



module.exports = router;