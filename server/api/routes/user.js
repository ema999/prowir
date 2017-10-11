var express = require('express');
var router = express.Router();

var routes = {
  getUser : '/user'
}

/* GET. */
router.get(routes.getUser, function(req, res, next) {

  res.status(200).jsonp({hola: 'hola'});

});

module.exports = router;
