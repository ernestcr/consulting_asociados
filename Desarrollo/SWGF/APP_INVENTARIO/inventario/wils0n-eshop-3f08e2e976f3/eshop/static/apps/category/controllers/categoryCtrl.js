var controllerDeps = ["$scope", "apiService"];
var layoutCtrl = function($scope, apiService) {
    var cat=$("#category").data('category');
    var Category = apiService.categories;
    $scope.Product = {
        initializer: function() {
            var that = this;
            Category.query({
                id: cat
            }).$promise.then(function(res) {
                that.originalList = angular.copy(res);
                that.list = res;
            })
        }
    }
    $scope.Product.initializer();
    $scope.$on('filter-list', function(e, o) {
        $scope.Product.list = [];
        for (var i = 0; i < $scope.Product.originalList.length;i++) {
            var actual = $scope.Product.originalList[i];
            for (var j = 0; j < o.length; j++) {
                if (actual.id == o[j]) {
                    $scope.Product.list.push(actual);
                }
            }
        }
    })



}
layoutCtrl.inject = controllerDeps;
app.controller('categoryCtrl', layoutCtrl)
