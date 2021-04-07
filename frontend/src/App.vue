<template>
  <v-app>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view/> <!-- Affiche la route active par des redirections de pages-->
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "app",
  };
</script>

