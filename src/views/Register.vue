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

          <!-- <v-container> -->
          <v-select
            v-model="role"
            prepend-icon="mdi-briefcase"
            :items="items"
            :rules="[v => !!v || 'Role is required']"
            label="Role"
            required
          ></v-select>
          <!-- </v-container> -->

          <v-container>
            <div class="d-flex justify-space-around">
              <v-checkbox
                color="primary"
                v-model="photo"
                value="/PirateSvg.png"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Are you a Pirate?"
                required
              ></v-checkbox>

              <v-checkbox
                v-model="photo"
                color="error"
                value="/FairySvg.png"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Are you a Fairy?"
                required
              ></v-checkbox>
            </div>
          </v-container>

          <!-- cards with images for pirate/fairy -->
          <!-- <v-container>
            <v-row dense>
              <v-col cols="6">
                <v-card max-width="100" class="mx-auto">
                  <v-img src="/PirateSvg.png" height="100" width="100" class="align-end"></v-img>
                  <v-card-title class="py-0">
                    <span class="mx-auto">Pirate</span>
                  </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card max-width="100" class="mx-auto">
                  <v-img src="/FairySvg.png" height="100" width="100" class="align-end"></v-img>
                  <v-card-title class="pa-0">
                    <span class="mx-auto">Fairy</span>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>-->
          <!-- end of cards with images for pirate/fairy -->

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
      photo: "",
      loading: false,
      valid: true,
      role: "",
      items: [
        "Web developer",
        "Graphic designer",
        "Social media maverik",
        "Sales guru",
      ],
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
                role: this.role,
                avatar: this.photo,
              });

              let userx = auth.currentUser;
              userx.updateProfile({
                displayName: this.name,
                photoURL: this.photo,
                phoneNumber: this.role,
              });
              console.log(user);
              setTimeout(() => {
                auth.signOut();
              }, 1000);
            });
          // .then(()=>{});

          setTimeout(() => {
            this.$router.replace({ name: "Dashboard" });
          }, 1000);
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