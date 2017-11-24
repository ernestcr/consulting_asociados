var controllerDeps = ["$scope", "apiService", "currentUser"];
var layoutCtrl = function($scope, apiService, currentUser) {
    $scope.currentUser = currentUser;
    $scope.$on('filter', function(e, ids) {
        $scope.$broadcast('filter-list',ids);
    })
}
layoutCtrl.inject = controllerDeps;
app.controller('layoutCtrl', layoutCtrl)
