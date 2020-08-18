<template>
  <v-container class="mt-12">

    <v-row>

      <v-col xs="12" md="7">
        <v-row>
          <v-col>
            <Mensajes />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Misiones />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Data />
          </v-col>
        </v-row>
      </v-col>
      
      <v-col xs="12" md="5">
        <v-row>
          <v-col>
            <ChartHoy />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ChartMes />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Calendar />
          </v-col>
        </v-row>
      </v-col>
    
    </v-row>
  </v-container>
</template>

<script>
import Calendar from '@/components/Calendar'
import ChartHoy from '@/components/ChartHoy'
import ChartMes from '@/components/ChartMes'
import Data from '@/components/Data'
import Mensajes from '@/components/Mensajes'
import Misiones from '@/components/Misiones'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Calendar,
    ChartHoy,
    ChartMes,
    Data,
    Mensajes,
    Misiones
  },
  computed: {
    ...mapState(['array'])
  }
}
</script>