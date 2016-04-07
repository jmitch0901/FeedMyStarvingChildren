angular.module('App')
.controller('HomeCtrl',function($scope,$location,ModalService,UserFactory,ImageDataFactory){
  console.log("Home Controller Loaded");

  $scope.messageName = "LOADING...";
  $scope.message = "LOADING...";
  ImageDataFactory.initialize();
  $('#releasable-image').mousemove(function(e){
    //console.log(e.offsetX + ", " + e.offsetY);

    var data = ImageDataFactory.getMetaData(e.offsetX,e.offsetY);
    //console.log(data);
    if(!data){
      $('#image-tooltip').popover('hide');
      return;
    }

    //console.log(data);
    var firstname = data.buyer.id.firstname;
    var message =  data.message;

    //console.log(e);
  //  console.log($('#image-tooltip'));

    $('#image-tooltip')
    .css({"position":"absolute","top":e.pageY - 25 + "px","left": e.offsetX + 125+"px"})
    .popover('show').popover({
      title:"HELLO!"
    })
    //$('[data-toggle="popover"]').attr('title',message + " -"+firstname);
  });




  $scope.isLoggedIn = UserFactory.isLoggedIn;
  $scope.userName = UserFactory.me.firstname ? UserFactory.me.firstname : "";

  $scope.logout = function(){
    UserFactory.logout(function(err){
      if(err){
        return console.error(err);
      }

      $scope.isLoggedIn = UserFactory.isLoggedIn;

    });
  };

  UserFactory.makeMeRequest(function(err){
    if(err){
      return console.error(err);
    }

    $scope.userName = UserFactory.me.firstname ? UserFactory.me.firstname : "";
    $scope.isLoggedIn = UserFactory.isLoggedIn;

  });


  $(document).ready(function(){
      $('#about-slider').slideUp("fast");
      $('#buy-slider').slideUp("fast");
  });


  var aboutShown = false;
  var buyShown = false;

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

  $scope.showBuy = function(){

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

});
