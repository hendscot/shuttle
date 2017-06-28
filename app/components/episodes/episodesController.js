(function() {
    angular.module('shuttle')
        .controller('episodesController', ['$scope', 'episodesService', 'selectedService', 'playerService', '$q', EpisodesController])

    function EpisodesController($scope, episodesService, selectedService, playerService) {
        let self = this;
        self.uri = selectedService.getSelectedId();
        self.img = selectedService.getSelectedImg();
        self.updatePanel = function(elem) {
            var elem = elem.currentTarget;
            var desc = elem.getAttribute('desc'),
                title = elem.getAttribute('title'),
                url = elem.getAttribute('url');
            $('#desc').text(desc);
            $('#head').text(title);
            playerService.load(url, self.img, title);
        };
        self.episodes = [];
        self.defaultDescription;
        self.firstTitle;
        self.firstDesc;
        self.title;
        self.remove = function() {
            episodesService.deleteEpisode(self.uri);
        }
        episodesService.getEpisodes(self.uri).then(function(data) {
            self.title = $(data).find('title').first().text();
            self.firstTitle = $(data).find('item').first().find('title').text();
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
    }

})();