angular.module('App')
.controller('HomeCtrl',function($scope,ModalService,UserFactory){
  console.log("Home Controller Loaded");

  $scope.isLoggedIn = false;
  $scope.userName = "Jonathan Mitchell";


});
