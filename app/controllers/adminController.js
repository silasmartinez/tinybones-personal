/**
 * Created by silasmartinez on 8/10/15.
 */

export default ngModule => {
  ngModule.controller('AdminController',
    function ($scope, repoService, $routeParams) {
      $scope.repos = [];
      $scope.admin = '';

      function applyRemoteData (newRepos) {
        if ($routeParams.repoId) {
          $scope.repoId = $routeParams.repoId;
          var myRepo = newRepos.repos.filter(function (repo) {
            return repo._id == $routeParams.repoId;
          });
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
};
