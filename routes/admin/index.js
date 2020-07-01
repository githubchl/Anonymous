let router = require('koa-router')();
const DB = require("../../module/db")
const CountDao = require("../../module/admin/count")


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
        result.data.msg = "账户名为空";
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


router.post('/count',async (ctx,next)=> {
    let result = {
        code: 200,
        data: {
            count: 0,
        }
    };
    let rs = await DB.find("count",{flag:1});
    if (rs.length>0){
        result.data.count = rs[0].count;
    }
    let countDao = new CountDao();
    let list = await countDao.findCountList();
    result.data.list = list;
    ctx.body = result;
});

// router.use("/user",user.routes());



module.exports = router;