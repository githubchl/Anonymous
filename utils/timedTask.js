const DB = require("../module/db.js");
const {getNowFormatDate} = require("./dateUtil");

let config = {

    interval: 1, //间隔天数，间隔为整数

    runNow: true, //是否立即运行

    time: "00:00:01" //执行的时间点 时在0~23之间

};



//新增一条数据
async function task() {
    let currentDate = getNowFormatDate();

    //type1为用户数量，type2为打开次数
    let rs = await DB.find("count", {date: currentDate,type:1,flag:2});

    if (!rs || rs.length == 0) {
        console.log("创建新记录");
        DB.insert("count", {count: 0, date: currentDate,type:1,flag:2})
    }else{
        console.log("不创建新记录");
    }

    //currentDate = "2020-06-28";
    let result = await DB.find("count", {date: currentDate,type:2,flag:2});


    if (!result || result.length == 0) {
        console.log("创建新记录");
        DB.insert("count", {count: 0, date: currentDate,type:2,flag:2})
    }else{
        console.log("不创建新记录");
    }


}


function timeoutFunc(config,  func) {
    console.log("开始运行定时任务");
    config.runNow && func();

    let nowTime = new Date().getTime();

    let timePoints = config.time.split(':').map(i => parseInt(i));

    let recent = new Date().setHours(...timePoints);

    recent >= nowTime || (recent += 24 * 3600000);

    setTimeout(() => {

        func;

        setInterval(func, config.interval * 3600000)

    }, recent - nowTime);//recent - nowTime
}


function startTask() {
    timeoutFunc(config, task);
}


module.exports = startTask;