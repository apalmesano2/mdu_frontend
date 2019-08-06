<template>
  <main>
    <br />
    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout column align-center>
        <blockquote>
          &#8220;Welcome {{validUserName}}!&#8221;
          <footer>
            <small>
              <em>&mdash;Below is an overview of the most recent sport highlights.</em>
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
          <template v-for="tvhighlights in SportHighlights">
            <v-flex :key="tvhighlights" md4>
              <v-card class="mx-auto" min-height="600px" :key="tvhighlights">
                <p class="headline mx-4 pt-5" v-bind:key="tvhighlights">{{ tvhighlights.strEvent }}</p>
                <p class="ml-4 mt-5" :key="tvhighlights">{{ tvhighlights.strSport}}</p>
                <p class="ml-4 mt-5" :key="tvhighlights">{{ tvhighlights.strLeague}}</p>
                <p class="ml-4 mt-5" :key="tvhighlights">{{ tvhighlights.strVideo}}</p>
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
  name: "SportHighlights",
  data: () => ({
    validUserName: "Guest",
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getSportHighlights();
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
    getSportHighlights() {
      apiService.getSportHighlights().then(response => {
        this.sporthighlights= response.data.articles;
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
