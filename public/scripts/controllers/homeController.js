angular.module('App')
.controller('HomeCtrl',['$scope','$location','UserFactory','ImageDataFactory',function($scope,$location,UserFactory,ImageDataFactory){
  console.log("Home Controller Loaded");


 var x = 0;
 var y = 0;
 var isInsidePic = false;

 var cursorX = 0;
 $(document).mousemove(function(e){
   //console.log(e);
   cursorX = e.pageX + e.offsetX;
 });
var lastMouseMoved = "";
$('#releasable-image').mouseleave(function(e){
  isInsidePic = false;
  $('#image-tooltip').popover('hide');
});


$('#releasable-image').mousemove(function(e){
  //console.log(e.offsetX + ", " + e.offsetY);
  isInsidePic = true;
  lastMouseMoved = new Date().getTime();
  x = Math.floor(e.pageX - $(this).offset().left) - 2;
  y = Math.floor(e.pageY - $(this).offset().top) - 2;

  var element = $(this);

  setTimeout(function(){
    var currentTime = new Date().getTime();
    //console.log(currentTime - lastMouseMoved);

    if(currentTime - lastMouseMoved >= 999 && isInsidePic){
      console.log(x + ", " + y);
      ImageDataFactory.getPixelInfo(x,y,function(err,result){
        //console.log(result);
        if(!result || !result.success || !result.pixelInfo || !result.pixelInfo.isBought){
          //console.error('No result');
            $('#image-tooltip').popover('hide');
            return;
        }
        //console.log(result);

        var firstname = result.pixelInfo.buyer.firstname;
        var message = result.pixelInfo.message;

        console.log($('#home').css('margin-left').replace("px",""));

        $('#image-tooltip')
        .attr('data-original-title', firstname + " said:")
        .attr('data-content', message)
        .css({"position":"absolute","top":e.pageY - 25 + "px","left":   e.pageX - Number($('#home').css('margin-left').replace("px",""))  +"px"})
        .popover('show');

        $('[data-toggle="popover"]').attr('title',message + " -"+firstname);

      });

    } else {

    }
  },1000);
});


  $scope.isLoggedIn = UserFactory.isLoggedIn;
  $scope.userName = UserFactory.me.firstname ? UserFactory.me.firstname : "";
  $scope.percentage = -1;
  ImageDataFactory.getPixelPercentage(function(percent){
    $scope.percentage = Number(percent).toFixed(2);
  });
  setInterval(function(){
    ImageDataFactory.getPixelPercentage(function(percent){
      $scope.percentage = Number(percent).toFixed(2);
    });
  },30000);

  $scope.imgSrc = "/api/img?"+new Date().getTime();
  setInterval(function(){
    $scope.imgSrc = "/api/img?"+new Date().getTime();
  },30000);


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

}]);
