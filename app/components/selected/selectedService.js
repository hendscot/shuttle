(function() {
    angular.module('shuttle')
        .factory('selectedService', [SelectedService]);

    function SelectedService() {
        var id;
        var image;

        function getId() {
            return id;
        }

        function getImg() {
            return image
        }

        function setAttr(current, img) {
            id = current;
            image = img;
        }
        return {
            getSelectedId: getId,
            getSelectedImg: getImg,
            setSelected: setAttr,
        }
    }
})();