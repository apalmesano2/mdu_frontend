<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-left>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;Check out how the stock market is doing!</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
      <br />
      <v-container grid-list-md fill-height>
        <v-layout wrap>
          <v-flex md12>
            <v-card class="mb-4 mx-auto">
              <p class="headline mx-4 pt-3 mb-0">{{ sectors['Meta Data']['Information'] }}</p>
              <p class="mx-4 pb-2">Last Refreshed: {{ this.sectors['Meta Data']['Last Refreshed'] }}</p>
            </v-card>
          </v-flex>
          <template v-for="group in groups">
            <v-flex :key=group md4>
              <v-card :key="group">
                <p class="headline mx-4 pt-3 mb-0">{{ group[0] }}</p>
                <hr class="mb-2"/>
                <template v-for="sector in group[1]">
                  <div :key="sector" class="mx-4">{{ sector[0] }}: {{ sector[1] }}</div>
                </template>
                <br/>
              </v-card>
            </v-flex>
          </template>
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
  name: "StockList",
  data: () => ({
    sectors: [],
    groups: [],
    validUserName: "Guest",
    stockSize: 0,
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getSectors();
    this.showMessages();
  },
  methods: {
    showMessages() {
      console.log(this.$route.params.msg);
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getSectors() {
      apiService
        .getSectorData()
        .then(response => {
          window.x = this;
          this.sectors = response.data;
          const res = Object.entries(response.data);
          res.shift();
          res.forEach(element => {
            element[1] = Object.entries(element[1]);
          });
          this.groups = res;
          // if (
          //   localStorage.getItem("isAuthenticates") &&
          //   JSON.parse(localStorage.getItem("isAuthenticates")) === true
          // ) {
          //   this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          // }
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            router.push("/auth");
          }
        });
    },
    deleteStock(stock) {
      apiService
        .deleteStock(stock.pk)
        .then(response => {
          if (response.status === 204) {
            alert("Stock deleted");
            this.showMsg = "deleted";
            this.$router.go();
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            router.push("/auth");
          }
        });
    }
  }
};
</script>
