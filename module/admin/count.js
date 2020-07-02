const DB = require("../db.js");

class CountDao {
    async findCountList(){
        return new Promise((resolve, reject) => {
            DB.connect().then((db) => {
                let data = db.collection("count").find({flag:2,type:2}).sort({date:1});
                data.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(docs);
                })
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = CountDao;