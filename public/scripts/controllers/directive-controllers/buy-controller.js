angular.module('App')
.controller('BuyCtrl',['$scope','$http','PaypalFactory',function($scope,$http,PaypalFactory){


  console.log('Buy Controller Loaded');
  $scope.card = {
    name:'',
    number:'',
    month:'',
    year:'',
    cvv: ''
  };

  $scope.message = '';
  $scope.amount =  10;
  $scope.isSuccess = false;

  $scope.resultMessage = '';


  $scope.buy = function(){


    if($scope.amount < 10){

      $('#amount-form-group').addClass('has-error');
      $scope.amount = 10;
      return;
    } else if ($scope.amount > 1000){

      $('#amount-form-group').addClass('has-error');
      $scope.amount = 1000;
      return;
    } else if ($scope.amount === null || $scope.amount === undefined){

      $('#amount-form-group').addClass('has-error');
      $scope.amount = 10;
      return;
    }

    $('#purchase-btn').button('loading');
    PaypalFactory.buy($scope.card,$scope.amount,$scope.message,function(err,result){

      if(err){
        $scope.resultMessage = err.error || "There was an error fulfilling your request. Sorry about that! Please try again later.";
        $scope.isSuccess = false;
      } else {
        $scope.isSuccess = result.success;
        $scope.resultMessage = result.message;
      }

      var isSuccessClass = $scope.isSuccess ? 'alert-success' : 'alert-danger';



      $('#buy-success-modal .modal-body .alert')
      .removeClass('alert-danger')
      .removeClass('alert-success')
      .addClass(isSuccessClass);

      $('#buy-success-modal').modal('show');
      $('#buy-success-modal').on('hidden.bs.modal',function(){
        $('#purchase-btn').button('reset');
      });




      $('#buy-success-modal').on('hidden.bs.modal',function(){
        console.log("modal is hidden!");
        if($scope.isSuccess){
          $scope.message = '';
          $scope.amount = 10;
          $scope.card = {
            name:'',
            number:'',
            month:'',
            year:'',
            cvv: ''
          };

          $('#buy-slider').slideUp('slow');
        }
      });

      console.log('Done purchasing!');
    });
  };



}]);
