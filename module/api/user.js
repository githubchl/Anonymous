const MongoClient = require("mongodb").MongoClient; //mongodb数据库
const DB = require("../db.js");

class UserDao {
		
	login(param){
		return new Promise((resolve, reject) => {
			let result = {
				code: 200,
				data: {
				  msg: '登录成功',
			}};
			DB.connect().then((db) => {
				let result = db.collection("user").find(param);
				result.toArray((err, docs) => {
					if (err) {
						reject(err);					
					}
					if(docs.length>0){
						resolve(result);
					}else{
						result.code = -1;
						result.data.msg ="登录失败";
						resolve(result);
					}
					
				})
			}).catch((err) => {
				reject(err);
			});
		})
	}
	
	 async regist(param){
		return new Promise((resolve, reject) => {
			let result = {
				code: 200,
				data: {
				  msg: '注册成功',
			}};
			DB.connect().then((db) => {
				console.log(param);
				let data = db.collection("user").find({"phone":param.phone});
				data.toArray(async (err, docs) => {
					if (err) {
						reject(err);					
					}else{
						if(docs.length>0){
							result.code = -1;
							result.data.msg ="注册失败，手机号码已被注册";
							resolve(result);
						}else{
							try{
								let data = await DB.insert("user",param);
								resolve(result);
							}catch(err){
								resolve(err);
							}	
						}
									
					}
				})
			}).catch((err) => {
				reject(err);
			});
		})
	}
}

module.exports = UserDao;