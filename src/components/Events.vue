<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash; Enter a city or zip code to see upcoming events for that area</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
      <br />
      <v-container grid-list-md fill-height>
        <v-layout wrap>
          <v-flex md12>
            <v-card class="mb-2 mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout row justify-center>
                  <v-flex md10>
                    <v-text-field
                      class="ml-5"
                      label="Location"
                      v-model="location"
                      :rules="rules.location"
                    />
                  </v-flex>
                  <v-flex md1>
                    <v-select
                      v-model="radius"
                      :items="items"
                      label="Radius (miles)"
                      :append-icon="appendIcon ? 'mdi-plus' : ''"
                      :prepend-icon="prependIcon ? 'mdi-minus' : ''"
                    ></v-select>
                  </v-flex>
                  <v-flex md1>
                    <v-btn
                      class="mt-4 ml-5 blue darken-4"
                      :disabled="!valid"
                      @click="getEventsList(location, radius)"
                    >Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex md12>
            <v-card v-if="locationEntered" class="mb-1">
              <div class="headline ml-4 pt-2">Upcoming Events for {{ location }}</div>
              <hr class="mb-2" />

              <v-layout wrap>
                <template v-for="event in upcomingEvents">
                  <v-flex :key="event" md4>
                    <v-card class="mx-auto" :key="event">
                      <p class="headline mx-4 pt-5" :key="event">{{ event.title }}</p>
                      <v-img
                        v-if="event.image"
                        :src="event.image.medium.url"
                        height="325px"
                        contain
                      />
                      <v-img
                        v-else
                        :src="require('@/assets/images/broken.png')"
                        height="325px"
                        contain
                      />
                      <p class="ml-4 mt-5" :key="event">{{ event.description }}</p>
                      <v-btn
                        class="mb-4 ml-4 blue darken-4"
                        v-bind:key="event"
                        @click="goToLink(event.url)"
                      >View Event Page</v-btn>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </main>
</template>


<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "Weather",
  data: () => ({
    valid: true,
    authenticated: false,
    location: "",
    radius: 0,
    locationEntered: false,
    upcomingEvents: [],
    validUserName: "Guest",
    showMsg: "",
    headers: [],
    rules: {
      location: [
        v =>
          /^[a-zA-Z0-9,. ]+$/.test(v) ||
          "Please only enter letters, commas, and/or dashes"
      ],
      radius: []
    },
    items: [1, 5, 10, 25, 50, 100]
  }),
  mounted() {
    this.showMessages();
    if (localStorage.getItem("isAuthenticates")) {
      this.authenticated = true;
      this.validUserName = JSON.parse(localStorage.getItem("log_user"));
    }
  },
  methods: {
    showMessages() {
      console.log(this.$route.params.msg);
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getEventsList(location, radius) {
      this.locationEntered = true;
      apiService.getEvents(location, radius).then(response => {
        const temp = response.data.events.event;
        temp.forEach((element, index) => {
          // this if block is to remove the advertisements disguised as real events
          if (element.title.includes("Marketing: ")) {
            temp.splice(index, 1);
          }
        });
        this.upcomingEvents = temp;
      });
    },
    goToLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
