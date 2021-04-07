<template> 
<div id="container">

  <v-card min-width="auto" class="d-flex mx-auto" overflow="scroll">

    <!-- Ajoute la sélection des chaines disponibles --> 
    <v-card elevation="1" width="256" class="d-flex pa-2" >
          <v-navigation-drawer floating permanent>
            <v-list dense rounded>
              <v-subheader>Chaines disponibles</v-subheader>
              <v-list-item v-for="item in items" :key="item.chanel_name" link>

                <v-list-item-content>
                  <v-list-item-title @click="activeChanel(item)">{{ item.chanel_name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
    </v-card>
 
    <v-list one-line>
      <template v-for="(item, index) in items[this.chanel].messages">
        <!-- Ajoute une séparation entre les messages --> 
        <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-if="item.avatar" :key="index.avatar">        
          <v-list-item-avatar>
            <v-avatar color="primary">
              <span class="white--text headline">{{item.avatar}}</span>
            </v-avatar>
          </v-list-item-avatar>
          <!-- Ajoute le message, l'heure, la date et l'username --> 
          <v-list-item-content>
            <v-list-item-title v-html="'<b>' + item.username + '</b>' + ' - ' + item.day + ' à ' + item.time"></v-list-item-title>
            <v-list-item-subtitle v-html="item.message"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </template>
    </v-list>  

  </v-card>

  <!-- Créer un nouveau message par une boite de dialogue --> 
  <v-dialog v-model="dialog" max-width="1000px" >
    <template v-slot:activator="{ on, attrs }">
      <v-card dense color="#e3e3e3" >
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>             
        Nouveau message
      </v-btn>
      </v-card>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Nouveau message</span>
      </v-card-title>
      <tiptap-vuetify v-model="content" :extensions="extensions" />  <!-- Référence au WYSIWYG -->                               
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
        <v-btn color="blue darken-1" text @click="sendMessage"><v-icon>mdi-send</v-icon>Envoyer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

 </div> 
</template>

<script>
import axios from 'axios';
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  name: "Message",
  components: {
    TiptapVuetify
  },
  
   data: () => ({
      items: [],
      chanel: 0,
      dialog: false,
      content: '',
      extensions: [
      // Render in the Bubble menu
      [Link,{renderIn: 'bubbleMenu'}],
      [Underline,{renderIn: 'bubbleMenu'}
      ],
      [Strike,{renderIn: 'bubbleMenu'}],
      [Bold,{renderIn: 'bubbleMenu',options: {levels: [1, 2, 3]}}],
      // Render in the toolbar
      [Blockquote,{renderIn: 'toolbar'}],
      // You can use a short form, the default "renderIn" is "'toolbar'"
      History,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      // Options that fall into the tiptap's extension
      [Heading,{options: {levels: [1, 2, 3]}}],
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak // line break on Shift + Ctrl + Enter
    ],
    }),

  methods: { 

      activeChanel(item){
        this.chanel = this.items.indexOf(item)
      },

      sendMessage () {
      // Défini des variables temporelles et d'id utilisateur
      const time = (new Date()).toLocaleTimeString('fr');
      const day = (new Date()).toLocaleDateString('fr');
      const username = this.$store.state.username;
      const avatar = username.charAt(0) + username.charAt(username.indexOf(" ") +1);
      const chanelId = this.items[this.chanel]._id;

      // écrit les champs utiles dans la base de donnée
      const request = {
        _id: chanelId,
        username: username,
        message: this.content,
        time: time,
        day: day,
        avatar: avatar,
        divider: true,
        inset : true
      }; 
   
      axios.post(`chanels/messages`, request ) 
      .then((response) => {
        console.log(response.data.message);
        this.getMessages();
      })
      .catch(error => {
        alert(error);
      });

      // Enlève l'interface WYSIWYG
      this.dialog = false;
      this.content= '';
    },

    getMessages(){
      axios.get(`chanels/`)
      .then((response) => {
        this.items= response.data;
      });
    }
    
  },
 
  async mounted() {  
      this.getMessages();
      await this.$nextTick();
  },

  updated(){

  }
  

};
</script>