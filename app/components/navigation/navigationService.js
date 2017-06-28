(function() {
    var remote = require('electron').remote;
    angular.module('shuttle')
        .service('navigationService', [NavigationService]);

    function NavigationService() {

        return {
            shutdown: function() {
                remote.getCurrentWindow().close();
            },
            minimize: function() {
                remote.getCurrentWindow().minimize();
            }
        }
    }

})();