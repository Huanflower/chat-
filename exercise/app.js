`use strict`;
const http = require('http');
// 模板引擎
const artTemplate = require('art-template');
const path = require('path');
// 处理键值对
const querystring = require('querystring');
let myMsgs = [{
    nickname: '小六',
    msg: '哈喽，你好'
},{
    nickname: '小赵',
    msg: 'hello'
}];

let server = http.createServer((req,res)=>{
    // 判断究竟是form表单提交，加入一条消息
    // 还是首页访问，index.html渲染动态数据的内容
    if(req.method == 'GET' && req.url == '/'){
        let htmlStr = artTemplate(path.join(__dirname,'index.html'),{
           msgs: myMsgs 
        });
        res.end(htmlStr);
    }else if(req.method == 'POST' && req.url == '/sendMsg'){
        // 接受请求体数据
        req.on('data',data=>{
            let str = data.toString();
            let formObj = querystring.parse(str);
            // 将数据添加进数组
            myMsgs.push({
                nickname: formObj.nickname,
                msg: formObj.msg
            });

            // 响应页面数据
            let htmlStr = artTemplate(path.join(__dirname,'index.html'),{
                msgs: myMsgs
            });
            res.end(htmlStr);
        })
        
    }else {
        res.end('ok');

    }
})
server.listen(8888);