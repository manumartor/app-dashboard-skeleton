/**
 * JS for MaIOMan App Config
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.core')
.config(function ($locationProvider, $routeProvider, $compileProvider, cfgAppDebug) {
  
  //active Angular Debug info
  $compileProvider.debugInfoEnabled(cfgAppDebug);
  
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
  .when("/myprofile", { 
    templateUrl: "js/core/ui/views/myprofile.html",
    controller: "appMyProfileController"})
  .when("/myconfig", { 
    templateUrl: "js/core/ui/views/myconfig.html",
    controller: "appMyConfigController"})
  //set otherwise
  .otherwise({redirectTo: '/404'});
});