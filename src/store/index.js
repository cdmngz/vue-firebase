import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../main'

console.log('store/index.js')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'User no vale nada (store/index.js)',
    array: [],
    email: '',
  },
  mutations: {
    obtenerDatos(state) {
      state.array = []
      db.collection("eventos").where("userid", "==", state.user).orderBy("date").get()
        .then(querySnapshot => querySnapshot.forEach(doc => {
          state.array.push({
            docid: doc.id,
            userid: doc.data().userid,
            feel: doc.data().feel,
            text: doc.data().text,
            date: doc.data().date.toDate()
          })
        }))
        .catch(e => console.log(e.message))
    },
    crearDato(state, objeto) {
      db.collection("eventos").add({
        date: new Date(),
        feel: objeto.feel,
        text: objeto.text,
        userid: state.user,
      })
        .catch(error => { console.error("Error creando el documento: ", error) })
    },
    editarDato(state, item) {
      db.collection("eventos").doc(item.docid).update({
        feel: item.feel,
        text: item.text
      })
        .then(() => { console.log("Documento editado satisfactoriamente") })
        .catch(error => { console.error("Error editando el documento: ", error) });
    },
    eliminarDato(state, item) {
      db.collection("eventos").doc(item.docid).delete()
        .then(() => { console.log("Documento borrado satisfactoriamente") })
        .catch(error => { console.error("Error borrando el documento: ", error) });
    },
    observador(state) {
      console.log('Observador del store/index')
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('Hay sesion')
          state.displayName = user.displayName;
          state.email = user.email;
          state.emailVerified = user.emailVerified;
          state.photoURL = user.photoURL;
          state.isAnonymous = user.isAnonymous;
          state.uid = user.uid;
          state.user = user.uid;
          state.providerData = user.providerData;
        } else {
          console.log('No hay sesion')
          state.array = []
          state.displayName = ''
          state.email = ''
          state.emailVerified = ''
          state.photoURL = ''
          state.isAnonymous = ''
          state.uid = ''
          state.user = ''
          state.providerData = ''
        }
      })
    },
  },
  actions: {
  },
  modules: {
  }
})
