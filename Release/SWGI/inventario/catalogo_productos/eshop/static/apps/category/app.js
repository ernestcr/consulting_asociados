var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ngFileUpload',
    '720kb.datepicker',
    'ui.bootstrap',
    'angucomplete-alt',
    'ui.sortable'
]);

var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$httpProvider','$resourceProvider','$sceDelegateProvider'];
var configRoutes = function($stateProvider, $urlRouterProvider, $httpProvider,$resourceProvider,$sceDelegateProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $resourceProvider.defaults.stripTrailingSlashes = false;
    // $sceDelegateProvider.resourceUrlWhitelist([
    //       // Allow same origin resource loads.
    //       'self',
    //       // Allow loading from our assets domain.  Notice the difference between * and **.
    //       'https://www.youtube.com/**'
    //     ]);

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        views: {
            '@': {
                templateUrl: '/static/apps/category/layout.html',
                controller: "layoutCtrl",
                resolve:{
                  currentUser:['apiService',function(apiService){
                    return {};
                    // var userId = $('.parent-container').data('user');
                    // var User = apiService.user;
                    // return User.get({
                    //     id: userId
                    // }).$promise.then(function(user) {
                    //   return user;
                    // })
                  }]
                }
            },
            'panel@app': {
                templateUrl: '/static/apps/category/partials/panel.html',
                controller: 'panelCtrl'
            }
        }
    });
    $stateProvider.state('app.init', {
        url: '',
        parent: 'app',
        views: {
            'content@app': {
                templateUrl: '/static/apps/category/partials/list.html',
                controller: 'categoryCtrl'
            }

        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/app');

};
configRoutes.$inject = configRoutesDeps;
app.config(configRoutes);
app.run();
