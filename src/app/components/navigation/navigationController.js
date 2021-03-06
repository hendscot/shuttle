(function() {
    angular.module('shuttle')
        .controller('navigationController', ['navigationService', NavigationController])

    function NavigationController(navigationService) {
        var self = this;
        self.words = document.getElementsByClassName('nav-wd');
        self.select = function(elem) {
            elem = elem.currentTarget;
            for (var i = 0; i < self.words.length; i++) {
                self.words[i].className = 'nav-wd deact';
            }
            elem.className = 'nav-wd act';
        }
        self.close = navigationService.shutdown;
        self.min = navigationService.minimize;
    }

})();