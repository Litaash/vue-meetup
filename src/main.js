import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBd5ZmR7qc8wsYHEazrogfpAolv5_QkSGU',
      authDomain: 'meetup-vue-44be2.firebaseapp.com',
      databaseURL: 'https://meetup-vue-44be2.firebaseio.com',
      projectId: 'meetup-vue-44be2',
      storageBucket: 'gs://meetup-vue-44be2.appspot.com',
      messagingSenderId: '285300391225'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
