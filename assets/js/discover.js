const glo = require("./global.js");
const router = require('./router.js');
const pod = require('./podcasts.js');
const card = require("./card.js");
const pods = require("./podcasts.js");
const options = [{
    title: 'Podcasts',
    image: './Podcast.jpg',
    desc: 'Browse a large selection of top podcasts!',
    btn: 'Get Started',
    func: function() {
        router.routeTo(glo.renderer, pod.build);
    }
}, ];

module.exports = {
    build: function() {
        glo.onSearchPage = false;
        var cards = 0;
        var row = document.createElement('div');
        var container = document.createElement('div');
        container.className = 'container-fluid text-center';
        row.className = 'row';
        container.appendChild(row);
        glo.renderer.appendChild(container)
        options.forEach(function(option) {
            var col = document.createElement('div');
            col.className = 'col-lg-2 col-md-4 col-sm-6';
            col.appendChild(card.createCard(option.title, option.image,
                option.desc, option.btn, option.func));
            row.appendChild(col);
            cards += 1;
            if (cards == 6) {
                cards = 0;
                row = document.createElement('div');
                row.className('row');
                container.appendChild(row);
            }
        });
    }
}