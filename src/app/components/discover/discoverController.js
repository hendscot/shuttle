(function() {
    angular.module('shuttle')
        .controller('discoverController', ['discoverService', DiscoverController])

    function DiscoverController(discoverService) {
        let self = this;
        self.pods = discoverService.getAllPods();
        self.subscribe = function(elem) {
            elem = elem.currentTarget;
            discoverService.subscribe(elem.getAttribute('url'),
                elem.getAttribute('title'),
                elem.getAttribute('img'));
        }

    }

})();