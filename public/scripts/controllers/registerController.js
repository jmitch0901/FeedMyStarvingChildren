angular.module('App')
.controller('RegisterCtrl',['$scope','$state','UserFactory',function($scope,$state,UserFactory){
  console.log("Register Controller Added");

  $scope.errorMessage = "";
  $scope.user = {
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:""
  };

  $('#register-success-modal').on('hidden.bs.modal',function(){
    console.log("modal is hidden!");
    $state.go('home');
  });

  $scope.doRegister = function(){
    console.log("Signing up!");
    $scope.errorMessage = "";
    if(

      $scope.user.firstname.length === 0 ||
      $scope.user.lastname.length === 0 ||
      $scope.user.email.length === 0 ||
      $scope.user.password.length === 0 ||
      $scope.user.confirmPassword.length === 0)
      {
          $scope.errorMessage = "Ensure every field is filled out!";
          return;
      }

    if($scope.user.password !== $scope.user.confirmPassword){
      console.error('passwords dont match!');
      $scope.errorMessage = "Your passwords do not match! Please try again."
      return;
    }

    //done with form checks

    UserFactory.register($scope.user,function(err,result){
      if(err){
        console.log(err);
        $scope.errorMessage = err.error;
        return;
      }

      console.log(result);
      UserFactory.login($scope.user.email,$scope.user.password,function(err){
        if(err){
          console.error("I just registered you, and I couldn't log you in!");
          console.log(err);
        }
      });
      $('#register-success-modal').modal('show');
    });
  };
}]);
