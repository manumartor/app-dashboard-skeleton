/**
 * JS for MaIOMan App Auth Config
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/auth/app-auth.config.js');

/**
 * Define app-auth config
 **/
angular.module('app.auth')
.config(['$routeProvider', function ($routeProvider) {
  console.log('Module App-auth configuring...');
  // Set routes
  $routeProvider
  .when("/login", {
    css: 'js/core/auth/css/signin.css', 
    templateUrl: "js/core/auth/views/login.html", 
    controller: "loginController"
  });
  console.log('Module App-auth configured!!');
}]);

console.log('Loaded js/core/auth/app-auth.config.js!');