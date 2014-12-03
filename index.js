var Hapi = require('hapi');

var server = new Hapi.Server(9000);

server.route({
  method  : 'GET',
  path    : '/icons',
  handler : require('./routes/icons').get
});

server.start(function () {
  console.log('Server running at', server.info.uri);
});