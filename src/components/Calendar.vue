<template>
  <v-card class="pa-8">
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn fab text small color="grey darken-2" @click="prev"><v-icon small>mdi-chevron-left</v-icon></v-btn>
        <v-btn fab text small color="grey darken-2" @click="next"><v-icon small>mdi-chevron-right</v-icon></v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="grey darken-2" @click="setToday">Hoy</v-btn>
      </v-toolbar>
    </v-sheet>

    <v-sheet>
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :now="today"
        :type="type"
        event-color="none"
        :event-text-color="getEventColor"
        @change="updateRange"
      ></v-calendar>
    </v-sheet>
  
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'Calendar',
    data: () => ({
      focus: '',
      today: new Date().now,
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 Días',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
    }),
    computed: {
      ...mapState(['array']),
      arrayTamano() {
        return this.array.length
      },
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        return `${startMonth} ${startYear}`
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    watch: {
      arrayTamano() {
        this.$refs.calendar.checkChange()
      }
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      updateRange ({ start, end }) {
        let diaAnterior = 0
        let mesAnterior = 0
        let nuevoArray = []
        this.events = []

        this.array.forEach(element => {
          let dia = element.date.getDate()
          let mes = ('0'+(element.date.getMonth()+1)).slice(-2)

          if(dia == diaAnterior) {
            nuevoArray.push(element.feel)
          } else {
            if(nuevoArray.length > 0) {
              let max = Math.max(...nuevoArray)
              let min = Math.min(...nuevoArray)
              this.events.push({name: ' ↑ '+max.toString(), color: 'green', start: `2020-${mesAnterior}-${diaAnterior}`, end: `2020-${mesAnterior}-${diaAnterior}`})
              this.events.push({name: ' ↓ '+min.toString(), color: 'red', start: `2020-${mesAnterior}-${diaAnterior}`, end: `2020-${mesAnterior}-${diaAnterior}`})
              nuevoArray = []
              nuevoArray.push(element.feel) 
            } else {
              nuevoArray.push(element.feel)
            }
            diaAnterior = dia
            mesAnterior = mes
          }          
        })
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      }
    }
  }
</script>