/**
 * JS for MaIOMan App Auth Config
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.auth')
.config(function ($routeProvider, $appLoggerProvider) {
  $appLoggerProvider.log('App-auth::config ini');
  
  // Set routes
  $routeProvider
  .when("/login", {
    css: 'js/core/auth/css/signin.css', 
    templateUrl: "js/core/auth/views/login.html", 
    controller: "loginController"
  });
  
  $appLoggerProvider.log('App-auth::config end');
});