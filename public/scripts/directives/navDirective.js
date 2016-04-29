angular.module('App')
.directive('uiNav',[function(){

  return {
    templateUrl: '../../templates/nav-partial.html',
    restrict: 'E',
    controller: 'NavCtrl'
  };

}]);
