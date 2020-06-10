<template>
  <div class="container">
    <div class="section-1">
      <aside>
        <div class="login">
          <h2 id="title">Iniciar Sesión con</h2>
          <button class="btn-facebook mx-4 my-12">
            <v-icon style="color: white; transform: translateY(-1px); margin-right: 9px;">mdi-facebook</v-icon>
            Facebook</button>
          <button class="btn-google mx-4 my-12">
            <img src="@/assets/icon-google.png" style="height: 20px; transform: translateY(4px); margin-right: 9px;">
            Google
          </button>
          <input type="email" placeholder="Email">
          <br>
          <input type="password" placeholder="Password">
          <div class='voltear'>
            <button class="voltear1 primary" onClick="alert('ger')">Iniciar Sesión</button>
            <button class="voltear2 primary" onClick="alert('gol')">Registrar</button>
          </div>
          <a onClick="registrarView(event)">No eres miembro? Regístrate</a>
        </div>
      </aside>
    </div>
    <div>
      <h1 style="padding: 45vh 0">Veaamos</h1>  
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
    <div class="section-1">
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
  }
  .login {
    background-color: rgba(255, 255, 255, 1);
    margin-right: 10vw;
    width: 35vw;
    padding: 2vw 4vw;
    border-radius: 10px;
    text-align: center;
  }
  .login button {
    padding: 1vw 1.5vw;
    font-size: 18px;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.3);
    outline: none;
  }
  .login .btn-facebook {
    background-color: #3b5998;
    color: white;
  }
  .login .btn-google {
    background-color: white;
    color: #555555;
  }
  .login input {
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
  .login input:focus {
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
    background-color: #234 !important;
    position: absolute;
    color: white;
    width: 100%;
  }
  .voltear1 {
    transform-style: preserve-3d;
  }
  .voltear2 {
    position: absolute;
    transform-style: preserve-3d;
    transform: rotateY(180deg);
  }
  .voltearToggle {
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

<script>
  let toggleValue = true
  registrarView = (event) => {
    console.log(event)
      document.querySelector('.voltear').classList.toggle("voltearToggle")
    if(toggleValue) {
      document.getElementById('title').innerText = ('Registrar con')
      event.target.innerHTML = 'Volver para Iniciar Sesión'
      toggleValue = false
    } else {
      document.getElementById('title').innerText = ('Iniciar Sesión con')
      event.target.innerHTML = 'No eres miembro? Regístrate'
      toggleValue = true
    }
  }
</script>