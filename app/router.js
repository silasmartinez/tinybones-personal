/**
 * Created by silasmartinez on 8/4/15.
 */

export default ngModule => {
  ngModule.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/repos', {
          template: require('./partials/repos.html'),
          controller: 'MainController'
        })
        .when('/repos/admin', {
          template: require('./partials/repos.html'),
          controller: 'AdminController'
        })
        .when('/repos/:repoId', {
          template: require('./partials/repoEdit.html'),
          controller: 'AdminController'
        })
        .otherwise({
          redirectTo: '/repos'
        });
    }
  ]);
};
