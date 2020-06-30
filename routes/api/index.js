let router = require('koa-router')();
const user = require("./user.js");
const DB = require("../../module/db.js");


router.get('/',async (ctx,next)=> {
	ctx.body = "哈哈哈啊";
});


router.post('/count',async (ctx,next)=> {

    let result = await DB.find("count",{});
    // console.log(result);
    //更新
    if (result&&result.length>0){
        let count = result[0].count;
        result = await DB.update("count",{flag:1},{flag:1,count:count+1})
        console.log(result);
    } else{//插入
        result = await DB.insert("count",{flag:1,count:1})
        //console.log(result);
    }

    ctx.body =  {
        code: 200,
        data: {
            msg: '更新成功',
        }};
});


router.use("/user",user.routes());



module.exports = router;