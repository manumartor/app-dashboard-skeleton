/**
 * JS for autoload required MaIOMan App files and launch it
 *
 * @author: manu.martor@gmail.com
 * @repository: https://github.com/manumartor/app-dashboard-skeleton.git
 * @version: 1.0.0
 **/
$(document).ready(function(){
  var log = [];
  
  //load external libraries (bootstrap, angular, font-awesome)
  _load([
    'vendors/bootstrap/dist/js/bootstrap.min.js',
    'vendors/font-awesome/css/font-awesome.min.css',
    'vendors/angular/angular.js'
  ], function(_log){
    log = log.concat(_log);
    
    //load angular modules
    _load([
      'vendors/angular-route/angular-route.js',
      'vendors/angular-cookies/angular-cookies.js',
      'vendors/angular-css/angular-css.min.js',
      'vendors/oclazyload/dist/ocLazyLoad.min.js',
      'vendors/re-tree/re-tree.min.js',
      'vendors/ng-device-detector/ng-device-detector.min.js'
    ], function(_log){
      log = log.concat(_log);
      
      //load app modules
      _load([
        'js/app.js',
        'js/core/app-core.module.js',
        'js/core/logger/app-logger.module.js',
        'js/core/config/app-config.module.js',
        'js/core/net/app-net.module.js',
        'js/core/ui/app-ui.module.js',
        'js/core/history/app-history.module.js',
        'js/core/auth/app-auth.module.js'
      ], function(_log){
        log = log.concat(_log);
        
        //continue loading config.json, logs and launching app
        angular.element(function() {
          //load config.json
          $.ajax('config.json').done(function(response){
            log.push('autoload.js: Loaded config. Data: ' + JSON.stringify(response));
            
            //load logs
            angular.module('app.logger').config(function($appLoggerProvider){
              $appLoggerProvider.loadData(log); 
            });
            
            //set config
            angular.module('app.config').config(function($appCfgProvider){
              $appCfgProvider.loadCfg(response);
            });
            
            //launch app
            console.info('autoload.js: Launching app!!');
            angular.bootstrap(document, ['app']);
          }).fail(function(jqXHR){
            throw 'autoload.js: error loading config.json ' + JSON.stringify(jqXHR);
          });
        });
      });
    });
  });
});

//print error
var printError = function(message, file, line, column, error){
  var msg = '<b>JS Throw Exception:</b> ' + (typeof error != 'undefined'? error: message);
  msg += typeof line != 'undefined'? ' in line ' + line: '';
  msg += typeof column != 'undefined'? ' (col: ' + column + ')': '';
  msg += typeof file != 'undefined'? ' of file ' + file: '';
  $(document.body).append('<div class="container error">' + msg + '</div>');
};

//error catching
window.onerror = function (message, file, line, column, error) {
  printError(message, file, line, column, error);
  return false;
};

//declare loader function
var _load = function(files, cbk){
  cbk  = cbk || function(){};
  var last_index = files.length - 1;
  var log = [],
      error = false;
  
  $.each(files, function(index, value){
    //console.log('Loading file: ' + value);
    if (error){
      return;
    }
    
    try{
      //check that it's a locally file to prevent external injections
      var ini = value.substr(0, 3);
      if (ini != '../' && ini != 'js/'){
        throw ini + ' - Bad code injection detected. Path: ' + value;
      }

      //check if it's css or js
      var html = '';
      if (value.substr(value.length - 3) === 'css'){
        //load css
        html = '<link rel="stylesheet" type="text/css" href="' + value + '">';
      } else {
        //load js
        html = '<script type="text/javascript" src="' + value + '"></script>';
      }
      $(document.body).append(html);
      log.push('autoload.js: File loaded! File: ' + value);
      //If it's last index trigger callback
      if (index == last_index){    
        cbk(log);  
      }
    } catch(err){
      error = err;
      printError(err.message, err.sourceURL, err.line, err.column, error);
    }
  });
};
