angular.module('App')
.controller('BuyCtrl',['$scope','$http','ImageDataFactory','PaypalFactory',function($scope,$http,ImageDataFactory,PaypalFactory){
  console.log('Buy Controller Loaded');
  $scope.card = {
    name:'',
    number:'',
    month:'',
    year:'',
    cvv: ''
  };

  $scope.amount = 10;
  $scope.buy = function(){
    PaypalFactory.buy($scope.card,$scope.amount,function(){
      console.log('Done purchasing!');
    });
  };

  // $scope.$watch('amount',function(newVal,oldVal){
  //   ImageDataFactory.getAvailablePixelCount(function(amount){
  //     console.log('YOUR AMOUNT: '+amount);
  //     if(newVal > amount){
  //       $scope.amount = 123123;
  //     }
  //   });
  // });

}]);
