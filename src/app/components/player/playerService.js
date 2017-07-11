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
        .service('playerService', ['queueService', PlayerService]);

    function PlayerService(queueService) {
        return {
            play: function() {
                handleAudio();
            },
            load: function(pod) {
                loadAudio(pod);
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
                player.addEventListener('ended', function() {
                    loadAudio(queueService.next());
                })
                setInterval(toggleText, 6000);
                volBar.addEventListener('mousedown', function(e) {
                    console.log(player.volume = (e.offsetX / this.offsetWidth) * 1);
                    var rect = e.target.getBoundingClientRect();
                    var diff = (Math.abs(Math.floor(volOvr.style.width.split('px')[0] - (e.pageX - rect.left)) / 100));
                    (player.volume + diff > 1) ? 1: player.volume += diff;
                    volOvr.style.width = (((e.pageX - rect.left)) + 'px');
                })
                volOvr.addEventListener('mousedown', function(e) {
                    console.log(player.volume = (e.offsetX / this.offsetWidth) * 1);
                    var rect = e.target.getBoundingClientRect();
                    var diff = (Math.abs(Math.floor(volOvr.style.width.split('px')[0] - (e.pageX - rect.left)) / 100));
                    (player.volume - diff < 0) ? 0: player.volume -= diff;
                    volOvr.style.width = (((e.pageX - rect.left)) + 'px');
                })
                progress.addEventListener('click', seek);
            },
            rewind: function() {
                console.log(player.currentTime)
                player.currentTime = ((player.currentTime - 25) > 0) ? player.currentTime -= 25 : 0;
                vis.update(player.currentTime, player.duration);
            },
            forward: function() {
                console.log(player.currentTime)
                player.currentTime = ((player.currentTime + 25) < player.duration) ? player.currentTime += 25 : player.duration;
                vis.update(player.currentTime, player.duration);
            }
        }

        function handleAudio() {
            if (play.getAttribute('state') == 'on') {
                if (play.className == playBtn) {
                    startAudio();
                } else {
                    stopAudio();
                }
            } else {
                play.setAttribute('state', 'on');
                loadAudio(queueService.next());
            }
        }

        function loadAudio(pod) {
            if (pod.source) {
                stopAudio();
                source.src = pod.source;
                album.src = pod.albumArt;
                track.setAttribute('track', pod.title);
                track.innerHTML = pod.title;
                track.setAttribute('artist', pod.artist);
                play.setAttribute('state', 'on')
                player.load(source);
                handleAudio();
            } else {
                //clearPlayer();
                stopAudio();
            }
        }

        function clearPlayer() {
            stopAudio();
            source.src = null;
            album.src = './assets/img/default.jpg';
            track.setAttribute('track', 'Nothing Selected');
            track.setAttribute('artist', 'Select an Episode');
            track.innerHTML = 'Nothing Selected';
            play.setAttribute('state', 'off');
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
            let percent = (e.offsetX / this.offsetWidth);
            player.currentTime = percent * player.duration;
        }

        function toggleText() {
            let artist = track.getAttribute('artist');
            if (track.innerHTML === artist) {
                track.innerHTML = track.getAttribute('track');
            } else {
                track.innerHTML = artist;
            }
        }
    }

})();