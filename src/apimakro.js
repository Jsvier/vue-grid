var config = {
  apiKey: "AIzaSyD7RB31bxJyEKfB0Q7kp0cke2sdMENv-YM",
  authDomain: "makro-8b482.firebaseapp.com",
  databaseURL: "https://makro-8b482.firebaseio.com",
  projectId: "makro-8b482",
  storageBucket: "makro-8b482.appspot.com",
  messagingSenderId: "917007215303"
};

firebase.initializeApp(config);

var auth = firebase.auth(),
  proveedor = new firebase.auth.GoogleAuthProvider();

Vue.prototype.$eventBus = new Vue(); 

// Define a new component 
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
  template: '<div>'+
              '<v-btn flat color="orange" @click="apiMakro(data)"><v-icon dark>play_arrow</v-icon>[{{data.api.method}}]</v-btn>'+
              '<a v-if="!activado":href="data.api.urltest" :target="hrefTarget">{{data.api.url}}</a>'+
              '<input v-if="activado" id="txtbox" v-model="data.api.url">'+
              '<v-btn v-if="!activado"  flat color="orange" right fab @click="changeUrl()"><v-icon large color="orange">edit</v-icon></v-btn>'+
              '<v-btn v-if="activado"   flat color="orange" right fab @click="changeUrl()"><v-icon large color="orange">save</v-icon></v-btn>'+
               '</div>',

  mounted: function () {
   // console.log(this.data);
  },
  methods: {
    changeUrl: function () {
      this.activado= !this.activado;
    },
    apiMakro (resource) {
     if (resource.api.method == "POST")
      this.postMakro (resource);
     else
      this.getMakro (resource);
    },
    getMakro (resource) {
      this.$eventBus.$emit('responseGET',resource);
    }, 
    postMakro (resource) {
        this.$eventBus.$emit('view-customer',resource);
    },
  }
});

Vue.component('customer', {
  template: '#customer-template',
  created() {
    this.$eventBus.$on('view-customer', (resource) => {
      this.show= true;
      this.api = resource;
    });
  },
  data: function () {
    return {
      user: 'Usuario test',   
      address: 'Av. de Mayo 2000',   
      phone: '+5491147353423'
    }
  },
  api: [],
   template: '<transition name="modal">'+
   '<div class="modal-mask" @click="close" v-show.sync="show">'+
     '<div class="modal-container" @click.stop>'+
       '<div class="modal-header">'+
         '<h3>CLIENTE</h3>'+
       '</div>'+
       '<div class="modal-body">'+
         '<label class="form-label">'+
           'Nombre:'+
           '<input  v-model="user" class="form-control">'+
         '</label>'+
         '<label class="form-label">'+
           'Direccion:'+
           '<input v-model="address" class="form-control">'+
         '</label>'+
         '<label class="form-label">'+
           'Telefono:'+
           '<input  v-model="phone" class="form-control">'+
         '</label>'+
       '</div>'+
       '<div class="modal-footer text-right">'+
         '<button class="makrobutton" @click="save()">'+
           'Save'+
         '</button>'+
       '</div>'+
     '</div>'+
   '</div>'+
 '</transition>',
  props: ['show'],
  methods: {
    close: function () {
      this.show= false;

      this.api.dataJSON=[
        {
          card_type_no: 1,
          cust_type_no: 44,
          dis_no: 2,
          name: this.user,
          address: this.address,
          town: 'Buenos Aires',
          nbr_mmail: 1,
          ind_cheques: 0,
          phone_no: this.phone,
          province: 1,
          fiscalInfo: {
              vat_cond: 'C'
          },
          passportHolder: {
            doc_code: 'PA',
            birth_date: '1986-10-23'
          }
        } 
      ];
       this.$eventBus.$emit('responsePOST',this.api);
    },
    save: function () {
      this.close();
    }
  }
});
   
var vm = new Vue({
    el: '#app',
    created() {
      this.$eventBus.$on('responsePOST', (resource) => {
      this.responsePOST(resource);
      });
      this.$eventBus.$on('responseGET', (resource) => {
        this.responseGET(resource);
        });
    },
    ready: function () {
      // Auth
      auth.onAuthStateChanged(function (user) {
          if (user) {
              vm.autentificado = true;
              vm.usuarioActivo = user;
          } else {
              vm.autentificado = false;
              vm.usuarioActivo = null;
          }
      });
    },
     data () {
      return {
        showModal: false,
        loading: false,
        autentificado: false,
        usuarioActivo: null,
        errors: [],
        makroData: [],         
      }
    },
    computed: {
     headers: function () { 
       return {
        'x-makro-api-key': vm.usuarioActivo.apiKey,
          'content-type': 'application/json' 
         }
       },
     apis: function () {
       return [
         {
           method: 'GET',   
           url: 'http://10.49.39.140/api/customer',   
           urltest: 'file:///C:/source-git/vue-grid/src/customer.html',
           dataJSON:[],
         },
         {
          method: 'POST',   
          url: 'http://10.49.39.140/api/customer',   
          urltest: '',
          dataJSON:[],
        }
       ]
     }
    },
    methods: {
      responseGET(resource){
        this.stateAPI(true);
        axios.get(resource.api.url)
        .then(response => {
          this.makroData = response.data.results.data;
          this.stateAPI(false);
     })
     .catch(e => {
       this.errors.push(e)
       this.stateAPI(false);
       this.makroData = e.message;
     })
    },
    responsePOST(resource){
      this.stateAPI(true);

      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    }

      axios.post(resource.api.url, resource.dataJSON,headers)
      .then(response => {
        this.makroData = response.api.url.data;
        this.stateAPI(false);
   })
   .catch(e => {
     this.errors.push(e)
     this.stateAPI(false);
     this.makroData = e.message;
   })
  },
  stateAPI(state){
      showModal = state;
      this.loading= state;
  },
  conectar: function () {
    firebase.auth().signInWithPopup(proveedor).catch(function (error) {
      this.errors.push(error);
    });
  },
  desconectar: function () {
    firebase.auth().signOut().catch(function (error) {
      this.errors.push(error);
    });
  }
}
})