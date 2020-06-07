<template>
  <v-card class="pa-8" height="100%">
    <h1>Data</h1>
      <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">Día</th>
          <th class="text-left">Promedio</th>
          <th class="text-left">Alto</th>
          <th class="text-left">Relacionado</th>
          <th class="text-left">Bajo</th>
          <th class="text-left">Relacionado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in table" :key="item.name">
          <td>{{ item.dia }}</td>
          <td>{{ item.promedio }}</td>
          <td>{{ item.max }}</td>
          <td>{{ item.maxRel }}</td>
          <td>{{ item.min }}</td>
          <td>{{ item.minRel }}</td>
        </tr>
      </tbody>
  </v-simple-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    table: [ 
      { dia: 'Ayer', max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      { dia: ((new Date(Date.now() - 86400000)).getDate()), max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      { dia: ((new Date(Date.now() - 86400000*2)).getDate()), max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      { dia: ((new Date(Date.now() - 86400000*3)).getDate()), max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      { dia: ((new Date(Date.now() - 86400000*7)).getDate()), max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      { dia: ((new Date(Date.now() - 86400000*28)).getDate())+'/05', max: 9, min: 3, maxRel: 'Programar', minRel: 'Maquinando', promedio: 5, },
      ]
  }),
  computed: {
    ...mapState(['array']),
  }
}
</script>