<template>
  <v-app>
    <v-app-bar
      app
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

      <v-btn text v-if="user!==''"><span class="mr-2">{{user}}</span><v-icon>mdi-one-up</v-icon></v-btn>
      <v-btn text v-if="user===''" @click="logueo"><span class="mr-2">mail</span><v-icon small>mdi-email</v-icon></v-btn>
      <v-btn text v-if="user===''" @click="signUp"><span class="mr-2">Facebook</span><v-icon small>mdi-facebook</v-icon></v-btn>
      <v-btn text v-if="user===''" @click="signUp"><span class="mr-2">Google</span><v-icon small>mdi-google</v-icon></v-btn>
      <v-btn text v-if="user!==''" @click="logOut"><span class="mr-2">logout</span></v-btn>
    </v-app-bar>
    <v-container class=" mt-12">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
console.log('App.vue')
import { mapState, mapMutations } from 'vuex';
import { auth } from './main'
import store from './store/index'

export default {
  name: 'App',
  data: () => ({
    email: 'carlos@gmail.com',
    password: '123456'
  }),
  created() {
    console.log('Observador del app.vue'),
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('Hay sesion')
          store.state.displayName = user.displayName;
          store.state.email = user.email;
          store.state.emailVerified = user.emailVerified;
          store.state.photoURL = user.photoURL;
          store.state.isAnonymous = user.isAnonymous;
          store.state.uid = user.uid;
          store.state.user = user.uid;
          store.state.providerData = user.providerData;
        } else {
          console.log('No hay sesion')
          store.state.array = []
          store.state.displayName = ''
          store.state.email = ''
          store.state.emailVerified = ''
          store.state.photoURL = ''
          store.state.isAnonymous = ''
          store.state.uid = ''
          store.state.user = ''
          store.state.providerData = ''
        }
      })
  },
  computed: {
    ...mapState(['user', 'array']),
  },
  methods: {
    ...mapMutations(['observador']),
    logueo() {
      console.log(this.email, this.password)
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.observador()
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
