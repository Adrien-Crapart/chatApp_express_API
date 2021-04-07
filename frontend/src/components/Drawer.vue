<template>
  <div>
    <!-- Affiche la liste des onglets sur la gauche de la page -->
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-item ripple :to="item.action" :key="i" v-else>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2" @click="item.action">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>

export default {
  name: 'drawer',
  data: function () {
    return {
      items: [
        { icon: 'mdi-sleep', text:'Se déconnecter', action: this.signOut },
        { icon: 'mdi-message-text', text: 'Messagerie', action: this.messageMenu },
        { icon: 'mdi-account-key', text: 'Admin', action: this.adminMenu  }
      ],
    };
  },
  methods: {

    adminMenu() {
      if (this.$store.state.userAdmin !="admin"){
        alert ("Vous n'avez pas les droits nécessaires");
      }else {
        this.$store.commit('authentication', true);
        this.$router.push('/admin');
      }
    },

    messageMenu() {
      this.$store.commit('authentication', true);
      this.$router.push('/messages');
    },

    // Gère la déconnexion d'un utilisateur déjà enregistré
    signOut() {
        this.$store.commit('authentication', false);
        this.$store.commit('userName', '');
        this.$store.commit('userId', '');
        this.$store.commit('userAdmin', false);
        this.$store.commit('token', '');
        this.$router.push('/');
              
    },
  },
};
</script>
 