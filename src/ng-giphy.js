'use strict';

angular.module('ngGiphy', [])
  .directive('ngGiphySearch', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    // Create the output object

    var output = {};


    // Restrict the directive to Attributes and Elements

    output.restrict = 'AE';


    output.scope = {
      query : '@query',
      limit : '@limit',
      offset : '@offset'
    }


    // Retrive the template from the templateUrl parameter or use the default one.

    var getTemplate = function(url){
      if (angular.isUndefined(url)) {
          url = 'giphy-view.html';
      };

      var templateLoader = $http.get(url, {cache: $templateCache});

      return templateLoader;

    }


    // Create the linker function

    var linker = function(scope, element, attrs) {


      // Define if data has been loaded

      scope.dataLoaded = false;


      // Define parameters from attributes

      var params = {};

      // TODO create a configurable api_key parameter
      params.api_key = 'dc6zaTOxFJmzC';

      // Retrive parameters from directive attributes
      params.q = scope.query.split(',').join('+');
      params.limit = scope.limit;
      params.offset = scope.offset;

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
