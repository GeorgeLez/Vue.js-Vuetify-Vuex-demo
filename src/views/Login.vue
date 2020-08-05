<template>
  <div class="d-flex justify-center align-center" style="height:100%">
    <v-card width="800px" class="pa-5">
      <v-card-title class="justify-center">
        <h3>Login</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            prepend-icon="mdi-folder"
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
            prepend-icon="mdi-folder"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            :loading="loading"
            text
            color="success"
            class="mx-4 mt-3"
            @click="submitLogin"
          >Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import auth from "@/fb";

export default {
  data() {
    return {
      show1: false,
      loading: false,
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
    };
  },
  methods: {
    submitLogin() {},
  },
};
</script>

<style lang="scss" scoped>
</style>