'use strict';

module.exports = function(app) {
    // inject:start
    require('./loginCtrl')(app);
    require('./preLoginCtrl')(app);
    // inject:end
};