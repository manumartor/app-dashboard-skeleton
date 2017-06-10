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
console.log('Loading js/core/app-core.config.js');

/**
* Define Configure
*/
angular.module('app')
.config(['$locationProvider', '$routeProvider', '$injector', '$compileProvider', '$appUIProvider', function ($locationProvider, $routeProvider, $injector, $compileProvider, $appUIProvider) {
  console.log('Module App configuring...');
  
  //disable Mask on each page change
  //$appUIProvider.enableMask(false);
  
  //active Angular Debug info
  //$compileProvider.debugInfoEnabled(true);
  
  //set locationProvider config
  $locationProvider.hashPrefix('!');
  //$locationProvider.html5Mode(true);
  
  //set routes
  $routeProvider
  .when("/", {
    templateUrl: "views/home.html", 
    controller: "appHomeController"
  })
  .when("/404", {
    css: 'css/404.css',
    templateUrl: "views/404.html", 
    controller: "app404Controller"})
  //set otherwise
  .otherwise({redirectTo: '/404'});
  
  console.log('Module App Configured!');
}]);

console.log('Loaded js/core/app-core.config.js!');