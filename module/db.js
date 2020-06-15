const MongoClient = require("mongodb").MongoClient; //mongodb数据库
const Config = require("./config.js");

class Db {
	//单例
	static getInstance() {
		if (!Db.instance) {
			Db.instance = new Db();
		}
		return Db.instance;
	}

	constructor() {
		this.dbClient = ""; //放db对象
		this.connect();
	}

	connect() {
		return new Promise((resolve, reject) => {
			//解决数据库多次连接的问题
			if (!this.dbClient) {
				MongoClient.connect(Config.dbUrl, (err, client) => {
					if (err) {
						reject(err);
					} else {
						let db = client.db(Config.dbName);
						this.dbClient = db;
						resolve(this.dbClient);
					}
				});
			} else {
				resolve(this.dbClient);
			}

		})

	}

	find(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				let result = db.collection(collectionName).find(json);
				result.toArray((err, docs) => {
					if (err) {
						reject(err);					
					}
					//console.log(docs);
					resolve(docs);
				})
			}).catch((err) => {
				reject(err);
			});
		})

	}

	update(collectionName, json1, json2) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).updateOne(json1,{
					$set:json2
				},(err,result)=>{
					if(err){
						reject(err);
					}else{
						resolve(result);
					}
				})
			});
		})
	}

	insert(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).insertOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			})
		})
	}
	
	remove(collectionName, json){
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).removeOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				})
			})
		});
	}
}


module.exports = Db.getInstance();

// let myDb = Db.getInstance();

// setTimeout(()=>{
// 	console.time("start1");
// 	myDb.find("user",{}).then((data)=>{
// 		console.timeEnd("start1");
// 	});
// },100);

// setTimeout(()=>{
// 	console.time("start2");
// 	myDb.find("user",{}).then((data)=>{
// 		console.timeEnd("start2");
// 	});
// },2000);



// let myDb2 = Db.getInstance();


// setTimeout(()=>{
// 	console.time("start3");
// 	myDb2.find("user",{}).then((data)=>{
// 		console.timeEnd("start3");
// 	});
// },4000);


// setTimeout(()=>{
// 	console.time("start4");
// 	myDb2.find("user",{}).then((data)=>{
// 		console.timeEnd("start4");
// 	});
// },6000);
