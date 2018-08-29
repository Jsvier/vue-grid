
// Define a new component called button-counter
Vue.component('urlsmakro', {
  data: function () {
    return {
      activado: false
    }
  },
  props: {
    data: {
        type: Object
    }
  },
  computed: {
    hrefTarget () {
      return (this.enabled ? "_blank" : "_self")
    }
  },
  template: '<div v-if="activado">'+
              '<v-btn flat color="orange" @click="getMakro(data.api.url)"><v-icon dark>play_arrow</v-icon>[{{data.api.method}}]</v-btn>'+
              '<input  class="Input-text" v-model="data.api.url">'+
              '<v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">save</v-icon>'+
            '</div>'+
            '<div v-else>'+
              '<v-btn flat color="orange" @click="getMakro(data.api.url)"><v-icon dark>play_arrow</v-icon>[GET]</v-btn>'+
              '<a :href="data.api.url" :target="hrefTarget">{{data.api.url}}</a><v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">edit</v-icon>'+
            '</div>',

  mounted: function () {
   // console.log(this.data);
  },

  methods: {
    changeUrl: function () {
      this.activado= !this.activado;
    },
    getMakro (resource) {
      this.$emit('responsejson',resource);
    }
  }
});

new Vue({
    el: '#app',
  //  components: { urlsmakro: urlsmakro},
    data () {
      return {
        apiKey: '',
        adminMode: false,
        orgs: [],
        errors: [],
        makroData: [],         
      }
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
           method: 'GET',   
           url: 'http://10.49.39.140/api/customer',   
           urltest: 'file:///C:/source-git/vue-grid/src/customer.html'
         },
         {
           method: 'GET',   
           url: 'http://10.49.39.140/api/article',   
           urltest: 'file:///C:/source-git/vue-grid/src/article.html'
         },
         {
           method: 'GET',   
           url: 'http://10.49.39.140/api/order',   
           urltest: 'file:///C:/source-git/vue-grid/src/order.html'
         }
       ]
     }
    },
    methods: {
      responseJSON(resource){
        axios.get(resource)
        .then(response => {
       // JSON responses are automatically parsed.
          this.makroData = response.data;
     })
     .catch(e => {
       this.errors.push(e)
       this.makroData = e.message;
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