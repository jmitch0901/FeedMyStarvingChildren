angular.module('App')
.factory('ImageDataFactory',['$http',function($http){



  var self = {

    getPixelPercentage: function(callbacks){
      $http.get('/api/pixels/percentage')
      .then(function(result){

        callbacks(result.data.percentage);

      }, function(err){


      });


    },

    getPixelInfo: function(x,y,callbacks){
      $http.get('/api/pixels',{
        params:{
          'x':x,
          'y':y
        }
      })
      .then(function(result){
      //  console.log(JSON.stringify(result.data));
        callbacks(null,result.data);
        //console.log(result);
        //callbacks(null,result.data);
      }, function(err){
        console.error(err);
        callbacks(err);
      });
    }

  };








  // var self = {
  //   pixelInfo:null, //Array of our pixel meta-data
  //   initialize: function(){
  //     if(self.pixelInfo !== null){
  //       return;
  //     }
  //
  //     console.log('About to get pixel metadata');
  //     self.pixelInfo = [];
  //     $http.get('/api/pixels')
  //     .then(function(result){
  //       console.log(result);
  //       var map = {};
  //
  //       result.forEach(function(entry){
  //
  //         if(!map[Number(entry.pixel.x)])
  //           map[Number(entry.pixel.x)] = {};
  //
  //         map[Number(entry.pixel.x)][Number(entry.pixel.y)] = entry;
  //
  //
  //       });
  //
  //       self.pixelInfo = map;
  //
  //     },function(err){
  //       console.error(err);
  //     })
  //     ;
  //   },
  //   getMetaData: function(x,y){
  //     //console.log(x + ", "+y)
  //     if(!self.pixelInfo[x] || !self.pixelInfo[x][y]){
  //       return undefined;
  //     }
  //     //console.log(self.pixelInfo);
  //     return self.pixelInfo[Number(x)][Number(y)];
  //   }
  //
  // };

  return self;

}]);
