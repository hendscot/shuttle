(function() {
    var path = require('path');
    var db = require(path.join(__dirname, 'assets/js/database.js'));
    angular.module('shuttle')
        .service('libraryService', [LibraryService]);

    function LibraryService() {
        var pods = [];
        var cached = false;
        return {
            getPods: function() {
                if (cached == false) {
                    let allPods = retrieve();
                    allPods.forEach(function(pod) {
                        pods.push({ 'uri': pod[0], 'img': pod[3] })
                    })
                    cached = true;
                }
                return pods;
            },
        }
    }

    function retrieve() {
        return db.select()[0]['values'];
    }
})();