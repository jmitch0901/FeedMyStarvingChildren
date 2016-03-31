angular.module('App')
.controller('LoginCtrl',function($location,$window){
  console.log("Login Controller Added");
  // if ($location.protocol() !== 'https') {
  //   console.log('You are NOT going over https when you should!');
  //   // $window.location.href = $location.absUrl().replace('http', 'https');
  //   $window.location.href = 'https://localhost:3000/#/login'
  // }
});
