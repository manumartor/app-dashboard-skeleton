/**
 * JS for MaIOMan App Logger Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.logger')
.provider('$appLogger', function($logProvider){
  var $this = this,
      logs = [],
      printingToConsole = false,
      printingToFile = false;
  
  /**
   * Define $appLogger factory
   **/
  this.$get = function($filter, LOGGER_LEVEL_ERROR, $cfgAppLoggerToConsoleEnable, $cfgAppLoggerToConsoleLevel, $cfgAppLoggerToFileEnable, $cfgAppLoggerToFileLevel) {

    var service = {
      error: function() {
        self.type = 'error';
        self.level = 0;
        log.apply(self, arguments);
      },
      warn: function() {
        self.type = 'warn';
        self.level = 1;
        log.apply(self, arguments);
      },
      info: function() {
        self.type = 'info';
        self.level = 2;
        log.apply(self, arguments);
      },
      log: function() {
        self.type = 'log';
        self.level = 3;
        log.apply(self, arguments);
      },
      reloadCfg: function(_$CFG){

        //load logger_toConsoleEnable
        var loggerToConsoleEnable = _$CFG['logger_toConsoleEnable'];
        if (typeof loggerToConsoleEnable != 'undefined'){
          $cfgAppLoggerToConsoleEnable = loggerToConsoleEnable;
        }

        //load logger_toConsoleLevel
        var loggerToConsoleLevel = _$CFG['logger_toConsoleLevel'];
        if (typeof loggerToConsoleLevel != 'undefined'){
          $cfgAppLoggerToConsoleLevel = loggerToConsoleLevel;
        }

        //load logger_toFileEnable
        var loggerToFileEnable = _$CFG['logger_toFileEnable'];
        if (typeof loggerToFileEnable != 'undefined'){
          $cfgAppLoggerToFileEnable = loggerToFileEnable;
        }

        //load logger_toFileLevel
        var loggerToFileLevel = _$CFG['logger_toFileLevel'];
        if (typeof loggerToFileLevel != 'undefined'){
          $cfgAppLoggerToFileLevel = loggerToFileLevel;
        }
      }
    };

    var log = function() {

      //get args
      var args = [];
      if (typeof arguments === 'object') {
        for(var i = 0; i < arguments.length; i++ ) {
          arg = arguments[i];
          if (typeof arg == 'object'){
            var exception = {};
            exception.message = arg.message;
            exception.stack = arg.stack;
            args.push(JSON.stringify(exception));
          } else {
            args.push(arg);
          }

        }
      }

      //set logItem
      //@todo: que internamente guarde el time en milisegundos y solo sea a la hora de mostrarlo cuando lo traduzca, es para preversar los ms de cara a calcular tiempos que tarda la servicio en ejecutarse
      var logItem = {
        time: new Date().toLocaleString(),
        message: args.join('\n'),
        type: type,
        level: level
      };
      logs.push(logItem);

      //set msg
      var msg = '[' + logItem.time + '][' + logItem.type.toString().toUpperCase() + '] ' + logItem.message.toString();

      //check if must be printent to console
      if ($cfgAppLoggerToConsoleEnable && level <= $cfgAppLoggerToConsoleLevel){
        //if here it 1st time that print check if there are previouse loged messages
        if (!printingToConsole){
          if (logs.length > 1){
            for (var i = 0; i < logs.length - 1; i++){
              var _logItem = logs[i];
              if (_logItem.level <= $cfgAppLoggerToConsoleLevel){
                console[_logItem.type]('[' + _logItem.time + '][' + _logItem.type.toString().toUpperCase() + '] ' + _logItem.message.toString());
              }
            }
          }
          printingToConsole = true;
        }
        
        //print current msg
        console[type](msg);
      }

      //check if must be writted to file
      if ($cfgAppLoggerToFileEnable && level <= $cfgAppLoggerToFileLevel){
        //if here it 1st time that print check if there are previouse loged messages
        if (!printingToFile){
          if (logs.length > 1){
            for (var i = 0; i < logs.length - 1; i++){
              var _logItem = logs[i];
              if (_logItem.level <= $cfgAppLoggerToFileLevel){
                //console.log('[' + _logItem.time + '][' + _logItem.type.toString().toUpperCase() + '] ' + _logItem.message.toString());
              }
            }
          }
          printingToFile = true;
        }
        
        //@todo: write to file and have in mind the rotation of the logs
        //console.log(msg);
      }

      //if error $emit event to upper for other services $on actions
      if (level == LOGGER_LEVEL_ERROR){
        //$rootScope.$broadcast('appLoggerErrorThrowEvent');
      }
    };

    return service;
  };
  
  /**
   * Define provider loadData function
   **/
  this.loadData = function(rows){
    for(var i = 0; i < rows.length; i++){
      $this.$get().log(rows[i]);
    }
  };
  
  this.log = this.$get().log;
});