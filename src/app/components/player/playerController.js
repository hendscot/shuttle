(function() {
    angular.module('shuttle')
        .controller('playerController', ['playerService', PlayerController])

    function PlayerController(playerService) {
        var self = this;
        playerService.init();
        self.play = playerService.play;
        self.back = playerService.rewind;
        self.forward = playerService.forward;
    }

})();