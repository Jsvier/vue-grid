
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
              '<input id="txtbox" v-model="data.api.url">'+
              '<v-btn flat color="orange" right fab @click="changeUrl()"><v-icon large color="orange">save</v-icon>'+
            '</div>'+
            '<div v-else>'+
              '<v-btn flat color="orange" @click="getMakro(data.api.url)"><v-icon dark>play_arrow</v-icon>[GET]</v-btn>'+
              '<a :href="data.api.urltest" :target="hrefTarget">{{data.api.url}}</a><v-btn flat color="orange" right fab @click="changeUrl()"><v-icon large color="orange">edit</v-icon>'+
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
          dialog: false,
          loading: false,
          sound: false,
          widgets: false,
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
        this.loading= true;
        axios.get(resource)
        .then(response => {
       // JSON responses are automatically parsed.
          this.makroData = response.data;
          this.loading= false;
     })
     .catch(e => {
       this.errors.push(e)
       this.loading= false;
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