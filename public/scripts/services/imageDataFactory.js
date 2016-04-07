angular.module('App')
.factory('ImageDataFactory',function($http){

  var self = {
    pixelInfo:null, //Array of our pixel meta-data
    initialize: function(){
      if(self.pixelInfo !== null){
        return;
      }

      self.pixelInfo = [];
      $http.get('/api/pixels')
      .success(function(result){
        //console.log(result.map());
        var map = {};

        result.forEach(function(entry){

          if(!map[Number(entry.pixel.x)])
            map[Number(entry.pixel.x)] = {};

          map[Number(entry.pixel.x)][Number(entry.pixel.y)] = entry;


        });

        self.pixelInfo = map;
        //console.log(self.pixelInfo);
      });
    },
    getMetaData: function(x,y){
      //console.log(x + ", "+y)
      if(!self.pixelInfo[x] || !self.pixelInfo[x][y]){
        return undefined;
      }
      //console.log(self.pixelInfo);
      return self.pixelInfo[Number(x)][Number(y)];
    }
  };

  return self;

});
