'use strict';
var controllername = 'loginCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.login.userService', '$state', '$localStorage', '$mdToast', '$location', '$http'];

    function controller($scope, userService, $state, $localStorage, $mdToast, $location, $http) {
        // $localStorage.$reset();

        // if ($localStorage.accessToken) {
        //
        //     $state.go('app.controlPanelAdmin.peps');
        // }
        //$localStorage.domain = $location.host() + ':' + $location.port();
        $scope.toLogin = function(user) {
            // $http.defaults.headers.common['domain'] = $location.host();
            // userService.login(user).then(
                // (r) => {
                    $localStorage.idUser = "r.userId";
                    // $localStorage.accessToken = r.id;
                    // $localStorage.role = "ADMIN";
                    // $http.defaults.headers.common['X-Access-Token'] = r.id;
                    // if (r.role == 'ADMIN') {
                    //     $localStorage.jwt = r.jwt;
                    //     firebase.auth().signInWithCustomToken(r.jwt).catch(function(error) {});
                    //     userService.getProjectName($localStorage.idUser).then(
                    //         (r) => {
                    //             $localStorage.projectName = r.nameBusiness;
                    //         },
                    //         (e) => {}
                    //     )
                        $state.go('app.controlPanelAdmin.peps');
                    // } else if (r.role == 'MASTER') {
                    //     $localStorage.businessId = r.businessId;
                    //     $state.go('app.controlPanelMaster');
                    // } else {
                    //     $localStorage.simonitId = r.simonitId;
                    //     $state.go('app.controlPanelGestor.companiesBagExpiration');
                    // };
                // },
                // (e) => {
                //     console.log(e.data.error.message, "sssss");
                //     $mdToast.show(
                //         $mdToast.simple()
                //         .textContent(e.data.error.message)
                //         .position('top right')
                //         .theme("error-toast")
                //         .hideDelay(2000)
                //     );
                // }
            // )
        };
        $scope.toSendEmail = function(username) {
            userService.sendEmail(username).then(
                (r) => {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Se te envio un enlace de confirmación a tu email, ¡revizalo!')
                        .position('top right')
                        .hideDelay(2000)
                        .theme("success-toast")
                    );
                },
                (e) => {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Ingrese un usuario valido')
                        .position('top right')
                        .hideDelay(2000)
                        .theme("error-toast")
                    );
                }
            )
        };
        var accessToken = $location.search().accessToken;
        $scope.toChangePassword = function(password) {
            userService.changePassword(password, accessToken).then(
                (r) => {
                    // $localStorage.idUser = r.userId;
                    $state.go('login.init');
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('¡El cambio de su contraseña se realizo exitosamente!')
                        .position('top right')
                        .hideDelay(2000)
                    );
                },
                (e) => {}
            )
        };

        // $scope.toLogout = function() {
        //     userService.logout($localStorage.accessToken).then(
        //         (r) => {
        //             $state.go('login.init');
        //             // $mdToast.show(
        //             //     $mdToast.simple()
        //             //     .textContent('¡El cambio de su contraseña se realizo exitosamente!')
        //             //     .position('top right')
        //             //     .hideDelay(2000)
        //             // );
        //             // $state.go('app.personal.groups');
        //         },
        //         (e) => {}
        //     )
        // }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
//MESSAGE