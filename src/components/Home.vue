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
          <v-card light>
            <v-container fluid grid-list-md>
              <v-layout row>
                <v-flex xs4>
                  <v-card dark>
                    <v-img :src="require('@/assets/images/customer.jpg')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewUsers">View Profile</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs4>
                  <v-card dark>
                    <v-img :src="require('@/assets/images/news.jpeg')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewNews">News</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs4>
                  <v-card dark>
                    <v-img :src="require('@/assets/images/stocks.jpg')" height="200px"></v-img>
                    <v-card-actions>
                      <v-btn text @click="viewStocks">Stock Market</v-btn>
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
    viewStocks() {
      router.push("/stock-list");
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
}
</style>

