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
.component('welcomeBlock', {
  css: 'js/core/ui/css/welcomeBlock.css',
  templateUrl: "js/core/ui/views/welcomeblock.html", 
  controller: "welcomeBlockController"
})