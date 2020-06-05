import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    activities: [ 
      { color: 'warning', icon: 'mdi-glass-mug-variant', name: 'Cerveza' },
      { color: 'light-green accent-4', icon: 'mdi-account-cash', name: 'Recibir Dinero' },
      { color: 'grey', icon: 'mdi-devices', name: 'Programar' },
      { color: 'red', icon: 'mdi-weather-lightning', name: 'Suceso Infortunado' },
      { color: 'green', icon: 'mdi-charity', name: 'Buena Nueva' },
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
    }
  }
})
