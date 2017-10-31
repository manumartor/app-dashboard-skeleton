/**
 * JS for MaIOMan App UI Controllers
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.core')

/**
* Define App Home Page Controller
*/
.controller('appHomeController', function ($scope, $timeout, $log, appUI) {
  $log.log("App-ui::appHomeController ini");

  //set windowLayer
  appUI.windowLayer.fullscreenOut();
  $timeout(function(){
      appUI.windowLayer.setCloseIcon();
      appUI.windowLayer.show();
      appUI.windowLayer.moveTopCenter();
      appUI.windowLayer.resize(null, '400px', '200px');
  }, 100);

  $scope.msg = 'Bienvenido a la App Web/Mobile Dashboard Skeleton';
  
  $log.info("App-ui::appHomeController end");
})

/**
* Define headerLayerController
*/
.controller('headerLayerController', function ($window, $scope, $rootScope, $log, $location, appAuth, appUI) {
  $log.log("App-ui::headerLayerController ini");
  
  //bind logout link to ask is sure to log outer
  $scope.askLogout = function(){ 
    if ($window.confirm('Are you soure to logout?')){
      $location.path('/login');
    }
  };

  //bind dashboard link to hide all the window layers
  $scope.dashboard = function(){ 
    appUI.windowLayer.hide('.windowLayerStyle', 'fast');
  };

  $rootScope.$emit('$appHeaderViewLoaded');
  
  $log.log("App-ui::headerLayerController end");
})

/**
* Define the contents controller
*/
.controller('contentsLayerController', function ($rootScope, $scope, $log, appAuth) {
  $log.log("App-ui::contentsLayerController ini");
  
  //bind hidden user profile to image to login off
  $rootScope.$on('appAuthLoginKO', function(){
    $scope.isLogged = appAuth.isLogged();
  });

  $log.log("App-ui::contentsLayerController end");
})

/**
* Define footerLayerController
*/
.controller('footerLayerController', function ($scope, $log) {
  $log.log("App-ui::footerLayerController ini");
  
  $log.log("App-ui::footerLayerController end");
})

/**
* Define App 404 Page Controller
*/
.controller('app404Controller', function ($scope, appHistory, $log, appUI) {
  $log.log("App-ui::app404Controller ini");

  //set windowLayer
  appUI.windowLayer.show();
  appUI.windowLayer.moveTopLeft();
  appUI.windowLayer.setCloseIcon();
  appUI.windowLayer.fullscreenIn();
  
  $scope.lastPath = appHistory.getLastHistory();
  $log.error('App-ui::app404Controller path not found.' + ($scope.lastPath != null? ' Path: ' + $scope.lastPath: ''));
  $log.info("App-ui::app404Controller end");
})

/**
* Define the mask controller
*/
.controller('maskLayerController', function ($scope, $log) {
  $log.log("App-ui::maskLayerController ini");
  
  $log.log("App-ui::maskLayerController end");
})