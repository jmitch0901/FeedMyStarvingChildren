angular.module('App',
['ngRoute',
'ngResource',
'ngAnimate',
'ngCookies',
'ui.router',
'720kb.socialshare'
])
.config(['$routeProvider','$stateProvider', '$urlRouterProvider',function($routeProvider,$stateProvider, $urlRouterProvider){



  $stateProvider
  .state('home',{
    url:'/',
    templateUrl:'../templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('about',{
    url:'/about',
    templateUrl:'../templates/about.html',
    controller: 'AboutCtrl'
  })
  .state('donate',{
    url: '/donate',
    templateUrl:'../templates/buy.html',
    controller: 'BuyCtrl',
    cache:false
  })
  .state('faqs',{
    url:'/faqs',
    templateUrl:'../templates/faqs.html'
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
