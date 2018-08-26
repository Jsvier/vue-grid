Vue.config.debug = true;
Vue.config.devtools = true;
//Vue.http.headers.common['Content-Type'] = 'application/json';
//Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
//Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*';
//Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';

new Vue({
    el: '#app',
    components: {
        VueBootstrapTable: VueBootstrapTable
    },
    created:function (){
        this.apiCustomer();

    },
        //Asociar a una funcion anonima, nuevo contexto de ejecucion
        data: function(){
            return {
                logging: [],
                showFilter: true,
                showPicker: true,
                paginated: true,
                multiColumnSortable: true,
                ajax: {
                    enabled: false,
                    url: "https://restcountries.eu/rest/v1/all",
                  //  url: "http://10.49.39.140/api/customer",
                    method: "GET",
                    delegate: true,
                },
                columns: [
                    {
                        title:"name",
                        visible: true,
                        editable: false,
                    },
                    {
                        title:"topLevelDomain",
                        name: "topLevelDomain",
                        visible: true,
                        editable: true,
                    }
                ],
                values: [
        ]
        };
    },
    methods: {
        apiCustomer: function(){
            this.$http.get(this.ajax.url)
                .then( (response) => {
                    this.values = response.data;
            })
            .catch((err) => console.log(err.data))
      }
    },
    events: {

    },
});