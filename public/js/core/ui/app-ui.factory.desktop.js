/**
 * JS for MaIOMan App UI Desktop Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiDesktop', ['$log', 'uiWindow',  function($log, uiWindow){
 	$log.log('App-ui::appUI.uiDesktop ini');
 	var service = {};

	/**
	 * Add new icon acces to a path
	 */
	service.addIcon = function(title, icon, target){
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
	}

	$log.log('App-ui::appUI.uiDesktop end');
	return service;
 }]);