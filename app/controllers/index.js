/**
 * Created by silasmartinez on 8/4/15.
 */

export default ngModule => {
  require('./mainController')(ngModule);
  require('./adminController')(ngModule);
  require('./profileController')(ngModule);
  require('./visibilityController')(ngModule);

};
