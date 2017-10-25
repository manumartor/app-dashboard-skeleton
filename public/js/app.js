/**
 * JS for MaIOMan App Module
 *
 * To Does:
 * - Loads services dinamically (https://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs)
 * - Completly browser offline
 *
 * Info Best Practices:
 * - https://www.html5rocks.com/es/features/offline
 * - https://www.html5rocks.com/es/tutorials/appcache/beginner/
 * - http://www.anieto2k.com/2010/01/09/aplicaciones-web-offline-para-que-la-conexion-no-sea-problema/
 *
 * @author: manu.martor@gmail.com
 * @repository: https://github.com/manumartor/app-dashboard-skeleton.git
 * @version: 1.0.0
 **/
angular.module('app', ['app.core', 'app.logger', 'app.config', 'app.net', 'app.ui', 'app.history', 'app.auth'])

/*.directive('postLinkDirective', function($compile) {
  return {
    // REMEMBER, link is called AFTER nested elements have been compiled and linked!
    link: function(scope) {
          alert('hola');
          scope.msg = 'Hola';
          $('.desktopWinLayer.users').html($('.windowLayer').html());
          return scope; 
    }
  }
})*/

/**
 * Run module
 **/
.run(function($injector, $route, $log, $window, $rootScope, $ocLazyLoad, $timeout, appUI, appCfg, $appAuth, $location){
  $log.log('App::run ini');
  
  //say hellow to user
  if ($appAuth.isLogged()){
    $timeout(function(){
      appUI.showNotifyAlert({
        text: 'Welcome to ' + appCfg.getCfg('app_title') + '!!!',
        timeout: 5000
      });
    }, 1000);
  }

  //bind lazy load modules to load header end event
  var modulesLoaded = false;
  $rootScope.$on('$locationChangeStart', function(){
    //check user auth and if funct modules are loaded
    if ($appAuth.isLogged() && !modulesLoaded){
      var path = $location.path();
      $ocLazyLoad.load('js/users/users.module.js')
      .then(function(){
        //the problem is that functionality modules ends loads after $location.path check that exits route
        //so we have to check if route is diferent from /404 and if exists the route
        if ($location.path() == '/404' && path != '/404'){
          //get routes and loop over it to check originalPath
          for (var routeName in $route.routes) {
            if ($route.routes.hasOwnProperty(routeName)) {
                var route = $route.routes[routeName];
                if (typeof route.originalPath == 'string' && route.originalPath == path){
                    $location.path(path); 
                    return;
                }
            }
          }
        }
      });
      modulesLoaded = true;
    }
  });
  
  $log.log('App::run end');
});