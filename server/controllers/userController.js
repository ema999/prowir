var AuthService = require('../services/authService');

var UserController = {};

UserController.login = function(email, password, callback){
  var authService = new AuthService();

  authService.checkCredentials(email, password, function(err, res){
    if (err) return callback(err)
    callback(null, {token: email});
  })

}

module.exports = UserController;
