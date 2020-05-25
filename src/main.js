import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import VueTextareaAutoSize from 'vue-textarea-autosize'

const firebaseConfig = {
  apiKey: "AIzaSyCcnY-S-meSpjuTiaG8DTRno97ri_DlZn4",
  authDomain: "vue-calendario-c810c.firebaseapp.com",
  databaseURL: "https://vue-calendario-c810c.firebaseio.com",
  projectId: "vue-calendario-c810c",
  storageBucket: "vue-calendario-c810c.appspot.com",
  messagingSenderId: "968764308547",
  appId: "1:968764308547:web:9df45f7df08189058b68f6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
