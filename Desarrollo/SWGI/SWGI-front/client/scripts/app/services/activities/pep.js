'use strict';
var servicename = 'pep';
var API_BASE = window.API_BASE + "/users/:id";

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        return $resource(API_BASE, {
            id: '@id'
        }, {
          'get': {
              url: window.API_BASE + '/peps/:id',
              // isArray: true,
              method: "get"
          },
            'getList': {
                url: API_BASE + '/peps',
                isArray: true,
                method: "get"
            },
            'getPaginate': {
                url: window.API_BASE + '/peps/paginate',
                method: "get"
            },
            'getCount': {
                url: API_BASE + '/peps/count',
                method: "get"
            },
            'getListDeparture': {
              url: window.API_BASE + '/peps/:id/departures',
              method: "get",
              isArray: true,
              params: {
                id: '@id'
              }
            },
            'post': {
                url: API_BASE + '/peps',
                method: "post"
            },
            'put': {
                url: API_BASE + '/peps/:fk',
                method: "PUT",
                params: {
                    fk: '@fk',
                }
            },
            'delete': {
                url: API_BASE + '/peps/:fk',
                method: "delete",
                params: {
                    fk: '@fk'
                }
            },
            'autocomplete': {
                url: window.API_BASE + '/peps/autocomplete',
                method: 'get',
                isArray: true
            },
            'relManyDepartures': {
                url: window.API_BASE + '/peps/:id/relManyDepartures',
                method: "put",
                // isArray: true,
                params: {
                    id: '@id'
                }
            },
            'deleteDepartureOfPep':{
              url: window.API_BASE + '/peps/delete/departure',
              method:"delete"
            },
            'putListDeparture': {
                url: window.API_BASE + '/peps/:id/departures',
                method: "get",
                isArray: true,
                params: {
                    id: '@id'
                }
            },
            'getPepReportList': {
                url: window.API_BASE + '/peps/:userId/actual/report',
                method: "get",
                isArray: true,
                params: {
                    userId: '@id'
                }
            }

        });

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
