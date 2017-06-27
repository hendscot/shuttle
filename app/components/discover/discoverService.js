(function() {
    var path = require('path');
    var url = 'http://itunes.apple.com/rss/toppodcasts/limit=100/json'
    angular.module('shuttle')
        .service('discoverService', ['dataService', '$http', EpisodesService]);

    function EpisodesService(dataService, $http) {
        var cached = false;
        var pods = []
        return {
            getAllPods: function(uri) {
                if (cached == false) {
                    retrieve().then(function(data) {
                        podArray = data.feed.entry;
                        podArray.forEach(function(pod) {
                            pods.push({
                                'img': pod["im:image"][2].label,
                                'name': pod["im:name"].label.slice(0, 20),
                                'summary': pod["summary"].label.slice(0, 100),
                                'url': pod['link']['attributes']['href'].split('/')[6].split('id')[1].split('?')[0]
                            })
                        })
                    })
                    cached = true;
                }
                return pods;

            },
            subscribe: function(uri, title, image) {
                dataService.addPod(uri, title, image);
            },

        }

        function retrieve() {
            return $http.get(url).then(function(data) {
                return data.data;
            })
        }
    }

})();