<template>
  <div>
    <v-card v-show="subirBajar!==0" class="mb-7" v-for="(item, index) in subirBajar" :key="index">
      <v-img src="https://picsum.photos/720/60" class="white--text align-end">
        <v-card-title>{{title[index]}} {{nombreDias[numDiaHoy-restarDia[index]]}}</v-card-title>
      </v-img>
      <v-container>
        <v-row cols="12">
          <v-col cols="2">
            <v-icon small class="mr-1" color="success">mdi-clock</v-icon>
            <span>{{item.maxHour.toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric' })}}</span>
          </v-col>
          <v-col cols="2">
            <v-icon small class="mr-1" color="success">mdi-arrow-up-bold-circle</v-icon>
            <span>{{item.maxFeel}}</span>
          </v-col>
          <v-col cols="4">
            <v-icon small class="mr-1" color="success">mdi-text-box</v-icon>
            <span>{{item.maxDesc}}</span>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-btn :color="item.maxAct.color" class="ma-1" outlined small>
              <v-icon small left>{{item.maxAct.icon}}</v-icon>{{item.maxAct.name}}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-n7 mb-n4">
          <v-col cols="2"></v-col>
          <v-col cols="2">
            <v-icon small class="mr-1" color="primary">mdi-swap-vertical-circle</v-icon>
            <span>{{item.average}}</span> 
            </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-icon small class="mr-1" color="red">mdi-clock</v-icon>
            <span>{{item.minHour.toLocaleTimeString('es-AR', { hour: 'numeric', minute: 'numeric' })}}</span>
          </v-col>
          <v-col cols="2">
            <v-icon small class="mr-1" color="red">mdi-arrow-down-bold-circle</v-icon>
            <span>{{item.minFeel}}</span>
          </v-col>
          <v-col cols="4">
            <v-icon small class="mr-1" color="red">mdi-text-box</v-icon>
            <span>{{item.minDesc}}</span>
            </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-btn :color="item.minAct.color" class="ma-1" outlined small>
              <v-icon small left>{{item.minAct.icon}}</v-icon>{{item.minAct.name}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="subirBajar===0">
      <v-card-text>Debes ingresar datos en la pestaña <v-btn to="/feelings" text depressed><v-icon color="primary">mdi-heart-box</v-icon></v-btn></v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    holi: 'df',
    nombreDias: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    title: ['Ayer,', 'Antes de Ayer,', 'Semana pasada,'],
    restarDia: [1,2,0],
    numDiaHoy: new Date().getDay()
  }),
  computed: {
    ...mapState(['array', 'activities']),
    subirBajar() {
      const uno = (d => new Date(d.setDate(d.getDate()-1)))(new Date).toLocaleString('default', {dateStyle: 'short'})
      const dos = (d => new Date(d.setDate(d.getDate()-2)))(new Date).toLocaleString('default', {dateStyle: 'short'})
      const tres = (d => new Date(d.setDate(d.getDate()-7)))(new Date).toLocaleString('default', {dateStyle: 'short'})
      const ultimoItemArray = this.array[this.array.length-1]
      let temp1 = []
      let temp2 = []
      let temp3 = []
      let temp4 = []
      let final = []

      if(this.array.length > 0) {
        
        this.array.forEach(element => {
          element.date.toLocaleString('default', {dateStyle: 'short'}) === uno ? temp1.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;   
          element.date.toLocaleString('default', {dateStyle: 'short'}) === dos ? temp2.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;   
          element.date.toLocaleString('default', {dateStyle: 'short'}) === tres ? temp3.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;
          element.date.toLocaleString('default', {dateStyle: 'short'}) === ultimoItemArray.date.toLocaleString('default', {dateStyle: 'short'}) ? temp4.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;
        })

        if(temp1.length > 0 && temp2.length > 0 && temp3.length > 0) {
          final.push(this.rellenaArreglo(temp1), this.rellenaArreglo(temp2), this.rellenaArreglo(temp3))
        } else {
          final.push(this.rellenaArreglo(temp4))
          this.title = [`El último dato fue el día ${ultimoItemArray.date.toLocaleString('default', { weekday: 'long' })}, ${ultimoItemArray.date.getDate()} de ${ultimoItemArray.date.toLocaleString('default', { month: 'long' })}.`]
          this.nombreDias = ''
        }
      } else {
        final = 0
      }
      return final
    },
  },
  methods: {
    obtenerFormatoBotones(nombre) {
      return this.activities.find(element => element.name === nombre)
    },
    rellenaArreglo(arreglo) {
      let valorMax = { feel: 0 }
      let valorMin = { feel: 10 }
      let sum = 0
      
      //Obtiene Max y min
      arreglo.forEach(element => {
        element.feel > valorMax.feel ? valorMax = element : null;
        element.feel <= valorMin.feel ? valorMin = element : null;
        sum += element.feel
      })

      //Obtiene promedio
      sum = (sum / arreglo.length).toFixed();

      return {
        maxHour: valorMax.date,
        maxFeel: valorMax.feel,
        maxDesc: valorMax.text,
        maxAct: this.obtenerFormatoBotones(valorMax.act),
        average: sum,
        minHour: valorMin.date,
        minFeel: valorMin.feel,
        minDesc: valorMin.text,
        minAct: this.obtenerFormatoBotones(valorMin.act),
      }
    }
  }
}
</script>