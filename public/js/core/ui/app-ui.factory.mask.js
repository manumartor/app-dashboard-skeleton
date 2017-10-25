/**
 * JS for MaIOMan App UI Mask Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiMask', ['$log', 'appCfg', 'cfgAppUIMaskEnable',  function($log, appCfg, cfgAppUIMaskEnable){
 	$log.log('App-ui::appUI.uiMask ini');
 	var service = {};

 	/**
   	 * Method to know if mask is enable
   	 **/
  	service.isMaskEnable = function(){
    	$log.log('App-ui::isEnableMask ini --> ' + appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable));

    	$log.log('App-ui::isEnableMask end');
    	return appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable);
  	}

  	$log.log('App-ui::appUI.uiMask end');
	return service;
 }]);