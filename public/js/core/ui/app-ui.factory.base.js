/**
 * JS for MaIOMan App UI Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.ui')

.factory('appUI', function($timeout, $log, appCfg, uiWindow, uiDesktop, uiMask, cfgAppUITimeClosedelay, cfgAppUIMaskEnable, $cfgAppUILoadingMaskEnable, $cfgAppUINotifyAlertProgramateCloseDefaultTime, $cfgAppNetChangeAdvisorEnable, $cfgAppNetChangeAdvisorNotifyCloseTime){
  $log.log('App-ui::appUI ini');

  var services = {};

  /**
   * Define hideMask service
   **/
  services.hideMask =  function(event){ 
    $log.log('App-ui::hideMask ini');

    $timeout(function(){
      $('.loadingMask').hide();
      $('.bgLoadingMask').hide();
      $log.log('App-ui::hideMask closed bgLoadingMask on rootScope $viewContentLoaded')
    }, cfgAppUITimeClosedelay);

    $log.log('App-ui::hideMask end');
  };

  /**
   * Define showMask service
   **/
  services.showMask = function (event, next, current) {
    $log.log('App-ui::showMask ini');
    
    if (services.isMaskEnable()){
      $log.log('App-ui::showMask cancelled uiMask_enable is false')
      return false;
    }

    $('.bgLoadingMask').show();
    $log.log('App-ui::showMask open bgLoadingMask on rootScope $locationChangeStart');

    $log.log('App-ui::showMask end');
  };
  
  /**
   * Define showLoadingMask service
   **/
  services.showLoadingMask = function (event, next, current) {
    $log.log('App-ui::showLoadingMask ini');
    
    //1. set layer message to Loading...
    $('.loadingMask').html('Loading...');
    $('.loadingMask').show();
    
    //2. show the mask
    $('.bgLoadingMask').show();
    $log.log('App-ui::showLoadingMask open bgLoadingMask on rootScope $locationChangeStart');

    $log.log('App-ui::showLoadingMask end');
  };
  
  /**
   * Define showNotifyAlert service
   **/
  services.showNotifyAlert = function(opts){
    $log.log('App-ui::showNotifyAlert ini');

    //1. check opts
    opts.timeout = opts.timeout || appCfg.getCfg('ui_notifyAlertProgramateCloseDefaultTime', $cfgAppUINotifyAlertProgramateCloseDefaultTime);
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
  
  
	
	/**
	 * Define isNetChangeAdvisorEnable service
	 **/
	services.isNetChangeAdvisorEnable = function(){
		$log.log('App-net::isNetChangeAdvisorEnable ini');

		$log.log('App-net::isNetChangeAdvisorEnable end');
		return appCfg.getCfg('net_changeAdvisorEnable', $cfgAppNetChangeAdvisorEnable);
	};
	
	/**
	 * Define showGoUpMessage service
	 **/
	services.showGoUpMessage = function(){
		$log.log('App-net::showGoUpMessage ini');

		//call appUI.showNotifyAlert service with test "Connection swith ON! You are connectec again" for 5s
		services.showNotifyAlert({
			text: 'Connection swithed ON!<br>The changes made offline now are going to be synchronized with the server.',
			timeout: appCfg.getCfg('net_changeAdvisorNotifyCloseTime', $cfgAppNetChangeAdvisorNotifyCloseTime)
		});
		
		$log.log('App-net::showGoUpMessage end');
	};
	
	/**
	 * Define showGoDownMessage service
	 **/
	services.showGoDownMessage = function(){
		$log.log('App-net::showGoDownMessage ini');

		//call appUI.hideNotifyAlert service with test "Connection swith OFF! You can continue working disconnected and when then connection comes back all we be sinchronized with the server" for 5s.
		services.showNotifyAlert({
			text: 'Connection swithed OFF! You can continue working disconnected,<br>and when the connection comes back all will be synchronized with the server.',
			timeout: appCfg.getCfg('net_changeAdvisorNotifyCloseTime', $cfgAppNetChangeAdvisorNotifyCloseTime)
		});
		
		$log.log('App-net::showGoDownMessage end');
	};
  
  /**
   * Define isEnableMask service
   **/
  services.isMaskEnable = function(){
    $log.log('App-ui::isEnableMask ini --> ' + appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable));

    $log.log('App-ui::isEnableMask end');
    return appCfg.getCfg('ui_maskEnable', cfgAppUIMaskEnable);
  }
  
  /**
   * Define isLoadingMaskEnable service
   **/
  services.isLoadingMaskEnable = function(){
    $log.log('App-ui::isLoadingMaskEnable ini --> ' + appCfg.getCfg('ui_loadingMaskEnable', $cfgAppUILoadingMaskEnable));

    $log.log('App-ui::isLoadingMaskEnable end');
    return appCfg.getCfg('ui_loadingMaskEnable', $cfgAppUILoadingMaskEnable);
  };
	
	/**
   * Define fixContainerContensSize service
   **/
	services.fixContainerContensSize = function(){
		$log.log('App-ui::fixContainerContensSize ini');
		
		var hh = $('.container.header').height();
		var h = $(window).height() - hh - 84;
		
  	$('.container.contens').height(h);
		$log.log('App-ui::fixContainerContensSize end');
	};
	
	/**
   * Define showUserProfileImage service
   **/
	services.showUserProfileImage = function(){
		$log.log('App-ui::showUserProfileImage ini');
		
		alert('--');
		$('.userProfile').show();
		
		$log.log('App-ui::showUserProfileImage end');
	}
	
	/**
   * Define hideUserProfileImage service
   **/
	services.hideUserProfileImage = function(){
		$log.log('App-ui::hideUserProfileImage ini');
		
		$('.userProfile').hide();
		
		$log.log('App-ui::hideUserProfileImage end');
	}

  /**
   * Expose also uiDesktop from appUI for have the Desktop UI interaction from here
   */
  services.desktop = uiDesktop;

  /**
   * Expose also uiWindow Services from appUI for have Window UI interaction from here. 
   */
  services.windowLayer = uiWindow;

  /**
   * Expose also uiMask from appUI for have the Desktop UI interaction from here
   */
  services.mask = uiMask;

  $log.log('App-ui::appUI end');
  return services;
});