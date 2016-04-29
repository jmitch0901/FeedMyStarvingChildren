angular.module('App')
.controller('LoginCtrl',['$scope','$state','UserFactory',function($scope,$state,UserFactory){
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
    $('#login-btn').button('loading');

    $scope.errorMessage = "";

    //TODO finish this login method
    UserFactory.login($scope.email,$scope.password,function(err){
      $('#login-btn').button('reset');
      if(err){
        $scope.errorMessage = err;
        console.error(err);
        return;
      }

      if(UserFactory.wasGoingToDonate){
        UserFactory.wasGoingToDonate = false;
        $state.go('donate');
      } else {
          $state.go('home');
      }




    });
  };




}]);
