<template>
  <div class="contalo">
    <div class="section-1">
      <aside>
        <div class="signIn">
          <h2>{{ voltearValue === true ? 'Iniciar Sesión' : 'Crear Usuario'}}</h2>
          <button
            @click="signInFacebook"
            class="btn-facebook mx-4 my-12"
          >
            <v-icon style="color: white; transform: translateY(-1px); margin-right: 9px;">mdi-facebook</v-icon>
            Facebook
          </button>
          <button
            @click="signInGoogle"
            class="btn-google mx-4 my-12"
          >
            <img src="@/assets/icon-google.png" style="height: 20px; transform: translateY(4px); margin-right: 9px;">
            Google
          </button>
          <input type="email" placeholder="Email" v-model="mail">
          <br>
          <input type="password" placeholder="Password" v-model="password">
          
          <div :class="voltearValue === true ? 'voltear' : 'voltear voltearToggle'">
            <button class="voltear1 error" @click="signIn">Iniciar Sesión</button>
            <button class="voltear2 primary" @click="signUp">Registrar</button>
          </div>

          <a @click="voltearValue = !voltearValue" v-html="voltearText"></a>
        </div>
      </aside>
    </div>
    <div>
      <div style="padding: 45vh 0; margin: 0; text-align: center">emmmmmmm</div>  
    </div>    
    <div class="section-2">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Hey, everything Alright?</span>
      </div>
    </div>
    <div class="section-3">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">Nice</span>
      </div>
    </div>
    <v-footer width="100vw" padless class="primary">
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
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    mail: 'invitado@gmail.com',
    password: '123456',
    voltearValue: true
  }),
  computed: {
    voltearText() {
      if(this.voltearValue===true) {
        return `No eres miembro? <u>Regístrate</u>`
      } else {
        return `Vuelve para <u>Iniciar Sesión</u>`
      }
    }
  },
  methods: {
    signUp() {
      console.log('signup')
      // auth.createUserWithEmailAndPassword(this.mail, this.password)
      //   .then(res => this.$router.go())
      //   .catch(e => alert(e.message))
    },
    signIn() {
      console.log('signin')
      // auth.signInWithEmailAndPassword(this.mail, this.password)
      //   .then(res => this.$router.go())
      //   .catch(e => alert(e.message))
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
  .contalo {
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
    width: 100%;
    height: 100vh;
    clip-path: polygon(50% 0, 100% 0%, 100% 100%, 35% 100%);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: visible;
  }
  .signIn {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: calc(20em + 20vw);
    margin-right: 10vw;
    padding: 2vw 4vw;
    text-align: center;
    width: calc(16em + 16vw);
  }
  .signIn button {
    padding: 1vw 1.5vw;
    font-size: calc(0.6em + 0.6vw);
    border-radius: 10px;
    box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.3);
    outline: none;
  }
  .signIn .btn-facebook {
    background-color: #3b5998;
    color: white;
  }
  .signIn .btn-google {
    background-color: white;
    color: #555555;
  }
  .signIn input {
    color: #333333;
    line-height: 1.2;
    font-size: 18px;
    display: block;
    width: 100%;
    border-radius: 5px;
    background: #eee;
    height: 60px;
    padding: 20px;
    border: 1px solid rgb(195, 195, 195);
  }
  .signIn input:focus {
    border: 1px solid #00d9ff;
    outline: none;
  }
  .voltear {
    transform-style: preserve-3d;
    transition: .8s;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10% 0 30% 0;
  }
  .voltear1, .voltear2 {
    background-color: #234;
    position: absolute;
    color: white;
    width: 100%;
    z-index: 1;
  }
  .voltear2, .voltearToggle {
    transform: rotateY(180deg);
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