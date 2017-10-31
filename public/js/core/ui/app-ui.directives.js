/**
 * JS for MaIOMan App UI Directives
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

angular.module('app.ui')

.directive("a", ['$location', 'appUI', function ($location, appUI) {
    return {
        link: function (scope, element, attrs, controller) {
            element.bind('click', function () {
            	//check a element have href attr defined
                if (attrs.href != null){
                    var url = attrs.href;
                    //check if it's a internal url
                    if (url.substr(0, 3) == '#!/'){
                        url = attrs.href.substr(2);
                        //check current url is same as requested one
                        if (url == $location.path()){
	                        var id = '#windowView_';
	                        
	                        if (url == '/' || url == '/404' || url == '/login'){
	                          id = '.windowLayer';
	                        } else {
	                          id += url.substr(1);
	                        }
	                        //alert(id);

	                        if ($(id).length > 0){
	                            appUI.windowLayer.show(id, 'slow');
	                        }
	                    }
                    }
                }
            });
        }
    };
}])