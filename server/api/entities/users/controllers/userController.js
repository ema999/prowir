var AuthService = require('../../../../services/authService');
var UserService = require('../../../../services/userService');

var UserController = {};

UserController.login = function(email, password, callback){
  var authService = new AuthService();

  authService.checkCredentials(email, password, function(err, user){
    if (err) return callback(err)

    authService.generateToken(user, function(err, token){
      if (err) return callback(err)
      callback(null, {token: token});
    })

  })

}

UserController.getCurrentAccount = function(token, callback){
  var userService = new UserService();

  userService.getUserByToken(token, function(err,data){
    if (err) return callback(err)
    callback(null, data);
  })

}

module.exports = UserController;
