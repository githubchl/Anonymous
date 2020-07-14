let router = require('koa-router')();
const fs = require("fs");
const path = require("path");
const user = require("./user.js");
const DB = require("../../module/db.js");
const {getNowFormatDate} = require("../../utils/dateUtil");


router.get('/', async (ctx, next) => {
    ctx.body = "哈哈哈啊";
});


router.post('/count', async (ctx, next) => {

    let result = await DB.find("count", {flag: 1, type:2});
    // console.log(result);
    //更新
    if (result && result.length > 0) {
        let count = result[0].count;
        await DB.update("count", {flag: 1,type:2}, {count: count + 1})
    } else {//插入
        await DB.insert("count", {flag: 1, type:2,count: 1})

    }

    let currentDate = getNowFormatDate();
    let rs = await DB.find("count", {date: currentDate, flag: 2,type:2});
    if (rs && rs.length > 0) {
        let count = rs[0].count;
        await DB.update("count", {date: currentDate, flag: 2,type:2}, {count: count + 1})
    } else {
        console.log("创建新记录");
        await DB.insert("count", {count: 0, date: currentDate, flag: 2,type:2})
    }

    ctx.body = {
        code: 200,
        data: {
            msg: '更新成功',
        }
    };
});

router.post('/upload', async (ctx, next) => {
    //console.log(ctx.request.files.video);
    try {
        const video = ctx.request.files.file;
        //创建可读流
        const reader = fs.createReadStream(video.path);
        let filePath = path.join(__dirname, '../../public/upload/') + `/${video.name}`;
        //创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            code: 200,
            data: {
                msg: '上传成功',
            }
        };
    }catch (e) {
        return ctx.body = {
            code: 200,
            data: {
                msg: '上传失败',
            }
        };
    }


});

router.use("/user", user.routes());


module.exports = router;