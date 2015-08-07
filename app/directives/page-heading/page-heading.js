/**
 * Created by silasmartinez on 8/3/15.
 */
export default ngModule => {
  ngModule.directive('pageHeading', () => {
    require('./page-heading.css');
    return {
      restrict: 'E',
      template: require('./page-heading.html'),
      controller: 'ProfileController'
    };
  });
};
