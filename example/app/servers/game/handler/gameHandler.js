var logger = require('pomelo-logger').getLogger('pomelo')

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.entry = function(msg, session, next) {
  next(null, {code: 200, msg: 'Welcome to pomelo 2.0.'});
};

Handler.prototype.increaseRooms = function(msg, session, next) {
  logger.debug('increasing rooms')
  this.app.numRooms++;
  return next(null)
}

Handler.prototype.decreaseRooms = function(msg, session, next) {
  logger.debug('decreasing rooms')
  this.app.numRooms--;
  return next(null)
}
