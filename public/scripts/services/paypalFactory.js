angular.module("App").factory("PaypalFactory", [
  "$http",
  "UserFactory",
  function($http, UserFactory) {
    return {
      buy: function(card, amount, message, callbacks) {
        var user = UserFactory.me;

        //TODO
        //ensure the user object is not null or empty object!
        console.log(user);
        $http
          .post(
            "/api/user/" + user._id + "/buy",
            {
              card: card,
              amount: amount,
              message: message
            },
            {
              headers: { "Content-Type": "application/json" }
            }
          )
          .then(
            function(result) {
              console.log(result.data);
              if (!result || !result.data) {
                console.error("There was an error purchasing:");
                console.error(result);
                return;
              }

              return callbacks(null, result.data);
            },
            function(err) {
              console.error(err.data);
              callbacks(err.data);
            }
          );
      }
    };
  }
]);
