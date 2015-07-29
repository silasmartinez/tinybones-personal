/**
 * Created by silasmartinez on 7/28/15.
 */
var authorize = {
  validUser: function (location) {
    if (typeof(location)==='undefined') location = '/';
    return function (req, res, next) {
      req.session.isAdmin ?
        next() :
        res.redirect(location);
    };
  }
};

module.exports = authorize;
