<template>
  <div id="app">
    <mytoolbar/>
    <message/>
  </div>
</template>

<script>
import mytoolbar from "@/components/MyToolbar.vue";
import message from "@/components/Message.vue";

export default {
  name: "Message",
  components: {
    mytoolbar,
    message
  },
};
</script>

<style scoped>
#app{
  display: flex;
}
</style>