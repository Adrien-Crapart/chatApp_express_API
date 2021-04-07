<template>
  <v-data-table :headers="headers" :items="chanels" sort-by="create" class="elevation-10">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Gestion des chaines</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Ajouter une chaine -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nouvelle chaine</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Ajouter une chaine</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.chanel_name" label="Nom de la chaine"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
                
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="createChanel">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <!-- Supprimer un utilisateur -->
      <v-icon small @click="deleteChanel(item)">mdi-delete</v-icon>
    </template>

  </v-data-table>
</template>

<script>
import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Nom de la chaine',
          align: 'start',
          value: 'chanel_name',
        },
        { text: 'Id', value: '_id' },
        { text: 'Créer le', value: 'create' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     chanels: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        chanel_name: ''
      }
    }),

    methods: {  

      deleteChanel (item) {           
            axios.delete(`chanels/`, {data: {
              id: item._id, 
              userId: this.$store.state.token
              }}, 
              {
                headers: {
                "Content-Type": 'application/json'
                }
              })
            .then((response) => {
                this.getChanel();
                alert(response.data.message);
            })
            .catch(error => {
                alert(error);
            });
      },

      createChanel () {
        const day = (new Date()).toLocaleDateString('fr');
        const request = {
            chanel_name: this.editedItem.chanel_name,
            create: day,
            messages: [],
            userId: this.$store.state.token
        };
        axios.post(`chanels/`, request, {headers: {"Content-Type": 'application/json'}})
        .then((response) => {           
            alert(response.data.message);
            this.dialog = false
            this.getChanel();
        })
        .catch(error => {
            alert(error);
        });
      }, 

      getChanel(){
        axios.get(`chanels/`, {headers: {"Content-Type": 'application/json'}})
        .then((response) => {         
            this.chanels= response.data;
        });
      }, 
    },

    // Nouveau cycle de vie de l'application
    async mounted() {  
        this.getChanel();
        await this.$nextTick();
    },

    updated(){

    }
  }
</script>
