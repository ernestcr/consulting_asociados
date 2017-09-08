'use strict';
var servicename = 'userService';
module.exports = function(app) {
    var dependencies = ['$q', 'main.login.users', '$localStorage'];

    function service($q, User, $localStorage) {
        this.login = function(user) {
            var defered = $q.defer();
            User.login({
                username: user.username,
                password: user.password
            }).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.users = function(miId) {
            var defered = $q.defer();
            User.users({
                id: miId
                    // password: user.password
            }).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.sendEmail = function(miUsername) {
            var defered = $q.defer();
            User.sendEmail({
                username: miUsername
            }).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.changePassword = function(miPassword, miAccesToken) {
            var defered = $q.defer();
            User.changePassword({
                password: miPassword,
                accessToken: miAccesToken
            }).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.logout = function() {
            var defered = $q.defer();
            User.logout().$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.getProjectName = function(id) {
            var defered = $q.defer();
            User.getProjectName({
                id: id
            }).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.getDomain = function() {
            return User.getDomain().$promise
        };
        this.isValidDomain = function(domain) {
            return User.isValidDomain(domain).$promise
        }
    };
    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);
};