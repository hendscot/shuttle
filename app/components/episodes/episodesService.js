(function() {
    var path = require('path');
    var db = require(path.join(__dirname, 'assets/js/database.js'));
    var base = 'http://itunes.apple.com/lookup?id=';
    var type = '&entity=podcast';
    angular.module('shuttle')
        .service('episodesService', ['$q', '$http', 'dataService', EpisodesService]);

    function EpisodesService($q, $http, dataService) {
        return {
            getEpisodes: function(uri) {
                return $http.get(base + uri + type).then(function(data) {
                    let feed = data.data.results[0].feedUrl;
                    return $http.get(feed).then(function(episodes) {
                        return episodes.data;
                    })
                })
            },
            getFeed: function(uri) {
                return $http.get(base + uri + type);
            },
            deleteEpisode: function(uri) {
                dataService.deletePod(uri);
            }
        }
    }

})();