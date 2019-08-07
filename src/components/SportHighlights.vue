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
        <template v-for="highlight in highlights">
          <v-flex :key="highlight" md6>
            <v-card class="mx-auto" :key="highlight">
              <div class="title ml-4 pt-2">{{ highlight.strSport }}: {{ highlight.strEvent }}</div>
              <div class="subtitle-1 ml-4">{{ highlight.dateEvent }} | {{ highlight.strLeague }}</div>
              <hr class="mb-2" />
              <div class="text-center">
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="640"
                  height="360"
                  :src="'https://www.youtube.com/embed/'+highlight.videoID+'?autoplay=0&origin=http://example.com'"
                  frameborder="0"
                ></iframe>
              </div>
            </v-card>
          </v-flex>
        </template>
        {{ highlights }}
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import router from "../router";
import { APIService } from "../http/APIService";
import vuetify from "../plugins/vuetify";
import Axios from "axios";
import { getIdFromURL } from "vue-youtube-embed";
const apiService = new APIService();

export default {
  name: "SportHighlights",
  data: () => ({
    validUserName: "Guest",
    showMsg: "",
    headers: [],
    highlights: []
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
      let firstRound = [];
      window.x = this;
      apiService
        .getSportHighlights()
        .then(response => {
          firstRound = response.data.tvhighlights;
          firstRound.forEach(highlight => {
            highlight.videoID = getIdFromURL(highlight.strVideo);
            this.highlights.push(highlight);
          });
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            localStorage.removeItem("newsPreference");
            localStorage.removeItem("stockPreference");
            localStorage.removeItem("teamPreference");
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
