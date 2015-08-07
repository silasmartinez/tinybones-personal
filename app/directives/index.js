/**
 * Created by silasmartinez on 8/3/15.
 */
export default ngModule => {
  require('./hello/my-hello')(ngModule);
  require('./grid/repo-grid')(ngModule);
  require('./page-heading/page-heading')(ngModule);
  require('./repo-edit/repo-edit')(ngModule);
};
