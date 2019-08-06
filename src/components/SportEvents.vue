<template>
  <main>
    <br />
    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout column align-center>
        <blockquote>
          &#8220;Welcome {{validUserName}}!&#8221;
          <footer>
            <small>
              <em>&mdash;Below is an overview of upcoming TV events.</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-container>
    <br />
    <br />
    <br />
    <v-container grid-list-md fill-height>
      <v-layout wrap>
        <!--<template v-for="event in sportEvents">-->
          <v-flex :key="event" md4>
            <v-card class="mx-auto" min-height="600px">
              {{ sportEvents }}
              <!-- <p class="headline mx-4 pt-5" :key="event">{{ event.strEvent }}</p>
              <p class="ml-4 mt-5">{{ event.strSport }}</p>
              <p class="ml-4 mt-5">{{ event.dateEvent.toDateString() }}</p>
              <p class="ml-4 mt-5">{{ event.strTime }}</p> -->
            </v-card>
          </v-flex>
        <!--</template>-->
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import router from "../router";
import { APIService } from "../http/APIService";
import vuetify from "../plugins/vuetify";
import Axios from "axios";
const apiService = new APIService();

export default {
  name: "SportEvents",
  data: () => ({
    validUserName: "Guest",
    sportEvents: [],
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getSportEvents();
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
    getSportEvents() {
      apiService
        .getSportEvents()
        .then(response => {
          this.sportEvents = response;
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            localStorage.removeItem("newsPreference");
            localStorage.removeItem("stockPreference");
            router.push("/auth");
          }
        });
    },
    goToLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
