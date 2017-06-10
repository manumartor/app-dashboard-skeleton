/**
 * JS for MaIOMan App Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/ui/app-ui.module.js');

/**
 * Define app-auth module
 **/
angular.module('app.ui', [])

/**
 * Define provider
 **/

/**
 * Define run
 **/
.run(['$rootScope', '$timeout', function($rootScope, $timeout){
  console.log('Module app.ui::run ini');
  
  //hide mask after content is loaded
  $rootScope.$on('$viewContentLoaded', function(event){ 
    $timeout(function(){
      $('.bgLoadingMask').hide();
      console.log('Module app-ui::run closed bgLoadingMask on rootScope $viewContentLoaded')
    }, 1000);
  });
  //show mask if route change
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    $('.bgLoadingMask').show();
    console.log('Module app-ui::run open bgLoadingMask on rootScope $locationChangeStart')
  });
  console.log('Module app-ui::run setted bgLoadingMask close when rootScope $viewContentLoaded');
  
  console.log('Module app-ui::run end');
}]);

console.log('Loaded js/core/ui/app-ui.module.js!');