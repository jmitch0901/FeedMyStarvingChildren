angular.module('App',['ngRoute','ngResource','ngAnimate'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: '../templates/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register',{
      templateUrl: '../templates/register.html',
      controller: 'RegisterCtrl'
    });
});
