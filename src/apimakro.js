
// Define a new component called button-counter
Vue.component('url-makro', {
  data: function () {
    return {
      editorEnabled: false
    }
  },
  props: ['url'],
  template: '<div v-if="editorEnabled"> <input v-model="url"><v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">save</v-icon></div><div v-else><a target="_blank"v-model="url" href="www.google.com" >{{url}}</a><v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">edit</v-icon></div>',
  methods: {
    changeUrl: function () {
      this.editorEnabled= !this.editorEnabled;
    }
  }
});

new Vue({
    el: '#app',
    data () {
      return {
        apiKey: '',
        adminMode: false,
        activado:false,
        editorEnabled: false,
        orgs: [],
        errors: [],
        makroData: [],         
      }
    },
    created: function () {
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