var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.db;

  var getRepos = axios.get('https://api.github.com/users/silasmartinez/repos')

    .then(function (response) {
      console.log(req.session.repocount);
      var repos = response.data;
      req.session.repocount = repos.length;
      res.render('index', { title: 'Express', repos: repos});
    })


});

module.exports = router;
