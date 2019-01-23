import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue-google-oauth2'
import axios from 'axios'
const API_SERVER_URI = 'https://elib-api-server.herokuapp.com/api'

Vue.use(GAuth, {
  clientId:
    '188062114007-2f8bcgurajipqs0i0uaro2omlcpvn3j9.apps.googleusercontent.com',
  scope: 'profile email https://www.googleapis.com/auth/plus.login'
})
Vue.config.productionTip = false
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: API_SERVER_URI
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
