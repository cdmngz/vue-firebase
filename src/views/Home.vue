<template>
  <div class="containerPrincipal">
    <div class="section-1">  
      <aside></aside>
      <v-row class="pt-12">
        <v-col xs="12" sm="5" md="5" class="ma-md-12">
          <div class="custom-heading">
            <h1>Track your emotions</h1>
            <h4 style="opacity: .4">Get patterns</h4>
          </div>
        </v-col>
        <v-col xs="12" sm="7" md="5" class="mx-md-12">
          <v-stepper v-model="e1" class="d-flex flex-column ma-sm-12 pa-md-6">
            <v-stepper-items>
              <v-stepper-content step="1" class="text-center">
                <h2>Iniciar Sesión</h2>
                <v-row class="my-6">
                  <v-col xs="12" md="6" class="text-center">
                    <v-btn @click="signInFacebook" dark color="#3b5998" class="pa-6">
                      <v-icon class="mx-2">mdi-facebook</v-icon>Facebook
                    </v-btn>
                  </v-col>
                  <v-col xs="12" md="6" class="text-center">
                    <v-btn @click="signInGoogle" class="white pa-6">
                      <v-img src="@/assets/btn_google_light_normal_ios.svg"></v-img>Google
                    </v-btn>
                  </v-col>
                </v-row>
                <v-text-field
                  color="blue"
                  filled
                  outlined
                  placeholder="Email"
                  prepend-inner-icon="mdi-account"
                  :success="mail.length > 8"
                  v-model="mail"
                ></v-text-field>
                <v-text-field
                  :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  color="blue"
                  @click:append="eyeIcon = !eyeIcon"
                  filled
                  outlined
                  placeholder="Password"
                  prepend-inner-icon="mdi-lock"
                  :success="password.length > 4"
                  :type="eyeIcon ? 'text' : 'password'"
                  v-model="password"
                ></v-text-field>
                <v-btn class="orange darken-4 pa-6 my-2" dark @click="signIn">Iniciar Sesión</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-text-field
                  class="my-8"
                  color="blue"
                  filled
                  outlined
                  placeholder="Email"
                  prepend-inner-icon="mdi-account"
                  :success="mail.length > 8"
                  v-model="mail"
                ></v-text-field>
                <v-btn
                  class="orange darken-4 pa-6 mt-n5 mb-6"
                  @click="mail!=='' ? e1 = 3 : mail = ''"
                  dark
                >
                  Siguiente
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-text-field
                  :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  class="my-8"
                  color="blue"
                  @click:append="eyeIcon = !eyeIcon"
                  filled
                  outlined
                  placeholder="Password"
                  prepend-inner-icon="mdi-lock"
                  :success="password.length > 4"
                  :type="eyeIcon ? 'text' : 'password'"
                  v-model="password"
                ></v-text-field>
                <v-btn class="orange darken-4 pa-6 mt-n5 mb-6" dark @click="signUp">Registrar</v-btn>
              </v-stepper-content>
            </v-stepper-items>
            <a class="text-center" @click="e1===1 ? [e1++, mail='', password=''] : e1=1" v-html="voltearText"></a>
          </v-stepper>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col>
          <v-img src="@/assets/cactus.gif"></v-img>
        </v-col>
        <v-col class="d-flex align-center">
          <div class="custom-heading primary--text">
            <h2>Are you</h2>
            <h2>having a</h2>
            <h2>rough day?</h2>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-row class="videoSection">
      <video autoplay src="@/assets/video.mp4" loop></video>
        <v-col></v-col>
        <v-col>
          <div class="custom-heading white--text my-md-12 py-md-12 ml-12">
            <h1 style="opacity: .6">Just</h1>
            <h1 style="opacity: .6">breath</h1>
          </div>
        </v-col>
    </v-row>

    <div class="section-2">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Everything gonna be alraight</span>
      </div>
    </div>

    <div class="section-3">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Nice</span>
      </div>
    </div>

    <v-footer width="100vw" height="200" padless dark class="primary">
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Keeped</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import { auth, google, facebook } from '../main'

export default {
  name: 'Home',
  data: () => ({
    e1: 1,
    eyeIcon: false,
    mail: 'invitado@gmail.com',
    password: '123456',
  }),
  computed: {
    voltearText() {
      return this.e1===1 ? `No eres miembro? <u>Regístrate</u>` : `Vuelve para <u>Iniciar Sesión</u>`
    }
  },
  methods: {
    signUp() {
      console.log('signup')
      auth.createUserWithEmailAndPassword(this.mail, this.password)
        .then(res => this.$router.go())
        .catch(e => alert(e.message))
    },
    signIn() {
      console.log('signin')
      auth.signInWithEmailAndPassword(this.mail, this.password)
        .then(res => this.$router.go())
        .catch(e => alert(e.message))
    },
    signInGoogle() {
      const provider = google
      auth.signInWithPopup(provider)
        .then(res => this.$router.go())
        .catch(err => console.log(err.message));
    },
    signInFacebook() {
      const provider = facebook
      auth.signInWithPopup(provider)
        .then(res => this.$router.go())
        .catch(err => console.log(err.message));
    }
  }
}
</script>

<style scoped>
  .videoSection {
    position: relative;
    height: 100vh;
  }
  video {
    position: absolute;
    width: 100%;
    min-height: 100vh;
  }
  .containerPrincipal {
    position: absolute;
    padding: 0;
    top: 0;
    left: 0;
    width: 100vw;
    font-family: Arial, Helvetica, sans-serif;
  }
  .section-1, .section-2, .section-3 {
    position: relative;
    width: 100vw;
    top: 0;
    left: 0;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;    
  }
  .section-1 { background-image: url("../assets/img_parallax.jpg"); }
  .section-2 { background-image: url("../assets/img_parallax2.jpg"); }
  .section-3 { background-image: url("../assets/img_parallax3.jpg"); }

  .section-1 aside {
    background-color: rgba(0,0,0,0.2);
    clip-path: polygon(50% 0, 100% 0%, 100% 100%, 35% 100%);
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .custom-heading {
    color: white;
    font-size: calc(2em + 2vw) !important;
    line-height: 2em;
    margin: calc(.3em + .3vw) 0 0 calc(.5em + .8vw);
    position: relative;
  }
  .caption {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #fff;
  }
  .caption span.border {
    background-color: #555;
    color: #fff;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 10px;
  }
</style>