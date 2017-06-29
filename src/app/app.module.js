(function() {
    angular.module('shuttle', ['ngRoute'])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);
})();