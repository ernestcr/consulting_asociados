'use strict';

var namespace = 'main';

// fix protractor issue
if (window.location.toString().indexOf('localhost:5555') > 0) {
    window.name = 'NG_DEFER_BOOTSTRAP!NG_ENABLE_DEBUG_INFO!';
}

if (process.env.INSTANCE === 'testing') {
    //window.API_BASE = "http://localhost:3000/api"
    window.API_BASE = "http://test.simonit.pe/api";
    window.BASE_DOMAIN = ".simonit.pe";
    //window.noValid = "test.simonit.pe"
} else if (process.env.INSTANCE === 'staging') {

    window.API_BASE = "http://stage.simonit.pe/api";
    window.BASE_DOMAIN = ".simonit.pe";
} else if (process.env.INSTANCE === 'production') {
    window.API_BASE = "http://api.simonitapp.com/api";
    window.BASE_DOMAIN = ".simonitapp.com";
    //window.noValid = "simonitapp.com"
    // INSTA gulp dist --mode=prod^Cloca
} else {
    window.API_BASE = "http://localhost:3000/api"
    window.BASE_DOMAIN = ".localhost:5000";
    //window.noValid = "localhost:5000"
    //window.API_BASE = "http://test.simonit.pe/api";
}
//window.API_BASE = "http://test.simonit.pe/api";

var angular = require('angular');
require('../../bower_components/angular-busy/dist/angular-busy.min.js');
require('angular-material');
// require('../../bower_components/ng-file-upload/ng-file-upload-all.js');
require('ng-file-upload');
require('../../bower_components/ngstorage/ngStorage.js');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-resource');
require('angular-messages');
require('angular-sanitize');
require('angular-bootstrap');
// require('material-icons');

//require('../static/angular-smilies-embed.min.css');
require('../static/angular-smilies.min.js');
window.moment = require('moment');
require('moment/locale/es');
require('angular-datetime-range');

window.moment = require('moment');
var app = angular.module(namespace, ['ui.bootstrap', 'ngMaterial', 'ngFileUpload', 'ngResource', 'ngStorage', 'ngMessages', 'ngSanitize', 'g1b.datetime-range', 'angular-smilies',
    'cgBusy',
    require('./app')(namespace).name,
    require('./login')(namespace).name
    //  inject:modules end
]);

// if (process.env.SENTRY_MODE === 'staging') {

var configCompileDeps = ['$compileProvider', '$mdDateLocaleProvider'];
var configCompile = function($compileProvider, $mdDateLocaleProvider, $localStorage) {
    $compileProvider.debugInfoEnabled(false);
    $mdDateLocaleProvider.formatDate = function(date) {
        //  return moment(date).format('YYYY-MM-DD');
        return date ? moment(date).format('DD/MM/YYYY') : null;
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
};
configCompile.$inject = configCompileDeps;
app.config(configCompile);
// }

// var runDeps = [];
// var run = function() {};
//
// run.$inject = runDeps;
// app.run(run);

module.exports = app;