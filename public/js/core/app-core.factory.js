/**
 * JS for MaIOMan App Core Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.core')
.factory('$appCore', function($log, $window, deviceDetector, detectUtils){
  $log.log('App-core::$appCore ini');

  var browser = $window.navigator.userAgent;
  var services = {};
  
  /**
   * Define getDevice services
   **/
  services.getDevice =  function(){ 
    $log.log('App-core::getDevice ini');

    $log.log('App-core::getDevice end');
    return detectUtils.isMobile()? deviceDetector.device: 'desktop';
  };
  
  /**
   * Define getOS services
   **/
  services.getOS =  function(){ 
    $log.log('App-core::getOS ini');

    $log.log('App-core::getOS end');
    return deviceDetector.os;
  };
  
  /**
   * Define getBrowser services
   **/
  services.getBrowser =  function(){ 
    $log.log('App-core::getBrowserString ini');

    $log.log('App-core::getBrowserString end');
    return deviceDetector.browser;
  };

  /**
   * Define getBrowserString services
   **/
  services.getBrowserString =  function(){ 
    $log.log('App-core::getBrowserString ini');

    $log.log('App-core::getBrowserString end');
    //return browser;
    return JSON.stringify(deviceDetector.raw);
  };
  
  /**
   * Define isMobile service
   **/
  services.isMobile =  function(){ 
    $log.log('App-core::isMobile ini');

    $log.log('App-core::isMobile end');
    return detectUtils.isMobile();
  };
  
  /**
   * Define isAndroid service
   **/
  services.isAndroid =  function(){ 
    $log.log('App-core::isAndroid ini');

    $log.log('App-core::isAndroid end');
    return detectUtils.isAndroid();
  };
  
  /**
   * Define isMobile service
   **/
  services.isIOS =  function(){ 
    $log.log('App-core::isIOS ini');

    $log.log('App-core::isIOS end');
    return detectUtils.isIOS();
  };

  $log.log('App-CORE::$appCore end');
  return services;
});