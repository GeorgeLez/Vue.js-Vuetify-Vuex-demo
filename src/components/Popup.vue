<template>
  <div class="text-center pb-4">
    <v-dialog max-width="600px" v-model="dialog">
      <template v-slot:activator="{on}">
        <v-btn outlined color="white" v-on="on">Add new project</v-btn>
      </template>

      <!-- adding new project button -->
      <v-card>
        <v-card-title>
          <h3>Add a new project</h3>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="mdi-folder"
              :rules="inputRules"
              required
            ></v-text-field>
            <v-textarea
              label="Information about the project"
              v-model="content"
              prepend-icon="mdi-pencil"
              :rules="inputRules"
              required
            ></v-textarea>

            <v-menu transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{on}">
                <v-text-field
                  :value="formatDate"
                  v-on="on"
                  readonly
                  :rules="inputRules"
                  label="Due date"
                  required
                  prepend-icon="mdi-calendar-range"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>
            <!-- end of adding new project button -->

            <v-btn :loading="loading" text class="success mx-0 mt-3" @click="submit">Add project</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/fb";

export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      due: null,
      inputRules: [
        (v) => (v && v.length >= 5) || "Minimum length is 5 characters.",
      ],
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const project = {
          title: this.title,
          content: this.content,
          due: this.due,
          person: "Pirate George",
          status: "ongoing",
        };

        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAddedNotification");

            // this.title = "";
            // this.due = "";
            // this.content = "";
            this.reset();
            this.$refs.form.resetValidation();
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  computed: {
    formatDate() {
      return this.due ? moment(this.due).format("Do MMMM YYYY") : "";
    },
  },
};
</script>