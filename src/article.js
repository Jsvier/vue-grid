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
                pageSize: 20,
                ajax: {
                    //  url: "https://restcountries.eu/rest/v1/all",
                    url: "http://10.49.39.140/api/article",
                },

                columns: [
                    {
                        title:" ART_NO",
                        visible: true,
                        editable: false,
                    },
                    {
                        title:"Grupo",
                        name: "ART_GRP_NO",
                        visible: true,
                        editable: true,
                    }, {
                        title:"Sub-Grupo",
                        name: "ART_GRP_SUB_NO",
                        visible: true,
                        editable: true,
                    },
                    {
                        title:"Descripcion",
                        name: "DESCR",
                        visible: true,
                        editable: true,
                    },
                    {
                        title:"name",
                        name: "name",
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
                    this.values = response.data.results.data;
            })
            .catch((err) => console.log(err.data));
            console.log(this)
      }
    },
    events: {

    },
});