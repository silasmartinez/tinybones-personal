var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/repos');
  //var db = req.db;
  //var localRepos = db.get('repositories');
  //console.log(req.session.isAdmin)
  //
  //
  //if (req.session.isAdmin) {
  //  var getRepos = axios.get('https://api.github.com/users/silasmartinez/repos')
  //
  //    .then(function (response) {
  //      localRepos.find({}, function (err, docs) {
  //
  //        response.data.forEach(function (repository) {
  //          var hasMatch = false;
  //          docs.forEach(function (dbRepo) {
  //            if (repository.name == dbRepo.name) {
  //              hasMatch = true
  //            }
  //          })
  //          if (!hasMatch) {
  //            localRepos.insert(repository, function (err, doc) {
  //              if (err) {console.log(err)}
  //            })
  //          }
  //        })
  //        var showRepos = response.data
  //        res.render('index', { title: 'Repositories', repos: response.data});
  //
  //      })
  //    })
  //
  //} else {
  //  localRepos.find({}, function (err, repos) {
  //    if (err) {
  //      res.render('error',err);
  //    }
  //    res.render('index', {title: 'Repositories', repos: repos})
  //  })
  //}

});

router.get('/styleguide', function (req, res, next) {
  res.render('styleguide');
})

module.exports = router;
