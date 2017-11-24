var dependencies = [];

function service() {
    this.$get = ['$resource', function($resource) {
            // var baseUrl = 'http://beta.reclutame.net/';
            var baseUrl = 'http://localhost:8000/';
            var api = {};
            //http://beta.reclutame.net/api/profesional/1/informacion/
            api.categories = $resource(
                baseUrl + 'categories/:id/products/', {
                    
                }, {
                    'filters': {
                        url: baseUrl + "categories/:id/filters/",
                        method: "GET",
                        params: {
                            id: '@id'
                        },
                        isArray: true
                    },
                    'search': {
                        url: baseUrl + 'categories/:id/filter-products/',
                        query:'@especification'
                    }
                }

        );
        return api;
    }]
}
service.$inject = dependencies;
app.provider('apiService', service);
