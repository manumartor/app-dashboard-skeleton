/**
 * JS for MaIOMan App history Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define $apphistoryProvider provider
 **/
angular.module('app.history')
.factory('$appHistory', function(appCfg, $cfgAppHistoryEnable, $log){
  $log.log('App-history::$appHistory ini');

  //ini vars
  var history = [],
    services = {};
  
  /**
   * Definde setHistory service
   **/
  services.setHistory =  function(event, next, current){ 
    $log.log('App-history::setHistory ini');

    //add current route to history
    history.push(next);

    $log.log('App-history::setHistory end');
  };

  /**
   * Definde getLastHistory service
   **/
  services.getLastHistory = function (event, next, current) {
    $log.log('App-history::getLastHistory ini');

    //get last route
    $log.log('App-history::getLastHistory end');
    return history[history.length - 2];
  };

  /**
   * Definde isEnableHistory service
   **/
  services.isEnableHistory = function () {
    $log.log('App-history::isEnableHistory ini');

    //return isEnableHistory
    $log.log('App-history::isEnableHistory end');
    return appCfg.getCfg('history_enable', $cfgAppHistoryEnable);
  };

  /**
   * Definde setEnableHistory service
   **/
  services.setEnableHistory = function (flag) {
    $log.log('App-history::setEnableHistory ini');

    //set enableHistory to flag
    $cfgAppHistoryEnable = flag;

    $log.log('App-history::setEnableHistory end');
  };

  $log.log('App-history::$appHistory end');
  return services;
});