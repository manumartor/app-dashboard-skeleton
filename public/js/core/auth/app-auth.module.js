/**
 * JS for MaIOMan App Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/auth/app-auth.module.js');

/**
 * Define app-auth module
 **/
angular.module('app.auth', ['ngCookies'])

/**
 * Define the controllers
 **/

.controller('loginController', function($appAuth, $scope, $location){
  console.log('Controller App-auth::loginController ini');
  //@todo: //https://github.com/sahat/satellizer
  
  //clear credentials
  $appAuth.clearCredentials();

  //set login function
  $scope.login = function () {
    $scope.dataLoading = true;
    $appAuth.login($scope.email, $scope.password, function (response) {
      if (response.success) {
        $appAuth.setCredentials($scope.email, $scope.password);
        $location.path('/');
      } else {
        $scope.error = response.message;
        $scope.dataLoading = false;
      }
    });
  };
  
  console.log('Controller App-auth::loginController end');
})


/**
 * Define the component
 **/
.component('loginLayerComponent', {
  css: 'js/core/auth/css/signin.css',
  templateUrl: "js/core/auth/views/login.html", 
  controller: "loginController"
})

/**
 * Run module
 **/
.run(['$rootScope', '$location', '$cookieStore', '$http', '$compile', '$appAuth', function ($rootScope, $location, $cookieStore, $http, $compile, $appAuth) {
  console.log('Module App-auth::run ini...');
  
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
      console.log('Module App-auth::run renovating user credentials headers');
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  // Check exists userdata
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      if ($location.path() === '/login'){
        return;
      }
      console.log('Module App-auth::run Checking user auth... in path: ' + $location.path());
      // redirect to login page if not logged in
      if (!$rootScope.globals.currentUser) {
          console.log('Module App-auth::run Redirecting to /login becouse no userdata founded');
          $location.path('/login');
      }
  });
  console.log('Module App-auth::run end');
}]);

/**
 * Load dependecies
 **/
_load([
  'js/core/auth/app-auth.config.js',
  'js/core/auth/app-auth.provider.js',
  'js/core/auth/app-auth-base64.factory.js'
]);

console.log('Loaded js/core/auth/app-auth.module.js!');