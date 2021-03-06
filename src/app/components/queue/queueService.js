(function() {
    angular.module('shuttle')
        .service('queueService', [QueueService])

    function QueueService() {
        var queue = []
        var queueImg;
        var inQueue;
        return ({
            enqueue: function(podObj) {
                if (!queue.length) {
                    queueImg.src = podObj.albumArt;
                }
                queue.push(podObj)
                inQueue.innerHTML = queue.length + ' Queued';
            },
            next: function() {
                if (queue.length) {
                    let podObj = queue[0]
                    queue.shift();
                    if (queue.length) {
                        console.log('changing next')
                        queueImg.src = queue[0].albumArt;
                    } else {
                        queueImg.src = './assets/img/default.jpg';
                    }
                    inQueue.innerHTML = queue.length + ' Queued';
                    return podObj;
                } else {
                    return { source: null };
                }
            },
            init: function(queueNext, qAmnt) {
                queueImg = queueNext;
                inQueue = qAmnt;
            }
        })
    }
})();