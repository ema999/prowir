var express = require('express');
var router = express.Router();
var PostModel = require('./../models/post');

/* GET posts listing. */
router.get('/', function(req, res, next) {

  var post = new PostModel();

  post.content = 'un contenido';

  PostModel.find({}, function (err, docs) {
    res.status(200).jsonp(docs);
  });

});

module.exports = router;
