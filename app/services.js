/**
 * Created by silasmartinez on 8/4/15.
 */

export default ngModule => {
  ngModule.service('repoService',
    function ($http, $q) {
      // Return public API.
      return ({
        getPublicRepositories: getPublicRepositories,
        getPrivateRepositories: getPrivateRepositories
      });

      function getPublicRepositories () {
        var request = $http({
          method: 'get',
          url: '/api',
          params: {
            action: 'get'
          }
        });
        return (request.then(handleSuccess, handleError));
      }

      function getPrivateRepositories () {
        var request = $http({
          method: 'get',
          url: '/api/admin',
          params: {
            action: 'get'
          }
        });
        return (request.then(handleSuccess, handleError));
      }

      function handleError (response) {
        if (
          !angular.isObject(response.data) || !response.data.message
        ) {
          return ( $q.reject('An unknown error occurred.'));
        }
        return ( $q.reject(response.data.message));
      }
      function handleSuccess (response) {
        return ( response.data);
      }
    });

  ngModule.service('userService',
    function ($http, $q) {
      return ({
        getProfileInfo: getProfileInfo
      });

      function getProfileInfo () {
        var request = $http({
          method: 'get',
          url: '/api/profile',
          params: {
            action: 'get'
          }
        });
        return (request.then(handleSuccess, handleError));
      }

      function handleError (response) {
        if (
          !angular.isObject(response.data) || !response.data.message
        ) {
          return ( $q.reject('An unknown error occurred.'));
        }
        return ( $q.reject(response.data.message));
      }
      function handleSuccess (response) {
        return ( response.data);
      }
    });
}
;
