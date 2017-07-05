(function() {
    angular.module('shuttle')
        .controller('discoverController', ['discoverService', DiscoverController])

    function DiscoverController(discoverService) {
        let self = this;
        document.getElementsByTagName('body')[0].style.background = 'linear-gradient(to bottom, #753a88, #cc2b2a)'
        self.pods = discoverService.getAllPods();
        self.subscribe = function(elem) {
            elem = elem.currentTarget;
            discoverService.subscribe(elem.getAttribute('url'),
                elem.getAttribute('title'),
                elem.getAttribute('img'));
        }

    }

})();