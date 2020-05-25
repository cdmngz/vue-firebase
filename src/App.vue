<template>
  <v-app>
    <v-app-bar
      
      color="success"
      dark
    >
      <v-btn href="/" text>
        <v-img
          class="shrink"
          contain
          height="50"
          data="https://www.flaticon.com/authors/nikita-golubev"
          title="Thanks Nikita Golubev for the logo"
          src="@/assets/giraffe.svg"
          width="50"
        />
        <span class="ml-3 headline font-weight-medium">Keeple</span>
      </v-btn>
      <v-tabs v-show="user">
        <v-tab to="/dashboard">Dashboard</v-tab>
        <v-tab to="/activities">Activities</v-tab>
        <v-tab to="/feelings">Feelings</v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-btn text v-if="user!==0"><span class="mr-2">{{user}}</span><v-icon>mdi-one-up</v-icon></v-btn>
      <v-btn text v-if="user===0" @click="logueo"><span class="mr-2">li</span><v-icon>mdi-heart</v-icon></v-btn>
      <v-btn text v-if="user===0" @click="signUp"><span class="mr-2">su</span><v-icon>mdi-facebook</v-icon></v-btn>
      <v-btn text v-if="user!==0" @click="logOut"><span class="mr-2">lo</span><v-icon>mdi-google</v-icon></v-btn>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { auth } from './main'

export default {
  name: 'App',
  data: () => ({
    email: 'carlos@gmail.com',
    password: '123456'
  }),
  updated() {
    this.observador()
  },
  computed: {
    ...mapState(['user', 'array']),
  },
  methods: {
    ...mapMutations(['llevar', 'observador']),
    logueo() {
      console.log(this.email, this.password)
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.llevar(res.user.uid)
          this.$router.replace({name: "Dashboard"})
        })
        .catch(err => console.log(err))
    },
    signUp() {
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(res => console.log(res))
        .catch(err => {
          console.log(err.message)
        });
    },
    logOut() {
      auth.signOut()
        .then(() => {
          console.log('Bye...')
          this.observador()
          this.$router.replace({name: "Home"})
        });
    }
  }
};
</script>
