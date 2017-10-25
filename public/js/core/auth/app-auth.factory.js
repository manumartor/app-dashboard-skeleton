/**
 * JS for MaIOMan App Auth Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define provider
 **/
angular.module('app.auth')
.factory("appAuth", function (Base64, $http, $cookieStore, $rootScope, $timeout, $log) {
  $log.log('App-auth::appAuth ini');

  var service = {};
  service.login = function (email, password, callback) {
    $log.log('App-auth::login ini');

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

    $log.log('App-auth::login end');
  };

  service.isLogged = function(){
    $log.log('App-auth::isLogged ini');

    $log.log('App-auth::isLogged end');
    return $rootScope.globals.currentUser || false;
  };

  service.setCredentials = function (username, password) {
    $log.log('App-auth::setCredentials ini');

    var authdata = Base64.encode(username + ':' + password);

    $rootScope.globals = {
        currentUser: {
            username: username,
            authdata: authdata
        }
    };

    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
    $cookieStore.put('globals', $rootScope.globals);

    $log.log('App-auth::setCredentials end');
  };

  service.clearCredentials = function () {
    $log.log('App-auth::clearCredentials ini');

    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic ';

    $log.info('App-auth::clearCredentials end');
  };

  $log.log('App-auth::appAuth end');
  return service;
});