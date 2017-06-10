/**
 * JS for MaIOMan App Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/ui/app-ui.module.js');

/**
 * Define app-ui module
 **/
angular.module('app.ui', [])

/**
 * Define run
 **/
.run(['$rootScope', '$timeout', '$appUI', function($rootScope, $timeout, $appUI){
  console.log('Module app.ui::run ini');
  
  if ($appUI.isEnableMask()){
    //hide mask after content is loaded
    $rootScope.$on('$viewContentLoaded', $appUI.hideMask);
    console.log('Module app-ui::run setted to close bgLoadingMask  when rootScope trigger $viewContentLoaded');
    
    //show mask if route change
    $rootScope.$on('$locationChangeStart', $appUI.showMask);
    console.log('Module app-ui::run setted to open bgLoadingMask  when rootScope trigger $locationChangeStart');
  } else {
    $appUI.hideMask();
    console.log('Module app-ui::run hidden bgLoadingMask becouse is disabled');
  }
  
  console.log('Module app-ui::run end');
}]);

/**
 * Load dependecies
 **/
_load(['js/core/ui/app-ui.provider.js']);

console.log('Loaded js/core/ui/app-ui.module.js!');