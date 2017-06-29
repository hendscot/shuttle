(function() {
    angular.module('shuttle')
        .controller('searchBarController', ['searchService', 'discoverService', '$location', '$http', SearchBarController])

    function SearchBarController(searchService, discoverService, $location) {
        var self = this;
        self.query = '';
        self.search = function() {
            if (self.query) {
                searchService.searchPods(self.query);
                $location.path('search');
            } else {
                $location.path('discover');
            }
        }
        self.subscribe = function(elem) {
            elem = elem.currentTarget;
            discoverService.subscribe(elem.getAttribute('url'),
                elem.getAttribute('title'),
                elem.getAttribute('img'));
        }
    }

})();