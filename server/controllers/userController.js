var AuthService = require('../services/authService');

var UserController = {};

UserController.login = function(username, password, callback){
  var authService = new AuthService();

  if( !authService.checkCredentials(username, password) ) return callback({error: 'Usuario o clave incorrectos'});
  callback(null, {token: username});
}

module.exports = UserController;
