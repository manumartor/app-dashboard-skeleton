/**
 * JS for MaIOMan App Auth Provider
 *
 * @author: manu.martor@gmail.com
 * @version: 1.0.0
 **/
console.log('Loading js/core/auth/app-auth.component.js');

/**
 * Define the component
 **/
angular.module('app.auth')
.component('loginLayer', {
  css: 'js/core/auth/css/signin-layer.css',
  templateUrl: "js/core/auth/views/login-form.html", 
  controller: "loginLayerController"
});

console.log('Loaded js/core/auth/app-auth.component.js!');