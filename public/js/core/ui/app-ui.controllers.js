/**
 * JS for MaIOMan App UI Controllers
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.ui')

/**
 * Define App 404 Page Controller
 */
.controller('appMyProfileController', function ($scope, $log, appHistory) {
  $log.log("App-ui::appMyProfileController ini");
  
  $log.info("App-ui::appMyProfileController end");
})

/**
 * Define App 404 Page Controller
 */
.controller('appMyConfigController', function ($scope, appHistory, $log) {
  $log.log("App-ui::appMyConfigController ini");
  
  $log.info("App-ui::app404Controller end");
})

/**
 * Define welcome Block Controller
 */
.controller('welcomeBlockController', function ($scope, appHistory, $log) {
  $log.log("App-ui::welcomeBlockController ini");
  
  $log.info("App-ui::welcomeBlockController end");
});