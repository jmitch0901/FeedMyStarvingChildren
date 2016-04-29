angular.module('App')
.controller('BuyCtrl',['$scope','$http','$state','PaypalFactory',function($scope,$http,$state,PaypalFactory){


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
  $scope.buyEquation = $scope.amount + " X $0.22 = $" + ($scope.amount * 0.22);
  $scope.resultMessage = '';

  $('#input-amount').on('keypress',function(e){
    if (e.which < 48 || e.which > 57){
      e.preventDefault();
    }
  });

  $scope.$watch('amount',function(newValue,oldValue){

    var newAmount = $scope.amount > 1000 ? 0  : $scope.amount;

    var result = Number(newAmount * 0.22).toFixed(2);
    if(isNaN(result)){
      result = 0;
    }

    console.log(newValue);

    if(newValue < 10 || newValue > 1000 || newValue === null || newValue === undefined){
      result = 0;
      $('#purchase-btn').prop('disabled',true);
      $('#amount-form-group').removeClass('has-success');
      $('#amount-form-group').addClass('has-error');
      $('#equation').removeClass('equation-success');
      $('#equation').addClass('equation-danger');
      $('#purchase-btn').prop('disabled',true);
    } else {
      $('#purchase-btn').prop('disabled',false);
      $('#amount-form-group').removeClass('has-error');
      $('#amount-form-group').addClass('has-success');
      $('#equation').removeClass('equation-danger');
      $('#equation').addClass('equation-success');
      $('#purchase-btn').prop('disabled',false);

    }

      $scope.buyEquation = (newAmount || 0) + " X $0.22 = $" + Number(result).toFixed(2);
  });


  $scope.buy = function(){


    if($scope.amount < 10){

      //$('#amount-form-group').addClass('has-error');
      return;
    } else if ($scope.amount > 1000){

      //$('#amount-form-group').addClass('has-error');
      return;
    } else if ($scope.amount === null || $scope.amount === undefined){

      //$('#amount-form-group').addClass('has-error');
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
        console.log('MODAL IS NOW HIDDEN');
        $('#purchase-btn').button('reset');
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

          $state.go('home');
        }
      });

      console.log('Done purchasing!');
    });
  };



}]);
