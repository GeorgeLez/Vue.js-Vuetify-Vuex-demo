<template>
  <v-app>
    <v-main class="grey lighten-4">
      <Navbar />
      <!-- <v-container class="mb-4">
        <router-view></router-view>
      </v-container>-->

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
</style>
