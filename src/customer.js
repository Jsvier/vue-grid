Vue.component('modal', {
    template: '#modal-template',
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true  
      }
    }
  });

var vm = new Vue({
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
                showFilter: true,
                showPicker: true,
                paginated: true,
                pageSize: 20,
                showModal: false,
                ajax: {
                    url: 'http://10.49.39.140/api/customer',
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
        ],
        errors: []
        };
    },
    methods: {
        apiCustomer: function(){
            this.$http.get(this.ajax.url)
                .then( (response) => {
                    this.values = response.data.results.data;
            })
            .catch((error) => console.log(error.data));
        },
        csvExport() {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
            Object.keys(this.values[0]).join(";"),
             ...this.values.map(item => Object.values(item).join(";"))
            ]
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");
  
            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "export.csv");
            link.click();
      }
    },
});