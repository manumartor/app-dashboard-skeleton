/**
 * JS for MaIOMan App UI Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-ui module
 **/
angular.module('app.ui', [])

/**
 * Define run
 **/
.run(function($rootScope, $timeout, $appUI, $log){
  $log.log('App.ui::run ini');
  
  //set ui loading Mask
  if ($appUI.isLoadingMaskEnable()){
    //hide mask after content is loaded
    $rootScope.$on('$viewContentLoaded', $appUI.hideMask);
    $log.log('App-ui::run setted to close bgLoadingMask  when rootScope trigger $viewContentLoaded');
    
    //show mask if route change
    $rootScope.$on('$locationChangeStart', $appUI.showLoadingMask);
    $log.log('App-ui::run setted to open bgLoadingMask  when rootScope trigger $locationChangeStart');
    
    //bind a href to
    $rootScope.$on('$locationChangeSuccess', function(){
      
    });
  } else {
    $appUI.hideMask();
    $log.log('App-ui::run hidden bgLoadingMask becouse is disabled');
  }
  
  //set ui net status change advisor
  if ($appUI.isNetChangeAdvisorEnable()){
    $rootScope.$on('$appNetGoUp', $appUI.showGoUpMessage);
    $rootScope.$on('$appNetGoDown', $appUI.showGoDownMessage);
  }
  
  //fix container content size
  $appUI.fixContainerContensSize();
  
  $log.log('App-ui::run end');
});

/**
 * Load dependecies
 **/
_load([
  'js/core/ui/app-ui.factory.js',
  'js/core/ui/app-ui.controllers.js',
  'js/core/ui/app-ui.components.js'
]);