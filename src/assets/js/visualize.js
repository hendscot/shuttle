var graph;
var start_time;
var end_time;
var MAX = 50;
var graphId;
var progress;
module.exports = {
    play: function() {
        graphId = setInterval(setBarHeight, 150);
    },
    pause: function() {
        clearInterval(graphId);
        resetBarHeight();
    },
    update: function(current, end) {
        updatePos(current, end);
    },
    format: function(time) {
        return formatTime(time)
    },
    init: function(bars, beg, end, prog) {
        graph = bars;
        start_time = beg;
        end_time = end;
        progress = prog;
    },
    setEnd: function(end) {
        end_time.innerHTML = formatTime(end);
    }
}

function setBarHeight() {
    let val;
    for (var i = 0; i < graph.length; i++) {
        val = Math.floor((Math.random() * MAX) + 1);
        graph[i].style.height = val + 'px';
    }
}

function resetBarHeight() {
    let val = 1;
    for (var i = 0; i < graph.length; i++) {
        graph[i].style.height = val + 'px';
    }
}

function updatePos(current, end) {
    start_time.innerHTML = formatTime(current)
    progress.value = ((current / end));
}

function formatTime(totalSeconds) {
    let x;
    let time = parseInt(totalSeconds);
    let hours;
    hours = Math.floor(time / 3600);
    x = Math.floor((time / 60) % 60);
    let minutes = (x < 10) ? '0' + x : x;
    x = Math.floor(time % 60);
    let seconds = (x < 10) ? '0' + x : x;
    return (hours + ':' + minutes + ':' + seconds);
}