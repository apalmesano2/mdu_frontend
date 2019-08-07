<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash; Here are your favorite team's recent and upcoming games</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
      <br />
      <v-container grid-list-md fill-height>
        <v-layout wrap>
          <v-flex md12>
            <v-layout wrap>
              <v-card class="mb-2">
                <div class="headline ml-4 pt-2">Information {{ preference }}</div>
                <hr class="mb-2" />
                <v-card>
                  <div class="title ml-4">Basic Information</div>
                  <hr class="mb-2" />
                  <div class="ml-4">
                    <div>Year Founded: {{ sportsTeam.intFormedYear }}</div>
                    <div>League: {{ sportsTeam.strLeague }}</div>
                    <v-layout row>
                      <v-flex md6>
                        <div>Stadium: {{ sportsTeam.strStadium }}</div>
                        <div class="ml-4">Location: {{ sportsTeam.strStadiumLocation }}</div>
                        <div class="ml-4">Capacity: {{ sportsTeam.intStadiumCapacity }}</div>
                        <div class="ml-4">Description: {{ sportsTeam.strStadiumDescription }}</div>
                      </v-flex>
                      <v-flex md6>
                        <v-img :src="sportsTeam.strStadiumThumb" height="300px" contain />
                      </v-flex>
                    </v-layout>
                    <v-layout row class="mt-5 ml-1 mb-2">
                      <v-btn
                        @click="goToLink(sportsTeam.strWebsite)"
                        class="blue darken-4 mr-4"
                      >Website</v-btn>
                      <v-btn @click="goToLink(sportsTeam.strFacebook)" class="blue darken-4 mr-4">
                        <v-icon class="mr-2 ml-n1">mdi-facebook-box</v-icon>Facebook
                      </v-btn>
                      <v-btn @click="goToLink(sportsTeam.strTwitter)" class="blue darken-4 mr-4">
                        <v-icon class="mr-2 ml-n1">mdi-twitter-box</v-icon>Twitter
                      </v-btn>
                      <v-btn @click="goToLink(sportsTeam.strInstagram)" class="blue darken-4 mr-4">
                        <v-icon class="mr-2 ml-n1">mdi-instagram</v-icon>Instagram
                      </v-btn>
                      <v-btn @click="goToLink(sportsTeam.strYoutube)" class="blue darken-4">
                        <v-icon class="mr-2 ml-n1">mdi-youtube</v-icon>YouTube
                      </v-btn>
                    </v-layout>
                  </div>
                  <br />
                  <div class="title ml-4">Team Description</div>
                  <hr class="mb-2" />
                  <div class="ml-4">{{ sportsTeam.strDescriptionEN }}</div>
                  <br />
                  <div class="title ml-4">Team Badge, Uniform &amp; Logo</div>
                  <hr class="mb-2" />
                  <v-layout wrap class="ml-4">
                    <v-flex md4>
                      <img :src="sportsTeam.strTeamBadge" height="200px" contain />
                    </v-flex>
                    <v-flex md4>
                      <img :src="sportsTeam.strTeamJersey" height="200px" contain />
                    </v-flex>
                    <v-flex md4>
                      <img :src="sportsTeam.strTeamLogo" height="200px" contain />
                    </v-flex>
                  </v-layout>
                  <br />
                  <div class="title ml-4">Fan Art</div>
                  <hr class="mb-2" />
                  <v-layout wrap class="ml-4">
                    <v-flex md6>
                      <img :src="sportsTeam.strTeamFanart1" height="400px" contain />
                    </v-flex>
                    <v-flex md6>
                      <img :src="sportsTeam.strTeamFanart2" height="400px" contain />
                    </v-flex>
                    <v-flex md6>
                      <img :src="sportsTeam.strTeamFanart3" height="400px" contain />
                    </v-flex>
                    <v-flex md6>
                      <img :src="sportsTeam.strTeamFanart4" height="400px" contain />
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-card>
            </v-layout>
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
  name: "Sports",
  data: () => ({
    valid: true,
    preference: "",
    authenticated: false,
    team: "",
    teamEntered: false,
    sportsTeam: [],
    validUserName: "Guest",
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getTeam();
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
    getTeam() {
      let pref;
      if (localStorage.getItem("teamPreference")) {
        this.preference = " for " + localStorage.getItem("teamPreference");
      }

      apiService
        .getSportsTeam()
        .then(response => {
          this.sportsTeam = response.data.teams[0];
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
      const newURL = "http://" + url;
      window.open(newURL, "_blank");
    }
  }
};
</script>
