const jwt = require('jwt-simple');
const customError = require('../class/customError.js');
const AuthService = require('./authService.js');

var UserService = function(){

  UserService.prototype.getUserByToken = function (token, callback) {

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

  UserService.prototype.editUser = function (id, userData, callback) {

    if(Object.keys(userData).length === 0) return callback(null, {})

    var sql = 'UPDATE users SET id = '+id+' ';
    if (userData.first_name) sql += ', first_name = "'+ userData.first_name +'" ';
    if (userData.last_name) sql += ', last_name = "'+ userData.last_name +'" ';
    if (userData.email) sql += ' email = "'+ userData.email +'" ';
    sql += ' WHERE id = ' + id;

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      var result = JSON.parse(JSON.stringify(result));

      if (!result.affectedRows || result.affectedRows != 1) return callback(new customError('userDontExist'));

      callback(null, true)
    })

  }

  UserService.prototype.getUser = function (id, callback) {

    if ( isNaN(parseInt(id)) ) return callback(new customError('invalidParams'));

    var sql = 'select email, id, first_name, last_name from users where id ='+id;

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      var result = JSON.parse(JSON.stringify(result));

      if (!result[0]) return callback(new customError('userDontExist'));

      callback(null, result[0])
    })

  }


}

module.exports = UserService;
