/**
 * JS for MaIOMan History Auth Module
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define app-history module
 **/
angular.module('app.history', [])

/**
 * Define cfg values
 **/
.value('$cfgAppHistoryEnable', 1)

/**
 * Define run
 **/
.run(function($rootScope, $appHistory, $log){
  $log.log('App-history::run ini');
  
  if ($appHistory.isEnableHistory()){
    $rootScope.$on('$locationChangeSuccess', $appHistory.setHistory);
  }
  
  $log.log('App-history::run end');
});

/**
 * Load dependecies
 **/
_load(['js/core/history/app-history.factory.js']);