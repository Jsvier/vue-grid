
// Define a new component called button-counter
Vue.component('url-makro', {
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
              '<v-btn flat color="orange" @click="getMakro(data.api.url)"><v-icon dark>play_arrow</v-icon>[GET]</v-btn>'+
              '<input v-model="data.api.url">'+
              '<v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">save</v-icon>'+
            '</div>'+
            '<div v-else>'+
              '<v-btn flat color="orange" @click="getMakro(data.api.url)"><v-icon dark>play_arrow</v-icon>[GET]</v-btn>'+
              '<a :href="data.api.url" :target="hrefTarget">{{data.api.url}}</a><v-btn flat color="orange" @click="changeUrl()"><v-icon large color="orange darken-2">edit</v-icon>'+
            '</div>',

  mounted: function () {
    console.log(this.data);
  },

  methods: {
    changeUrl: function () {
      this.activado= !this.activado;
    },
    getMakro (resource) {
      var bus = new Vue();
      bus.$emit('incrementar-clicks', 1);
     
 /*    axios.get(resource)
      .then(response => {
       // JSON responses are automatically parsed.
       var bus = new Vue();
       bus.$emit('incrementar-clicks', 1);
      // this.makroData = response.data;
     })
     .catch(e => {
       this.errors.push(e)
     })*/
    }
  }
});

new Vue({
    el: '#app',
    data () {
      return {
        apiKey: '',
        adminMode: false,
        orgs: [],
        errors: [],
        makroData: [],         
      }
    },
    created: function() {
      bus.$on('incrementar-clicks', function (id) {
        console.log('ddddd');
      }.bind(this))
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
           method: 'POST',   
           url: 'http://10.49.39.140/api/customer',   
           urltest: 'file:///C:/source-git/vue-grid/src/customer.html'
         }
       ]
     }
    },
    methods: {

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