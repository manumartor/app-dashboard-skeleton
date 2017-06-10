/**
 * JS for MaIOMan App Auth Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/auth/app-auth.provider.js');

/**
 * Define provider
 **/
angular.module('app.auth')
.provider("$appAuth", [function (){
  console.log('Provider App-auth::$appAuthProvider ini');
  
  this.$get = ['Base64', '$location', '$http', '$cookieStore', '$rootScope', '$timeout', function (Base64, $location, $http, $cookieStore, $rootScope, $timeout) {
    console.log('Factory App-auth::$appAuth ini');
    
    var service = {};
    service.login = function (email, password, callback) {
      console.log('Service App-auth::login ini');
      
      /* Dummy authentication for testing, uses $timeout to simulate api call
       ----------------------------------------------*/
      $timeout(function(){
          var response = { success: email === 'test@test' && password === 'test' };
          if(!response.success) {
              response.message = 'Username or password is incorrect';
          }
          callback(response);
      }, 1000);


      /* Use this for real authentication
       ----------------------------------------------*/
      //$http.post('/api/authenticate', { username: username, password: password })
      //    .success(function (response) {
      //        callback(response);
      //    });
      
      console.log('Service App-auth::login end');
    };
    
    service.isLogged = function(){
      console.log('Service App-auth::isLogged ini');
      
      console.log('Service App-auth::isLogged end');
      return $rootScope.globals.currentUser || false;
    };

    service.setCredentials = function (username, password) {
      console.log('Service App-auth::setCredentials ini');
      
      var authdata = Base64.encode(username + ':' + password);

      $rootScope.globals = {
          currentUser: {
              username: username,
              authdata: authdata
          }
      };

      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
      $cookieStore.put('globals', $rootScope.globals);
      
      console.log('Service App-auth::setCredentials end');
    };

    service.clearCredentials = function () {
      console.log('Service App-auth::clearCredentials ini');
      
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic ';
      
      console.log('Service App-auth::clearCredentials end');
    };
    
    console.log('Factory App-auth::$appAuth end');
    return service;
  }];
  console.log('Provider App-auth::$appAuthProvider end');
}]);

console.log('Loaded js/core/auth/app-auth.provider.js!');