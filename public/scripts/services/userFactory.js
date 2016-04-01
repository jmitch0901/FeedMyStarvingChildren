angular.module('App')
.factory('UserFactory',function($http){

console.log('Initializing User Factory!');

  var user = {
    me: undefined,
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
        $http.get('/api/me')
        .success(function(result){

          if(result.error){
            console.log(result.error);
            callbacks(result.error;)
          } else {
            self.me = result;
            callbacks(null);

          }

        })
        .error(function(result){
          console.log(result);
        });
      })
      .error(function(result){
        console.log("ERROR");
        console.log(result);
      });
    },
    register: function(){

    }
  };

  return user;
});
