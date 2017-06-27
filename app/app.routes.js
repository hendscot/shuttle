(function() {
    angular.module('shuttle').config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/library/libraryView.html',
                controller: 'libraryController',
                controllerAs: '_lib'
            })

        .when('/discover', {
            templateUrl: 'app/components/discover/discoverView.html',
            controller: 'discoverController',
            controllerAs: '_disc'
        })

        .when('/episodes', {
            templateUrl: 'app/components/episodes/episodesView.html',
            controller: 'episodesController',
            controllerAs: '_epi'
        });
    })
})();