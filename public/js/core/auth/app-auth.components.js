/**
 * JS for MaIOMan App Auth Components
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/

/**
 * Define the component
 **/
angular.module('app.auth')
.component('loginLayer', {
  css: 'js/core/auth/css/signin-layer.css',
  templateUrl: "js/core/auth/views/login-form.html", 
  controller: "loginLayerController"
});