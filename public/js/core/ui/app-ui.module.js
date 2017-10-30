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
.run(function($rootScope, $location, $timeout, $log, appUI){
    $log.log('App.ui::run ini');
  
  //set ui loading Mask
  if (appUI.mask.isLoadingEnable()){
      //hide mask after content is loaded
      $rootScope.$on('$viewContentLoaded', function() { 
          appUI.mask.hide();
      });
      $log.log('App-ui::run setted to close bgLoadingMask  when rootScope trigger $viewContentLoaded');
    
      //show mask if route change
      $rootScope.$on('$locationChangeStart', function() {
          appUI.mask.showLoading();
      });
      $log.log('App-ui::run setted to open bgLoadingMask  when rootScope trigger $locationChangeStart');
    
      //bind a href to
      $rootScope.$on('$locationChangeSuccess', function(){
        //alert('yeee');
      });
  } else {
      appUI.mask.hide();
      $log.log('App-ui::run hidden bgLoadingMask becouse is disabled');
  }

  // Set windows system clone
  $rootScope.$on('$viewContentLoaded', function(){
      appUI.windowLayer.clone($location.path());
  });
  $log.log('App-ui::run setted to close bgLoadingMask  when rootScope trigger $viewContentLoaded');
  
  //set ui net status change advisor
  if (appUI.isNetChangeAdvisorEnable()){
    $rootScope.$on('$appNetGoUp', appUI.showGoUpMessage);
    $rootScope.$on('$appNetGoDown', appUI.showGoDownMessage);
  }
  
  //fix container content size
  appUI.fixContainerContensSize();

  //add close icon to nw-view window layer
  appUI.windowLayer.setCloseIcon('.windowLayer');

  //add icon settings in desktop
  appUI.desktop.addIcon('My Settings', 'img', '/settings');
  
  $log.log('App-ui::run end');
});

/**
 * Load dependecies
 **/
_load([
  'js/core/ui/app-ui.factory.base.js',
  'js/core/ui/app-ui.factory.desktop.js',
  'js/core/ui/app-ui.factory.mask.js',
  'js/core/ui/app-ui.factory.window.js',
  'js/core/ui/app-ui.controllers.js',
  'js/core/ui/app-ui.config.js'
]);