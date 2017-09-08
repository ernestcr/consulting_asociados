'use strict';

module.exports = function(app) {
    // inject:start
    require('./activities/')(app);
    // require('./administratorMaster/')(app);
    // require('./administratorGestor/')(app);

    // require('./companies/')(app);
    // require('./companyProfile/')(app);
    // require('./message/')(app);
    // require('./personal/')(app);
    // require('./project/')(app);
    // require('./report/')(app);
    // require('./shared/')(app);
    // require('./shifts/')(app);

    // inject:end
};
