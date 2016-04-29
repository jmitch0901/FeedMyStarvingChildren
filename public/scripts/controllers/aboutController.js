angular.module('App')
.controller('AboutCtrl',[function(){

  $('#navbar-tabs li').removeClass('active');
  $('#navbar-tabs li[ui-sref=about]').addClass('active');

}]);
