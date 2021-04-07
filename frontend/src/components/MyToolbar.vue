<template>
  <div>
    
    <!-- Affiche les menus dans une barre latérale à droite-->
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <myContentDrawer /> 
    </v-navigation-drawer>

    <!-- Affiche le bandeau avec un burger menu -->
    <v-app-bar dark clipped-left app src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome" class="white--text" >Chat-App</v-toolbar-title>
    </v-app-bar>

  </div>
</template>

<script>
import myContentDrawer from "@/components/Drawer"

export default {
  name: 'myToolbar',
  data: function () {
    return {
      drawer: false
    }
  },
  components: {
      myContentDrawer
  },
  methods: {
    goHome () {
      this.$router.replace('/')
    }
  }
}
</script>