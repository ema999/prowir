const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');

var AuthService = function(){

  this.secret = 'fe1a32ffon3if31915a379f3be5394b64dasdasd14794932';

  AuthService.prototype.checkCredentials = function (email, password, callback) {
    var that = this;
    var sql = 'select email, password, id, first_name, last_name from users where email ="'+email+'"';

    conexionDB.query(sql, function (err, result) {
      if (err) throw err;

      var result = JSON.parse(JSON.stringify(result));

      if (!result[0]) return callback({error: 'Usuario o Clave incorrecta'});

      that.compareHash(result[0].password, password, function(err, res){
        if (!res) return callback({error: 'Usuario o Clave incorrecta'});
        callback(null, result[0])
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

  AuthService.prototype.generateToken = function (user, callback) {
    var payload = { email: user.email, id: user.id, first_name: user.first_name, last_name: user.last_name };
    var expires = moment().add(20, 'hours').unix();

    var token = jwt.encode({
      iat: moment().unix(),
      exp: expires,
      payload: payload
    }, this.secret);

    if (!token) return callback({error: 'Error al generar el token'});
    callback(null, token);
  }

  AuthService.prototype.checkToken = function (token, callback) {
    try {
      if (jwt.decode(token, this.secret)) return callback(null, true);
    }
    catch(err) {
      return callback({error: 'Invalid token'});
    }
  }

}

module.exports = AuthService;
