var xhttps = require('./lib/xhttps');

var host = 'api.weixin.qq.com';
var port = 443;

var get = function(path, fn) {
  console.log('start get...');
  var content;

  xhttps.get(host, port, path, function(cmd,data){
    switch(cmd) {
    case 'data':
      if(content) {
        content += data;
      }
      else {
        content = data;
      }
      break;
    case 'end':
      console.log('get end');
      console.log('typeof content:', typeof content);
      fn && fn(data,content);
      break;
    case 'error':
      fn && fn(false);
      console.log('error: ' + data);
      break;
    default:
      fn && fn(false);
      console.log('?');
      break;
    }
  });
}

var post = function(path, postdata, fn) {
  console.log('start post...');
  var content;
  xhttps.post(host, port, path, postdata.toString(), function(cmd,data){
    switch(cmd) {
    case 'data':
      if(content) {
        content += data;
      }
      else {
        content = data;
      }
      break;
    case 'end':
      console.log('post end');
      console.log('typeof content:', typeof content);
      fn && fn(data,content);
      break;
    case 'error':
      fn && fn(false);
      console.log('error: ' + data);
      break;
    default:
      fn && fn(false);
      console.log('?');
      break;
    }
  });
}

/* 获取凭证

接口说明

在使用通用接口前，你需要做以下两步工作：

1.拥有一个微信公众账号，并获取到appid和appsecret（在公众平台申请自定义菜单功能，开启开发者模式，填写URL与Token后获得）

2.通过获取凭证接口获取到access_token

注意：

access_token是第三方访问api资源的票据；
access_token对应于公众号是全局唯一的票据，重复获取将导致上次获取的access_token失效。

请求说明

http请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

参数说明
参数  是否必须  说明
grant_type  是   获取access_token填写client_credential
appid   是   第三方用户唯一凭证
secret  是   第三方用户唯一凭证密钥，既appsecret

返回说明

正确的Json返回结果:

{"access_token":"ACCESS_TOKEN","expires_in":7200}

参数  说明
access_token  获取到的凭证
expires_in  凭证有效时间，单位：秒

错误的Json返回示例:

{"errcode":40013,"errmsg":"invalid appid"}
*/
var token = function(appid, secret, fn) {
  console.log('start token...');
  get('/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret, fn);
}

/* 菜单创建

接口说明

通过POST一个特定结构体，实现在微信客户端创建自定义菜单。


请求说明

http请求方式：POST
https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN

请求示例

 {
     "button":[
     {  
          "type":"click",
          "name":"今日歌曲",
          "key":"V1001_TODAY_MUSIC"
      },
      {
           "type":"click",
           "name":"歌手简介",
           "key":"V1001_TODAY_SINGER"
      },
      {
           "name":"菜单",
           "sub_button":[
            {
               "type":"click",
               "name":"hello word",
               "key":"V1001_HELLO_WORLD"
            },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
       }]
 }

创建后效果:

创建后效果

参数说明
参数  是否必须  说明
button  是   按钮数组，按钮个数应为2~3个
sub_button  否   子按钮数组，按钮个数应为2~5个
type  是   按钮类型，目前有click类型
name  是   按钮描述，既按钮名字，不超过16个字节，子菜单不超过40个字节
key   类型为click必须  按钮KEY值，用于消息接口(event类型)推送，不超过128字节

返回说明

正确的Json返回结果:

{"errcode":0,"errmsg":"ok"}

错误的Json返回结果

{"errcode":40018,"errmsg":"invalid button name size"}
*/
var menu_create = function(access_token, menu, fn) {
  console.log('start menu_create...');
  post('/cgi-bin/menu/create?access_token=' + access_token, JSON.stringify(menu), fn);
}

/* 菜单查询

接口说明

查询当前使用的自定义菜单结构。

请求说明

http请求方式：GET
https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN

返回说明

对应创建接口，正确的Json返回结果:
{"menu":{"button":[{"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC","sub_button":[]},{"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","sub_button":[]},{"name":"菜单","sub_button":[{"type":"click","name":"hello word","key":"V1001_HELLO_WORLD","sub_button":[]},{"type":"click","name":"赞一下我们","key":"V1001_GOOD","sub_button":[]}]}]}}
*/
var menu_get = function(access_token, fn) {
  console.log('start menu_get...');
  get('/cgi-bin/menu/get?access_token=' + access_token, fn);
}

/* 菜单删除

接口说明

取消当前使用的自定义菜单。

请求说明

http请求方式：GET
https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN

返回说明

对应创建接口，正确的Json返回结果:
{"errcode":0,"errmsg":"ok"}
*/
var menu_delete = function(access_token, fn) {
  console.log('start menu_delete...');
  get('/cgi-bin/menu/delete?access_token=' + access_token, fn);
}

module.exports.get = get;
module.exports.post = post;
module.exports.token = token;
module.exports.menu_create = menu_create;
module.exports.menu_get = menu_get;
module.exports.menu_delete = menu_delete;