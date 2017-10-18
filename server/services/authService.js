var jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

var AuthService = function(){

  AuthService.prototype.checkCredentials = function (email, password, callback) {
    var that = this;
    var sql = 'select email, password from users where email ="'+email+'"';

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      var result = JSON.parse(JSON.stringify(result));

      if (!result[0]) return callback({error: 'Usuario o Clave incorrecta'});

      that.compareHash(result[0].password, password, function(err, res){
        if (!res) return callback({error: 'Usuario o Clave incorrecta'});
        callback(null, res)
      });

      return true;
    })

  }

  AuthService.prototype.compareHash = function (hash, password, callback) {
    bcrypt.compare(password, hash, function(err, res) {
      if (err) return callback(err);
      callback(null, res)
    });
  }

  AuthService.prototype.hash = function (password, callback) {
    bcrypt.hash(password, 5, function(err, hash) {
      if (err) return callback(err)
      callback(null, hash)
    });
  }

}

module.exports = AuthService;
