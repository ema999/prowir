var express = require('express');
var router = express.Router();

var routes = {
  index : '/'
}

/* GET home page. */
router.get(routes.index, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
