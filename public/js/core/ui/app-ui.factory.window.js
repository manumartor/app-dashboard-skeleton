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
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 * @params {int/string} t -> Optional: fast, slow, (int)ms (default: 0ms)
	 */
 	service.hide = function(selector, t){
 		selector = selector == null? '.windowLayer': selector;
 		if (t == null){
          $(selector).hide();  
          return true;
        }

        t = t == null? 0: t;
        //hide effect in windoLayer
        $(selector).fadeOut(t);
 	}

 	/**
	 * Show the ng-view windowLayer
	 *  
	 * If param t is not received windowLayer is going to be hided, else fadeOut with the receive velocity
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 * @params {int/string} t -> Optional: fast, slow, (int)ms (default: 1500ms)
	 */
 	service.show = function(selector, t){
 		selector = selector == null? '.windowLayer': selector;
 		t = t == null? 1500: t;
        //show effect in windoLayer
        $(selector).fadeIn(t);
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
          	html = '<div id="windowView_' + id + '" class="windowLayerStyle ui-widget-content" style="display: none;">' + $('.windowLayer div').html() + '</div>';
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
          	service.move('#windowView_' + id, '15px', '80px');
          	service.resize('#windowView_' + id, w, h);
          	//show 
          	service.show('#windowView_' + id);
          	$log.log('App-ui::appUI cloned window: ' + url);
        } else {
          	$('#windowView_' + id).html($('.windowLayer div').html());
          	//add close icon and event
          	service.setCloseIcon('#windowView_' + id);
          	service.show('#windowView_' + id);
          	$log.log('App-ui::appUI showing window: ' + url);
        }
	}

	/**
	 * Set the window Layer in fullscreen mode
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 */
	service.fullscreenIn = function(selector) {
		selector = selector == null? '.windowLayer': selector;

		if (!$(selector).hasClass('windowLayerStyleFullscreen')){
			$(selector).addClass('windowLayerStyleFullscreen');
		}
	},

	/**
	 * Take out the windowLayer from fullscreen mode
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 */
	service.fullscreenOut = function(selector) {
		selector = selector == null? '.windowLayer': selector;

		if ($(selector).hasClass('windowLayerStyleFullscreen')){
			$(selector).removeClass('windowLayerStyleFullscreen');
		}
	}

	/**
	 * Put close icon in the windowLayer passed
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 */
	service.setCloseIcon = function(selector){
		selector = selector == null? '.windowLayer': selector;

		//add close icon to selector layer
		$(selector).append('<div class="closeIcon"><img src="img/close.png" title="Close"></div>');
		$(selector + ' .closeIcon').click(function(evt){
			$(evt.target).parent().parent().fadeOut('fast');
		});
	}

	/**
	 * Move the windowLayer to the passed x, y
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 * @params {string} x -> Optional: css width to set to windowLayer
	 * @params {string} y -> Optional: css height to set to windowLayer
	 * @params {int/string} t -> Optional: fast, slow, (int)ms (default: 1500ms)
	 */
	service.move = function(selector, x, y, t){
		selector = selector == null? '.windowLayer': selector;
		t = t == null? 0: t;

		if (y != null){
			$(selector).animate({top: y}, t);
		}
		if (x != null){
      		$(selector).animate({left: x}, t);
      	}
	}

	/**
	 * Move the windowLayer to the top center
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 */
	service.moveTopCenter = function(selector){
		selector = selector == null? '.windowLayer': selector;

		var pw = parseInt($('.container.contens').css('width')),
            w = parseInt($(selector).css('width'));
        var x = (pw / 2) - (w / 2);
        service.move(selector, x + 'px', '80px', 'fast');
	}

	/**
	 * Move the windowLayer to the top left
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 */
	service.moveTopLeft = function(selector){
        service.move(selector, '15px', '80px', 'fast');
	}

	/**
	 * Resize the windowLayer to the pases width and height
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
	 * @params {string} w -> Optional: css width to set to windowLayer
	 * @params {string} h -> Optional: css height to set to windowLayer
	 */
	service.resize = function(selector, w, h, t){;
		selector = selector == null? '.windowLayer': selector;
		t = t == null? 0: t;

		if (w != null){
      		$(selector).animate({width: w}, t);
      	}
      	if (h != null){
      		$(selector).animate({height: h}, t);
      	}
	}

	$log.log('App-ui::appUI.uiWindow end');
	return service;
 }]);