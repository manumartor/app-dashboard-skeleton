/**
 * JS for MaIOMan App UI Config
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.ui')

.config(function ($routeProvider) {
  //set routes
  $routeProvider
  .when("/myprofile", { 
    templateUrl: "js/core/ui/views/myprofile.html",
    controller: "appMyProfileController"})
  .when("/myconfig", { 
    templateUrl: "js/core/ui/views/myconfig.html",
    controller: "appMyConfigController"})
});