angular.module("App").controller("LoginCtrl", [
  "$scope",
  "$state",
  "UserFactory",
  function($scope, $state, UserFactory) {
    console.log("Login Controller Added");

    $scope.email = "";
    $scope.password = "";
    $scope.errorMessage = "";

    $scope.login = function() {
      $("#login-btn").button("loading");

      $scope.errorMessage = "";

      //TODO finish this login method
      UserFactory.login($scope.email, $scope.password, function(err) {
        $("#login-btn").button("reset");
        if (err) {
          $scope.errorMessage = err;
          console.error(err);
          return;
        }

        $state.go("home");
      });
    };
  }
]);
