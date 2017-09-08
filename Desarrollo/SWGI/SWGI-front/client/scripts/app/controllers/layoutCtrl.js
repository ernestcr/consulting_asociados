'use strict';
var controllername = 'layoutCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$localStorage', 'currentUser', '$rootScope', 'main.login.userService', '$state'];

    function controller($scope, $localStorage, currentUser, $rootScope, userService, $state) {
        $rootScope.currentUser = currentUser;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;
        $scope.role = $localStorage.role;
        $scope.picture = currentUser.picture;
        $scope.nameModule = "PANEL DE CONTROL";

        var date = new Date();
        $scope.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        $scope.toLogout = function() {
            $localStorage.$reset();
            $state.go('login.init');
            userService.logout().then(
                (r) => {
                    // $mdToast.show(
                    //     $mdToast.simple()
                    //     .textContent('¡El cambio de su contraseña se realizo exitosamente!')
                    //     .position('top right')
                    //     .hideDelay(2000)
                    // );
                    // $state.go('app.personal.groups');
                },
                (e) => {}
            )
        }

        $scope.setModuleName = function(nameModule) {
            $localStorage.nameModule = nameModule;
            $scope.nameModule = nameModule;
        }
        $scope.changeStatus = function(param) {
            if ($scope.status == param) {
                $scope.status = "noshow";
            } else {
                $scope.status = param;
            }
        };

    };

    controller.$inject = deps;
    app.controller(fullname, controller);
};
