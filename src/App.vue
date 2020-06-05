<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
    >
      <v-btn text>
        <v-img
          class="shrink"
          contain
          height="50"
          data="https://www.flaticon.com/authors/freepik"
          title="Thanks www.freepik.com for the logo"
          src="@/assets/koala.svg"
          width="50"
        />
        <span class="ml-3 headline font-weight-medium">koalabe</span>
      </v-btn>

      <v-tabs v-if="usuario">
        <v-tabs-slider color="grey lighten-3"></v-tabs-slider>
        <v-tab to="/dashboard">Dashboard</v-tab>
        <v-tab to="/activities">Activities</v-tab>
        <v-tab to="/feelings">Feelings</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn v-if="usuario" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list class="mt-12">
          <v-list-item>
            <v-btn text><span class="mr-2">Perfil</span></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text><span class="mr-2">Preferencias</span></v-btn>
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
    }
  },
  methods: {
    logInPhoneNumber() {
      // Turn off phone auth app verification.
      auth.settings.appVerificationDisabledForTesting = true;

      var phoneNumber = "+34634226190";
      var testVerificationCode = "987654";

      // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
      // This will resolve after rendering without app verification.
      var appVerifier = new auth.RecaptchaVerifier('recaptcha-container');
      console.log(appVerifier)
      // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
      // reCAPTCHA response.
      auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
        // confirmationResult can resolve with the whitelisted testVerificationCode above.
        return confirmationResult.confirm(testVerificationCode)
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
      });
    },
    logInGmail() {
      console.log(this.email, this.password)
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.$router.replace({name: "Dashboard"})
        })
        .catch(err => console.log(err))
    },
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
