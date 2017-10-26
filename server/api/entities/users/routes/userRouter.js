var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var AuthMiddleware = require('../../../middleware/authMiddleware');
var Validate = require('express-validation');
var userValidation = require('../validations/user.js');

var routes = {
  getUsers : '/',
  getUser : '/:id',
  login   : '/login',
  getCurrentAccount: '/current',
  editUser: '/:id'
}

var authMiddleware = new AuthMiddleware();

router.get(routes.getUsers, authMiddleware.isLogged, function(req, res) {

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

router.put(routes.editUser, authMiddleware.isLogged, Validate(userValidation.edit), function(req, res) {

  UserController.editUser(req.params.id, req.body, function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});

router.get(routes.getUser, authMiddleware.isLogged, function(req, res) {

  UserController.getUser(req.params.id, function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});

module.exports = router;
