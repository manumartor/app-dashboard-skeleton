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
        //when content ends loadings hide mask
        $rootScope.$on('$viewContentLoaded', function() { 
            //appUI.mask.hide();
        });
        //$log.log('App-ui::run setted to close bgLoadingMask  when rootScope trigger $viewContentLoaded');
    
        //if route change show mask
        $rootScope.$on('$locationChangeStart', function() {
            appUI.mask.showLoading();
        });
        $log.log('App-ui::run setted to open bgLoadingMask  when rootScope trigger $locationChangeStart');
    
        //after receive response from server
        $rootScope.$on('$locationChangeSuccess', function(){
            //alert('yeee');
        });
        $log.log('App-ui::run setted to open bgLoadingMask  when rootScope trigger $locationChangeSuccess');
    } else {
        appUI.mask.hide();
        $log.log('App-ui::run hidden bgLoadingMask becouse is disabled');
    }

    // After load view content set windows system to clone
    $rootScope.$on('$viewContentLoaded', function(){
        appUI.windowLayer.clone($location.path());
    });
    $log.log('App-ui::run setted to clone ng-view in his layer and close bgLoadingMask when rootScope trigger $viewContentLoaded');
  
    //set ui net status change advisor
    if (appUI.isNetChangeAdvisorEnable()){
        $rootScope.$on('$appNetGoUp', appUI.showGoUpMessage);
        $rootScope.$on('$appNetGoDown', appUI.showGoDownMessage);
    }
  
    //fix container content size
    appUI.fixContainerContensSize();


    $timeout(function() {
        //add close icon to nw-view window layer
        appUI.windowLayer.setCloseIcon('.windowLayer');

        //add icon settings in desktop
        appUI.desktop.addIcon('Mi Perfil', 'fa-user-circle', '/myprofile');
        appUI.desktop.addIcon('Mi Configuración', 'fa-cog', '/myconfig');
    }, 200);
  
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
    'js/core/ui/app-ui.directives.js',
    'js/core/ui/app-ui.controllers.js',
    'js/core/ui/app-ui.config.js'
]);