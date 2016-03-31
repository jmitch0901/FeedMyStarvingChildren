angular.module('App',['ngRoute','ngResource','ngAnimate'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login',{
      templateUrl: '../templates/login.html'
    })
    // .when('/register',{
    //   templateUrl: '../templates/register.html',
    //   controller: 'RegisterCtrl'
    // });
});
