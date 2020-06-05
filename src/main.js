import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCcnY-S-meSpjuTiaG8DTRno97ri_DlZn4",
  authDomain: "vue-calendario-c810c.firebaseapp.com",
  databaseURL: "https://vue-calendario-c810c.firebaseio.com",
  projectId: "vue-calendario-c810c",
  storageBucket: "vue-calendario-c810c.appspot.com",
  messagingSenderId: "968764308547",
  appId: "1:968764308547:web:9df45f7df08189058b68f6"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  if(user) {
    console.log('Hay usuario desde main'+user.uid)
    firebase.firestore().collection("eventos").where("userid", "==", user.uid).orderBy("date").get()
    .then(querySnapshot => querySnapshot.forEach(doc => {
      store.state.array.push({
        docid: doc.id,
        userid: doc.data().userid,
        feel: doc.data().feel,
        text: doc.data().text,
        act: doc.data().act,
        date: doc.data().date.toDate()
      })
    }))
    .catch(e => console.log(e.message))
  } else {
    console.log('No hay usuario desde main')
  }
})
