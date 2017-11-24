var controllerDeps = ["$scope", "apiService"];
var layoutCtrl = function($scope, apiService) {
    var cat = $("#category").data('category');
    var Category = apiService.categories;
    $scope.Filter = {
        obj: {
            id: cat
        },
        priceopts: {},
        initializer: function() {
            var that = this;
            Category.filters({
                id: cat
            }).$promise.then(function(res) {
                that.list = res;
            })
        },
        chechkquery: [],
        addCheck: function(i, item) {
            var opts = item.options;
            for (var i in opts) {
                if (opts[i].active) {
                    this.chechkquery.push(opts[i].name);
                } else {
                    var index = this.chechkquery.indexOf(opts[i].name);
                    if (index != -1) {
                        this.chechkquery.splice(index, 1);
                    }
                }
            };
            var map = {};
            for (var i in this.chechkquery) {
                map[this.chechkquery[i]] = true;
            }
            this.chechkquery = Object.keys(map);
            console.log(this.chechkquery);
            this.makeRequest(this.chechkquery);
        },
        makeRequest: function(param) {
            this.obj.id = cat;
            param = param.join(',');
            if (param) {
                this.obj.specification = param;
            } else {
                delete this.obj['specification'];
            }
            this.sendReq();
        },
        priceReq: function() {
            if (this.priceopts.max_price) {
                this.obj.max_price = this.priceopts.max_price;
            } else {
                delete this.obj['max_price'];
            }
            if (this.priceopts.min_price) {
                this.obj.min_price = this.priceopts.min_price;
            } else {
                delete this.obj['min_price'];
            }
            this.sendReq();
        },
        sendReq: function() {
            Category.search(this.obj).$promise.then(function(res) {
                var ids = res.ids;
                $scope.$emit('filter', ids);
            })
        }
    }
    $scope.Filter.initializer();

}
layoutCtrl.inject = controllerDeps;
app.controller('panelCtrl', layoutCtrl)
