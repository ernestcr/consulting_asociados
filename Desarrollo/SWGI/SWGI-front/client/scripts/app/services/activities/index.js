'use strict';

module.exports = function(app) {
    // inject:start
    // require('./foremen')(app);
    require('./departure')(app);
    require('./departureServ')(app);
    require('./pep.js')(app);
    require('./pepServ.js')(app);

    // inject:end
};
