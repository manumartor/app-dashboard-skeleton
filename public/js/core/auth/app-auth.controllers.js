/**
 * JS for MaIOMan App Auth Controllers
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.auth')
.controller('loginController', function(appAuth, $log, $scope){
  $log.log('App-auth::loginController ini');
  //@todo: //https://github.com/sahat/satellizer
  
  $log.info('App-auth::loginController end');
})

.controller('loginLayerController', function(appAuth, $scope, $rootScope, $location, $log){
  $log.log('App-auth::loginLayerController ini');
  //@todo: //https://github.com/sahat/satellizer
  
  //1st of all clear credentials
  appAuth.clearCredentials();
  $rootScope.$emit('appAuthLoginKO');

  //set login function
  $scope.login = function () {
    $scope.dataLoading = true;
    appAuth.login($scope.email, $scope.password, function (response) {
      if (response.success) {
        appAuth.setCredentials($scope.email, $scope.password);
        $log.info('App-auth::loginLayerController logged OK');
        $location.path('/');
        $rootScope.$emit('appAuthLoginOK');
      } else {
        $scope.error = response.message;
        $scope.dataLoading = false;
        $log.warn('App-auth::loginLayerController logged KO');
      }
    });
  };
  
  $log.info('App-auth::loginLayerController end');
});