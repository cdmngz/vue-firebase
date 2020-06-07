<template>
  <v-container class="mt-12">
    <v-layout row wrap>
      
      <v-flex d-flex xs12 md7>
        <v-container>
          <Data />
        </v-container>
      </v-flex>
      
      <v-flex xs12 md5>
        <v-layout>
          <v-flex>
            <v-container>
              <Chart />
            </v-container>
          </v-flex>
        </v-layout>
        
        <v-layout>
          <v-flex>
            <v-container>
              <Calendar />
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    
    </v-layout>
  </v-container>
</template>

<script>
import Calendar from '@/components/Calendar'
import Chart from '@/components/Chart'
import Data from '@/components/Data'

export default {
  name: 'Dashboard',
  components: {
    Calendar,
    Chart,
    Data
  }
}
</script>