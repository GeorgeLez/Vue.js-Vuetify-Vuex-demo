<template>
  <div class="d-flex justify-center align-center" style="height:100%">
    <v-card width="800px" class="pa-5" elevation="24">
      <v-card-title class="justify-center">
        <h3 class="font-weight-light text-uppercase">Register</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            :rules="nameErrors"
            label="Name"
            prepend-icon="mdi-account"
            required
            :counter="10"
            validate-on-blur
          ></v-text-field>
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
            :rules="[rules.password]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            counter
            required
            validate-on-blur
            v-on:keyup.enter="submitRegister()"
            prepend-icon="mdi-lock-open"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :loading="loading"
            :disabled="!valid"
            text
            color="success"
            class="mx-4 mt-3"
            @click="submitRegister()"
          >Register</v-btn>
          <p class="text-end">
            <router-link class="text-end" to="/login">Already have an account ?</router-link>
          </p>
        </v-form>
        <p class="error--text text-center ma-3 error-message-caca" v-if="error">{{error.message}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { auth, db } from "@/fb";

export default {
  data() {
    return {
      show1: false,
      loading: false,
      valid: true,
      error: "",
      name: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      nameErrors: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be at most 10 characters long",
      ],
      rules: {
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character"
          );
        },
      },
    };
  },
  methods: {
    async submitRegister() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const user = await auth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((res) => {
              db.collection("users").doc(res.user.uid).set({
                name: this.name,
              });

              let user = auth.currentUser;
              user.updateProfile({
                displayName: this.name,
              });
            });
          // .then(()=>{});
          console.log(user);
          this.$router.replace({ name: "Dashboard" });
        }
      } catch (err) {
        this.error = err;
        this.loading = false;
        this.$refs.form.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>