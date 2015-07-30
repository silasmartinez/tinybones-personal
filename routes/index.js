var express = require('express');
var router = express.Router();
var faith = require('../lib/faith')
var axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/repos');
});

router.get('/styleguide', function (req, res, next) {
  res.render('styleguide');
});

router.get('/faith', function (req, res, next) {
  var testOfFaith = new faith;
  console.log(testOfFaith)
  testOfFaith.believe('silas', axios.get('https://api.github.com/users/silasmartinez/repos') )
  testOfFaith.believe('akyuna', axios.get('https://api.github.com/users/AkyunaAkish/repos') )
  testOfFaith.manifest().then(function (obj) {
    console.log(obj.silas)
  });
  res.redirect('/');
})

module.exports = router;
