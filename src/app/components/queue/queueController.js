(function() {
    angular.module('shuttle')
        .controller('queueController', ['queueService', 'playerService', QueueController]);

    function QueueController(queueService, playerService) {
        let self = this;
        queueService.init(document.getElementById('upnxt-img'),
            document.getElementById('upnxt-ovrly'));
        self.next = function() {
            playerService.load(queueService.next());
        }
    }
})();