const card = require('./card.js');
const request = require('request');
const glo = require('./global.js');
const formation = require('./formation.js');
var db = require('./database.js');
const searchbar = document.getElementById('searchbar');
module.exports = {
    build: function() {
        glo.onSearchPage = true;
        request('https://itunes.apple.com/rss/toppodcasts/limit=100/json',
            function(error, response, body) {
                formation.appendElement(glo.renderer, formation.appendElement(
                    formation.formElement('div', '',
                        'jumbo jumbotron jumbotron-fluid', '', '', ''),
                    formation.appendElements(formation.formElement('div', '',
                        'container', '', '', ''), [formation.formElement('h1',
                            '', 'display-3', 'Discover your next favorite podcast', '', ''),
                        formation.formElement(
                            'p', '', 'lead',
                            'Browse trending podcasts or search the entire catalog.',
                            '', '')
                    ])));
                this.topPods = body;
                var pods = JSON.parse(this.topPods);
                var podArray = pods.feed.entry;
                var container = document.createElement('div');
                var row = document.createElement('div');
                var cards = 0;
                row.className = 'row';
                container.className = 'container-fluid text-center';
                container.appendChild(row);
                glo.renderer.appendChild(container);
                podArray.forEach(function(pod) {
                    var col = card.createStack();
                    var crd = card.createCard(pod["im:name"].label.slice(
                            0,
                            20),
                        pod["im:image"][2].label, pod["summary"].label.slice(
                            0, 100),
                        "Subscribe",
                        function() {
                            var par = this.parentNode.parentNode;
                            var urid = par.getAttribute('url').split('/')[6].split('id')[1].split('?')[0];

                            db.insert(urid, 'Podcast', par.getAttribute('name'), par.getAttribute('image'));
                            db.save();
                        });
                    crd.setAttribute('name', pod["im:name"].label);
                    crd.setAttribute('image', pod['im:image'][2].label);
                    crd.setAttribute('url', pod['link']['attributes']['href']);
                    col.appendChild(crd);
                    row.appendChild(col);
                    cards += 1;
                    if (cards == 6) {
                        row = document.createElement('div');
                        row.className = 'row';
                        container.appendChild(row);
                        cards = 0;
                    }
                })
            });

    },
    search: function() {
        var query = searchbar.value.split(' ').join('');
        request('https://itunes.apple.com/search?media=podcast&term=' + query,
            function(error, response, body) {
                let results = JSON.parse(body);
                podArray = results.results;
                var h1 = document.createElement('h1');
                h1.innerHTML = results.resultCount + ' results found for "' + searchbar.value + '"';
                glo.renderer.appendChild(h1);
                var container = document.createElement('div');
                var row = document.createElement('div');
                var cards = 0;
                row.className = 'row';
                container.className = 'container-fluid text-center';
                container.appendChild(row);
                glo.renderer.appendChild(container);

                podArray.forEach(function(pod) {
                    console.log(pod["artworkUrl600"])
                    var col = card.createStack();
                    var crd = card.createCard(pod["collectionName"].slice(
                            0,
                            20),
                        pod["artworkUrl600"], pod["trackName"].slice(
                            0, 100),
                        "Subscribe",
                        function() {
                            var par = this.parentNode.parentNode;
                            var urid = par.getAttribute('url').split('/')[6].split('id')[1].split('?')[0];

                            db.insert(urid, 'Podcast', par.getAttribute('name'), par.getAttribute('image'));
                            db.save();
                        });
                    crd.setAttribute('name', pod["collectionName"]);
                    crd.setAttribute('image', pod['artworkUrl600']);
                    crd.setAttribute('url', pod['collectionViewUrl']);
                    col.appendChild(crd);
                    row.appendChild(col);
                    cards += 1;
                    if (cards == 6) {
                        row = document.createElement('div');
                        row.className = 'row';
                        container.appendChild(row);
                        cards = 0;
                    }
                })
            })

    },
    topPods: null
}