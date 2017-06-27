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
            self.firstDesc = $(data).find('item').first().find('description').text();
            self.defaultDescription = $(data).find('description').first().text();
            $(data).find('item').each(function() {
                var pod = $(this);
                self.episodes.push({
                    'title': pod.find('title').text(),
                    'desc': pod.find('description').text(),
                    'url': pod.find('enclosure').attr('url'),
                });
            })
        })
    }

})();