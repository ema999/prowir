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

UserController.editUser = function(id, data, callback){
  var userService = new UserService();

  userService.editUser(id, data, function(err, userEdited){
    if (err) return callback(err)
    callback(null, userEdited);
  })

}

UserController.getUser = function(id, callback){
  var userService = new UserService();

  userService.getUser(id, function(err, user){
    if (err) return callback(err)
    callback(null, user);
  })

}

UserController.search = function(options, callback){
  var userService = new UserService();

  userService.search(options, function(err, users){
    if (err) return callback(err)
    callback(null, users);
  })

}

UserController.deleteUsers = function(users, callback){
  var userService = new UserService();

  userService.deleteUsers(users, function(err, result){
    if (err) return callback(err)
    callback(null, result);
  })

}

module.exports = UserController;
