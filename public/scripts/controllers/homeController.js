angular.module('App')
.controller('HomeCtrl',function($scope,ModalService,UserFactory){
  console.log("Home Controller Loaded");

  $scope.isLoggedIn = false;
  $scope.showAbout = false;
  $scope.showBuy = false;
  $scope.userName = "Jonathan Mitchell";

  $(document).ready(function(){
      $('#about-slider').slideUp("fast");
      $('#buy-slider').slideUp("fast");
  });

  var firstAbout = true;
  var firstBuy = true;


  $scope.$watch('showAbout',function(){
    if(firstAbout){
      firstAbout = false;
      return;
    }
    $(document).ready(function(){


      if($scope.showBuy){
        $('#buy-slider').slideUp("fast");
      }


      if(!$scope.showAbout){
        console.log('slide up!');
        $('#about-slider').slideUp("slow");
      } else {
        console.log('slide down!');
        $('#about-slider').slideDown("slow");
      }
    });
  });



  $scope.$watch('showBuy',function(){
    if(firstBuy){
      firstBuy = false;
      return;
    }
    $(document).ready(function(){

      if($scope.showAbout){
        $('#about-slider').slideUp("fast");
      }

      if(!$scope.showBuy){
        console.log('slide up buy!');
        $('#buy-slider').slideUp("slow");
      } else {
        console.log('slide down buy!');
        $('#buy-slider').slideDown("slow");
      }
    });
  });

});
