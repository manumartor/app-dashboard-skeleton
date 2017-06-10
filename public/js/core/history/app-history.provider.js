/**
 * JS for MaIOMan App history Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/history/app-history.provider.js');

/**
 * Define $apphistoryProvider provider
 **/
angular.module('app.history')
.provider('$appHistory', [function(){
  console.log('Provider app-history::$appHistoryProvider ini');
  
  //history config;
  var history = [];
  
  /**
   * Define $apphistory factory
   **/
  this.$get = [function(){
    console.log('Factory app-history::$appHistory ini');
    
    var services = {};
    /**
     * Definde setHistory service
     **/
    services.setHistory =  function(event, next, current){ 
      console.log('Service app-history::setHistory ini');
      
      //add current route to history
      history.push(next);
      
      console.log('Service app-history::setHistory end');
    };
    
    /**
     * Definde getLastHistory service
     **/
    services.getLastHistory = function (event, next, current) {
      console.log('Service app-history::getLastHistory ini');
      
      //get last route
      console.log('Service app-history::getLastHistory end');
      return history[history.length - 2];
    };
    
    console.log('Factory app-history::$appHistory end');
    return services;
  }];
  
  console.log('Provider app-history::$appHistoryProvider end');
}]);

console.log('Loaded js/core/history/app-history.provider.js!');