/**
 * JS for MaIOMan App Module
 *
 * To Does:
 * - Loads services dinamically (https://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs)
 *
 * @author: manu.martor@gmail.com
 * @repository: https://github.com/manumartor/app-dashboard-skeleton.git
 * @version: 1.0.0
 **/
console.log('Loading js/app.js');
angular.module('app', ['ngRoute', 'angularCSS', 'app.ui', 'app.history', 'app.auth'])

/**
* Define App Main Controller
*/
.controller('appMainController', function ($scope, $location, $http, $window) {
  console.log("Controller App::appMainController ini");
  
  console.log("Controller App::appMainController end");
})

/**
* Define App Home Page Controller
*/
.controller('appHomeController', function ($scope, $location, $http) {
  console.log("Controller App::appHomeController ini");
  
  $scope.msg = 'Próximamente...';
  
  console.log("Controller App::appHomeController end");
})

/**
* Define App 404 Page Controller
*/
.controller('app404Controller', function ($scope, $location, $http, $appHistory) {
  console.log("Controller App::app404Controller ini");
  
  $scope.lastPath = $appHistory.getLastHistory();
  
  console.log("Controller App::app404Controller end");
})

/**
 * Run module
 **/
.run(['$rootScope', '$timeout', function($rootScope, $timeout){
  console.log('Module App::run ini');
  
  
  console.log('Module App::run end');
}]);

/**
 * Load dependecies
 **/
_load(['js/core/app-core.config.js']);

console.log('Loaded js/app.js!');