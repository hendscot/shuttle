(function() {
    var url = 'http://itunes.apple.com/search?media=podcast&term='
    angular.module('shuttle')
        .service('searchService', ['$http', SearchService]);

    function SearchService($http) {
        var results;
        var pods = [];
        var callbacks = [];
        var query;
        return {
            searchPods: function(q) {
                pods = [];
                query = q;
                retrieve(query).then(function(data) {
                    console.log(data)
                    podArray = data.results;
                    results = data.resultCount;
                    podArray.forEach(function(pod) {
                        pods.push({
                            'img': pod["artworkUrl600"],
                            'name': pod["collectionName"].slice(0, 20),
                            'summary': pod["trackName"].slice(0, 100),
                            'url': pod['collectionViewUrl'].split('/')[6].split('id')[1].split('?')[0]
                        })
                    })
                    notify();
                })
                return pods;
            },
            getQuery: function() {
                return query;
            },
            getResults: function() {
                return results;
            },
            getPods: function() {
                return pods;
            },
            setQuery: function(q) {
                query = q;
            },
            registerCallback: function(callback) {
                callbacks.push(callback);
            },
        }

        function retrieve(query) {
            query = query.split(' ').join('');
            return $http.get(url + query).then(function(data) {
                return data.data;
            })
        }

        function notify() {
            callbacks.forEach(function(callback) {
                callback();
            })
        }
    }

})();