import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    activities: [ 
      { color: 'warning', icon: 'mdi-glass-mug-variant', name: 'Cerveza' },
      { color: 'light-green accent-4', icon: 'mdi-cash', name: 'Habemus Cash' },
      { color: 'grey', icon: 'mdi-devices', name: 'Programar' },
      { color: 'red', icon: 'mdi-weather-lightning', name: 'Suceso Infortunado' },
      { color: 'green', icon: 'mdi-charity', name: 'Buena Nueva' },
      { color: 'brown', icon: 'mdi-basketball', name: 'Actividad Física' },
      { color: 'indigo', icon: 'mdi-music', name: 'Nice Music' },
      { color: 'teal accent-4', icon: 'mdi-home-circle', name: 'Familia' },
      { color: 'error', icon: 'mdi-chat-remove', name: 'Mala Noticia' },
      { color: 'grey darken-2', icon: 'mdi-smoking', name: 'Fumanding' },
      { color: 'pink lighten-3', icon: 'mdi-google-circles-extended', name: 'Buena compañía' },
      { color: 'orange lighten-1', icon: 'mdi-pasta', name: 'Rica comida' },
      { color: 'green lighten-1', icon: 'mdi-check-bold', name: 'Todo bien' },
      { color: 'brown', icon: 'mdi-head-flash-outline', name: 'Maquinando' },
      { color: 'rgb(210,0,0)', icon: 'mdi-thumb-down', name: 'Todo Mal' },
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
