var formation = require('./formation.js');
module.exports = {
    createCard: function(title, image, desc, btnText, callback) {
        return (
            formation.appendElements(
                formation.formElement('div', '', 'card discover mb-3 text-center', '', '',
                    ''), [formation.formElement('img', '', 'card-img-top', '',
                        image, ''),
                    formation.appendElements(formation.formElement('div', '',
                        'card-block', '', '', ''), [
                        formation.formElement('h4', '', 'card-title', title, '', ''),
                        formation.formElement('p', '', 'card-text', desc, '', ''),
                        formation.wireUp(formation.formElement('div', '',
                                'btn btn-primary', btnText, '', ''), 'click',
                            callback)
                    ])
                ])
        );
    },
    createCardFace: function(title, image, desc, btnText, callback) {
        return (
            formation.wireUp(formation.appendElement(
                formation.formElement('div', '', 'card library mb-3 text-center face', '', '',
                    ''), formation.formElement('img', '', 'card-img-top', '',
                    image, '')), 'click', callback)
        );
    },
    createDeck: function() {
        return formation.formElement('div', '', 'row', '', '', '');
    },
    createStack: function() {
        return formation.formElement('div', '', 'col-lg-2 col-md-4 col-sm-6', '', '', '');
    }
}