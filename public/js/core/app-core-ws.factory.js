/**
 * JS for MaIOMan App Core WS Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.core')
.factory('$appCoreWS', function($log, $cfgAppWsInternal){
  $log.log('App-core::$appCoreWS ini');

  var services = {};

  /**
   * Define call services
   **/
  services.call =  function(){ 
    $log.log('App-core::call ini');
    
    //it its internal ws cfg
    if ($cfgAppWsInternal){
      services.internalCall()
      $log.log('App-core::call end');
      return;
    }
    
    $log.log('App-core::call end');
  };
  
  /**
   * Define internalCall services
   **/
  services.internalCall =  function(){ 
    $log.log('App-core::internalCall ini');
    
    
    $log.log('App-core::internalCall end');
  };
  
  /**
   * Define getOpts service
   **/
  services.getOpts =  function(){ 
    $log.log('App-core::getOpts ini');


    $log.log('App-core::getOpts end');
  };
  
  /**
   * Define getCache service
   **/
  services.getCache =  function(){ 
    $log.log('App-core::getCache ini');


    $log.log('App-core::getCache end');
  };
  
  /**
   * Define setCache service
   **/
  services.setCache =  function(){ 
    $log.log('App-core::setCache ini');


    $log.log('App-core::setCache end');
  };

  $log.log('App-core::$appCoreWS end');
  return services;
});