

<template>
  <!-- Color and size to text -->
  <div class="home">
    <h1>Homepage</h1>
    <p class="red white--text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio harum suscipit a doloremque quidem reprehenderit animi aperiam?
      Tempora quam unde, commodi numquam omnis sint eaque fuga veniam quod, dolore aliquid?
    </p>
    <p class="pink lighten-4 red--text text--darken-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ea ab officiis eos numquam!
      Quam repellat dolores ex velit qui saepe sapiente quis, sint reprehenderit cum aliquam porro earum. Accusantium.
    </p>
    <h1 class="display-4">Massive Display</h1>
    <h4 class="display-1">Smaller display</h4>
    <p class="headline">This is a headline</p>
    <p class="subtitle-1 font-weight-bold">This is a subheading</p>
    <p class="caption">This is a caption</p>

    <!-- buttons  -->
    <v-btn class="pink white--text">Click me</v-btn>
    <v-btn depressed color="pink">Click me</v-btn>
    <v-btn color="pink" text>Click me</v-btn>

    <v-btn depressed class="pink white--text">
      <v-icon left>email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn depressed small class="pink white--text">
      <v-icon left small>email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn depressed large class="pink white--text">
      <span>email me</span>
      <v-icon right large>email</v-icon>
    </v-btn>

    <v-btn fab depressed small dark color="purple">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <!-- breakpoints -->
    <v-btn class="hidden-xl-and-down">And down</v-btn>

    <v-btn class="hidden-md-and-up">And up</v-btn>

    <v-btn class="hidden-sm-only">Only</v-btn>

    <!-- grid system -->
    <v-container class="my-5">
      <v-row>
        <v-col md="12" lg="6">
          <v-btn outlined block color="primary">1</v-btn>
        </v-col>
        <v-col md="4" lg="2">
          <v-btn outlined block color="primary">2</v-btn>
        </v-col>
        <v-col md="4" lg="2">
          <v-btn outlined block color="primary">2</v-btn>
        </v-col>
        <v-col md="4" lg="2">
          <v-btn outlined block color="primary">2</v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col md="4" lg="3">
          <v-btn outlined block color="success">1</v-btn>
        </v-col>
        <v-col md="4" lg="3">
          <v-btn outlined block color="success">2</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!--  -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      test: [
        {
          title: "Design a new website",
          person: "Pirate George",
          due: "1st Jan 2021",
          status: "ongoing",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Set up the homepage",
          person: "Chun Li",
          due: "13th Jan 2020",
          status: "complete",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Design video thumbnails",
          person: "Ryu",
          due: "20th May 2020",
          status: "complete",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          title: "Create a community forum",
          person: "Gouken",
          due: "24th Oct 2019",
          status: "overdue",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
      ],
    };
  },
};
</script>
