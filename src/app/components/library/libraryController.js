(function() {
    angular.module('shuttle')
        .controller('libraryController', ['dataService', 'selectedService', LibraryController]);

    function LibraryController(dataService, selectedService) {
        let self = this;
        document.getElementsByTagName('body')[0].style.background = 'linear-gradient(to bottom, #753a88, #cc2b2a)'
        self.pods = dataService.getPods();
        self.set = setCurrent;

        function setCurrent(uri, img) {
            selectedService.setSelected(uri, img);
        }
    }
})();