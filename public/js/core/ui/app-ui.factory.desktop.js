/**
 * JS for MaIOMan App UI Desktop Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiDesktop', ['$log', function($log){
 	$log.log('App-ui::appUI.uiDesktop ini');
 	var service = {};

	/**
	 * Add new icon acces to a path
	 */
	service.addIcon = function(title, icon, target){
	  	id = target.substr(1);
	  	//add ico to desktopLayer
	  	html  = '<div id="desktopIcon_' + id + '" class="desktopAppIconLayer"><a href="#!' + target + '" title="' + title + '"><div>' + title + '</div></a></div>';
	  	$('.desktopLayer').append(html);
	  
	  	//on click change window
	  	$('#desktopIcon_' + id).click(function(evt){
	    	if ($(evt.target).attr('id') != undefined){
	      		var id = $(evt.target).attr('id').split('_');
	    	} else {
	      		var id = $(evt.target).parent().parent().attr('id').split('_');
	    	}
	    	id = id[1];
	    	//$('.container.contens').append('<div ng-controller="' + id +'" class="windowLayerStyle" style="width: 50px;"></div>');
	    	if ($('#windowView_' + id).length > 0){
	      		$('#windowView_' + id).fadeIn('slow');
	    	}
	  	});
	}

	$log.log('App-ui::appUI.uiDesktop end');
	return service;
 }]);