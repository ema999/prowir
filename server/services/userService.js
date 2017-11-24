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

    var sql = 'UPDATE users SET  ';
    if (userData.first_name) sql += ' first_name = "'+ userData.first_name +'" ';
    if (userData.last_name) sql += ', last_name = "'+ userData.last_name +'" ';
    if (userData.email) sql += ', email = "'+ userData.email +'" ';
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

  UserService.prototype.search = function (options, callback) {
    if(!options.limit) options.limit = 20;
    if(!options.page) options.page = 0;

    var sql = 'select email, id, first_name, last_name, role from users';

    // Pagination
    var end = options.limit * (options.page);
    if(options.limit) sql += ' LIMIT '+ options.limit +' OFFSET '+end ;

    this.getUsersTotal(function(err, total){

      conexionDB.query(sql, function (err, result) {
        if (err) throw err;

        var result = JSON.parse(JSON.stringify(result));

        if (!result[0]) return callback(null, {});

        callback(null, {users: result, aboutTotal: total})
      })

    });

  }

  UserService.prototype.getUsersTotal = function (callback) {

    var sql = 'select COUNT(id) AS total from users';

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      var result = JSON.parse(JSON.stringify(result));

      callback(null, result[0].total)
    })

  }

  UserService.prototype.deleteUsers = function (users, callback) {
    that = this;

    if (!users.length) return callback(new customError('invalidParams'));

    var usersId = '(';
    users.forEach(function(e, index){
      if(index > 0) usersId += ',';
      usersId += e.id
    });
    usersId += ')';

    var sql = 'DELETE FROM users WHERE id IN '+ usersId;

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      that.getUsersTotal(function(err, total){
        callback(null, {total: total})
      });

    })

  }

  UserService.prototype.addUser = function (user, callback) {
    that = this;

    if (!user) return callback(new customError('invalidParams'));

    var authService = new AuthService();

    authService.hash(user.password, function(err, hash){
      if (err) return callback(new customError('unknownError'));

      var sql = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES ';
      sql += '("'+user.first_name+'", "'+user.last_name+'", "'+user.email+'", "'+hash+'", "'+user.role+'")';

      conexionDB.query(sql, function (err, result) {
        if (err) throw err;

        callback(null, true);

      })

    });

  }


}

module.exports = UserService;
