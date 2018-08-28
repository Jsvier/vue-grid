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
                    url: "http://10.49.39.140/api/customer",
                },
                columns: [
                    {
                        title:"rn",
                        visible: true,
                        editable: false,
                    },
                    {
                        title:"Tienda",
                        name: "store_no",
                        visible: true,
                        editable: true,
                    },
                    {
                        title:"cust_no",
                        name: "cust_no",
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