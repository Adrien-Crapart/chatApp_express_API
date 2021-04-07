<template>
<!-- Bouton de création d'un nouvel utilisateur -->
      <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-2" color="primary" dark v-bind="attrs" v-on="on">Pas encore inscrit ?</v-btn>
      </template>
      <form @submit.prevent="register">
     
      <v-card>
        <v-card-title>
          <span class="headline">Création d'un compte</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field type="text" class="form-control" v-model="form.name" label="Prénom *" required autofocus>></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field type="text" class="form-control" v-model="form.surname" label="Nom *"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field id="email" type="email" class="form-control" name="email" value v-model="form.email" label="Adresse mail*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="password" class="form-control" v-model="form.password" label="Mot de passe *" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6"></v-col>
            </v-row>
          </v-container>
          <small>* Champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn> <!-- directive V-on pour annuler -->
          <v-btn color="blue darken-1" text @click="register">Enregistrer</v-btn> <!-- directive V-on pour envoyer -->
        </v-card-actions>
      </v-card>
      </form> 
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {

  data: () => {
    return {
      dialog: false,
      form: {
        surname:"",
        name:"",
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
    // Gère l'enregistrement d'un nouvel utilisateur
    register() {
      const day = (new Date()).toLocaleDateString('fr');
      const request = {
          email: this.form.email,
          password: this.form.password,
          surname: this.form.surname,
          name: this.form.name,
          role : 'user',
          create: day
      };
      axios.post(`http://localhost:3000/api/auth/signup/`, request )
      .then((response) => {
        alert(response.data.message);
        this.dialog= false;
        this.$store.commit('authentication', true);
        this.$store.commit('userName', response.data.name + " " + response.data.surname);
        this.$store.commit('userId', response.data.userId);
        this.$store.commit('userAdmin', response.data.role);
        this.$store.commit('token', response.data.token);
        this.$router.push('/messages')
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
</style>