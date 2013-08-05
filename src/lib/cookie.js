var querystring = require('querystring');
var fs = require('fs');

var mCookie = {};
var mFilter = {};

var load = function(fn) {
  fs.exists('./cache/cookies', function (exists) {
    if(exists) {
      fs.readFile('./cache/cookies', function (err, data) {
        if (err) throw err;
        
        if(data.toString().length > 0) {
          mCookie = JSON.parse(data.toString());
          fn && fn(true);
        }
        else {
          fn && fn(false);
        }
      });
    }
    else {
      fn && fn(false);
    }
  });
}

var set_filter = function(filter, value) {
  mFilter[filter] = value;
}

var get_filter = function(filter) {
  if(mFilter[filter] && mFilter[filter] == true) {
    return true;
  }
  else {
    return false;
  }
}

var save = function(fn) {
  fs.writeFile('./cache/cookies', JSON.stringify(mCookie), function (err) {
    if (err) throw err;
    fn && fn(true);
  });
}

var set = function(name, value) {
  if(name) {
    if(get_filter(name)) return false;

    mCookie[name] = value;
    return true;
  }
  else {
    return false;
  }
}

var setall = function(set_cookie) {
  if(set_cookie) {
    var length = set_cookie.length;
    for(var i=0;i<length;i++) {
      var item = set_cookie[i].split(';')[0];
      var key = item.substr(0,item.indexOf('='));
      var value = item.substr(item.indexOf('=')+1);
      set(key, value);
    }
    return true;
  }
  return false;
};

var get = function(name) {
  if(mCookie[name]) {
    return mCookie[name];
  }
  else {
    return '';
  }
};

var getall = function() {
  //var cookiestring = querystring.stringify(mCookie, '; ', '=');
  var cookiestring = '';
  var length = mCookie.length;
  for(var key in mCookie) {
    cookiestring += key + '=' + mCookie[key] + '; ';
  }
  cookiestring += 'abcdef=123456';
  //console.log('get-cookie: ', cookiestring);
  return cookiestring;
};

var clean = function() {
  mCookie = {};
};

module.exports.load = load;
module.exports.save = save;
module.exports.set = set;
module.exports.get = get;
module.exports.setall = setall;
module.exports.getall = getall;
module.exports.clean = clean;
module.exports.set_filter = set_filter;
module.exports.get_filter = get_filter;