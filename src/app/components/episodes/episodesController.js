(function() {
    angular.module('shuttle')
        .controller('episodesController', ['episodesService', 'selectedService', 'playerService', '$q', EpisodesController])

    function EpisodesController(episodesService, selectedService, playerService) {
        let self = this;
        let body = document.getElementsByTagName('body')[0];
        self.uri = selectedService.getSelectedId();
        self.img = selectedService.getSelectedImg();
        self.success = false;
        self.failed = false;
        self.index = 0;
        body.style.backgroundImage = "url('" + self.img + "')";
        body.style.backgroundSize = 'cover';
        self.url;
        self.episodes = [];
        self.defaultDescription;
        self.firstDesc;
        self.title;
        self.headTitle;
        self.next = function() {
            if ((self.index + 5) != self.episodes.length)
                self.index += 5;
        }
        self.prev = function() {
            if ((self.index - 5) >= 0)
                self.index -= 5;
        }
        self.loadData = function() {
            playerService.load(self.url, self.img, self.title, self.headTitle);
        }
        self.remove = function() {
            episodesService.deleteEpisode(self.uri);
        }
        episodesService.getEpisodes(self.uri).then(function(data) {

            self.success = true;
            self.headTitle = $(data).find('title').first().text();
            self.title = $(data).find('item').first().find('title').text();
            self.url = $(data).find('enclosure').first().attr('url');
            self.defaultDescription = $(data).find('description').first().text();
            let desc;
            let first = 1;
            $(data).find('item').each(function() {
                var pod = $(this);
                if (!(desc = pod.find('description').text())) {
                    desc = ((desc = pod.find('itunes\\:summary')).text()) ? desc.text() : desc.html();
                }
                if (first) {
                    self.firstDesc = desc;
                    first = 0;
                }
                self.episodes.push({
                    'title': pod.find('title').text(),
                    'desc': desc,
                    'url': pod.find('enclosure').attr('url'),
                });
            })
        }, function(err) {
            self.failed = true;
        })
        self.updatePanel = function(elem) {
            var elem = elem.currentTarget;
            var desc = elem.getAttribute('desc');
            self.title = elem.getAttribute('title');
            self.url = elem.getAttribute('url');
            $('#desc').text(desc);
            $('#head').text(self.title);
        };
    }

})();