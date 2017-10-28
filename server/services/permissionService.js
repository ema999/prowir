const customError = require('../class/customError.js');
const AuthService = require('./authService.js');
const permissions = require('../config/permissions.js');

var PermissionService = function(){

  PermissionService.prototype.hasPermission = function (action, token, callback) {

    var authService = new AuthService();

    authService.decodeToken(token, function(err, data){
      if(err) callback(err);

      if(!permissions[data.payload.role][action]) return callback(new customError('forbidden'));

      callback(null, true);
    });

  }


}

module.exports = PermissionService;
