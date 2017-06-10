/**
 * JS for MaIOMan App UI Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/ui/app-ui.provider.js');

/**
 * Define $appUIProvider provider
 **/
angular.module('app.ui')
.provider('$appUI', [function(){
  console.log('Provider app-ui::$appAuthProvider ini');
  
  //mask config;
  var showMask = true;
  this.enableMask = function(flag){
    showMask = flag;
  };
  
  /**
   * Define $appUI factory
   **/
  this.$get = ['$timeout', function($timeout){
    console.log('Factory app-ui::$appUI ini');
    
    var services = {};
    
    /**
     * Definde hideMask service
     **/
    services.hideMask =  function(event){ 
      console.log('Service app-ui::hideMask ini');
      
      $timeout(function(){
        $('.bgLoadingMask').hide();
        console.log('Service app-ui::hideMask closed bgLoadingMask on rootScope $viewContentLoaded')
      }, 500);
      
      console.log('Service app-ui::hideMask end');
    };
    
    /**
     * Definde showMask service
     **/
    services.showMask = function (event, next, current) {
      console.log('Service app-ui::showMask ini');
      
      $('.bgLoadingMask').show();
      console.log('Service app-ui::showMask open bgLoadingMask on rootScope $locationChangeStart')
      
      console.log('Service app-ui::showMask end');
    };
    
    /**
     * Definde isEnableMask service
     **/
    services.isEnableMask = function(){
      console.log('Service app-ui::isEnableMask ini');
      
      console.log('Service app-ui::isEnableMask end');
      return showMask;
    }
    
    console.log('Factory App-ui::$appUI end');
    return services;
  }];
  console.log('Provider App-ui::$appAuthProvider end');
}]);

console.log('Loaded js/core/ui/app-ui.provider.js!');