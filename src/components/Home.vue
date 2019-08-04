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
                    <v-img :src="require('@/assets/images/tiles/user.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewUsers">View Profile</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/news.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewNews">News</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/sports.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewSports">Sports</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/stocks.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewStocks">Stocks</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/events.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewEvents">Events</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img :src="require('@/assets/images/tiles/weather.png')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewWeather">Weather</v-btn>
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
    viewUsers() {
      router.push("/user-list");
    },
    viewNews() {
      router.push("/news");
    },
    viewSports() {
      router.push("/sports");
    },
    viewStocks() {
      router.push("/stocks");
    },
    viewEvents() {
      router.push("/events");
    },
    viewWeather() {
      router.push("/weather");
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-content {
  height: 100%;
  background-color: #303030;
}
</style>
