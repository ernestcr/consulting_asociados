'use strict';
var controllername = 'controlPanelAdminCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope'];

    function controller($scope) {
        $scope.doughnutLabels = ["Asistencia", "Inasistencia"];
        $scope.doughnutData = [35, 343];
        $scope.doughnutColors = ["#FFD400", "#289DF5"];

        $scope.barLabels = ['ACTIVIDAD 1', 'ACTIVIDAD 1', 'Actividad 1', 'CONSTRUCCIÓN DE sdfs dfs  ', 'ACTIVIDAD 3', 'ACTIVIDAD 4', 'ACTIVIDAD 5'];
        $scope.barSeries = ['% Avance', '% Horas Trabajadas'];
        $scope.barData = [
            [5, 59, 59, 15, 80, 81, 56],
            [28, 48, 12, 40, 12, 19, 95]
        ];

        $scope.barColors = [{
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
        }];
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
