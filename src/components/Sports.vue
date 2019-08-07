<template>
  <main>
    <br />
    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout column align-center>
        <blockquote>
          &#8220;Welcome {{validUserName}}!&#8221;
          <footer>
            <small>
              <em>&mdash;This is your dashboard, what would you like to do?</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-container>
    <br />
    <br />
    <br />
    <v-container fluid fill-height>
      <v-layout justify-center row>
        <v-flex xs12 sm6>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/video.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewSportHighlights">View Sport Highlights</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/sportevents.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewSportEvents">View Sport Events</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/teams.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewSportTeams">Search Sport Teams</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import router from "../router";

export default {
  name: "Home",
  data: () => ({
    validUserName: "Guest"
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    viewSportHighlights() {
      router.push("/sporthighlights");
    },
    viewSportEvents() {
      router.push("/sportevents");
    },
    viewSportTeams() {
      router.push("/sportteams");
    },

    getUser() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      }
    }
  }
};
</script>
