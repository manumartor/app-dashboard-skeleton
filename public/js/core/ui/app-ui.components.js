/**
 * JS for MaIOMan App UI Components
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.ui')

/**
 * Define headerLayer components
 **/
.component('headerLayer', {
  css: 'js/core/ui/css/header.css',
  templateUrl: "js/core/ui/views/header.html", 
  controller: "headerLayerController"
})

/**
 * Define footerLayer components
 **/
.component('footerLayer', {
  css: 'js/core/ui/css/footer.css',
  templateUrl: "js/core/ui/views/_footer.html", 
  controller: "footerLayerController"
});