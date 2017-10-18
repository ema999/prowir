var jwt = require('jwt-simple');

var AuthService = function(){

  AuthService.prototype.checkCredentials = function (username, password) {
    return true;
  }
}

module.exports = AuthService;
