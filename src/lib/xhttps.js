var https = require('https');
var cookie = require('./cookie');

var get_headers = { 'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
  'accept-encoding': 'gzip, deflate',
  connection: 'keep-alive'
  //'cache-control': 'max-age=0'
};

var post_headers = { 'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0',
  //Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  accept: 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
  'accept-encoding': 'gzip, deflate, sdch',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'x-requested-with': 'XMLHttpRequest',
  connection: 'keep-alive',
  pragma: 'no-cache',
  'cache-control': 'no-cache'
};

var set_getheaders = function(name, value) {
  get_headers[name] = value;
}

var set_postheaders = function(name, value) {
  post_headers[name] = value;
}

// GBK字符集实际长度计算
var getGBKStrLeng = function(str) {
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) { 
            realLength += 1;
        }else{ 
            // 如果是中文则长度加2
            realLength += 2;
        }
    } 
    return realLength;
}

// UTF8字符集实际长度计算
var getUTF8StrLeng = function(str) {
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) { 
            realLength += 1;
        }else{ 
            // 如果是中文则长度加3
            realLength += 3;
        }
    } 
    return realLength;
}

var get = function(hostname, port, path, fn) {
  var options = {
    method: 'GET',
    hostname: hostname,
    port: port,
    path: path,
  };

  console.log('GET: ' + hostname + ':' + port + path);

  if(cookie.getall().length > 0) {
    set_getheaders('Cookie',cookie.getall());
  }
  console.log('GET headers:', get_headers);
  options['headers'] = get_headers;

  var req = https.request(options, function(res) {
    console.log('RES statusCode: ', res.statusCode);
    console.log('RES headers: ', res.headers);
    res.setEncoding('utf8');
    if(cookie.setall(res.headers['set-cookie'])) {
      cookie.save();
    }

    res.on('data', function(data) {
      fn('data', data);
    });

    res.on('end', function() {
      fn('end', res);
    });
  }).on('error', function(e) {
    fn('error', e);
  });

  req.end();
}

var post = function(hostname, port, path, buf, fn) {
  var options = {
    method: 'POST',
    hostname: hostname,
    port: port,
    path: path,
  };

  console.log('POST: ' + hostname + ':' + port + path, buf);

  if(cookie.getall().length > 0) {
    set_postheaders('Cookie',cookie.getall());
  }

  set_postheaders('Content-Length', getUTF8StrLeng(buf.toString()));
  console.log('POST headers: ', post_headers);
  options['headers'] = post_headers;

  var req = https.request(options, function(res) {
    console.log('RES statusCode: ', res.statusCode);
    console.log('RES headers: ', res.headers);
    res.setEncoding('utf8');
    if(cookie.setall(res.headers['set-cookie'])) {
      cookie.save();
    }

    res.on('data', function(data) {
      fn('data', data);
    });

    res.on('end', function() {
      fn('end', res);
    });
  }).on('error', function(e) {
    fn('error', e);
  });

  req.write(buf.toString());
  req.end();
}

module.exports.get = get;
module.exports.post = post;
module.exports.set_getheaders = set_getheaders;
module.exports.set_postheaders = set_postheaders;