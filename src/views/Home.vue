<template>
  <div class="container">
    <div class="bgimg-1">
      <v-container class="mt-12 d-flex">   
      <v-spacer></v-spacer>   
      <v-card class="elevation-2 mt-12 mx-6">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Mail"
              v-model="logInMail"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="logInPass"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex flex-column">
          <v-btn @click="logIn" elevation="1" color="primary my-2 px-5">Sign In with Mail</v-btn>
          <v-hover v-slot:default="{ hover }">
            <v-img
              :elevation="hover ? 10 : 2"
              style="cursor: pointer"
              @click="logInGoogle"
              src="@/assets/google_signIn.png">
            </v-img>
          </v-hover>
        </v-card-actions>
      </v-card>
      <v-card class="elevation-2 mt-12 mx-6">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Crear</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Mail"
              prepend-icon="mdi-account"
              v-model="createMail"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="createPass"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="createUser" color="primary">Crear</v-btn>
        </v-card-actions>
      </v-card>
      </v-container>
    </div>    
    <div class="bgimg-2">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Hey, everything Alright?</span>
      </div>
    </div>
    <div class="bgimg-3">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Nice</span>
      </div>
    </div>
    <div class="bgimg-1">
      <div class="caption">
      <span class="border">Take care</span>
      </div>
    </div>  
  </div>
</template>

<script>
import { auth, google } from '../main'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    logInMail: '',
    logInPass: '',
    createMail: '',
    createPass: '',
  }),
  methods: {
    createUser() {
      auth.createUserWithEmailAndPassword(this.createMail, this.createPass)
        .then(res => this.$router.go())
        .catch(e => alert(e.message))
    },
    logIn() {
      auth.signInWithEmailAndPassword(this.logInMail, this.logInPass)
        .then(res => this.$router.go())
        .catch(e => alert(e.message))
    },
    logInGoogle() {
      const provider = google
      auth.signInWithPopup(provider)
        .then(res => this.$router.go())
        .catch(err => console.log(err.message));
    }
  }
}
</script>

<style scoped>
    .container {
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      width: 100vw;
    }
    .bgimg-1, .bgimg-2, .bgimg-3 {
      position: relative;
      opacity: 0.6;
      width: 100vw;
      top: 0;
      left: 0;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 100vh;    
    }
    .bgimg-1 {
      background-image: url("../assets/img_parallax.jpg");
    }
    
    .bgimg-2 {
      background-image: url("../assets/img_parallax2.jpg");
    }
    
    .bgimg-3 {
      background-image: url("../assets/img_parallax3.jpg");
    }
    
    .caption {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      text-align: center;
      color: #000;
    }
    
    .caption span.border {
      background-color: #111;
      color: #fff;
      padding: 18px;
      font-size: 25px;
      letter-spacing: 10px;
    }
    
    h3 {
      letter-spacing: 5px;
      text-transform: uppercase;
      font: 20px "Lato", sans-serif;
      color: #111;
    }
</style>