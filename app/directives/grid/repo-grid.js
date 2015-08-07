/**
 * Created by silasmartinez on 8/3/15.
 */
export default ngModule => {
  ngModule.directive('repoGrid', () => {
    require('./repo-grid.css');
    return {
      restrict: 'E',
      template: require('./repo-grid.html')
    };
  });
};
