(function() {
    angular.module('shuttle')
        .controller('episodesController', ['episodesService', 'selectedService', 'playerService', '$q', EpisodesController])

    function EpisodesController(episodesService, selectedService, playerService) {
        let self = this;
        self.uri = selectedService.getSelectedId();
        self.img = selectedService.getSelectedImg();
        self.url;
        self.episodes = [];
        self.defaultDescription;
        self.firstDesc;
        self.title;
        self.headTitle;
        self.loadData = function() {
            playerService.load(self.url, self.img, self.title);
        }
        self.remove = function() {
            episodesService.deleteEpisode(self.uri);
        }
        episodesService.getEpisodes(self.uri).then(function(data) {
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