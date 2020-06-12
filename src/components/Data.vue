<template>
  <v-card class="pa-8" height="100%">
      <v-card class="my-5" v-for="(item, index) in subirBajar" :key="index">
        <v-img src="https://picsum.photos/350/50" class="white--text align-end">
          <v-card-title>{{title[index]}}, {{nombreDias[nombreHoy-restarDia[index]]}}</v-card-title>
        </v-img>
        <v-container>
          <v-row>
            <v-col><v-icon color="success">mdi-clock</v-icon>{{item.maxHour.toLocaleTimeString('es-AR', { hour: 'numeric', minute: 'numeric' })}}</v-col>
            <v-col><v-icon color="success">mdi-arrow-up-bold-circle</v-icon>{{item.maxFeel}}</v-col>
            <v-col><v-icon color="success">mdi-text-box</v-icon>{{item.maxDesc}}</v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col><v-icon color="primary">mdi-swap-vertical-circle</v-icon>{{item.average}}</v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col><v-icon color="red">mdi-clock</v-icon>{{item.minHour.toLocaleTimeString('es-AR', { hour: 'numeric', minute: 'numeric' })}}</v-col>
            <v-col><v-icon color="red">mdi-arrow-down-bold-circle</v-icon>{{item.minFeel}}</v-col>
            <v-col><v-icon color="red">mdi-text-box</v-icon>{{item.minDesc}}</v-col>
          </v-row>
          <v-row>            
            <v-col>
              <v-btn
                :color="item.color"
                class="ma-1"
                :key="index"
                outlined
                small
                v-for="(item, index) in item.act"
              >
                <v-icon left>{{item.icon}}</v-icon>{{item.name}}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    nombreDias: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    title: ['Ayer', 'Antes de Ayer', 'Semana pasada'],
    restarDia: [1,2,0],
    nombreHoy: new Date().getDay()
  }),
  computed: {
    ...mapState(['array', 'activities']),
    subirBajar() {
      let uno = (d => new Date(d.setDate(d.getDate()-1)))(new Date).getDate()
      let dos = (d => new Date(d.setDate(d.getDate()-2)))(new Date).getDate()
      let tres = (d => new Date(d.setDate(d.getDate()-7)))(new Date).getDate()
      let temp1 = []
      let temp2 = []
      let temp3 = []
      let final = []

      this.array.forEach(element => {
        element.date.getDate() == uno ? temp1.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;   
        element.date.getDate() == dos ? temp2.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;   
        element.date.getDate() == tres ? temp3.push({ feel: element.feel, date: element.date, text: element.text, act: element.act}) : null;
      })
        
      final.push(this.rellenaArreglo(temp1), this.rellenaArreglo(temp2), this.rellenaArreglo(temp3))

      return final
    },
  },
  methods: {
    rellenaArreglo(arreglo) {
      let valorMax = {feel: 0}
      let valorMin = {feel: 10}
      let actividades = []
      let sum = 0
      
      //Obtiene Max, min y actividades que no se repitan
      arreglo.forEach(element => {
        element.feel > valorMax.feel ? valorMax = element : null;
        element.feel <= valorMin.feel ? valorMin = element : null;
        actividades.includes(element.act) ? null : actividades.push(element.act);
        sum += element.feel
      })
      //Obtiene promedio
      sum = sum/arreglo.length
      
      //Obtiene el formato de botones de activities
      actividades.forEach((element, index) => {
        this.activities.forEach(element2 => {
          element2.name === element ? actividades[index] = element2 : null;
        })
      })

      return {
        maxHour: valorMax.date,
        maxFeel: valorMax.feel,
        maxDesc: valorMax.text,
        average: sum,
        minHour: valorMin.date,
        minFeel: valorMin.feel,
        minDesc: valorMin.text,
        act: actividades
      }
    }
  }
}
</script>