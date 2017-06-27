const squash = require('./squash.js');
module.exports = {
    routeTo: function(renderer, func, param) {
        squash.squash(renderer);
        if (param != null)
            func(param);
        else
            func();
    }
}