'use strict';

angular.module('ngGiphy', [])
  .directive('ngGiphySearch', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    var output = {};

    output.restrict = 'AE';

    var getTemplate = function(url){
      if (angular.isUndefined(url)) {
          url = 'giphy-view.html';
      };

      var templateLoader = $http.get(url, {cache: $templateCache});
      
      return templateLoader;

    }

    var linker = function(scope, element, attrs) {

      scope.dataLoaded = false;

      var params = {};
      params.api_key = 'dc6zaTOxFJmzC';
      params.q = attrs.query;
      params.limit = attrs.limit;
      params.offset = attrs.offset;

      var apiSearch = function(){

          $http.get('//api.giphy.com/v1/gifs/search', {params:params})
            .success(
              function(data,status){

                if(typeof data=='object'){
                  scope.results = data.data;
                  scope.dataLoaded = true;
                }

              }

            )
            .error(
              function(){
                console.log("Failed to access");
              }
            )

      }

      var loader = getTemplate(attrs.templateUrl);

      var promise = loader.success(function(html) {
          element.replaceWith($compile(html)(scope));
      }).then(function (response) {
          apiSearch();
      });
    }


    output.link = linker;

    return output;

  }]);

