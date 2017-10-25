/**
 * JS for MaIOMan App UI Mask Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiMask', ['$log', '$timeout', 'appCfg', 'cfgAppUIMaskEnable',  function($log, $timeout, appCfg, cfgAppUIMaskEnable, cfgAppUILoadingMaskEnable, cfgAppUITimeClosedelay){
 	$log.log('App-ui::appUI.uiMask ini');
 	var service = {};

 	/**
   	 * Method to know if mask is enable
   	 **/
  	service.isEnable = function(){
    	$log.log('App-ui::appUI.uiMask.isEnableMask ini --> ' + appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable));

    	$log.log('App-ui::appUI.uiMask.isEnableMask end');
    	return appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable);
  	}

  	/**
	 * Method to know if loading notify message is enable
	 **/
	service.isLoadingEnable = function(){
	    $log.log('App-ui::appUI.uiMask.isLoadingMaskEnable ini --> ' + appCfg.getCfg('ui_loadingMaskEnable', cfgAppUILoadingMaskEnable));

	    $log.log('App-ui::appUI.uiMask.isLoadingMaskEnable end');
	    return appCfg.getCfg('ui_loadingMaskEnable', cfgAppUILoadingMaskEnable);
	};

	/**
     * Define hideMask service
     **/
  	service.hide =  function(event){ 
    	$log.log('App-ui::appUI.uiMask.hide ini');

    	$timeout(function(){
      		$('.loadingMask').hide();
      		$('.bgLoadingMask').hide();
      		$log.log('App-ui::hide closed bgLoadingMask on rootScope $viewContentLoaded')
    	}, cfgAppUITimeClosedelay);

    	$log.log('App-ui::appUI.uiMask.hide end');
  	};

  	/**
     * Define showMask service
     **/
  	service.show = function (event, next, current) {
    	$log.log('App-ui::appUI.uiMask.show ini');
    
    	if (service.isEnable()){
      		$log.log('App-ui::appUI.uiMask.show cancelled uiMask_enable is false')
      		return false;
    	}

    	$('.bgLoadingMask').show();
    	$log.log('App-ui::appUI.uiMask.show open bgLoadingMask on rootScope $locationChangeStart');

    	$log.log('App-ui::show end');
  	};
  
  	/**
     * Define showLoadingMask service
     **/
  	service.showLoading = function (event, next, current) {
    	$log.log('App-ui::appUI.uiMask.showLoading ini');
    
    	//1. set layer message to Loading...
    	$('.loadingMask').html('Loading...');
    	$('.loadingMask').show();
    
    	//2. show the mask
    	$('.bgLoadingMask').show();
    	$log.log('App-ui::appUI.uiMask.showLoading open bgLoadingMask on rootScope $locationChangeStart');

    	$log.log('App-ui::appUI.uiMask.showLoading end');
  	};
  
	  /**
	   * Define showNotifyAlert service
	   **/
	  service.showNotifyAlert = function(opts){
	    $log.log('App-ui::showNotifyAlert ini');

	    //1. check opts
	    opts.timeout = opts.timeout || appCfg.getCfg('ui_notifyAlertProgramateCloseDefaultTime', cfgAppUINotifyAlertProgramateCloseDefaultTime);
	    if (typeof opts.text != 'undefined'){
	      	$('.loadingMask').html(opts.text.toString());
	    }
	    
	    opts.blink = opts.blink || false;
	    if (opts.blink && !$('.loadingMask').hasClass('blink')){
	      	$('.loadingMask').addClass('blink');
	    } else if (!opts.blink && $('.loadingMask').hasClass('blink')) {
	      	$('.loadingMask').removeClass('blink');
	    }
	    
	    //2. show layer
	    $('.loadingMask').show();
	    
	    //3. programate close
	    $timeout(function(){
	      	$('.loadingMask').hide();
	    }, opts.timeout);
	    
	    $log.log('App-ui::showNotifyAlert end');
	  }

  	$log.log('App-ui::appUI.uiMask end');
	return service;
 }]);