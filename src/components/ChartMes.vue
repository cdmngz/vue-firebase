<template>
  <v-card id="ini" class="pa-4 text-center">
    <canvas id="feels-chart-mes"></canvas>
  </v-card>
</template>

<script>
import Chart from 'chart.js'
import { mapState } from 'vuex'

export default {
  name: 'ChartMes',
  data: () => ({
    feelChartData: {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Este Mes',
          data: [],
          backgroundColor: [],
        }],
        labels: [],
      }
    }
  }),
  computed: {
    ...mapState(['array', 'activities']),
    arrayTamano() {
      return this.array.length
    }
  },
  watch: {
    arrayTamano() {
      this.getMonthActivities()
    }
  },
  mounted() {
    this.getMonthActivities()
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
        myChart: myChart
      });
    },
    getMonthActivities() {
      if(this.array.length > 0) {
        console.log('hay datos')

        let actividades = []
        let nArray = this.array.length-1
        const actualMonth = new Date().getMonth()

        while(nArray >= 0 && actualMonth === this.array[nArray].date.getMonth()) {
          actividades.push(this.array[nArray].act)
          nArray--
        }
        
        if(actividades.length > 0) {

          actividades.sort()
          
          let groupByAct = actividades.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null))

          for(let itemGroupBy in groupByAct) {
            for(let itemState of this.activities) {
              if(itemState.name === itemGroupBy) {
                this.feelChartData.data.labels.push(itemGroupBy)
                this.feelChartData.data.datasets[0].data.push(groupByAct[itemGroupBy])
                this.feelChartData.data.datasets[0].backgroundColor.push(itemState.color)
              }
            }
          }
          this.createChart('feels-chart-mes', this.feelChartData)
        } else {
          console.log('no hay de este mes')
          document.querySelector('#ini').innerHTML = `Aún no hay datos este mes, pero si de anteriores`
        }
      } else {
        console.log('distinto')
        document.querySelector('#ini').innerHTML = `Aún no hay datos este mes`
      }
    }
  }
}
</script>