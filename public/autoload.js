/**
 * JS for autoload required MaIOMan App files and launch it
 *
 * @author: manu.martor@gmail.com
 * @repository: https://github.com/manumartor/app-dashboard-skeleton.git
 * @version: 1.0.0
 **/
$(document).ready(function(){

  //load external libraries (bootstrap, angular, font-awesome)
  _load([
    'vendors/bootstrap/v3.3.7/js/bootstrap.min.js',
    'vendors/bootstrap/v3.3.7/css/bootstrap-responsive.min.css',
    'vendors/font-awesome/v4.7.0/css/font-awesome.min.css'
  ], function(){

    //load angular modules
    _load([
      'vendors/angularjs/v1.6.4/angular.js',
      'vendors/angularjs/v1.6.4/angular-route.min.js',
      'vendors/angularjs/v1.6.4/angular-cookies.min.js',
      'vendors/angularcss/v1.0.8/angular-css.min.js'
    ], function(){

      //load app modules
      _load([
        'js/app.js',
        'js/core/ui/app-ui.module.js',
        'js/core/auth/app-auth.module.js'
      ], function(){

        //launch app
        angular.element(function() {
          console.log('Launching app!!');
          angular.bootstrap(document, ['app']);
        });

      });
    });
  });
});

//declare loader function
var _load = function(files, cbk){
  cbk  = cbk || function(){};
  try {
    var last_index = files.length - 1;
    $.each(files, function(index, value){
      //console.log('Loading file: ' + value);
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
      console.log('File loaded! File: ' + value);
      //If last index trigger callback
      if (index == last_index){    
        cbk();  
      }
    });
  } catch ($err){
    var msg = '<b>Exception throwed:</b> ' + (typeof $err.message != 'undefined'? $err.message: '');
    msg += typeof $err.line != 'undefined'? ' in line ' + $err.line: '';
    msg += typeof $err.column != 'undefined'? ' (col: ' + $err.column + ')': '';
    msg += typeof $err.sourceURL != 'undefined'? ' of file ' + $err.sourceURL: '';
    $(document.body).append('<div class="container error">' + msg + '</div>');
  }
};
