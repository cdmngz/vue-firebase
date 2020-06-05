<template>
  <v-content>
    <v-btn
      class="ma-2"
      :color="item.color"
      :key="index"
      outlined
      v-for="(item, index) in activities"
    >
      <v-icon left>{{item.icon}}</v-icon>{{item.name}}
    </v-btn>
    <pre style="font-size:12px">{{array}}</pre>
  </v-content>
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