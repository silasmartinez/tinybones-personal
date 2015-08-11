/**
 * Created by silasmartinez on 8/3/15.
 */

const angular = require('angular');
const app = angular.module('app', [require('angular-route')]);

require('./controllers')(app);
require('./services')(app);
require('./router')(app);
require('./directives')(app);
