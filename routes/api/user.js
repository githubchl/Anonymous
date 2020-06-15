var router = require('koa-router')();
const DB = require("../../module/db.js");

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
		ctx.body = result;
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
		ctx.body = result;
	}catch(err){
		result.code = -1;
		result.data.msg = "注册失败";
	}
	
});


module.exports = router;