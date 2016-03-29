var fs = require('fs'),
  Path = require('path');

module.exports = {

  key: fs.readFileSync(Path.resolve(__dirname+'/../certs/private.key')),
  cert: fs.readFileSync(Path.resolve(__dirname+'/../certs/certificate.pem')),

};
