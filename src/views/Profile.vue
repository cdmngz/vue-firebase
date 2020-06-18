<template>
  <div class="mt-12 d-flex flex-column justify-center align-center">
    <v-avatar dark color="primary" size="120"><v-icon x-large color="white">mdi-account</v-icon></v-avatar><br>
    <v-row>
      <h4>{{nombre}}</h4>
    </v-row>
  </div>
</template>

<script>
import { auth } from '../main'

export default {
  computed: {
    nombre() {
      if(auth.currentUser) {
        return auth.currentUser.email
      } else {
        return null
      }
    }
  }
}
</script>