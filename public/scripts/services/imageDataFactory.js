angular.module("App").factory("ImageDataFactory", [
  "$http",
  function($http) {
    var self = {
      getPixelPercentage: function(callbacks) {
        $http.get("/api/pixels/percentage").then(
          function(result) {
            callbacks(result.data.percentage);
          },
          function(err) {}
        );
      },

      getPixelInfo: function(x, y, callbacks) {
        $http
          .get("/api/pixels", {
            params: {
              x: x,
              y: y
            }
          })
          .then(
            function(result) {
              callbacks(null, result.data);
            },
            function(err) {
              console.error(err);
              callbacks(err);
            }
          );
      }
    };

    return self;
  }
]);
