/**
 * JS for MaIOMan App Users Controllers
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('users')

/**
 * Define users ini controller
 */
.controller('usersIniController', ['$log', function ($log) {
  $log.log("Users::usersIniController ini");
  
  $log.info("Users::usersIniController end");
}])

/**
* Define users view controller
*/
.controller('usersViewController',['$log', '$routeParams', '$rootScope', function ($log, $routeParams, $rootScope) {
  $log.log("Users::usersViewController ini");
  
  $rootScope.userid = $routeParams.userid;
  
  $log.info("Users::usersViewController end");
}]);