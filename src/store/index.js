import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 0,
    array: [{userid: 1, feel: 10, text: 'Descripción de ejemplo', date: '25/06/2020'}],
    email: ''
  },
  mutations: {
    llevar(state, userid) {
      console.log(userid)
      state.user = userid
    },
    async obtenerDatos(state) {
      state.array = []
      try {
        const snapshot = await db.collection("eventos").where("userid", "==", state.user).get()
        snapshot.forEach(doc => {
          state.array.push({
            docid: doc.id,
            userid: doc.data().userid,
            feel: doc.data().feel,
            text: doc.data().text,
            date: doc.data().date.toDate()})
        })
        if(state.array.length===0) {
          state.array = [{text: 'Aún no tienes registros...'}]
        }
      } catch (error) {
        console.log(error)
      }
    },
    crearDato(state, objeto) {
      db.collection("eventos").add({
        date: new Date(),
        feel: objeto.feel,
        text: objeto.text,
        userid: state.user,
      })
        .then(() => { console.log("Documento creado satisfactoriamente") })
        .catch(error => { console.error("Error creando el documento: ", error) });
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
      auth.onAuthStateChanged(function(user) {
        if (user) {
          state.displayName = user.displayName;
          state.email = user.email;
          state.emailVerified = user.emailVerified;
          state.photoURL = user.photoURL;
          state.isAnonymous = user.isAnonymous;
          state.uid = user.uid;
          state.providerData = user.providerData;
        } else {
          state.array = []
          state.displayName = ''
          state.email = ''
          state.emailVerified = ''
          state.photoURL = ''
          state.isAnonymous = ''
          state.uid = ''
          state.user = 0
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
