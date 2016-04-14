angular.module('App',['ngRoute','ngResource','ngAnimate','ngCookies','ui.router'])
.config(['$routeProvider','$stateProvider', '$urlRouterProvider',function($routeProvider,$stateProvider, $urlRouterProvider){


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

}]);
