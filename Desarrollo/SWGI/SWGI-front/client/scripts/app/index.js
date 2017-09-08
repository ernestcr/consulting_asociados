'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-material');
require('ng-infinite-scroll');

require('chart.js');
require('angular-chart.js');

var modulename = 'app';

module.exports = function (namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', 'ngMaterial', 'infinite-scroll', 'chart.js']);

    // inject:folders start
    require('./controllers')(app);
    require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
    var configRoutes = function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('yellow')
            .accentPalette('grey');
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            views: {
                "@": {
                    template: require('./views/layout.html'),
                    controller: 'main.app.layoutCtrl',
                    resolve: {
                        currentUser: ['main.login.userService', '$state', '$localStorage', '$location', function (User, $state, $localStorage, $location) {

                    //         if (!$localStorage.accessToken) {
                    //             $state.go('login.init');
                    //         }

                    //         if ($localStorage.idUser) {
                    //             try {
                    //                 return User.users($localStorage.idUser).then(
                    //                     (r) => {
                    //                         return r;
                    //                         // $state.go('app.init');

                    //                     }).catch()
                    //             } catch (e) {
                    //             }
                    //         }

                        }]
                    }
                }
            }
        })
            .state('app.init', {
                url: '/',
                views: {
                    "subpanel@app": {
                        template: ""
                    },
                    "content@app": {
                        // template: require('./views/dashboard.html')
                        template: ""
                    }
                }
            })
            //ADMIN GESTOR
            // .state('app.controlPanelGestor', {
            //     url: '/control-panel-gestor',
            //     views: {
            //         "subpanel@app": {
            //             template: ""
            //             //
            //         },
            //         "content@app": {
            //             // template: require('./views/control-panel-admin.html')
            //         }
            //     }
            // })
            // .state('app.controlPanelGestor.companiesBagExpiration', {
            //     url: '/empresas-con-bolsa-a-expirar',
            //     views: {
            //         "content@app": {
            //             template: require('./views/controlPanelGestor/company-bag-expiration.html'),
            //             controller: 'main.app.companiesBagExpirationCtrl'
            //         }
            //     }
            // })
            // .state('app.controlPanelGestor.companiesLicenseExpiration', {
            //     url: '/empresas-con-licencia-a-expirar',
            //     views: {
            //         "content@app": {
            //             template: require('./views/controlPanelGestor/company-license-expiration.html'),
            //             controller: 'main.app.companiesLicenseExpirationCtrl'
            //         }
            //     }
            // })
            // .state('app.companies', {
            //     url: '/empresas',
            //     views: {
            //         "subpanel@app": {
            //             template: ""
            //             //
            //         },
            //         "content@app": {

            //           template: require('./views/companies/companies.html'),
            //           controller: 'main.app.companiesCtrl'


            //         }
            //     }
            // })
            // .state('app.administratorGestor', {
            //     url: '/administradores-maestro',
            //     views: {
            //         "subpanel@app": {
            //             template: ""

            //         },
            //         "content@app": {
            //             template: require('./views/administratorGestor/administrator.html'),
            //             controller: 'main.app.administratorGestorCtrl'

            //         }
            //     }
            // })
            // .state('app.administratorMaster', {
            //     url: '/administradores',
            //     views: {
            //         "subpanel@app": {
            //             template: ""

            //         },
            //         "content@app": {
            //             template: require('./views/administratorMaster/administrator.html'),
            //             controller: 'main.app.administratorMasterCtrl'

            //         }
            //     }
            // })
            .state('app.activities', {
                url: '/actividades',
                views: {
                    "subpanel@app": {
                        template: require('./views/activities/sub-panel.html'),
                        controller: 'main.app.subPanelActivitiesCtrl'
                    },
                    "content@app": {
                        // template: require('./views/dashboard.html')
                        template: ""
                    }
                }
            })
            .state('app.activities.departures', {
                url: '/partidas',
                views: {
                    "content@app": {
                        template: require('./views/activities/departures.html'),
                        controller: 'main.app.departuresCtrl'
                    }
                }
            })
            .state('app.activities.peps', {
                url: '/peps',
                views: {
                    "content@app": {
                        template: require('./views/activities/peps.html'),
                        controller: 'main.app.pepsCtrl'
                    }
                }
            })
            // .state('app.activities.peps.departures', {
            //     url: '/:id/partidas',
            //     views: {
            //         "content@app": {
            //             template: require('./views/activities/peps-departures.html'),
            //             controller: 'main.app.pepsDeparturesCtrl',
            //             resolve: {
            //                 //inyectar servicio dd aprtidas para obtener list
            //                 // workers: ['main.app.groupServ', '$stateParams', function(groupServ, $stateParams) {
            //                 //     return groupServ.getWorkers({
            //                 //         id: $stateParams.id
            //                 //     });
            //                 // }]
            //                 getIdPep: ['$stateParams', function ($stateParams) {
            //                     try {
            //                         var id = $stateParams.id;
            //                         return id;
            //                         // return Service(id).then(
            //                         //     (r) = {
            //                         //         return r
            //                         //     }
            //                         // )
            //                     } catch (e) {

            //                     }
            //                 }]
            //             }
            //         }
            //     }
            // })

            // .state('app.controlPanelMaster', {
            //     url: '/control-panel-master',
            //     views: {
            //         "subpanel@app": {
            //             template: ""
            //             //
            //         },
            //         "content@app": {
            //             template: require('./views/controlPanelMaster/control-panel-master.html'),
            //             controller: 'main.app.controlPanelMasterCtrl'
            //         }
            //     }
            // })
            // .state('app.controlPanelAdmin', {
            //     url: '/control-panel-admin',
            //     views: {
            //         "subpanel@app": {
            //             template: ""
            //             //
            //         },
            //         "content@app": {
            //             // template: require('./views/control-panel-admin.html')
            //         }
            //     }
            // })

            // .state('app.controlPanelAdmin.peps', {
            //     url: '/peps',
            //     views: {
            //         // "subpanel@app": {
            //         //     template: ""
            //         //
            //         // },
            //         "content@app": {
            //             template: require('./views/controlPanelAdmin/peps.html'),
            //             controller: 'main.app.pepsControlPanelAdminCtrl'
            //         }
            //     }
            // })
            // .state('app.controlPanelAdmin.groups', {
            //     url: '/cuadrillas',
            //     views: {
            //         // "subpanel@app": {
            //         //     template: ""
            //         // },
            //         "content@app": {
            //             template: require('./views/controlPanelAdmin/groups.html'),
            //             controller: 'main.app.groupsControlPanelAdminCtrl'
            //         }
            //     }
            // })
            // .state('app.companyProfile', {
            //     url: '/company-profile',
            //     views: {
            //         "subpanel@app": {
            //             template: ""
            //         },
            //         "content@app": {
            //             template: require('./views/companyProfile/company-profile.html'),
            //             controller: 'main.app.companyProfileCtrl'
            //         }
            //     }
            // })
            // .state('app.projects', {
            //     url: '/proyectos',
            //     views: {
            //         "subpanel@app": {
            //             template: ""

            //         },
            //         "content@app": {
            //             template: require('./views/projects/projects.html'),
            //             controller: 'main.app.projectsCtrl'

            //         }
            //     }
            // })

            // .state('app.personal', {
            //     url: '/personal',
            //     views: {
            //         "subpanel@app": {
            //             template: require('./views/personal/sub-panel.html'),
            //             controller: 'main.app.subPanelPersonalCtrl'
            //         },
            //         "content@app": {
            //             template: require('./views/personal/personal.html'),
            //             controller: 'main.app.personalCtrl'
            //         }
            //     }
            // })
            // .state('app.personal.typesGroup', {
            //     url: '/tiposDeCuadrilla',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/typesGroup.html'),
            //             controller: 'main.app.typesGroupCtrl'
            //         }
            //     }
            // })
            // .state('app.personal.groups', {
            //     url: '/cuadrillas',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/groups.html'),
            //             controller: 'main.app.groupsCtrl'
            //         }
            //     }
            // })
            // .state('app.personal.groups.workers', {
            //     url: '/:id/trabajadores',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/groups-workers.html'),
            //             controller: 'main.app.groupsWorkersCtrl'
            //         },

            //     },
            //     resolve: {
            //         idGroup: ['main.app.groupServ', '$stateParams', function (groupServ, $stateParams) {
            //             var id = $stateParams.id;
            //             return id
            //             // return groupServ.getWorkers({
            //             //     id: $stateParams.id
            //             // });
            //         }]
            //     }
            // })
            // .state('app.personal.typesWorker', {
            //     url: '/tiposDeTrabajador',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/typesWorker.html'),
            //             controller: 'main.app.typesWorkerCtrl'
            //         }
            //     }
            // })
            // .state('app.personal.foremen', {
            //     url: '/capataces',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/foremen.html'),
            //             controller: 'main.app.foremenCtrl'
            //         }
            //     }
            // })
            // .state('app.personal.workers', {
            //     url: '/trabajadores',
            //     views: {
            //         "content@app": {
            //             template: require('./views/personal/workers.html'),
            //             controller: 'main.app.workersCtrl'
            //         }
            //     }
            // })
            // .state('app.report', {
            //     url: '/reportes',
            //     views: {
            //         "subpanel@app": {
            //             template: require('./views/report/sub-panel.html')
            //         },
            //         "content@app": {
            //             // template: require('./views/personal/personal.html'),
            //             // controller: 'main.app.personalCtrl'
            //         }
            //     }
            // }).state('app.report.attendance', {
            //     url: '/asistencia',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/attendance.html'),
            //             controller: 'main.app.attendanceReportCtrl'
            //         }
            //     }
            // })
            // .state('app.report.daily', {
            //     url: '/diario',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/daily.html'),
            //             controller: 'main.app.dailyReportCtrl'
            //         }
            //     }
            // }).state('app.report.daily.day', {
            //     url: '/:id/dia',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/day.html'),
            //             controller: 'main.app.dayReportCtrl'
            //         }
            //     }
            // }).state('app.report.worker', {
            //     url: '/trabajador',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/worker.html'),
            //             // controller: 'main.app.workersCtrl'
            //         }
            //     }
            // }).state('app.report.peps', {
            //     url: '/peps',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/peps.html'),
            //             controller: 'main.app.pepsReportCtrl'
            //         }
            //     }
            // }).state('app.report.peps.departures', {
            //     url: '/:id/partidas',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/peps-departures.html'),
            //             controller: 'main.app.pepsDeparturesReportCtrl'
            //         },

            //     }
            // }).state('app.report.departures', {
            //     url: '/partidas',
            //     views: {
            //         "content@app": {
            //             template: require('./views/report/departures.html'),
            //             controller: 'main.app.departuresReportCtrl'
            //         }
            //     }
            // })
            // .state('app.turn', {
            //     url: '/turnos',
            //     views: {
            //         "subpanel@app": {
            //             template: require('./views/turn/sub-panel.html'),
            //             controller: 'main.app.subPanelTurnCtrl'
            //         },
            //         "content@app": {}
            //     }
            // }).state('app.turn.calendar', {
            //     url: '/calendario',
            //     views: {
            //         "content@app": {
            //             template: require('./views/turn/calendar.html'),
            //             controller: 'main.app.calendarTurnCtrl'
            //         }
            //     }
            // })
            // .state('app.alert', {
            //     url: '/alertas',
            //     views: {
            //         "subpanel@app": {
            //             // template: require('./views/report/sub-panel.html')
            //         },
            //         "content@app": {
            //             template: require('./views/alert/alert.html'),
            //             controller: 'main.app.alertCtrl'
            //         }
            //     }
            // })
            // .state('app.message', {
            //     url: '/mensajes',
            //     views: {
            //         "subpanel@app": {
            //             // template: require('./views/report/sub-panel.html')
            //         },
            //         "content@app": {
            //             template: require('./views/message/message.html'),
            //             controller: 'main.app.chatCtrl'
            //         }
            //     }
            // })
            ;
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
