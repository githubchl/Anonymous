var router = require('koa-router')();
const DB = require("../../module/db.js");
const {getNowFormatDate} = require("../../utils/dateUtil");

const UserDao = require("../../module/api/user.js");

const userDao = new UserDao();


router.post('/login', async (ctx,next)=>{
	let result = {
	    code: 200,
	    data: {
	      msg: '注册成功',
	    }
	  };
	let param = ctx.request.body;
	//console.log(param);
	if(!param.phone){
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
		result = await userDao.login(param);
	}catch(err){
		result.code = -1;
		result.data.msg = "登录失败";
	}
	ctx.body = result;
});

router.post('/regist', async (ctx,next)=> {
	let result = {
	    code: 200,
	    data: {
	      msg: '注册成功',
	    }
	  };
	let param = ctx.request.body;
	//console.log(param);
	if(!param.phone){
		result.code = -1;
		result.data.msg = "手机号码为空";
		ctx.body = result;
		return;
	}
	if(!param.username){
		result.code = -1;
		result.data.msg = "用户名为空";
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
		result = await userDao.regist(param);
        addCount();
		ctx.body = result;
	}catch(err){
		result.code = -1;
		result.data.msg = "注册失败";
	}
	
});


async function addCount(){
    let result = await DB.find("count", {flag: 1, type:1});
    // console.log(result);
    //更新
    if (result && result.length > 0) {
        let count = result[0].count;
        await DB.update("count", {flag: 1,type:1}, {count: count + 1})
    } else {//插入
        await DB.insert("count", {flag: 1, type:1,count: 1})
    }

    let currentDate = getNowFormatDate();
    let rs = await DB.find("count", {date: currentDate, flag: 2,type:1});
    if (rs && rs.length > 0) {
        let count = rs[0].count;
        await DB.update("count", {date: currentDate, flag: 2,type:1}, {count: count + 1})
    } else {
        console.log("创建新记录");
        await DB.insert("count", {count: 0, date: currentDate, flag: 2,type:1})
    }
}


module.exports = router;