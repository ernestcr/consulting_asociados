'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

var modulename = 'login';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', ]);
    // inject:folders start
    require('./controllers')(app);
    require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider, $mdThemingProvider, $localStorage) {


        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('myTheme')
            .primaryPalette('yellow');
        $urlRouterProvider.otherwise('/ingresar');
        $stateProvider
        // .state('bienvenido', {
        //         url: '/bienvenido',
        //         views: {
        //             '@': {
        //                 template: require('./views/pre-login.html'),
        //                 controller: "main.login.preLoginCtrl"
        //             }
        //         }
        //     })
            .state('login', {
                url: '/ingresar',
                abstract: true,
                template: require('./views/home.html')
            })
            .state('login.init', {
                url: '',
                views: {
                    'content@login': {
                        template: require('./views/login.html'),
                        controller: "main.login.loginCtrl"
                            // controller: "main.app.messageCtrl"

                    }
                }
            })
            .state('login.recoverPass', {
                url: '/recuperar-pass',
                views: {
                    'content@login': {
                        template: require('./views/recover-pass.html'),
                        controller: "main.login.loginCtrl"
                    }
                }
            }).state('login.changePass', {
                url: '/cambiar-pass',
                views: {
                    'content@login': {
                        template: require('./views/change-pass.html'),
                        controller: "main.login.loginCtrl"
                    }
                }
            });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    // var runDeps = ['$localStorage', '$http'];
    // var run = function($localStorage, $http) {

    //     $http.defaults.headers.common['X-Access-Token'] = $localStorage.accessToken;
    //     $http.defaults.headers.common['domain'] = $localStorage.domain;
    // }
    // run.$inject = runDeps;
    // app.run(run)

    return app;
};