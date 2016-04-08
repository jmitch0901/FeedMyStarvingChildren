angular.module('App')
.controller('RegisterCtrl',function($scope,UserFactory){
  console.log("Register Controller Added");

  $scope.errorMessage = "";
  $scope.user = {
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:""
  };

  $scope.doRegister = function(){
    console.log("Signing up!");

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
        return;
      }

      console.log(result);
    });
  };
});
