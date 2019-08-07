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
    <v-container grid-list-md fill-height>
      <v-layout wrap>
        <v-flex md12>
          <v-card>
            <div class="headline ml-5 pt-2">Sport Events on TV Today</div>
            <hr class="mb-2" />
          </v-card>
        </v-flex>
        <template v-for="event in sportEvents">
          <v-flex :key="event" md6>
            <v-card class="mx-auto mb-2">
              <v-layout column align-center>
                <v-layout row>
                  <v-flex md6>
                    <div class="ml-5">
                      <div class="title pt-2">{{ event.strSport }}: {{ event.strEvent }}</div>
                      <div>Channel: {{ event.strChannel }}</div>
                      <div>Date: {{ event.dateEvent }}</div>
                      <div class="mb-2">Time: {{ event.strTime }}</div>
                    </div>
                  </v-flex>
                  <v-flex md6>
                    <v-img :src="event.strLogo" height="75px" contain class="mt-5" />
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-card>
          </v-flex>
        </template>
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
          this.sportEvents = response.data.tvevents;
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
