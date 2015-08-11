/**
 * Created by silasmartinez on 8/10/15.
 */

export default ngModule => {
  ngModule.controller('visibilityControl',
    function ($scope, $http, $location) {
      $scope.formData = {};

      $scope.submitForm = function () {
        console.log($scope.repoId);
        console.log($scope.formData);
        $http({
          url: '/api/' + $scope.repoId + '/update',
          data: $scope.formData,
          method: 'post'
        }).then(function (data) {
          console.log('OK', data);
          $location.path('/repos');

        }).catch(function (err) {
          'ERR', console.log(err);
        });
      };
    });
};
