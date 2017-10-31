/**
 * JS for MaIOMan App UI Windows Factory
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

 angular.module('app.ui')

 .factory('uiWindow', ['$log', '$timeout', '$compile', '$rootScope', 'uiMask',  function($log, $timeout, $compile, $rootScope, uiMask){
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

        t = t == null? 'fast': t;
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
 		//get selector
 		selector = selector == null? '.windowLayer': selector;

 		//if no time for fadeIn received directly show the layer
 		if (t == null){
 			//show the layer
          	$(selector).show();
          	//set focus to z-index up
          	service.focus(selector);
          	return true;
        }

        //get time for fadeIn
 		t = t == null? 'fast': t;

        //show effect in windoLayer
        $(selector).fadeIn(t);
        //set focus to z-index up
        service.focus(selector);
 	}

 	/**
 	 * When focus in a windowLayer set z-index up
 	 * 
 	 * @params {string} selector -> Optional: jquery selector to show (default: .windowLayer)
 	 */
 	 service.focus = function(selector){
 	 	//get selector
 	 	selector = selector == null? '.windowLayer': selector;

 	 	// reset z-index of all windowLayer
 	 	cnt = 2;
 	 	$('.windowLayerStyle').each(function(i){
 	 		$(this).css('z-index', cnt);
 	 		cnt++;
 	 	});

 	 	// set the z-index of the selector to the most top one before BgMask
 	 	$(selector).css('z-index', 97);
 	 }

	/**
	 * Clone the ng-view windowLayer in a new o already created specific windowLayer for that view
	 *
	 * @params {string} url -> Required: the location.href that is going to be copied
	 */
	service.clone = function(url){
		//avoid to clone "/" and "/404"
        if (url == '/' || url == '/404' || url == '/login'){
        	//hide loding mask
        	uiMask.hide();
          	return true;
        }
        //hide windowLayer
        service.hide();

        //check if alredy exits layer for that view
        url = url.split('/');
        //alert(url.length);
        id = '#windowView_' + url[1];
        //alert('1: ' + id + ' -> ' + $(id).length);
        if ($(id).length == 0){
          	//clone windowLayer outside ng-view
          	html = '<div id="' + id.substr(1) + '" class="windowLayerStyle ui-widget-content" style="display: none;" ng-if="$root.isLogged"><div>' + $('.windowLayer div').html() + '</div></div>';
          	$('.container.contens').append($compile(html)($rootScope));
          	$timeout(function(id) {
          		//alert('2: ' + id + ' -> ' + $(id).length);
          		//set new windowLayer as draggable
	          	service.setDraggable(id);
	          	// and set resizable
	          	service.setResizable(id);
	          	//and add close icon and event
	          	service.setCloseIcon(id);
	          	//put in the desired position and sizes
	          	var w = $('.container.contents').css('width'),
	            	h = $('.container.contents').css('height');
	          	service.move(id, '15px', '80px');
	          	service.resize(id, w, h);
	          	//set on click layer the focus
	          	$(id).click(function(evt){
	          		_id = '#' + $(evt.target).attr('id');
	          		service.focus(_id);
	          	});
	          	//show the layer
	          	service.show(id, 500);
	          	$log.log('App-ui::appUI cloned window: ' + url);
          	}, 900, true, id);
        } else {
        	//load window content again
        	if (url.length > 2){
	        	html = angular.element('.windowLayer div').html();
	          	angular.element(id + ' div:first').html($compile(html)($rootScope));
	        }
          	//set windowLayer if neccesary
          	service.setDraggable(id);
          	service.setResizable(id);
          	service.setCloseIcon(id);
          	//and show windowLayer
          	service.show(id, 500);
          	$log.log('App-ui::appUI showing window: ' + url);
        }

        //hide lask after clone ng-view
        $timeout(function(){
        	uiMask.hide();
        }, 700);
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

		if (angular.element(selector + ' .closeIcon').length > 0){
			return;
		}

		//add close icon to selector layer
		$(selector).append('<div class="closeIcon"></div>');
		$(selector + ' .closeIcon').click(function(evt){
			if ($(evt.target).parent().hasClass('windowLayer')){
				$(evt.target).parent().fadeOut('fast');
			} else {
				$(evt.target).parent().remove();
			}
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
		t = t == null? 'slow': t;

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
        //alert('(' + pw + ' / 2) - (' + w + ' / 2) = ' + x);
        if (x < 15){
        	x = 15;
        }
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
		t = t == null? 'slow': t;

		if (w != null){
      		$(selector).animate({width: w}, t);
      	}
      	if (h != null){
      		$(selector).animate({height: h}, t);
      	}
	}

	/**
	 * Set the windowLayer resizable if it's not yet
	 *
	 * @params {string} selector -> Optional: jquery selector to show (default: null)
	 */
	service.setResizable = function(selector){
		if (selector == undefined){
			return;
		}

		//check that already it's not resizable
		if (angular.element(selector).hasClass('ui-resizable')){
			return;
		}

		$(function(){
        	$(selector).resizable({
          		containment: ".container.contens", 
          		animate: true,
          		minWidth: 400,
          		minHeight: 100,
          		//aspectRatio: true,
          		//aspectRatio: 16 / 9,
            	stop: function(evt){
            		_id = '#' + $(evt.target).attr('id');
          			service.focus(_id);
            	}
        	});
      	}());
	}

	service.setDraggable = function(selector){
		if (selector == undefined){
			return;
		}

		//check that already it's not resizable
		if (angular.element(selector).hasClass('ui-draggable')){
			return;
		}

		$(selector).draggable({
        	containment: ".container.contens", 
        	cursor: "move",
        	//cursorAt: {top: 50, left: 200},
        	scroll: false,
        	opacity: 0.65,
        	stop: function(evt){
        		_id = '#' + $(evt.target).attr('id');
      			service.focus(_id);
        	}
      	});
	}

	$log.log('App-ui::appUI.uiWindow end');
	return service;
 }]);