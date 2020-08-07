<template>
  <div class="dashboard">
    <!-- snackbar for login -->

    <v-snackbar @loginGreeting="snackbar=true" v-model="snackbar" :timeout="0" top color="success">
      <div class="d-flex align-center justify-space-between">
        <span>Login Greeting. Awesome!</span>
        <v-btn class="ml-3" small text color="white" @click="snackbar = false">Close</v-btn>
      </div>
    </v-snackbar>

    <!-- end of snackbar for login -->
    <h1 class="mb-4 ml-5 subtitle-1 grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption">By project title</span>
            </v-btn>
          </template>
          <span>Sort projects by project title</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>mdi-account</v-icon>
              <span class="caption">By person</span>
            </v-btn>
          </template>
          <span>Sort projects by person name</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sortBy('due', 'date')" v-on="on">
              <v-icon left small>mdi-calendar-today</v-icon>
              <span class="caption">By date</span>
            </v-btn>
          </template>
          <span>Sort projects by date</span>
        </v-tooltip>
      </v-row>
      <v-card v-for="(project, index) in projects" :key="index" flat class="px-3">
        <v-row :class="`pa-3 project ${project.status}`">
          <v-col cols="12" md="6">
            <div class="caption grey--text">Project title</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Due date</div>
            <div>{{formattedDate(project.due)}}</div>
          </v-col>
          <v-col xs="2">
            <div class="pr-10 d-flex justify-end">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from "@/fb";
import moment from "moment";

export default {
  data() {
    return {
      projects: [],
      snackbar: false,
    };
  },
  methods: {
    sortBy(prop, type) {
      if (type === "date") {
        this.projects.sort((a, b) => {
          return new Date(a[prop]) < new Date(b[prop]) ? -1 : 1;
        });
      } else {
        this.projects.sort((a, b) =>
          a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1
        );
      }
    },
    formattedDate(item) {
      return moment(item).format("Do MMM YYYY");
    },
  },
  computed: {},
  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
};
</script>

<style scoped>
.project.complete {
  border-left: 8px solid #3cd1c2;
}
.project.ongoing {
  border-left: 8px solid orange;
}
.project.overdue {
  border-left: 8px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2 !important;
}
.v-chip.ongoing {
  background: #ffaa2c !important;
}
.v-chip.overdue {
  background: #f83e70 !important;
}
</style>
