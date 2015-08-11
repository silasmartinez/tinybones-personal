/**
 * Created by silasmartinez on 8/4/15.
 */
export default ngModule => {
  require('./repoService')(ngModule);
  require('./userService')(ngModule);
};
