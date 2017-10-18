var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/userController');

var routes = {
  getUser : '/',
  login   : '/login'
}

router.get(routes.getUser, function(req, res) {

  res.status(200).jsonp({hola: 'hola'});

});

router.post(routes.login, function(req, res) {

  UserController.login(req.body.email, req.body.password, function(err, data){
    if(err) return res.status(500).jsonp(err);

    res.status(200).jsonp(data);
  })

});

module.exports = router;
