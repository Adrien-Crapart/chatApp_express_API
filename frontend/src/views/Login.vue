<template>
  <div id="app">
  <v-app id="inspire">
    <v-container class="py-10" fluid>
      <connexion/>
     
    </v-container>
  </v-app>
</div>
</template>

<script>
  import connexion from "@/components/Connexion";
  export default {
    name: "login",
    components: { 
      connexion 
    },
  };
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