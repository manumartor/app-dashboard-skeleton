/**
 * JS for MaIOMan App Logger Module
 *
 * Info de referencia:
 * - https://cmatskas.com/logging-with-angularjs-extending-the-built-in-logger/
 * - https://docs.angularjs.org/api/ng/filter/date
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-logger module
 **/
angular.module('app.logger', [])

/**
 * Define config
 **/
.config(function($logProvider, $appLoggerProvider, $cfgAppDebug) {
  $appLoggerProvider.log('App-logger::config ini');  
  
  //enable log
  $logProvider.debugEnabled($cfgAppDebug);
  
  $appLoggerProvider.log('App-logger::config end');
});

/**
 * Load dependecies
 **/
_load([
  'js/core/logger/app-logger.constants.js',
  'js/core/logger/app-logger.decorator.js',
  'js/core/logger/app-logger.provider.js'
]);