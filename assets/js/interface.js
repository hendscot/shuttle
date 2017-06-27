let router = require('./router.js');
const discover = require('./discover.js');
const glo = require('./global.js');
let library = require('./library.js')
const v = require('./visualize.js');
const pods = require('./podcasts.js');
let words = document.getElementsByClassName('nav-wd');
const epi = require('./episodes.js');
let alert = require('./notify.js');
const searchbar = document.getElementById('searchsend');
const searchbtn = document.getElementById('search-btn');
let path = require('path');
const remote = require('electron').remote;
let close = document.getElementById('close-btn');
let min = document.getElementById('min-btn');
let active = 'library';
let on = false;
let play_class = 'fa fa-play';
let pause_class = 'fa fa-pause';
let mouseDown;

let themes = ['css/green.css', 'css/purple.css', 'css/turqoise.css'];
let x = 0;
library.build();
/*document.getElementById('themepicker').addEventListener('click', function() {
    if (x > 2) x = 0;
    document.getElementById('scheme').href = themes[x];
    x++;
})*/

var album = document.getElementById('album');
album.addEventListener('click', function() {
    router.routeTo(glo.renderer, epi.getEpisodes(album.getAttribute('uri')));
})

close.addEventListener('click', function() {
    remote.getCurrentWindow().close();
})

min.addEventListener('click', function() {
    remote.getCurrentWindow().minimize();
})
document.getElementById('discover').addEventListener('click', function() {
    router.routeTo(document.getElementById('app-render'), pods.build);
});


document.getElementById('library').addEventListener('click', function() {
    router.routeTo(document.getElementById('app-render'), library.build);
    active = 'library';
})

searchbtn.addEventListener('click', function() {
    search();
})

searchbar.addEventListener('submit', function(e) {
    e.preventDefault();
    search();
})

var button = document.getElementById('play');
var player = document.getElementById('player');
button.addEventListener('click', function() {
    if (button.getAttribute('state') == 'on') {
        console.log('pausing');
        button.className = play_class;
        player.pause();
        button.setAttribute('state', 'off');
        v.pause();
    } else if (button.getAttribute('state') == 'off' && button.getAttribute('loaded') == 'true') {
        console.log('playing');
        button.className = pause_class;
        player.play();
        button.setAttribute('state', 'on');
        v.play();
    }
})
player.volume = 1;
var volBar = document.getElementById('vol');
var volOvr = document.getElementById('vol-overlay');
volBar.addEventListener('mousedown', function(e) {
    var rect = e.target.getBoundingClientRect();
    var diff = (Math.abs(Math.floor(volOvr.style.width.split('px')[0] - (e.pageX - rect.left)) / 100));
    (player.volume + diff > 1) ? 1: player.volume += diff;
    volOvr.style.width = (((e.pageX - rect.left)) + 'px');
})
volOvr.addEventListener('mousedown', function(e) {
    var rect = e.target.getBoundingClientRect();
    var diff = (Math.abs(Math.floor(volOvr.style.width.split('px')[0] - (e.pageX - rect.left)) / 100));
    (player.volume - diff < 0) ? 0: player.volume -= diff;
    volOvr.style.width = (((e.pageX - rect.left)) + 'px');
})

for (var i = 0; i < words.length; i++) {
    words[i].addEventListener('click', function() {
        killActive();
        this.className = 'nav-wd act';
    })
}

function killActive() {
    document.getElementsByClassName('nav-wd act')[0]
        .className = 'nav-wd deact';
}


function search() {
    if (glo.onSearchPage) {
        router.routeTo(glo.renderer, pods.search);
    }
    return false;
}