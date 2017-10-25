var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var AuthMiddleware = require('../../../middleware/authMiddleware');
var Validate = require('express-validation');
var userValidation = require('../validations/user.js');

var routes = {
  getUser : '/',
  login   : '/login',
  getCurrentAccount: '/current'
}

var authMiddleware = new AuthMiddleware();

router.get(routes.getUser, authMiddleware.isLogged, function(req, res) {

  res.status(200).jsonp({hola: 'hola'});

});

router.get(routes.getCurrentAccount, authMiddleware.isLogged, function(req, res) {

  UserController.getCurrentAccount(req.get("authorization"), function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});

router.post(routes.login, Validate(userValidation.login), function(req, res) {

  UserController.login(req.body.email, req.body.password, function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});

module.exports = router;
