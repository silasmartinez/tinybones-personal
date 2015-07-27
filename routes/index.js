var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.db;
  var localRepos = db.get('repositories');
  var getRepos = axios.get('https://api.github.com/users/silasmartinez/repos')

    .then(function (response) {
      console.log(req.session.repocount);
      console.log(req.session);
      var repos = response.data;
      req.session.repocount = repos.length;
      res.render('index', { title: 'Repositories', repos: repos});
    })


});

router.get('/styleguide', function (req, res, next) {
  res.render('styleguide');
})


module.exports = router;
