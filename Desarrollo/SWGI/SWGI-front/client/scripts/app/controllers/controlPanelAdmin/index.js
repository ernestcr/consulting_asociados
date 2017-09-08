'use strict';

module.exports = function(app) {
    // inject:start

    require('./controlPanelAdminCtrl')(app);

    require('./groupsControlPanelAdminCtrl')(app);

    require('./pepsControlPanelAdminCtrl')(app);

    // inject:end
};
