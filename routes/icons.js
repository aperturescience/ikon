var Finder    = require('../lib/find'),
    request   = require('request');

exports.get = function(req, reply) {

  request(req.query.url, function(err, res, body) {

    if (err)
      return reply(err);

    var icons = Finder.find(body);
    reply(icons);
  });

};
