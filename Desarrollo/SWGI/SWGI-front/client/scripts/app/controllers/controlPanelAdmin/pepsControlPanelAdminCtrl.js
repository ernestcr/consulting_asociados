'use strict';
var controllername = 'pepsControlPanelAdminCtrl';

module.exports = function (app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.app.pepServ', 'main.app.groupServ', 'main.app.pepReportServ', 'main.app.departureReportServ', 'main.app.attendanceReportServ', '$localStorage', '$state'];

    function controller($scope, pepServ, groupServ, pepReportServ, departureReportServ, attendanceReportServ, $localStorage, $state) {
        $scope.projectName = $localStorage.projectName;
        $scope.loader = pepServ.getPepReportList({
            userId: $localStorage.idUser
        });

        pepServ.getPepReportList({
            userId: $localStorage.idUser
        }).then(list => {
            $scope.pepReportList = list;
        });

        groupServ.getGroupReportList({
            userId: $localStorage.idUser
        }).then(list => {
            $scope.groupReportList = list;
        });

        $scope.showPepDepartures = function (item) {
            pepReportServ.setPepDepartureReportItem(item);
            $state.go('app.report.peps.departures', {
                id: item.id
            });
        };

        $scope.doughnut = {
            labels: [" Asistencia(%)", " Inasistencia(%)"],
            data: [],
            colors: ["#FFD400", "#289DF5"]
        };

        $scope.bar = {
            labels: [],
            series: ['Avance(%)', 'Horas Trabajadas(%)'],
            data: [
                [],
                []
            ],
            colors: [{
                backgroundColor: '#3372B3',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                borderColor: '#3372B3',
                pointBorderColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }, {
                backgroundColor: '#289DF5',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointHoverBackgroundColor: 'rgba(77,83,96,1)',
                borderColor: '#289DF5',
                pointBorderColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,0.8)'
            }]
        };

        attendanceReportServ.get({
            id: $localStorage.idUser
        }).then(r => {
            $scope.doughnut.date = r.date;
            $scope.doughnut.data[0] = r.porcentual;
            $scope.doughnut.data[1] = 100 - r.porcentual;
            $scope.worker = r;
        });

        departureReportServ.get({
            id: $localStorage.idUser
        }).then(r => {
            $scope.r = r;

            var i = 0;
            var n = 0;
            while (i < $scope.r.length && n < 9) {
                $scope.bar.labels[i] = $scope.r[i].name.substring(0, 20).toLowerCase() + "...";
                $scope.bar.data[0][i] = $scope.r[i].porcentualAdvance;
                $scope.bar.data[1][i] = $scope.r[i].porcentualHours;
                i++;
                n++;
            };
            $scope.departureReportList = $scope.r;
        });

    };

    controller.$inject = deps;
    app.controller(fullname, controller);
};
