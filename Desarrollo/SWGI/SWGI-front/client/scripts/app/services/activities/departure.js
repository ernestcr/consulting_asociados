'use strict';
var servicename = 'departure';
var API_BASE = window.API_BASE + "/users/:id";

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        return $resource(API_BASE, {
            id: '@id'
        }, {
            'getList': {
                url: API_BASE + '/departures',
                isArray: true,
                method: "get"
            },
            'getPaginate': {
                url: window.API_BASE + '/departures/paginate',
                method: "get"
            },
            'getCount': {
                url: API_BASE + '/departures/count',
                method: "get"
            },
            'post': {
                url: API_BASE + '/departures',
                method: "post"
            },
            // 'put': {
            //     url: API_BASE + '/departures/:fk',
            //     method: "PUT",
            //     params: {
            //         fk: '@fk',
            //     }
            // },
            'put': {
                url: window.API_BASE + '/departures/:id',
                method: "PUT",
                params: {
                    id: '@id',
                }
            },
            'delete': {
                url: API_BASE + '/departures/:fk',
                method: "delete",
                params: {
                    fk: '@fk'
                }
            },
            'autocomplete': {
                url: window.API_BASE + '/departures/autocomplete',
                method: 'get',
                isArray: true
            },
            'relManyPeps': {
                url: window.API_BASE + '/departures/:id/relManyPeps',
                method: "put",
                // isArray: true,
                params: {
                    id: '@id'
                }
            },
            'getPepList': {
                url: window.API_BASE + '/departures/:id/peps',
                method: "get",
                isArray: true,
                params: {
                    id: '@id'
                }
            }
        });

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
