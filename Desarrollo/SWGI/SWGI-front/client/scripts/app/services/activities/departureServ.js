'use strict';
var servicename = 'departureServ';

module.exports = function(app) {

    var dependencies = ['$q', 'main.app.departure', '$localStorage'];

    function service($q, Departure, $localStorage) {
        this.getListDeparture = function(idUser) {
            var defered = $q.defer();
            Departure.getList({
                    id: idUser
                })
                .$promise.then(
                    (response) => {
                        defered.resolve(response);
                    },
                    (error) => {
                        defered.reject(error)
                    }
                );
            return defered.promise;
        };
        this.getDeparturePaginate = (query) => {
            return Departure.getPaginate(query)
                .$promise;
        };
        this.getCount = function(idUser) {
            var defered = $q.defer();
            Departure.getCount({
                    id: idUser
                })
                .$promise.then(
                    (response) => {
                        defered.resolve(response);
                    },
                    (error) => {
                        defered.reject(error)
                    }
                );
            return defered.promise;
        };
        this.post = function(idUser, departure) {
            var defered = $q.defer();
            Departure.post({
                    id: idUser
                }, departure)
                .$promise.then(
                    (response) => {
                        defered.resolve(response);
                    },
                    (error) => {
                        defered.reject(error)
                    }
                );
            return defered.promise;
        };
        this.update = function(id, obj) {
            var defered = $q.defer();
            Departure.put({
                    id: id
                }, obj)
                .$promise.then(
                    (response) => {
                        defered.resolve(response);
                    },
                    (error) => {
                        defered.reject(error)
                    }
                );
            return defered.promise;
        };
        this.deleteDeparture = function(idUser, departure) {
            var defered = $q.defer();
            Departure.delete({
                    id: idUser,
                    fk: departure.id
                })
                .$promise.then(
                    (response) => {
                        defered.resolve(response);
                    },
                    (error) => {
                        defered.reject(error)
                    }
                );
            return defered.promise;
        };
        this.autocomplete = function(a, b, c) {
            return Departure.autocomplete(a, b, c).$promise;
        };
        this.relManyPeps = function(id, array) {
            return Departure.relManyPeps({
                id: id
            }, {
                pepsId: array
            }).$promise;
        };
        this.getPepList = function(id) {
            return Departure.getPepList({
                id: id
            }).$promise;
        };

    }
    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);
};
