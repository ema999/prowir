var AuthService = require('../../../../services/authService');

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

module.exports = UserController;
