var fs = require('fs');

var write = function(name, content, fn) {
  fs.writeFile('../../log/' + name, JSON.stringify(mSetting), function (err) {
    if (err) throw err;
    fn(true);
  });
}

module.exports.write = write;