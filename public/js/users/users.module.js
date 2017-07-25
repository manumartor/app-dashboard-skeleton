/**
 * JS for MaIOMan App Users Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('users', [])
.config(function ($routeProvider) {
  
  //set routes
  $routeProvider
  .when("/users", {
    templateUrl: "js/users/views/users.html", 
    controller: "usersIniController"
  });
  
})
.run(function($compile, $window, $log){
  $log.log('Users::run ini');
  
  //add icon component to dashboard
  $('.container.contens').append('<div class="dashboardIconLayer users"><a href="#!/users">Hola</a></div>');
  
  //add window component to .container.content
  $('.container.contens').append('<div class="desktopWinLayer users"><post-link-directive></post-link-directive></div>');
  
  $log.log('Users::run end');
});

/**
 * Load dependecies
 **/
_load([
  'js/users/users.controllers.js'
]);