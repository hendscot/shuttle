(function() {
    var electron = require('electron');
    const ipc = electron.ipcRenderer;
    angular.module('api', [])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

    angular.module('api')
        .controller('apiController', ['$http', ApiController]);

    function ApiController($http) {
        let addr = 'https://api.npr.org/authorization/v2/authorize?' +
            'client_id=nprone_trial_zxetIUmeSBPj&' + 'state=eft68jrd3r74fpc7Grni&' +
            'redirect_uri=http://dev.npr.org/console/application/860&' +
            'response_type=code&' + 'scope=identity.readonly';
        $http.get(addr).then(function(res) {
            console.log(res)
            ipc.send('relocate', res);
        })
    }
})();