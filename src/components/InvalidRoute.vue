<template>
  <!-- <div>Error - Page Not Found</div> -->
  <div class="d-flex justify-center align-center" style="height:100% ">
    <v-card width="800px" class="pa-5" elevation="24">
      <v-card-title class="justify-center">
        <h3 class="font-weight-light text-uppercase">Error - Page Not Found</h3>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center">
          <router-link class="mx-3" to="/">Home</router-link>
          <router-link class="mx-3" to="/login">Login</router-link>
          <router-link class="mx-3" to="/register">Need an account ?</router-link>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>