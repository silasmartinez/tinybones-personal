/**
 * Created by silasmartinez on 8/4/15.
 */

export default ngModule => {

  ngModule.controller('MainController',
    function ($scope, repoService) {
      $scope.repos = [];

      function applyRemoteData (newRepos) {
        $scope.repos = newRepos.repos;
      }

      loadRemoteData();

      function loadRemoteData () {
        repoService.getPublicRepositories()
          .then(
          function (repos) {
            applyRemoteData(repos);
          }
        );

      }
    }
  );

  ngModule.controller('AdminController',
    function ($scope, repoService, $routeParams) {
      $scope.repos = [];
      $scope.admin = '';

      function applyRemoteData (newRepos) {
        if ($routeParams.repoId) {
          $scope.repoId = $routeParams.repoId;
          var myRepo = newRepos.repos.filter(function (repo) {
            return repo._id == $routeParams.repoId;
          })
          $scope.repos = myRepo['0'];
        } else {
          $scope.admin = true;
          $scope.repos = newRepos.repos;

        }
      }

      loadRemoteData();

      function loadRemoteData () {
        repoService.getPrivateRepositories()
          .then(
          function (repos) {
            applyRemoteData(repos);
          }
        );

      }
    }
  );

  ngModule.controller('ProfileController',
    function ($scope, userService) {
      $scope.user = {};

      function applyRemoteData (profileData) {
        $scope.user = profileData.user;
      }

      loadRemoteData();

      function loadRemoteData () {
        userService.getProfileInfo()
          .then(
          function (profile) {
            applyRemoteData(profile);
          }
        );

      }
    }
  );

  ngModule.controller('visibilityControl',
    function ($scope, $http, $location) {

       $scope.formData = {
       }
      
      $scope.submitForm = function () {
        console.log($scope.repoId)
        console.log($scope.formData)
        $http({
          url: '/api/' + $scope.repoId + '/update',
          data: $scope.formData,
          method: 'post'
        }).then(function(data){

          console.log("OK", data);
          $location.path('/repos');

        }).catch(function(err){"ERR", console.log(err)})
      }
    });
};
