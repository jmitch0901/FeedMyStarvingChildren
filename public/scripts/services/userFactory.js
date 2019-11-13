angular.module("App").factory("UserFactory", [
  "$http",
  function($http) {
    console.log("Initializing User Factory!");
    var user = {
      me: {},
      isLoggedIn: false,
      login: function(email, password, callbacks) {
        var self = this;
        $http
          .post("/api/login", {
            email: email,
            password: password
          })
          .then(function(result) {
            console.log("SUCCESS");
            console.log(result);

            if (result && result.data && result.data.isLoggedIn) {
              self.makeMeRequest(callbacks);
            } else {
              callbacks("Invalid email and password combo.");
            }
          })
          .catch(function(result) {
            console.log("ERROR");
            console.log(result);
          });
      },
      logout: function(callbacks) {
        var self = this;
        $http
          .get("/api/logout")
          .then(function(response) {
            self.isLoggedIn = response.isLoggedIn;
            console.log(response);
            callbacks(null);
          })
          .catch(function(response) {
            callbacks(response);
          });
      },
      makeMeRequest: function(callbacks) {
        var self = this;
        $http
          .get("/api/me")
          .then(function(result) {
            self.me = result.data.me;
            self.isLoggedIn = true;
            console.log("Just made me request and u are logged in");
            callbacks(null);
          })
          .catch(function(result) {
            console.log(result);
            callbacks(result);
          });
      },
      register: function(potentialUser, callbacks) {
        $http
          .post(
            "/api/user",
            { user: potentialUser },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(function(result) {
            console.log(result);
            callbacks(null, result);
          })
          .catch(function(err) {
            console.error(err);
            callbacks(err.data);
          });
      }
    };

    return user;
  }
]);
