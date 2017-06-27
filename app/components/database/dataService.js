(function() {
    var path = require('path');
    var db = require(path.join(__dirname, 'assets/js/database.js'));
    angular.module('shuttle')
        .service('dataService', [DataService]);

    function DataService() {
        var pods = [];
        var cached = false;
        return {
            getPods: function() {
                if (cached == false) {
                    pods = [];
                    let allPods = retrieve();
                    allPods.forEach(function(pod) {
                        pods.push({ 'uri': pod[0], 'img': pod[3] })
                    })
                    cached = true;
                }
                return pods;
            },
            deletePod: function(uri) {
                db.delete(uri);
                db.save();
                cached = false;
            },
            addPod: function(uri, title, image) {
                db.insert(uri, title, image);
                db.save();
                cached = false;
            }
        }
    }

    function retrieve() {
        return db.select()[0]['values'];
    }
})();