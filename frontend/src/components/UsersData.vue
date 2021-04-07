<template>
  <v-data-table :headers="headers" :items="users" sort-by="create" class="elevation-10">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gestion des utilisateurs</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Ajouter un utilisateur -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nouvel utilisateur</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Ajouter un utilisateur</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Prénom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.surname" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Mot de passe"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rôle"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
                
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="createUser">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modifier un utilisateur -->  
        <v-dialog v-model="dialog_edituser" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Modifier un utilisateur</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem._id" label="Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Prénom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.surname" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rôle"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog_edituser = false">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="editusersave">Modifier</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <!-- Modifier un utilisateur -->
      <v-icon small class="mr-2" @click="edituser(item)">mdi-pencil</v-icon>
      <!-- Supprimer un utilisateur -->
      <v-icon small @click="deleteuser(item)">mdi-delete</v-icon>
    </template>

  </v-data-table>
</template>

<script>
import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      dialog_edituser: false,
      headers: [
        {
          text: 'Prénom',
          align: 'start',
          value: 'name',
        },
        { text: 'Nom', value: 'surname' },
        { text: 'Id', value: '_id' },
        { text: 'Email', value: 'email' },
        { text: 'Rôle', value: 'role' },
        { text: 'Créer le', value: 'create' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     users: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        name: '',
        surname: '',
        password:'',
        email: '',
        role: ''
      }
    }),

    methods: {

      edituser (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog_edituser = true                  
      },
      editusersave () {
        const request = {
            id: this.editedItem._id,
            email: this.editedItem.email,
            surname: this.editedItem.surname,
            name: this.editedItem.name,
            role : this.editedItem.role,
            userId: this.$store.state.token
        };
        axios.put(`auth/`, request, {headers: {"Content-Type": 'application/json'}})
        .then((response) => {           
            this.editedItem._id= '';
            this.editedItem.name= '';
            this.editedItem.surname= '';
            this.editedItem.password='';
            this.editedItem.email= '';
            this.editedItem.role= '';
            this.dialog_edituser = false;
            this.getUser();
            alert(response.data.message);
        })
        .catch(error => {
            alert(error);
        });
                  
      },
      

      deleteuser (item) {   
        axios.delete(`auth/`, {data: {
              id: item._id,
              userId: this.$store.state.token
            }}, 
            {
              headers: {
                "Content-Type": 'application/json'
              }
        })
        .then((response) => {
            alert(response.data.message);
            this.getUser();
        })
        .catch(error => {
            alert(error);
        });
      },

      createUser () {
        const day = (new Date()).toLocaleDateString('fr');
        const request = {
            email: this.editedItem.email,
            password: this.editedItem.password,
            surname: this.editedItem.surname,
            name: this.editedItem.name,
            role : this.editedItem.role,
            create: day,
            userId: this.$store.state.token
        };
        axios.post(`auth/signup/`, request, {headers: {"Content-Type": 'application/json'}} )
        .then((response) => {
            this.dialog = false
            this.getUser();
            alert(response.data.message);

        })
        .catch(error => {
            alert(error);
        });
        
      },  
      
      getUser(){
        axios.get(`auth/`, {headers: {"Content-Type": 'application/json'}})
        .then((response) => {
          this.users= response.data;
        });
      },

    },

    // Nouveau cycle de vie de l'application
    async mounted() {  
      this.getUser();
      await this.$nextTick();
    },

    updated(){

    }
  }
</script>
