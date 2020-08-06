<template>
  <div class="pb-0 d-flex justify-center align-center" style="height:100%">
    <!-- snackbar -->

    <v-snackbar v-model="snackbar" :timeout="0" top color="success">
      <div class="d-flex align-center justify-space-between">
        <span>Login Greeting. Awesome!</span>
        <v-btn class="ml-3" small text color="white" @click="snackbar = false">Close</v-btn>
      </div>
    </v-snackbar>

    <!-- end of snackbar -->
    <v-card width="800px" class="px-5 pt-5" elevation="24">
      <v-card-title class="justify-center">
        <h3 class="font-weight-light text-uppercase">Login</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            prepend-icon="mdi-email"
            required
            validate-on-blur
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            counter
            required
            validate-on-blur
            prepend-icon="mdi-lock-open"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            :loading="loading"
            :disabled="!valid"
            text
            color="success"
            class="mx-4 mt-3"
            @click="submitLogin()"
          >Add project</v-btn>
        </v-form>
        <p class="text-end">Need an account ?</p>
        <p class="error--text text-center ma-3 error-message-caca" v-if="error">{{error.message}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { auth } from "@/fb";

export default {
  data() {
    return {
      show1: false,
      loading: false,
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters long",
      ],
      error: "",
      snackbar: true,
    };
  },
  methods: {
    async submitLogin() {
      try {
        const val = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(val);
        this.$router.replace({ name: "Dashboard" });
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>

<style  scoped>
</style>