var util = require('util');
var messages = require('../config/messages');

var customError = function(message) {

  var messageObj = messages[message];

  this.name = message;
  this.message = messageObj.description;
  this.httpStatusCode = messageObj.httpStatus;

  //include stack trace in error object
  Error.captureStackTrace(this, this.constructor);
}

util.inherits(customError, Error);

module.exports = customError;
