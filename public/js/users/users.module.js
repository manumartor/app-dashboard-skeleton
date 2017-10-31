/**
 * JS for MaIOMan App Users Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('users', [])

.run(function($rootScope, $timeout, $log, appUI){
  	$log.log('Users::run ini');
  
  	//add icon component to dashboard
  	appUI.desktop.addIcon('Usuarios', 'fa-users', '/users');
  	
  	$log.log('Users::run end');
});

/**
 * Load dependecies
 **/
_load([
  	'js/users/users.config.js',
  	'js/users/users.controllers.js'
]);