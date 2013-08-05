var fs = require('fs');
var setting = require('../lib/setting');

/**   
* 格式化日期   
* <code>   
* yyyy-------年   
* MM---------月   
* dd---------日   
* hh---------时   
* mm---------分   
* formatDate(new Date() , 'yyyy-MM-dd mm:hh');   
* or formateDate(new Date(), 'yyyy/MM/dd mm/hh');   
* </code> * @param {Date}date 需要格式化的日期对象   
* @param {Object} style 样式   
* @return 返回格式化后的当前时间   
*/
var formatDate = function(date, style){
  var y = date.getFullYear();
  var M = "0" + (date.getMonth() + 1);
  M = M.substring(M.length - 2);
  var d = "0" + date.getDate();
  d = d.substring(d.length - 2);
  var h = "0" + date.getHours();
  h = h.substring(h.length - 2);
  var m = "0" + date.getMinutes();
  m = m.substring(m.length - 2);
  var s = "0" + date.getSeconds();
  s = s.substring(s.length - 2);
  return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
}

var write = function(name, content, fn) {
  var username = setting.get('username');
  fs.writeFile('./log/' + username + '_' + name + '_' + formatDate(new Date(Date.now()), 'yyyy-MM-dd_hh-mm-ss') + '.log', content, function (err) {
    if (err) throw err;
    fn && fn(true);
  });
}

module.exports.write = write;