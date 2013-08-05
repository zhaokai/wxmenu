var crypto = require('crypto');

function md5 (data, outputEncoding) {
  return crypto.createHash('md5').update(data).digest(outputEncoding?outputEncoding:'hex').toString();
};

module.exports = md5;