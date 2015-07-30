var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/repos');
});

router.get('/styleguide', function (req, res, next) {
  res.render('styleguide');
});

module.exports = router;
