/**
 * JS for MaIOMan App Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/history/app-history.module.js');

/**
 * Define app-history module
 **/
angular.module('app.history', [])

/**
 * Define run
 **/
.run(['$rootScope', '$timeout', '$appUI', '$appHistory', function($rootScope, $timeout, $appUI, $appHistory){
  console.log('Module app-history::run ini');
  
  $rootScope.$on('$locationChangeSuccess', $appHistory.setHistory);
  
  console.log('Module app-history::run end');
}]);

/**
 * Load dependecies
 **/
_load(['js/core/history/app-history.provider.js']);

console.log('Loaded js/core/history/app-history.module.js!');