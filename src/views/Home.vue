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
    <!-- Segundo bloque -->
    <div>
      <v-row>
        <v-col>
          <v-img src="@/assets/cactus.gif"></v-img>
        </v-col>
        <v-col class="d-flex align-center">
          <div class="custom-heading primary--text">
            <h2>Are you</h2>
            <h2>having a</h2>
            <h2>tough day?</h2>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- Video Bloque -->
    <v-row class="videoSection">
      <video ref="videoRef" src="" muted loop></video>
        <v-col>
        </v-col>
        <v-col class="d-flex align-center">
          <div class="custom-heading white--text my-md-12 py-md-12 ml-12">
            <v-lazy transition="first-fade">
              <h1>Just</h1>
            </v-lazy>
            <v-lazy transition="second-fade">
              <h1>breathe</h1>
            </v-lazy>
          </div>
        </v-col>
    </v-row>
    <!-- Chill Out -->
    <div class="section-2">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Everything gonna be alright</span>
      </div>
    </div>
    <!-- Timeline -->
    <div class="section-3">
      <v-timeline class="my-7">
        <v-timeline-item
          v-for="(item, index) in eventos"
          :key="index"
          :color="item.color"
          small
        >
          <v-lazy :options="{ threshold: 1.0 }" transition="vertical-fade">
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold ${item.color}--text`"
              v-text="item.time"
            ></span>
          </template>
            <div :class="index%2===0 ? 'd-flex flex-column' : 'd-flex flex-column align-end'">
              <h2 :class="`headline font-weight-light mb-4 ${item.color}--text`">{{item.title}}</h2>
              <p style="text-align: justify; width: 30vw; color: #666">{{item.text}}</p>
            </div>
          </v-lazy>
        </v-timeline-item>
      </v-timeline>
    </div>

    <v-divider class="mx-16 my-16"></v-divider>
    
    <!-- Cards -->
    <div>
      <v-row class="mb-16">
          <v-col
            class="d-flex justify-space-around"
            :key="index"
            v-for="(item, index) in ultimoCards"
            >
            <v-lazy :options="{ threshold: 1.0 }" transition="vertical-fade">
              <v-card class="text-center" width="300" flat>
                <v-avatar class="my-4 rounded-circle" height="150" width="150">
                  <img :src="item.img">
                </v-avatar>
                <v-card-title class="justify-center">{{item.title}}</v-card-title>
                <v-card-text>{{item.text}}</v-card-text>
              </v-card>
            </v-lazy>
        </v-col>
      </v-row>
    </div>

    <v-footer width="100vw" height="200" padless dark>
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
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

createSimpleTransition('vertical-fade')

export default {
  name: 'Home',
  data: () => ({
    isActive: false,
    e1: 1,
    eyeIcon: false,
    mail: 'invitado@gmail.com',
    password: '123456',
    ultimoCards: [
      {
        img: require('@/assets/pug.gif'),
        title: 'People',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
      },
      {
        img: require('@/assets/giphy.webp'),
        title: 'Loves',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
      },
      {
        img: require('@/assets/like.gif'),
        title: '3 items',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
      }
    ],
    eventos: [
      { 
        color: 'cyan',
        time: 'CoVid-19',
        title: 'Planeamiento del Proyecto',
        text: 'Una vez decretado el estado de alarma, con una fuerte paralización en el sistema productivo mundial, comienza la incertidumbre a generar angustia, por lo cual llevar un control de las emociones a medida que el tiempo avanza, serviría para notar algún patrón inusual incluso antes que suceda.'
      },
      { color: 'green',
        time: "Abril '20",
        title: 'Desarrollo del Proyecto',
        text: 'El estado de alarma avanzó, llevando el encierro a un punto determinante. Muchas conductas son afectadas y llegan a ocurrir sube y bajas emocionales fuertes. Comienza el desarrollo de una CRUD para llevar un control de las emociones en estas circunstancias.'
      },
      { color: 'pink',
        time: "Mayo '20",
        title: 'Último mes frío',
        text: 'El desarrollo inicial se lleva a cabo con MongoAtlas y el hosting en GitHub, para mudar todo por completo a los servidores de Google con su servicio de Firebase, donde contamos con hosting, auth, base de datos y storage.'
      },
      { color: 'amber',
        time: 'Junio',
        title: 'Llega el Verano',
        text: `Muchas personas haciendo ejercicio, una ciudad reactivada. Días con noches más cortas. Se van sumando una serie de gráficos para complementar lo atractivo en la app, y se desarrolla un borrador para Android.`
      },
      // { color: 'orange',
      //   time: 'CoVid-19',
      //   title: 'Inicio de Cuarentena',
      //   text: '....................'
      // },
      ],
  }),
  computed: {
    voltearText() {
      return this.e1===1 ? `No eres miembro? <u>Regístrate</u>` : `Vuelve para <u>Iniciar Sesión</u>`
    }
  },
  mounted() {
    this.vamos()
  },
  methods: {
    signUp() {
      auth.createUserWithEmailAndPassword(this.mail, this.password)
        .then(res => this.$router.go())
        .catch(e => alert(e.message))
    },
    signIn() {
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
    },
    vamos() {
      this.$refs.videoRef.src = require('@/assets/video.mp4');
      this.$refs.videoRef.play();
    }
  }
}
</script>

<style scoped>
  .first-fade-enter-active {
    transition: all 20s .1s ease;
  }
  .first-fade-enter {
    transform: translateY(30px);
    opacity: 0
  }
  .second-fade-enter-active {
    transition: all 20s 4s ease;
    opacity: .6;
  }
  .second-fade-enter {
    transform: translateY(30px);
    opacity: 0;
  }
  .vertical-fade-enter-active {
    transition: all 1s .3s ease;
  }
  .vertical-fade-enter {
    transform: translateY(30px);
    opacity: 0;
  }
  .videoSection {
    position: relative;
    height: 100vh;
  }
  .videoSection video {
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