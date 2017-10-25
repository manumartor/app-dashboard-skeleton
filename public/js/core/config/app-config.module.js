/**
 * JS for MaIOMan App Config Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-config module
 **/
angular.module('app.config', [])

/**
 * Define run
 **/
.run(function($log, $appLogger, appCfg, $cfgAppLoggerToConsoleEnable, $cfgAppLoggerToConsoleLevel, $cfgAppLoggerToFileEnable, $cfgAppLoggerToFileLevel){
  $log.log('App-config::run ini');
  
  $appLogger.reloadCfg({
    "logger_toConsoleEnable": appCfg.getCfg('logger_toConsoleEnable', $cfgAppLoggerToConsoleEnable),
    "logger_toConsoleLevel": appCfg.getCfg('logger_toConsoleLevel', $cfgAppLoggerToConsoleLevel),
    "logger_toFileEnable": appCfg.getCfg('logger_toFileEnable', $cfgAppLoggerToFileEnable),
    "logger_toFileLevel": appCfg.getCfg('logger_toFileLevel', $cfgAppLoggerToFileLevel)
  });
  
  $log.log('App-config::run end');
});

/**
 * Load dependecies
 **/
_load(['js/core/config/app-config.provider.js']);