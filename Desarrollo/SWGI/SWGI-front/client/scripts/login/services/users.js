'use strict';
var servicename = 'users';
var API_BASE = window.API_BASE;
module.exports = function(app) {
    var dependencies = ['$resource', '$localStorage'];

    function service($resource, $localStorage) {

        return $resource(API_BASE + '/users/:id', {
            "@id": "id"
        }, {
            'findOne': {
                isArray: true
            },
            'login': {
                url: API_BASE + '/users/loginweb',
                method: "post"
            },
            'otrometodo': {

            },
            'role': {

            },
            'users': {
                // API_BASE + '/users/:id',
                // params: {
                //     id: '@id'
                // }
            },
            'sendEmail': {
                url: API_BASE + '/users/send/email',
                method: "post"
            },
            'changePassword': {
                url: API_BASE + '/users/password/reset',
                method: "post"
            },
            'logout': {
                url: API_BASE + '/users/logout',
                method: "post"
            },
            'getProjectName': {
                url: API_BASE + '/users/:id/projectAdmin',
                method: "get"
            },
            'getDomain': {
                url: API_BASE + '/businesses/baseDomain',
                method: 'get'
            },
            'isValidDomain': {
                url: API_BASE + '/users/isValidDomain',
                method: 'get',
                params: {}
            }
        });

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};