/**
 * JS for MaIOMan App UI Windows Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiWindow', ['$log', function($log){
 	$log.log('App-ui::appUI.uiWindow ini');
 	var service = {};

 	/**
	 * Hide the ng-view windowLayer
	 *  
	 * If param t is not received windowLayer is going to be hided, else fadeOut with the receive velocity
	 *
	 * @params {int/string} t -> Optional: fast, slow, (int)ms (default: 0ms)
	 */
 	service.hide = function(t){
 		if (t == null){
          $('.windowLayer').hide();  
          return true;
        }

        t = t == null? 0: t;
        //hide effect in windoLayer
        $('.windowLayer').fadeOut(t);
 	}

 	/**
	 * Show the ng-view windowLayer
	 *  
	 * If param t is not received windowLayer is going to be hided, else fadeOut with the receive velocity
	 *
	 * @params {int/string} t -> Optional: fast, slow, (int)ms (default: 1500ms)
	 */
 	service.show = function(t){
 		t = t == null? 1500: t;
        //show effect in windoLayer
        $('.windowLayer').fadeIn(t);
 	}

	/**
	 * Clone the ng-view windowLayer in a new o already created specific windowLayer for that view
	 *
	 * @params {string} url -> Required: the location.href that is going to be copied
	 */
	service.clone = function(url){
		//avoid to clone "/" and "/404"
        if (url == '/' || url == '/404'){
          	return true;
        }
        //hide windowLayer
        service.hide();

        //check if alredy exits layer for that view
        id = url.substr(1);
        if ($('#windowView_' + id).length == 0){
          	//clone windowLayer outside ng-view
          	html = '<div id="windowView_' + id + '" class="windowLayerStyle ui-widget-content">' + $('.windowLayer div').html() + '</div>';
          	$('.container.contens').append(html);
          	//set new windowLayer as graggable
          	$('#windowView_' + id).draggable({
            	containment: ".container.contens", 
            	cursor: "move",
            	//cursorAt: {top: 50, left: 200},
            	scroll: false,
            	opacity: 0.65
          	});
          	// and set resizable
          	$(function(){
            	$('#windowView_' + id).resizable({
              		containment: ".container.contens", 
              		animate: true,
              		minWidth: 400,
              		minHeight: 100,
              		//aspectRatio: true,
              		//aspectRatio: 16 / 9
            	});
          	}());
          	//add close icon and event
          	service.setCloseIcon('#windowView_' + id);
          	//put in desired position and sizes
          	var w = $('.container.contents').css('width'),
            	h = $('.container.contents').css('height');
          	$('#windowView_' + id).css('top', '80px');
          	$('#windowView_' + id).css('left', '15px');
          	$('#windowView_' + id).css('width', w);
          	$('#windowView_' + id).css('height', h);
          	$log.log('App-ui::appUI cloned window: ' + url);
        } else {
          	$('#windowView_' + id).html($('.windowLayer div').html());
          	//add close icon and event
          	service.setCloseIcon('#windowView_' + id);
          	$('#windowView_' + id).fadeIn('slow');
          	$log.log('App-ui::appUI showing window: ' + url);
        }
	}

	/**
	 *
	 */
	service.fullscreenIn = function(selector) {
		if (!$(selector).hasClass('windowLayerStyleFullscreen')){
			$(selector).addClass('windowLayerStyleFullscreen');
		}
	},

	/**
	 *
	 */
	service.fullscreenOut = function(selector) {
		if ($(selector).hasClass('windowLayerStyleFullscreen')){
			$(selector).removeClass('windowLayerStyleFullscreen');
		}
	}

	/**
	 *
	 */
	service.setCloseIcon = function(selector){
		//add close icon to selector layer
		$(selector).append('<div class="closeIcon"><img src="img/close.png" title="Close"></div>');
		$(selector + ' .closeIcon').click(function(evt){
			$(evt.target).parent().parent().fadeOut('fast');
		});
	}

	$log.log('App-ui::appUI.uiWindow end');
	return service;
 }]);