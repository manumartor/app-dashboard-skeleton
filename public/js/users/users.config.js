/**
 * JS for MaIOMan App Users Config
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('users')

.config(function ($routeProvider) {
  
	//set routes
  	$routeProvider.when("/users", {
	    templateUrl: "js/users/views/users.html", 
	    controller: "usersIniController"
	});

});