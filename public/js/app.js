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
angular.module('app', ['ngRoute', 'angularCSS', 'app.ui', 'app.auth'])

/**
* App Main Controller
*/
.controller('appMainController', function ($scope, $location, $http, $window) {
  console.log("Controller App::appMainController ini");
  
  $scope.msg = 'Próximamente...';
  
  console.log("Controller App::appMainController end");
})

/**
* Controller for Home Page
*/
.controller('appPageController', function ($scope, $location, $http) {
  console.log("Controller App::appPageController ini");
  
  console.log("Controller App::appPageController end");
})

/**
* Controller for 404 Page
*/
.controller('app404Controller', function ($scope, $location, $http) {
  console.log("Controller App::app404Controller ini");
  
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