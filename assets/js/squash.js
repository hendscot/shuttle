module.exports = {
    squash: function(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}