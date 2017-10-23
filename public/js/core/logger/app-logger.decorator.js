/**
 * JS for MaIOMan App Logger Decorator
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-logger decorator
 **/
angular.module('app.logger')

.decorator('$log', function($delegate, $appLogger) {
  $appLogger.log('App-logger::$log ini');

  var methods = {
    error: $appLogger.error,
    log: $appLogger.log,
    info: $appLogger.info,
    warn: $appLogger.warn
  };

  $appLogger.log('App-logger::$log end');
  return methods;
});