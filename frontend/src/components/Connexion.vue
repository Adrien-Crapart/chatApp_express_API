<template>
<v-card style="padding:40px;">
    <form @submit.prevent="login">  <!-- directive V-on pour l'envois du formulaire -->
      <h1>Se connecter à votre compte</h1>
      <!-- Input de l'adresse email -->
      <v-text-field id="email" type="email" class="form-control" name="email" value v-model="form.email" label="Adresse mail" required autofocus></v-text-field>
      <!-- Input du mot de passe -->
      <v-text-field id="password" type="password" class="form-control" name="password" v-model="form.password" label="Mot de passe" required></v-text-field>    
      <div class="valid-form">
      <!-- Bouton de connexion -->
      <v-btn type="submit">Connexion</v-btn> <!-- directive V-on pour annuler -->
      <register/>  <!--Bouton de création de compte -->
      <v-alert class='alert-connection' v-if="connect == 1" dense text type="error">{{error}}</v-alert>
      </div>
    </form>  
</v-card>
</template>

<script>
import register from "@/components/Register";
import axios from 'axios';

export default {
  name: "login",
  components: { 
    register 
  },
  data: () => {
    return {
      dialog: false,
      form: {
        email: "",
        password: ""
      },
      error: [],
      connect: 0,
    };
  },
  computed: {
 
  },
  methods: {
    // Gère la connexion d'un utilisateur déjà enregistré
    login() {
      const request = {
          email: this.form.email,
          password: this.form.password
      };
      axios.post(`auth/login/`, request )
      .then((response) => {
        this.$store.commit('authentication', true);
        this.$store.commit('userName', response.data.name + " " + response.data.surname);
        this.$store.commit('userId', response.data.userId);
        this.$store.commit('userAdmin', response.data.role);
        this.$store.commit('token', response.data.token);
        this.$router.push('/messages');
      })
      .catch(error => {
        alert(error);
      });
    },
    
  },
  
}
</script>

<style scoped>
  .home{
    margin: auto;
    text-align: center;
  }
  .home > h1, .home > h2, .home > h3 {
    color: white;
  }
  #app{
    margin: auto;
    width: 40%;
    text-align: center;
    align-content: center;
    margin: auto;
  }
  .alert-connection{
    margin-top: 20px;
  }
  .valid-form{
    margin-top: 20px;
  }
</style>