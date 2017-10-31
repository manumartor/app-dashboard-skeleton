/**
 * JS for MaIOMan App UI Desktop Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiDesktop', ['$log', '$timeout', '$compile', '$rootScope', 'uiWindow',  function($log, $timeout, $compile, $rootScope, uiWindow){
 	$log.log('App-ui::appUI.uiDesktop ini');
 	var service = {};
 	var icon_timewait = 200;
 	var block_timewait = 200;

	/**
	 * Add new icon in desktop Layer like quick access to urls/paths
	 */
	service.addIcon = function(title, icon, target, justLoad){
	  	id = target.substr(1);
	  	//add ico to desktopLayer
	  	html  = '<div id="desktopIcon_' + id + '" class="desktopAppIconLayer"><a href="#!' + target + '" title="' + title + '"><div><i class="fa ' + icon + ' fa-5x"></i><br><p>' + title + '</p></div></a></div>';
	  	$('.desktopLayer').append(html);
	  
	  	//on click icon change window
	  	$('#desktopIcon_' + id).click(function(evt){
	    	if ($(evt.target).attr('id') != undefined){
	      		var id = $(evt.target).attr('id').split('_');
	    	} else if ($(evt.target).parent().parent().attr('id') != undefined){
	      		var id = $(evt.target).parent().parent().attr('id').split('_');
	    	} else {
	      		var id = $(evt.target).parent().parent().parent().attr('id').split('_');
	    	}
	    	id = '#windowView_' + id[1];
	    	
	    	if ($(id).length > 0){
	      		uiWindow.show(id, 'slow');
	    	}
	  	});

	  	//also set to add if loginOK
	  	if (justLoad == undefined){
		  	$rootScope.$on('appAuthLoginOK', function(){
		  		$timeout(function() {
		  			service.addIcon(title, icon, target, true);
		  		}, icon_timewait);
			});
			icon_timewait++;
		}
	}

	/**
	 * Add block to rigth blocks Layer in desktop
	 */
	service.addBlock = function(id, component, justLoad){

		//add block to rightBlocksLayer
	  	html  = '<div id="blockLayer_' + id + '" class="blockLayer"><' + component + '></' + component + '></div>';
	  	$('.rightBlocksLayer').append($compile(html)($rootScope));

	  	//also set to add if loginOK
	  	if (justLoad == undefined){
		  	$rootScope.$on('appAuthLoginOK', function(){
		  		$timeout(function() {
		  			service.addBlock(id, component, true);
		  		}, block_timewait);
			});
			block_timewait++;
		}
	}

	$log.log('App-ui::appUI.uiDesktop end');
	return service;
 }]);