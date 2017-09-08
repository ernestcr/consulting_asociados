'use strict';

module.exports = function(app) {
    // inject:start


    require('./userService')(app);
    require('./users')(app);

    // inject:end
};
