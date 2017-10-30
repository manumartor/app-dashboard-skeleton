/**
 * JS for MaIOMan App UI Components
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
angular.module('app.core')

/**
 * Define headerLayer components
 **/
.component('headerLayer', {
  css: 'css/header.css',
  templateUrl: "views/header.html", 
  controller: "headerLayerController"
})

/**
 * Define footerLayer components
 **/
.component('footerLayer', {
  css: 'css/footer.css',
  templateUrl: "views/_footer.html", 
  controller: "footerLayerController"
});