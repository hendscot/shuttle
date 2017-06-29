(function() {
    var path = require('path');
    var vis = require(path.join(__dirname, 'assets/js/visualize.js'));
    var player;
    var play;
    var album;
    var source;
    var progress;
    var track;
    var playBtn = 'fa fa-play';
    var pausBtn = 'fa fa-pause';
    angular.module('shuttle')
        .service('playerService', [PlayerService]);

    function PlayerService() {
        return {
            play: function() {
                handleAudio();
            },
            load: function(audioSrc, img, title) {
                stopAudio();
                source.src = audioSrc;
                album.src = img;
                track.innerHTML = title;
                play.setAttribute('state', 'on')
                player.load(source);
                handleAudio();
            },
            init: function() {
                player = document.getElementById('player');
                play = document.getElementById('play');
                album = document.getElementById('album');
                source = document.getElementById('source');
                track = document.getElementById('track-text');
                progress = document.getElementById('progress-bar');
                vis.init(document.getElementsByClassName('eq'),
                    document.getElementById('start-time'),
                    document.getElementById('end-time'),
                    progress);
                player.volume = 1;
                var volBar = document.getElementById('vol');
                var volOvr = document.getElementById('vol-overlay');

                /***********LISTENERS!*************** */
                // player
                player.addEventListener('durationchange', function() {
                    vis.setEnd(player.duration);
                });
                player.addEventListener('timeupdate', function() {
                    vis.update(player.currentTime, player.duration);
                });
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
                progress.addEventListener('click', seek);
            }
        }

        function handleAudio() {
            if (play.getAttribute('state') == 'on') {
                if (play.className == playBtn) {
                    startAudio();
                } else {
                    stopAudio();
                }
            }
        }

        function startAudio() {
            play.className = pausBtn;
            player.play();
            vis.play();
        }

        function stopAudio() {
            play.className = playBtn;
            player.pause();
            vis.pause();
        }

        function seek(e) {
            player.currentTime = (e.offsetX / this.offsetWidth) * player.duration;
            progress.value = percent / 100;
        }
    }

})();