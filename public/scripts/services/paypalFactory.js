angular.module('App')
.factory('PaypalFactory',['$http','UserFactory',function($http,UserFactory){
  return {
    buy: function(card,amount,callbacks){
      var user = UserFactory.me;

      //TODO
      //ensure the user object is not null or empty object!
      console.log(user);
      $http.post('/api/user/'+user._id+'/buy',
      {card:card,amount:amount},
      {headers:{'Content-Type':'application/json'}}
      )
      .then(function(result){
        console.log(result.data);
      },function(err){
        console.error(err.data);
      });
    }
  };
}]);
