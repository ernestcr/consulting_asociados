'use strict';

module.exports = function (app) {
    // inject:start

    require('./layoutCtrl')(app);

    // require('./activities/')(app);

    // require('./companies/')(app);

    // require('./administratorMaster/')(app);

    // require('./administratorGestor/')(app);

    // // require('./alert/')(app);

    // require('./companyProfile/')(app);

    require('./controlPanelAdmin/')(app);
    
    // require('./controlPanelGestor/')(app);

    // require('./message/')(app);

    // require('./personal/')(app);

    // require('./projects/')(app);

    // require('./report/')(app);

    // require('./shifts/')(app);

    // require('./controlPanelMaster/')(app);

    // inject:end
};
