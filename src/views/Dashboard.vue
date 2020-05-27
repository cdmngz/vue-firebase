<template>
  <v-container>
    <v-layout class="d-flex justify-center mt-7">
      <v-flex xs9>
        <v-card class="pa-xs-2 mx-auto pa-sm-6">
          <Chart/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="d-flex justify-center mt-7">
      <v-flex xs9>
        <v-card class="pa-xs-2 mx-auto pa-sm-6">
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