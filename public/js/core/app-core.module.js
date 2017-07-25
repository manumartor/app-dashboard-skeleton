/**
 * JS for MaIOMan App Core Module
 *
 * 3th Party Modules Dependecies: 
 * - angularCSS: https://github.com/castillo-io/angular-css
 * - ng-device-detector: https://github.com/srfrnk/ng-device-detector
 * - re-tree: https://github.com/srfrnk/re-tree
 * - ocLazyLoad: https://oclazyload.readme.io
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-core module
 **/
angular.module('app.core', ['ngRoute', 'angularCSS', 'oc.lazyLoad', 'ng.deviceDetector'])

/**
 * Define run
 **/
.run(function($log, $appCore, $cfgAppDebug){
  $log.log('Module app-core::run ini');
  
  //log env info
  $log.info('App::run env info: {device: ' + $appCore.getDevice() + ', os: ' + $appCore.getOS() + ', browser: ' + $appCore.getBrowser() + '}');
  if ($cfgAppDebug){
    $log.log('App::run browser info: ' + $appCore.getBrowserString());
  }
  
  
  $log.log('Module app-core::run end');
});

/**
 * Load dependecies
 **/
_load([
  'js/core/app-core.config.js',
  'js/core/app-core.constants.js',
  'js/core/app-core.factory.js',
  'js/core/app-core-ws.factory.js'
]);