(function() {
    angular.module('shuttle')
        .controller('libraryController', ['dataService', 'selectedService', LibraryController]);

    function LibraryController(dataService, selectedService) {
        let self = this;
        self.pods = dataService.getPods();
        self.set = setCurrent;

        function setCurrent(uri, img) {
            selectedService.setSelected(uri, img);
        }
    }
})();