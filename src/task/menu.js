var setting = require('../lib/setting');
var api = require('../api');
var log = require('../lib/log');

var create = function (req, res, next) {
  console.log('handle create');

  var menu = {};
  menu.button = [];
  menu.button[0] = {};
  menu.button[0].type = 'click';
  menu.button[0].name = '新闻中心';
  menu.button[0].key = 'E_NEWS';
  menu.button[1] = {};
  menu.button[1].type = 'click';
  menu.button[1].name = '产品中心';
  menu.button[1].key = 'E_PRODUCTS';
  menu.button[2] = {};
  menu.button[2].name = '服务中心';
  menu.button[2].sub_button = [];
  menu.button[2].sub_button[0] = {};
  menu.button[2].sub_button[0].type = 'click';
  menu.button[2].sub_button[0].name = '公司简介';
  menu.button[2].sub_button[0].key = 'E_INTRODUCTION';
  menu.button[2].sub_button[1] = {};
  menu.button[2].sub_button[1].type = 'click';
  menu.button[2].sub_button[1].name = '公司优势';
  menu.button[2].sub_button[1].key = 'E_ADVANTAGE';
  menu.button[2].sub_button[2] = {};
  menu.button[2].sub_button[2].type = 'click';
  menu.button[2].sub_button[2].name = '公司信仰';
  menu.button[2].sub_button[2].key = 'E_FAITH';
  menu.button[2].sub_button[3] = {};
  menu.button[2].sub_button[3].type = 'click';
  menu.button[2].sub_button[3].name = '联系我们';
  menu.button[2].sub_button[3].key = 'E_CONTACT';

  console.log(JSON.stringify(menu));
  
  api.menu_create(setting.get('access_token'), menu, function(api_result, content) {
    console.log('api menu_create result come');
    if(api_result === false) {
      console.log('api menu_create result: false');
    }
    else {
      if(content) {
        log.write('menu_create', content);
      }
      res.write(api_result.statusCode.toString());
      res.write('\n');
      res.write(content);
      res.write('\n');
      res.end();

      if(api_result.statusCode == 200) {
        var result = JSON.parse(content.toString());
        if(result['errcode']) {
          console.log('errcode: ', result.errcode, 'errmsg', result.errmsg);
        }
      }
    }
  });
};

var get = function (req, res, next) {
  console.log('handle get');
  
  api.menu_get(setting.get('access_token'), function(api_result, content) {
    console.log('api menu_get result come');
    if(api_result === false) {
      console.log('api menu_get result: false');
    }
    else {
      if(content) {
        log.write('menu_get', content);
      }
      res.write(api_result.statusCode.toString());
      res.write('\n');
      res.write(content);
      res.write('\n');
      res.end();

      if(api_result.statusCode == 200) {
        var result = JSON.parse(content.toString());
        if(result) {
          console.log('menu: ', result);
        }
      }
    }
  });
};

var del = function (req, res, next) {
  console.log('handle delete');
  
  api.menu_delete(setting.get('access_token'), function(api_result, content) {
    console.log('api menu_delete result come');
    if(api_result === false) {
      console.log('api menu_delete result: false');
    }
    else {
      if(content) {
        log.write('menu_delete', content);
      }
      res.write(api_result.statusCode.toString());
      res.write('\n');
      res.write(content);
      res.write('\n');
      res.end();

      if(api_result.statusCode == 200) {
        var result = JSON.parse(content.toString());
        if(result['errcode']) {
          console.log('errcode: ', result.errcode, 'errmsg', result.errmsg);
        }
      }
    }
  });
};

module.exports.create = create;
module.exports.get = get;
module.exports.del = del;