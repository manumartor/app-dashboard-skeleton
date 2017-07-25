/**
 * JS for MaIOMan App UI Controllers
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.ui')

/**
* Define App Home Page Controller
*/
.controller('appHomeController', function ($rootScope, $scope, $log) {
  $log.log("App-ui::appHomeController ini");
  
  $scope.msg = 'Próximamente...';
  
  $log.info("App-ui::appHomeController end");
})

/**
* Define headerLayerController
*/
.controller('headerLayerController', function ($window, $scope, $rootScope, $log, $location, $appAuth, $appUI) {
  $log.log("App-ui::headerLayerController ini");
  
  //expose isLogged to scope to show profile picture or not
  $scope.isLogged = $appAuth.isLogged();
  
  //bind show user profile image to log on
  $rootScope.$on('$appAuthLoginOK', function(){
    $scope.isLogged = $appAuth.isLogged();
    $rootScope.$emit('$appHeaderViewLoaded');
  });
  
  //bind hidden user profile to image to login off
  $rootScope.$on('$appAuthLoginKO', function(){
    $scope.isLogged = $appAuth.isLogged();
  });
  
  //bind logout link to ask is sure to log outer
  $scope.askLogout = function(){ 
    if ($window.confirm('Are you soure to logout?')){
      $location.path('/login');
    }
  };
  
  $rootScope.$emit('$appHeaderViewLoaded');
  
  $log.log("App-ui::headerLayerController end");
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
.controller('app404Controller', function ($scope, $appHistory, $log) {
  $log.log("App-ui::app404Controller ini");
  
  $scope.lastPath = $appHistory.getLastHistory();
  $log.error('App-ui::app404Controller path not found.' + ($scope.lastPath != null? ' Path: ' + $scope.lastPath: ''));
  
  $log.info("App-ui::app404Controller end");
})

/**
* Define App 404 Page Controller
*/
.controller('appMyProfileController', function ($scope, $appHistory, $log) {
  $log.log("App-ui::appMyProfileController ini");
  
  $log.info("App-ui::appMyProfileController end");
})

/**
* Define App 404 Page Controller
*/
.controller('appMyConfigController', function ($scope, $appHistory, $log) {
  $log.log("App-ui::appMyConfigController ini");
  
  $log.info("App-ui::app404Controller end");
});