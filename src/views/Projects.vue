<template>
  <div class="projects">
    <h1 class="mb-4 ml-5 subtitle-1 grey--text">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel class="mb-4" v-for="(project, index) in myProjects" :key="index">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-4 grey--text">
            <div class="font-weight-bold">Due by {{formattedDate(project.due)}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/fb";
import moment from "moment";

export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    formattedDate(item) {
      return moment(item).format("Do MMM YYYY");
    },
  },
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === "Pirate George";
      });
    },
  },
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
</style>