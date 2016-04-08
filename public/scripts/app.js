angular.module('App',['ngRoute','ngResource','ngAnimate','ngCookies','ui.router'])
.config(function($routeProvider,$stateProvider, $urlRouterProvider){
  // $routeProvider
  //   .when('/',{
  //     templateUrl: '../templates/home.html',
  //     controller: 'HomeCtrl'
  //   })
  //   .when('/login',{
  //     templateUrl: '../templates/login.html',
  //     controller: 'LoginCtrl'
  //   })
  //   .when('/register',{
  //     templateUrl: '../templates/register.html',
  //     controller: 'RegisterCtrl'
  //   });


  $stateProvider
  .state('home',{
    url:'/',
    templateUrl:'../templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('login',{
    url:'/login',
    templateUrl: '../templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('register',{
    url: '/register',
    templateUrl: '../templates/register.html',
    controller:'RegisterCtrl'
  })
  ;
  $urlRouterProvider.otherwise('/');

});
