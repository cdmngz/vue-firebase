import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../main'

console.log('store/index.js')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'User no vale nada',
    array: [],
    activities: [ 
      { color: 'warning', icon: 'mdi-glass-mug-variant', name: 'Cerveza' },
      { color: 'light-green accent-4', icon: 'mdi-account-cash', name: 'Recibir Dinero' },
      { color: 'grey', icon: 'mdi-devices', name: 'Programar' },
      { color: 'red', icon: 'mdi-weather-lightning', name: 'Suceso Infortunado' },
      { color: 'green', icon: 'mdi-charity', name: 'Buena Noticia' },
      { color: 'brown', icon: 'mdi-basketball', name: 'Ejercicio' },
      { color: 'indigo', icon: 'mdi-music', name: 'Música de la buena' },
      { color: 'purple', icon: 'mdi-home-heart', name: 'Momento Familiar' },
      { color: 'teal accent-4', icon: 'mdi-sleep', name: 'Descanso' },
      { color: 'grey darken-2', icon: 'mdi-smoking', name: 'Fumanding' },
      { color: 'pink lighten-3', icon: 'mdi-google-circles-extended', name: 'Buena compañía' },
      { color: 'orange lighten-1', icon: 'mdi-pasta', name: 'Rica comida' },
    ]
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
            act: doc.data().act,
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
        act: objeto.act,
        userid: state.user,
      })
        .catch(error => { console.error("Error creando el documento: ", error) })
    },
    editarDato(state, item) {
      db.collection("eventos").doc(item.docid).update({
        feel: item.feel,
        text: item.text,
        act: item.act,
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
