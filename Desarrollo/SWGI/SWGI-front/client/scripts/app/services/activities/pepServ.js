'use strict';
var servicename = 'pepServ';

module.exports = function(app) {

    var dependencies = ['$q', 'main.app.pep', '$localStorage'];

    function service($q, Pep, $localStorage) {
        this.getPep = function(idPep) {
            var defered = $q.defer();
            Pep.get({
                    id: idPep
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
        this.getListPep = function(idUser) {
            var defered = $q.defer();
            Pep.getList({
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
        this.getPepPaginate = (query) => {
            return Pep.getPaginate(query)
                .$promise;
        };
        this.getCount = function(idUser) {
            var defered = $q.defer();
            Pep.getCount({
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
        this.createPep = function(pep, idUser) {
            var defered = $q.defer();
            Pep.post({
                id: idUser
            }, pep).$promise.then(
                (response) => {
                    defered.resolve(response);
                },
                (error) => {
                    defered.reject(error)
                }
            );
            return defered.promise;
        };
        this.updatePep = function(pep, idUser) {
            var defered = $q.defer();
            Pep.put({
                    id: idUser,
                    fk: pep.id
                }, pep)
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
        this.deletePep = function(idUser, pep) {
            var defered = $q.defer();
            Pep.delete({
                    id: idUser,
                    fk: pep.id
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
            return Pep.autocomplete(a, b, c).$promise;
        };
        this.relManyDepartures = function(idPep, array) {
            return Pep.relManyDepartures({
                id: idPep
            }, {
                departureIds: array
            }).$promise;
        };
        // this.relManyDepartures = function(data) {
        //     return Pep.relManyDepartures(data).$promise;
        // };
        this.getListDeparture = function(idPep) {
            return Pep.getListDeparture({
                id: idPep
            }).$promise;
        };
        this.deleteDepartureOfPep = function(pepId, departureId) {
            return Pep.deleteDepartureOfPep({
                pepId: pepId,
                departureId: departureId
            }).$promise;
        };

        this.getPepReportList = function(a, b, c) {
            return Pep.getPepReportList(a, b, c).$promise;
        };

    }
    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);
};
