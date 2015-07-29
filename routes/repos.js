var express = require('express');
var router = express.Router();
var axios = require('axios');
var wroth = require('wroth');

var admin = wroth.sessionHas('isAdmin', '/')

router.get('/', function (req, res, next) {
  var db = req.db;
  var localRepos = db.get('repositories');
  var getLocalRepos = localRepos.find({})
    .then(function (docs) {
      res.render('index', {title: 'Repositories', repos: docs});
    }
  )
});

router.get('/admin', admin(), function (req, res, next) {
  var db = req.db;
  var localRepos = db.get('repositories');
  var getLocalRepos = localRepos.find({})
    .then(function (docs) {
      res.render('repos/admin', {title: 'Repositories', repos: docs});
    }
  )
})

router.get('/:id/edit', admin(), function (req, res, next) {
  var localRepos = req.db.get('repositories');
  localRepos.findById(req.params.id)
    .then(function (doc) {
      res.render('repos/edit', doc)
    })
})

router.post('/:id/update', admin(), function (req, res, next) {
  var dbUpdates = [];
  var localRepos = req.db.get('repositories');
  console.log(req.body)
  if (req.body.npm) {
    dbUpdates.push(localRepos.updateById(req.params.id, {$set: {npm: 1}}));
  } else {
    dbUpdates.push(localRepos.updateById(req.params.id, {$unset: {npm: 1}}));
  }
  if (req.body.visible) {
    dbUpdates.push(localRepos.updateById(req.params.id, {$set: {visible: 1}}));
  } else {
    dbUpdates.push(localRepos.updateById(req.params.id, {$unset: {visible: 1}}));
  }
  if (req.body.localNotes) {
    dbUpdates.push(localRepos.updateById(req.params.id, {$set: {localNotes: req.body.localNotes}}))
  } else {
    dbUpdates.push(localRepos.updateById(req.params.id, {$unset: {localNotes: 1}}));
  }
  Promise.all(dbUpdates)
    .then(function () {
      res.redirect('/repos/admin');
    })
})

router.get('/reset', admin(), function (req, res, next) {
  var localRepos = req.db.get('repositories');

  localRepos.remove({})
    .then(function () {
      axios.get('https://api.github.com/users/silasmartinez/repos')
        .then(function (response) {
          localRepos.find({}, function (err, docs) {
            var inserts = [];
            response.data.forEach(function (repository) {
              var hasMatch = false;
              docs.forEach(function (dbRepo) {
                if (repository.name == dbRepo.name) {
                  hasMatch = true
                }
              })
              if (!hasMatch) {
                inserts.push(localRepos.insert(repository))
              }
            })
            Promise.all(inserts)
              .then(function () {
                res.redirect('/repos/admin');
              })
          })
        })
    })
})

module.exports = router;
