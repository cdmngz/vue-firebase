<template>
  <v-card class="pa-8">
    <canvas id="feels-chart-hoy"></canvas>
  </v-card>
</template>

<script>
import Chart from 'chart.js'
import { mapState } from 'vuex'

export default {
  name: 'Charthoy',
  data: () => ({
    feelChartData: {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Hoy',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ],
        options: {
          responsive: true,
          lineTension: 1,
          aspectRatio: 4,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 25,
              }
            }]
          }
        }
      }
    }
  }),
  computed: {
    ...mapState(['array']),
    arrayTamano() {
      return this.array.length
    }
  },
  watch: {
    arrayTamano() {
      this.getDayInfo()
    }
  },
  mounted() {
    this.getDayInfo()
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
    getDayInfo() {
      if(this.array.length > 0) {

        let [tempLabels, tempData] = [[],[]]
        this.feelChartData.data.labels = []
        this.feelChartData.data.datasets[0].data = []
        this.feelChartData.data.datasets[0].backgroundColor = [] 
        this.feelChartData.data.datasets[0].borderColor = []
        let tamanoArreglo = (this.array.length)-1
        let actual = `${new Date().getDate()}/${new Date().getMonth()+1}`
        let actualArray = `${this.array[tamanoArreglo].date.getDate()}/${this.array[tamanoArreglo].date.getMonth()+1}`

        while(actual === actualArray && tamanoArreglo >= 0) {
          tempLabels.push(this.array[tamanoArreglo].date)     
          tempData.push(this.array[tamanoArreglo].feel)
          tamanoArreglo--
          if(tamanoArreglo >= 0) {
            actualArray = `${this.array[tamanoArreglo].date.getDate()}/${this.array[tamanoArreglo].date.getMonth()+1}`
          }   
        }

        for (let i = 0; i <= 23; i++) {
          let [sum, cont, prom] = [0,0,1]

          for (let j = 0; j < tempData.length; j++) {
            if(i == tempLabels[j].getHours()) {
              sum += parseInt(tempData[j], 10)
              cont++
            }
          }
          cont != 0 ? prom = parseInt(sum/cont, 10) : null;
          i < 10 ? i = '0'+i : null;
          this.feelChartData.data.labels.push(i)
          this.feelChartData.data.datasets[0].data.push(prom)
          this.feelChartData.data.datasets[0].backgroundColor.push('rgba(60,80,220,.1)')   
          this.feelChartData.data.datasets[0].borderColor.push('#36495d') 
        }
        this.createChart('feels-chart-hoy', this.feelChartData)
      }
    }
  }
}
</script>