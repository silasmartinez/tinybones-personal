var express = require('express');
var router = express.Router();
var axios = require('axios');
var wroth = require('wroth');

var admin = wroth.sessionHas('username', '/');

router.get('/', function (req, res, next) {
  var localRepos = req.db.get('repositories');
  localRepos.find({visible: {$exists: true}})
    .then(function (docs) {
      res.json({repos: docs});
    }
  );
});

router.get('/admin', admin(), function (req, res, next) {
  var localRepos = req.db.get('repositories');
  localRepos.find({'owner.login': req.session.username})
    .then(function (docs) {
      res.json({username: req.session.username, repos: docs});
    }
  );
});

router.get('/profile', admin(), function (req, res, next) {
  res.json({user: req.session});
});

router.post('/:id/update', admin(), function (req, res, next) {

  console.log('Got request:', req.body)
  var dbUpdates = [];
  var localRepos = req.db.get('repositories');
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
    dbUpdates.push(localRepos.updateById(req.params.id, {$set: {localNotes: req.body.localNotes}}));
  } else {
    dbUpdates.push(localRepos.updateById(req.params.id, {$unset: {localNotes: 1}}));
  }
  Promise.all(dbUpdates)
    .then(function () {
      res.redirect('/repos/admin');
    });
});

router.post('/reset', admin(), function (req, res, next) {
  var localRepos = req.db.get('repositories');

  localRepos.remove({'owner.login': req.session.username})
    .then(function () {
      axios.get('https://api.github.com/users/' + req.session.username + '/repos')
        .then(function (response) {
          localRepos.find({}, function (err, docs) {
            if (err) {
              res.render('error', err);
            }
            var inserts = [];
            response.data.forEach(function (repository) {
              var hasMatch = false;
              docs.forEach(function (dbRepo) {
                if (repository.name === dbRepo.name) {
                  hasMatch = true;
                }
              });
              if (!hasMatch) {
                inserts.push(localRepos.insert(repository));
              }
            });
            Promise.all(inserts)
              .then(function () {
                res.redirect('/repos/admin');
              });
          });
        });
    });
});

module.exports = router;
