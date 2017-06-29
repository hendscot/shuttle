(function() {
    angular.module('shuttle')
        .controller('searchController', ['searchService', 'discoverService', '$location', '$http', SearchController])

    function SearchController(searchService, discoverService, $location) {
        var self = this;
        self.query = searchService.getQuery();
        self.results = searchService.getResults();
        self.pods = searchService.getPods();
        self.subscribe = function(elem) {
            elem = elem.currentTarget;
            discoverService.subscribe(elem.getAttribute('url'),
                elem.getAttribute('title'),
                elem.getAttribute('img'));
        }
        self.clik = function() {
            self.pods = [];
        }
        self.updatePods = function() {
            self.pods = searchService.getPods();
            self.query = searchService.getQuery();
            self.results = searchService.getResults();
        }
        searchService.registerCallback(self.updatePods);
    }

})();