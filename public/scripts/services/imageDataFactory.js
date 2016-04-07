angular.module('App')
.factory('ImageDataFactory',function($http){

  var self = {
    initialize: function(){
      if(self.pixelInfo !== null){
        return;
      }

      self.pixelInfo = [];


    },
    pixelInfo:null
  };

  return self;

});
