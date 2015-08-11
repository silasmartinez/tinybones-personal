/**
 * Created by silasmartinez on 8/10/15.
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
};
