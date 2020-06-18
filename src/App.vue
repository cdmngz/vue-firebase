<template>
  <v-app>
    <v-app-bar
      app
      :color="currentRouteName === 'Home' ? 'transparent' : 'primary'"
      :absolute="currentRouteName === 'Home' ? true : false"
      dark
      :flat="currentRouteName === 'Home' ? true : false"
    >
      <v-btn text class="d-flex align-center mx-1">
        <v-img
          class="shrink"
          contain
          height="50"
          data="https://www.flaticon.com/authors/freepik"
          title="Thanks www.freepik.com for the logo"
          src="@/assets/koala.svg"
          width="50"
        />
        <span class="ml-3 headline font-weight-medium">keeped</span>
      </v-btn>

      <v-tabs v-if="usuario">
        <v-tabs-slider color="grey lighten-3"></v-tabs-slider>
        <v-tab to="/dashboard">Dashboard</v-tab>
        <v-tab to="/activities">Activities</v-tab>
        <v-tab to="/feelings">Feelings</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-menu :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn v-if="usuario" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text to="/profile"><span class="mr-2">Perfil</span></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text  @click="logOut"><span class="mr-2">logout</span></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container class=" mt-12">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { auth } from './main'

export default {
  name: 'App',
  computed: {
    usuario() {
      if(auth.currentUser) {
        return auth.currentUser.uid
      } else {
        return null
      }
    },
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    logOut() {
      auth.signOut()
        .then(() => {
          console.log('Bye...')
          this.$router.go()
        })
    }
  }
};
</script>
