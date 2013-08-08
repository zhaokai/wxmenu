//var cookie = require('../lib/cookie');
var setting = require('../lib/setting');
var api = require('../api');
var log = require('../lib/log');
var url = require("url");
var querystring = require('querystring');

var handler = function (req, res, next) {
  console.log('handle get token');
  
  var query = url.parse(req.url).query;
  var appid = querystring.parse(query).appid;
  var secret = querystring.parse(query).secret;

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  api.token(appid, secret, function(api_result, content) {
    var ret = false;
    console.log('api token result come');
    if(api_result === false) {
      console.log('api token result: false');
    }
    else {
      console.log('api token result: true');
      if(content) {
        setting.set('appid', appid);
        setting.set('secret', secret);
        log.write('token', content);
      }
      res.write(api_result.statusCode.toString());
      res.write('\n');
      res.write(content);
      res.write('\n');
      res.end();

      if(api_result.statusCode == 200) {
        var result = JSON.parse(content.toString());
        if(result.access_token) {
          setting.set('access_token', result.access_token);
          setting.set('expires_in', result.expires_in);
          var now = Date.now();
          setting.set('expires_now', now);
          setting.set('expires_time', now + result.expires_in*1000);
          ret = true;
          console.log('got token: ', setting.get('access_token'), 'expires_in', setting.get('expires_in'), 'expires_time', setting.get('expires_time'));
        }
        else {
          console.log('errcode:', result['errcode'], 'errmsg', result['errmsg']);
        }
      }
    }
    if(ret) {
      //cookie.save(function(cookie_save_result) {
      //  console.log('token cookie saved!', cookie_save_result);
      //});
      setting.save(function(setting_save_result) {
        console.log('token setting saved!', setting_save_result);
      });
    }
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  });
};

module.exports = handler;