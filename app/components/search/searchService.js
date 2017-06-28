(function() {
    var url = 'https://itunes.apple.com/search?media=podcast&term='
    angular.module('shuttle')
        .service('searchService', ['$http', SearchService]);

    function SearchService($http) {
        var cached = false;
        var results;
        var pods = [];
        var searched = 0;
        return {
          searchPods: function (query) {
                retrieve(query).then(function(data) {
                  console.log(data);
                    podArray = data.results;
                    results = data.resultCount;
                    podArray.forEach(function(pod) {
                      pods.push({
                          'img': pod["artworkUrl600"],
                          'name': pod["collectionName"].slice(0,20),
                          'summary': pod["trackName"].slice(0, 100),
                          'url': pod['collectionViewUrl'].split('/')[6].split('id')[1].split('?')[0]
                      })
                    })
                })
            return pods;
          },
          getSearched: function () {
            return searched;
          },
          getResults : function () {
            return results;
          }
          }
          function retrieve(query) {
            query = query.split(' ').join('');
              return $http.get(url + query).then(function(data) {
                  return data.data;
              })
          }
        }

})();
