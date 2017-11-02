var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var AuthMiddleware = require('../../../middleware/authMiddleware');
var Validate = require('express-validation');
var userValidation = require('../validations/user.js');
var PermissionService = require('../../../../services/permissionService.js');

var routes = {
  getUsers : '/',
  getUser : '/:id',
  login   : '/login',
  getCurrentAccount: '/current',
  editUser: '/:id',
  search: '/search',
  deleteUsers: '/delete',
}

var authMiddleware = new AuthMiddleware();
var permissionService = new PermissionService();

router.get(routes.getUsers, authMiddleware.isLogged, function(req, res) {

  permissionService.hasPermission('getUsers', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp({hola: 'hola'});

  });

});

router.get(routes.getCurrentAccount, authMiddleware.isLogged, function(req, res) {

  permissionService.hasPermission('getCurrentAccount', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.getCurrentAccount(req.get("authorization"), function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

router.post(routes.login, Validate(userValidation.login), function(req, res) {

  UserController.login(req.body.email, req.body.password, function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});

router.put(routes.editUser, authMiddleware.isLogged, Validate(userValidation.edit), function(req, res) {

  permissionService.hasPermission('editUser', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.editUser(req.params.id, req.body, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

router.get(routes.getUser, authMiddleware.isLogged, function(req, res) {

  permissionService.hasPermission('getUser', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.getUser(req.params.id, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

router.post(routes.search, authMiddleware.isLogged, Validate(userValidation.search), function(req, res) {

  permissionService.hasPermission('searchUsers', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.search(req.body, function(err, users){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(users);
    })

  });

});

router.post(routes.deleteUsers, authMiddleware.isLogged,  function(req, res) {

  permissionService.hasPermission('deleteUsers', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.deleteUsers(req.body, function(err, result){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(result);
    })

  });

});

module.exports = router;
