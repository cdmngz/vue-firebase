<template>
  <v-container>
    <v-layout class="d-flex justify-center mt-7">
      <v-flex xs6>
        <v-card class="pa-xs-2 pa-sm-6 mr-3">
          <Chart/>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="pa-xs-2 pa-sm-6 ml-3">
          <Calendar/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Calendar from '@/components/Calendar'
import Chart from '@/components/Chart'

export default {
  name: 'Dashboard',
  components: {
    Calendar,
    Chart
  }
}
</script>