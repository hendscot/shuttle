const db = require('./database.js');
const card = require('./card.js');
const form = require('./formation.js');
const glo = require('./global.js');
const episodes = require('./episodes');
const router = require('./router.js');
module.exports = {
    build: function() {
        glo.onSearchPage = false;
        var res = db.select();
        var cards = 0;
        var container = form.formElement('div', '', 'container-fluid', '', '', '');
        var row = card.createDeck();
        glo.renderer.appendChild(container);
        container.appendChild(row);
        if (res[0] != undefined) {
            res[0]['values'].forEach(function(entry) {
                var col = card.createStack();
                crd = card.createCardFace(entry[2], entry[3], '', 'Listen', function() {
                    db.setCurrentId(entry[0]);
                    router.routeTo(glo.renderer, episodes.getEpisodes, this.getAttribute('uri'));
                });
                crd.setAttribute('uri', entry[0]);
                col.appendChild(crd);
                row.appendChild(col);
                ++cards;
                if (cards >= 6) {
                    cards = 0;
                    row = card.createDeck();
                    container.appendChild(row);
                }
            })
        } else {
            row.innerHTML = '<h1>Your pad is empty! Start exploring!</h1>'
        }
    }
}