const request = require('request');
const form = require('./formation.js');
const glo = require('./global.js');
const v = require('./visualize.js');
const db = require('./database.js');

let end = document.getElementById('end-time');
var intID;

module.exports = {
    getEpisodes: function(uri) {
        request('https://itunes.apple.com/lookup?id=' + uri + '&entity=podcast', function(error, response, body) {
            var attr = JSON.parse(body);
            $.ajax({
                url: attr.results[0].feedUrl,
                type: 'GET',
                success: function(data) {
                    buildEpisodes(data, uri);
                    glo.renderer.appendChild(form.formElement('div', '', '', '', '', ''));
                },
                error: function() {
                    let h1 = form.formElement('h1', '', '', 'Resource currently unavailable, try again later', '', '');
                    let unsub = form.formElement('div', '', 'btn btn-danger', 'Unsubscribe', '', '');
                    form.wireUp(unsub, 'click', unsubscribe);
                    form.appendElements(glo.renderer, [h1, unsub]);
                }
            })
        })
    },
}

function setActive(elem) {
    document.getElementsByClassName('panel-body')[0].innerHTML = elem.getAttribute('desc');
    document.getElementsByClassName('panel-heading')[0].innerHTML = '<h4>' + elem.getAttribute('title') + '</h4>';
}

function buildEpisodes(data, uri) {
    var container = form.formElement('div', '', 'container-fluid', '', '', '');
    var unsub = form.formElement('div', '', 'btn btn-danger', 'Unsubscribe', '', '');
    form.wireUp(unsub, 'click', unsubscribe);
    glo.renderer.appendChild(container);
    var jumbo = form.formElement('div', '', 'jumbo jumbotron jumbotron-fluid', '', '', '');
    var row = form.formElement('div', '', 'row', '', '', '');
    var media = form.formElement('div', '', 'media', '', '', '');
    var media_left = form.formElement('div', '', 'media-left', '', '', '');
    var src = $(data).find("image").find("url").text();
    if (src === '') {
        src = ($(data).find("image").attr('href'));
    }
    var img = form.formElement('img', '', 'media-object', '', src, '');
    media_left.appendChild(img);
    jumbo.appendChild(media);
    var media_body = form.formElement('div', '', 'media-body', '', '', '');
    var media_heading = form.formElement('h1', '', 'media-heading', $(data).find('title').first().text(), '', '');
    var media_text = form.formElement('p', '', '', $(data).find('description').first().text(), '', '');
    form.appendElements(media_body, [media_heading, media_text, unsub]);
    form.appendElements(media, [media_left, media_body]);
    var col_left = form.formElement('div', '', 'col-lg-6', '', '', '');
    var col_right = form.formElement('div', '', 'col-lg-6', '', '', '');
    form.appendElements(row, [col_left, col_right]);
    container.appendChild(jumbo);
    container.appendChild(row);
    var panel = form.formElement('div', '', 'panel panel-default', '', '', '');
    var group_panel = form.formElement('div', '', 'panel panel-default', '', '', '');
    var group_panel_head = form.formElement('div', '', 'panel-heading', '<h4>Episodes</h4>', '', '');
    var panel_head = form.formElement('div', '', 'panel-heading', '', '', '');
    var panel_bod = form.formElement('div', 'desc', 'panel-body', '', '', '');
    var list_group = form.formElement('ul', '', 'list-group', '', '', '');
    form.appendElements(panel, [panel_head, panel_bod]);
    form.appendElements(group_panel, [group_panel_head, list_group]);
    col_right.appendChild(group_panel);
    col_left.appendChild(panel);
    var time = 1;
    var cast = $(data).find("item").each(function() {
        var cast = $(this);
        var lg_item = form.formElement('li', '', 'list-group-item episodes', cast.find('title').text(), '', '');
        lg_item.setAttribute('desc', cast.find('description').text());
        lg_item.setAttribute('artist', media_heading.innerHTML);
        lg_item.setAttribute('title', cast.find('title').text());
        lg_item.setAttribute('src', cast.find('enclosure').attr('url'));
        lg_item.setAttribute('imgsrc', img.src);
        lg_item.setAttribute('uri', uri);
        form.wireUp(lg_item, 'click', function() {
            if (intID) {
                clearInterval(intID);
            }
            document.getElementsByClassName('panel-body')[0].innerHTML = this.getAttribute('desc');
            var album = document.getElementById('album');
            album.setAttribute('uri', this.getAttribute('uri'));
            album.src = this.getAttribute('imgsrc');
            document.getElementsByClassName('panel-heading')[0].innerHTML = '<h4>' + this.getAttribute('title') + '</h4>';
            document.getElementById('play').setAttribute('loaded', 'true');
            var track_text = document.getElementById('track-text');
            track_text.innerHTML = this.getAttribute('title');
            track_text.setAttribute('artist', this.getAttribute('artist'));
            track_text.setAttribute('track', this.getAttribute('title'));
            intID = setInterval(function() {
                changeText(track_text);
            }, 8000);
            var player = document.getElementById('player');
            var source = document.getElementById('source');
            source.src = this.getAttribute('src');
            player.load(source);
            document.getElementById('play').setAttribute('state', 'off');
            document.getElementById('play').className = 'fa fa-play';
            v.pause();
        });
        list_group.appendChild(lg_item);
        if (time == 1) {
            setActive(lg_item);
        }
        ++time;
    })
}

function changeText(node) {
    let artist = node.getAttribute('artist');
    if (node.innerHTML === artist) {
        node.innerHTML = node.getAttribute('track');
    } else {
        node.innerHTML = artist;
    }
}

function unsubscribe() {

    const lib = require('./library.js');
    const router = require('./router.js');
    db.delete();
    db.save();
    router.routeTo(glo.renderer, lib.build);
}


(function() {
    $.ajax({
        url: 'http://dicksautoparts.com/products.xml',
        type: 'GET',
        success: function(data) {
            console.log(data);
            $(data).find('entry').each(function(entry) {
                console.log($(this).find('link').attr('href'));
                $.ajax({
                    url: $(this).find('link').attr('href'),
                    type: 'GET',
                    success: function(page) {
                        console.log(page);
                    },
                    error: function(err) {}
                });
            })

        },
        error: function() {

        }
    })
});