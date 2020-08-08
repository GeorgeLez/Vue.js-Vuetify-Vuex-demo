<template>
  <div class="d-flex justify-center align-center" style="height:100%">
    <v-card width="800px" class="pa-5" elevation="24">
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
          >Login</v-btn>
          <p class="text-end">
            <router-link class="text-end" to="/register">Need an account ?</router-link>
          </p>
        </v-form>

        <p class="error--text text-center ma-3 error-message-caca" v-if="error">{{error.message}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { auth } from "@/fb";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

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
        console.log("Value from auth success:", val);
        this.$router.replace({ name: "Dashboard" });

        this.snackSwitch(true);
      } catch (err) {
        this.error = err;
      }
    },
    //vuex action
    ...mapActions(["snackSwitch"]),
  },
  computed: {
    ...mapGetters(["valueOfSnack"]),
  },
};
</script>

<style  scoped>
</style>