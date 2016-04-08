angular.module('App')
.controller('LoginCtrl',function($scope,$state,UserFactory){
  console.log("Login Controller Added");
  // if ($location.protocol() !== 'https') {
  //   console.log('You are NOT going over https when you should!');
  //   // $window.location.href = $location.absUrl().replace('http', 'https');
  //   $window.location.href = 'https://localhost:3000/#/login'
  // }

  $scope.email = "";
  $scope.password = "";
  $scope.errorMessage = "";

  $scope.login = function(){

    $scope.errorMessage = "";

    //TODO finish this login method
    UserFactory.login($scope.email,$scope.password,function(err){
      if(err){
        $scope.errorMessage = err;
        console.error(err);
        return;
      }

      $state.go('home');

    });
  };




});
