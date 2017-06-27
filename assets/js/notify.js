let bar = document.getElementById('notification');
let squash = require('./squash.js');

module.exports = {
    alert: function(msg) {
        bar.className = 'botify';
        bar.innerHTML = msg;
        setTimeout(function() {
            bar.innerHTML = null;
        }, 5000)
    }
}