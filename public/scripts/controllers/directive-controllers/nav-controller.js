angular.module('App')
.controller('NavCtrl',['$scope','$location','UserFactory','ImageDataFactory',function($scope,$location,UserFactory,ImageDataFactory){

  console.log('Nav Controller Added!');




  $(document).ready(function(){
    $('#about-slider').slideUp("fast");
    $('#buy-slider').slideUp("fast");
  });


  var aboutShown = false;
  var buyShown = false;

  $scope.pixelsBought = "LOADING...";

  function reloadBoughtCount(){
    ImageDataFactory.getPixelsBoughtCount(function(err,result){

      if(!err){
        $scope.pixelsBought = result.bought.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//Number(result.bought);
      }

    });
  };

  reloadBoughtCount();



  setInterval(function(){

    reloadBoughtCount();

  },30000); //30 secs




  $scope.showAbout = function(){
    console.log('showing about!');
    aboutShown = !aboutShown;

    if(aboutShown){
      if(buyShown){
        $('#buy-slider').slideUp('fast',function(){
          buyShown = false;
          $('#about-slider').slideDown('slow');
        });
      } else {
        $('#about-slider').slideDown('slow');
      }
    } else {
      $('#about-slider').slideUp('slow');
    }

  };

  $scope.showDonate = function(){

    if(!UserFactory.isLoggedIn){
      $location.path('/login');
      return;
    }

    buyShown = !buyShown;

    if(buyShown){
      if(aboutShown){
        $('#about-slider').slideUp('fast',function(){
          aboutShown = false;
          $('#buy-slider').slideDown('slow');
        });
      } else {
        $('#buy-slider').slideDown('slow');
      }
    } else {
        $('#buy-slider').slideUp('slow');
    }

  };


  $scope.isLoggedIn = UserFactory.isLoggedIn;
  $scope.userName = UserFactory.me.firstname ? UserFactory.me.firstname : "";

  $scope.logout = function(){
    UserFactory.logout(function(err){
      if(err){
        return console.error(err);
      }

      $scope.isLoggedIn = UserFactory.isLoggedIn;
      //$scope.showBuy();
      $('#buy-slider').slideUp("fast");
    });
  };

  UserFactory.makeMeRequest(function(err){
    if(err){
      console.error(err);
      return;


    }

    $scope.userName = UserFactory.me.firstname ? UserFactory.me.firstname : "";
    $scope.isLoggedIn = UserFactory.isLoggedIn;

  });


}]);
