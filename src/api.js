(function() {
    var remote = require('electron').remote;
    angular.module('api', [])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

    angular.module('api')
        .controller('apiController', ['$http', ApiController]);

    function ApiController($http) {
        $http.defaults.headers.common['client_id'] = 'nprone_trial_zxetIUmeSBPj';
        $http.defaults.headers.common['response_type'] = 'code';
        $http.defaults.headers.common['scope'] = 'identity.readonly';
        $http.get('//api.npr.org/authorization/v2/authorize?').then(function(res) {
            authWindow.loadURL(authUrl);
        })
    }
})();