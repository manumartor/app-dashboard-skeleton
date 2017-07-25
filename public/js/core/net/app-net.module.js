/**
 * JS for MaIOMan App Net Module
 *
 * 3th Party Dependencies:
 * - JSBandwidth: https://github.com/beradrian/jsbandwidth
 * - JSBandwidth original: https://code.google.com/archive/p/jsbandwidth/
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-net module
 **/
angular.module('app.net', [])

/**
 * Define run
 **/
.run(function($log, $appNet, $window, $rootScope, $appCfg, $cfgAppNetSpeedTestOnLoad){
  $log.log('Module app-net::run ini');
  
  //log network status
  $log.info('Module app-net::run network is: ' + $appNet.isNetUp());
  //log server status
  $appNet.isSrvUp(function(timeResponse){
    $log.info('Module app-net::run server is: ' + (timeResponse !== false) + '. Time: ' + timeResponse + 'ms. in response');
  });
  //log network bandwidth
  if ($appCfg.getCfg('net_speedTestOnLoad', $cfgAppNetSpeedTestOnLoad)){
    $appNet.testSpeed(function(response){
      if (!response){
        $log.info('Module app-net::run downloadTest fails!');  
        return false;
      }
      var resp = {
        "downSpeed": response.downTest.downSpeedString,
        "upSpeed": response.upTest.upSpeedString,
        "testDuration": Math.floor((response.duration / 1000) * 100) / 100 + " s."
      }
      $log.info('Module app-net::run downloadTest resp: ' + JSON.stringify(resp));
    });
  }
  
  //bind network status changes with our customs events and set on the net change advisor if it's active by config
  $window.addEventListener("online", function() {
    $log.log('Module app-net::run trigerred online event');
    $rootScope.$emit("$appNetGoUp");
  }, true);
	
  $window.addEventListener("offline", function() {
    $log.log('Module app-net::run trigerred offline event');
	  $rootScope.$emit("$appNetGoDown");
  }, true);
	
	//@todo: programmatically do a ping to srv each x seconds for try to do a full test connection
  
  $log.log('Module app-net::run end');
});
/**
 * Load dependecies
 **/
_load([
  'js/core/net/app-net.factory.js',
]);