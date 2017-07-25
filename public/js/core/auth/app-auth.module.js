/**
 * JS for MaIOMan App Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-auth module
 **/
angular.module('app.auth', ['ngCookies'])

/**
 * Run module
 **/
.run(function ($rootScope, $location, $cookieStore, $http, $appAuth, $log) {
  $log.log('App-auth::run ini...');
  
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($appAuth.isLogged()) {
      $log.info('App-auth::run renovating user credentials headers. globals: ' + JSON.stringify($rootScope.globals));
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  // Check exists userdata
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      if ($location.path() === '/login'){
        return;
      }
      $log.log('App-auth::run Checking user auth... in path: ' + $location.path());
      // redirect to login page if not logged in
      if (!$appAuth.isLogged()) {
          $log.warn('App-auth::run Redirecting to /login becouse no userdata founded');
          $location.path('/login');
      }
  });
  
  $log.log('App-auth::run end');
});

/**
 * Load dependecies
 **/
_load([
  'js/core/auth/app-auth.config.js',
  'js/core/auth/app-auth.components.js',
  'js/core/auth/app-auth.factory.js',
  'js/core/auth/app-auth-base64.factory.js',
  'js/core/auth/app-auth.controllers.js'
]);