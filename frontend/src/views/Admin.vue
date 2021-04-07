<template>
  <div id="app">
  <v-app id="inspire">
    <v-container class="py-10" fluid>
    <mytoolbar/>
      <userdata/>
      <v-divider></v-divider>
        <chanels/>
    </v-container>
  </v-app>
</div>
</template>

<script>
import mytoolbar from "@/components/MyToolbar.vue"
import userdata from "@/components/UsersData.vue";
import chanels from "@/components/Chanels.vue";

export default {
    name: "admin",
    components: { 
        mytoolbar,
        userdata,
        chanels
    },

};

</script>
