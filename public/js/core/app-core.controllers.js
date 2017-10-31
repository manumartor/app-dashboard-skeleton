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
.controller('appHomeController', function ($rootScope, $scope, $timeout, $log, appUI) {
  $log.log("App-ui::appHomeController ini");
  appUI.windowLayer.fullscreenOut('.windowLayer');
  $timeout(function(){
      appUI.windowLayer.moveTopCenter();
      appUI.windowLayer.show();
  }, 100);

  $scope.msg = 'Bienvenido a la App Web/Mobile Dashboard Skeleton';
  
  $log.info("App-ui::appHomeController end");
})

/**
* Define headerLayerController
*/
.controller('headerLayerController', function ($window, $scope, $rootScope, $log, $location, appAuth, appUI) {
  $log.log("App-ui::headerLayerController ini");
  
  //expose isLogged to scope to show profile picture or not
  $scope.isLogged = appAuth.isLogged();
  
  //bind show user profile image to log on
  $rootScope.$on('appAuthLoginOK', function(){
    $scope.isLogged = appAuth.isLogged();
    $rootScope.$emit('$appHeaderViewLoaded');
  });
  
  //bind hidden user profile to image to login off
  $rootScope.$on('appAuthLoginKO', function(){
    $scope.isLogged = appAuth.isLogged();
  });
  
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
.controller('contentsLayerController', function ($scope, $log) {
  $log.log("App-ui::contentsLayerController ini");
  
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
  appUI.windowLayer.moveTopLeft();
  appUI.windowLayer.show();
  appUI.windowLayer.fullscreenIn('.windowLayer');
  
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