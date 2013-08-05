var querystring = require('querystring');
var fs = require('fs');

var mSetting = {};

var load = function(fn) {
  fs.exists('./cache/settings', function (exists) {
    if(exists) {
      fs.readFile('./cache/settings', function (err, data) {
        if (err) throw err;
        
        if(data.toString().length > 0) {
          mSetting = JSON.parse(data.toString());
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

var save = function(fn) {
  fs.writeFile('./cache/settings', JSON.stringify(mSetting), function (err) {
    if (err) throw err;
    fn && fn(true);
  });
}

var set = function(name, value) {
  mSetting[name] = value;
  return true;
}

var get = function(name) {
  if(mSetting[name]) {
    return mSetting[name];
  }
  else {
    return null;
  }
};

var getall = function() {
  var settingstring = querystring.stringify(mSetting, '; ', '=');
  return settingstring;
};

var clean = function() {
  mSetting = {};
};

module.exports.load = load;
module.exports.save = save;
module.exports.set = set;
module.exports.get = get;
module.exports.getall = getall;
module.exports.clean = clean;