'use strict';
var controllername = 'preLoginCtrl';
var baseDomain = window.BASE_DOMAIN;
//var noValid = window.noValid;

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.login.userService', '$state', '$localStorage', '$mdToast', '$location', '$http'];

    function controller($scope, userService, $state, $localStorage, $mdToast, $location, $http) {
        //var stringDomain = window.location.host;
        $scope.baseDomain = baseDomain;
        var tempStringDomain = $location.host();
        userService.isValidDomain({ domain: tempStringDomain }).then(r => {
            window.location.href = 'http://' + tempStringDomain + "/#/ingresar";
            $scope.loader = false;
            $scope.block = true;
        }).catch(e => {
            $scope.loader = false;
            $scope.block = true;
            //window.location.href = 'http://' + noValid + "/#/bienvenido";
        });
        $scope.isValidDomain = (baseDomain, domain) => {
            let stringDomain = domain + baseDomain;
            userService.isValidDomain({ domain: stringDomain }).then(
                (r) => {
                    window.location.href = 'http://' + stringDomain + "/#/ingresar";
                },
                (e) => {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(e.data.error.message)
                        .position('top right')
                        .theme("error-toast")
                        .hideDelay(2000)
                    );
                }
            )
        }
    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};