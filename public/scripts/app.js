angular.module('App',['ngRoute','ngResource','ngAnimate','angularModalService','ngCookies'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login',{
      templateUrl: '../templates/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register',{
      templateUrl: '../templates/register.html',
      controller: 'RegisterCtrl'
    });
    // .when('/register',{
    //   templateUrl: '../templates/register.html',
    //   controller: 'RegisterCtrl'
    // });
});
