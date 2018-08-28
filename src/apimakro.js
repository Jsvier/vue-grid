
new Vue({
    el: '#app',
    data () {
      return {
        apiKey: '',
        adminMode: false,
        activado:false,
        orgs: [],
        errors: [],
        makroData: [],         
      }
    },
    created: function () {
      this.getOrgs();
    },
    computed: {
     headers: function () { 
       return {
          'x-cisco-meraki-api-key': this.apiKey,
          'content-type': 'application/json' 
         }
       },
     apis: function () {
       return [
         {
           name: 'Clientes',
           method: 'GET',   
           url: 'http://10.49.39.140/api/customer',   
           urltest: 'file:///C:/source-git/vue-grid/src/customer.html'
         },
         {
           method: 'POST',   
           url: 'http://10.49.39.140/api/customer',   
           urltest: 'file:///C:/source-git/vue-grid/src/customer.html'
         }
       ]
     }
    },
    methods: {
      getMakro (resource) {
        this.activado= true;
        axios.get(resource)
        .then(response => {
         // JSON responses are automatically parsed.
         this.makroData = response.data;
         this.activado= false; 
       })
       .catch(e => {
         this.errors.push(e)
       })
      },
      getOrgs () {
        axios.get('/api/organizations/')
        .then(response => {
         // JSON responses are automatically parsed.
         this.orgs = response.data;
         this.org = this.orgs[0]; // set default org
       })
       .catch(e => {
         this.errors.push(e)
       })
      }
    },
   watch: {
     org: function () {

     },
     apiKey: function () {
       //console.log('updating apiKey', this.apiKey)
       //axios.defaults.headers.common['X-Cisco-Meraki-API-Key'] = this.apiKey // for all requests
     }
    } 
   })