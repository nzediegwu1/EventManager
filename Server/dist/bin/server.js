'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _http = require('http');

var http = _interopRequireWildcard(_http);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8080;
var server = http.createServer(_app2.default);

server.listen(port);
console.log('Server is up at ' + port);