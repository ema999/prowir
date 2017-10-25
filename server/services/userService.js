const jwt = require('jwt-simple');
const customError = require('../class/customError.js');
const AuthService = require('./authService.js');

var UserService = function(){

  UserService.prototype.getUserByToken = function (token, callback) {
    var that = this;

    var authService = new AuthService();
    authService.decodeToken(token, function(err, data){
      if (err) throw err;

      var payload = data.payload;
      var sql = 'select email, id, first_name, last_name from users where id ='+payload.id+'';

      conexionDB.query(sql, function (err, result) {
        if (err) throw err;

        var result = JSON.parse(JSON.stringify(result));

        if (!result[0]) return callback(new customError('userDontExist'));

        callback(null, result[0])
      })

    });

  }


}

module.exports = UserService;
