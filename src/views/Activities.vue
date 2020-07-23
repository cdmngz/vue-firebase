<template>
  <v-main>
    <v-btn
      class="ma-2"
      :color="item.color"
      :key="index"
      outlined
      v-for="(item, index) in activities"
    >
      <v-icon left>{{item.icon}}</v-icon>{{item.name}}
    </v-btn>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activities',
  computed: {
    ...mapState(['activities', 'array'])
  }
}
</script>