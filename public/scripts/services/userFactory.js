angular.module('App')
.factory('UserFactory',function($http){

console.log('Initializing User Factory!');

  var user = {
    me: {},
    isLoggedIn: false,
    login: function(email,password,callbacks){
      var self = this;
      $http({
          method: 'POST',
          url: "/api/login",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
          },
          data: {email:email, password: password}
      })
      .success(function(result){
        console.log("SUCCESS")
        console.log(result);

        if(!result.isLoggedIn){
          return callbacks("Invalid email and password combo.");
        }

        self.makeMeRequest(callbacks);


      })
      .error(function(result){
        console.log("ERROR");
        console.log(result);
      });
    },
    logout: function(callbacks){
      var self = this;
      $http.get('/api/logout')
      .success(function(response){
        self.isLoggedIn = response.isLoggedIn;
        console.log(response);
        callbacks(null);
      })
      .error(function(response){
        callbacks(response);
      })
    },
    makeMeRequest: function(callbacks){
      var self = this;
      $http.get('/api/me')
      .success(function(result){

        if(result.error){
          console.log(result.error);
          callbacks(result.error);
        } else {
          self.me = result.me;
          self.isLoggedIn = true;
          console.log('Just made me request and u are logged in');
          callbacks(null);
        }
      })
      .error(function(result){
        console.log(result);
        callbacks(result);
      });
    },
    register: function(potentialUser,callbacks){

      $http.post('/api/user',{user:potentialUser},{headers:{'Content-Type':'application/json'}})
      .then(function(result){
        console.log(result);
        callbacks(null,result);

    },function(err){
      console.error(err);
      callbacks(err.data);
    });

    }
  };

  return user;
});
