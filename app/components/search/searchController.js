(function() {
    angular.module('shuttle')
        .controller('searchController', ['searchService', 'discoverService', '$location', '$http', SearchController])

    function SearchController(searchService, discoverService, $location) {
        var self = this;
        self.query = '';
        self.results = searchService.getResults();
        self.pods = searchService.searchPods(self.query)
        self.search = function () {
          $location.path('search')
          self.pods = searchService.searchPods(self.query);
        }
        self.subscribe = function(elem) {
            elem = elem.currentTarget;
            discoverService.subscribe(elem.getAttribute('url'),
                elem.getAttribute('title'),
                elem.getAttribute('img'));
        }
    }

})();
