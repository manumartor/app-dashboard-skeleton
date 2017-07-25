/**
 * JS for MaIOMan App Config Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.config')
.provider('$appCfg', function($appLoggerProvider, $cfgAppLoggerToConsoleEnable, $cfgAppLoggerToFileEnable, $cfgAppLoggerToConsoleLevel, $cfgAppLoggerToFileLevel){
  $appLoggerProvider.log('App-config::$appCfgProvider ini');
  
  //at this point the $CFG var is defined in the global scope
  //so we have to search for a solution to get it in side andular for major security
  var _$CFG = {};
  
  /**
   * Define loadCfg service to load cfg at ini
   *
   * @params {Json} $key Json with the values from config.json file
   * @return {Void}
   **/
  this.loadCfg = function($cfg){
    $appLoggerProvider.log('App-config::loadCfg ini');
    
    //set cfg to var
    _$CFG = $cfg;
    
    //@todo: load from db user custom cfgs
    
    $appLoggerProvider.log('App-config::loadCfg end');
  }; 
  
  /**
   * Define $appCfg factory
   **/
  this.$get = function($log){
    $log.log('App-config::$appCfg ini'); 
    
    var _services = {};
    /**
     * Define setCfg service to update or add to the config value
     *
     * @params {String} key String of the config value to update
     * @params {String} new value String to save
     * @return {Bool} true if done or false if fails
     **/
    _services.setCfg = function(key, value){ 
      $log.log('App-config::setCfg ini');

      //set config to memory
      _$CFG[key] = value;

      //@todo: set config to permanent storage

      $log.log('App-config::setCfg config key.' + key + ' ' + (typeof _$CFG[key] != 'undefined'? 'updated':  'added'));

      $log.log('App-config::setCfg end');
      return true;
    };

    /**
     * Define getCfg service to get a key from the config
     *
     * @param  {String} key String of the config value to get
     * @param  {Bool} def Bool with the default value to return if key not found
     * @return {String} config key value
     **/
    _services.getCfg = function (key, def) {
      $log.log('App-config::getCfg ini');

      //set default value
      var _default = def || false;
      var _val = typeof _$CFG[key] != 'undefined'? _$CFG[key]: _default;
      $log.log('App-config::getCfg end');

      //return de $CFG.key value or if no isset the default
      return _val;
    };
    
    $log.log('App-config::$appCfg end');
    return _services;
  };
  
  $appLoggerProvider.log('App-config::$appCfgProvider end');
});