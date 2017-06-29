(function() {
    const electron = require('electron')
    const remote = electron.remote;
    const ipc = electron.ipcRenderer;
    ipc.on('tray-removed', function() {
        ipc.send('remove-tray')
    })
    angular.module('shuttle')
        .service('navigationService', [NavigationService]);

    function NavigationService() {

        return {
            shutdown: function() {
                remote.getCurrentWindow().close();
            },
            minimize: function() {
                ipc.send('put-in-tray')
                event.preventDefault();
                remote.getCurrentWindow().hide();
            }
        }
    }

})();