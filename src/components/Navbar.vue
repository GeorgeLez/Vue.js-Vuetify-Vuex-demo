<template>
  <nav>
    <!-- snackbar -->

    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <div class="d-flex align-center justify-space-between">
        <span>You added a new project. Awesome!</span>
        <v-btn class="ml-3" small text color="white" @click="snackbar = false">Close</v-btn>
      </div>
    </v-snackbar>

    <!-- end of snackbar -->

    <v-app-bar flat>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Pirate</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <!-- toggle background selected for v-list buttons -->
        <v-list flat>
          <v-list-item
            color="primary"
            v-for="(link, index) in links"
            :key="index"
            router
            :to="link.route"
          >
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- end ofdropdown menu -->

      <v-btn text color="grey" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-row>
        <v-col align="center" class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="User's avatar" />
          </v-avatar>
          <p class="white--text subtitle-1 mt-3">{{displayName}}</p>
        </v-col>
      </v-row>
      <Popup @projectAddedNotification="snackbar =true" />
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
import { auth, db } from "@/fb";

export default {
  components: {
    Popup,
  },
  data() {
    return {
      drawer: false,
      displayName: "",
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" },
      ],
      snackbar: false,
    };
  },
  methods: {
    async signOut() {
      try {
        const data = await auth.signOut();
        console.log(data);
        this.$router.replace({ name: "Login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    let user = auth.currentUser;
    let usersRef = db.collection("users");

    // let self = this;

    // async function getData() {
    //   try {
    // const data = await usersRef
    usersRef
      .doc(user.uid)
      .get()
      .then((res) => {
        this.displayName = res.data().name;
        // console.log(tempName);
        // console.log("wht is this", this.displayName);
        // return tempName;
      });
    // return data;
    // console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getData();
    // console.log("this is data", getData());

    // displayName = tempName;

    // db.collection("users").onSnapshot((res) => {
    //   // const data = res.docChanges();
    //   console.log(doc.user.id);
    //   console.log("this is res:", res);
    //   console.log("this is user", user);
    // changes.forEach((change) => {
    //   if (change.type === "added") {
    //     this.projects.push({
    //       ...change.doc.data(),
    //       id: change.doc.id,
    //     });
    //   }
    // });
    // });
  },
};
</script>

<style  scoped>
</style>