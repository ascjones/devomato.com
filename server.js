var express = require('express');
var server = express();

server.use(express.logger());
server.use(express.static('devomato.com'));
server.listen(3000);