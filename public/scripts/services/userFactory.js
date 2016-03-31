angular.module('App')
.factory('UserFactory',function($http){

console.log('Initializing User Factory!');

  var user = {
    isLoggedIn: false,
    login: function(email,password){

    },
    register: function(){

    }
  };

  return user;
});
