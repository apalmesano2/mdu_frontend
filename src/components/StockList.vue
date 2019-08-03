<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
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
            <v-card v-if="authenticated" class="mb-4 mx-auto">
              <p class="headline mx-4 pt-3 mb-0">Your Market Tracker's Previous 6 Days:</p>
              <hr class="mb-2" />
              <v-layout wrap>
                <template v-for="day in tracker">
                  <v-flex :key="day" md2>
                    <v-card :key="day" class="mx-3 mb-2 pa-2">
                      <p class="mb-0 title">{{ day[0] }}</p>
                      <hr class="mb-1" />
                      <p class="mb-0">Open: ${{ day[1]['1. open'] }}</p>
                      <p class="mb-0">High: ${{ day[1]['2. high'] }}</p>
                      <p class="mb-0">Low: ${{ day[1]['3. low'] }}</p>
                      <p>Close: ${{ day[1]['4. close'] }}</p>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-card>
            <v-card class="mx-auto">
              <p class="headline mx-4 pt-3 mb-0">{{ sectors['Meta Data']['Information'] }}</p>
              <p class="mb-1 mx-4 pb-2">Last Refreshed: {{ this.sectors['Meta Data']['Last Refreshed'] }}</p>
            </v-card>
          </v-flex>
          <template v-for="group in groups">
            <v-flex :key="group" md4>
              <v-card :key="group">
                <p class="headline mx-4 pt-3 mb-0">{{ group[0].substring(8) }}</p>
                <hr class="mb-2" />
                <template v-for="sector in group[1]">
                  <div :key="sector" class="mx-4">{{ sector[0] }}: {{ sector[1] }}</div>
                </template>
                <br />
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
    tracker: [],
    authenticated: false,
    validUserName: "Guest",
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getSectors();
    this.showMessages();
    if (localStorage.getItem("isAuthenticates")) {
      this.authenticated = true;
      this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      this.getMarketTracker();
    }
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
          this.sectors = response.data;
          const res = Object.entries(response.data);
          res.shift();
          res.forEach(element => {
            element[1] = Object.entries(element[1]);
          });
          this.groups = res;
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
    getMarketTracker() {
      apiService
        .getMarketTracker()
        .then(response => {
          const respData = Object.entries(response.data["Time Series (Daily)"]);
          for (let i = 100; i > 6; i--) {
            respData.pop();
          }
          respData.forEach(item => {
            item[0] = new Date(item[0]).toDateString();

            //debugger;
            item[1]["1. open"] = parseFloat(item[1]["1. open"]);
            item[1]["1. open"] = item[1]["1. open"].toFixed(2);
            item[1]["1. open"] = item[1]["1. open"].replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            );

            item[1]["2. high"] = parseFloat(item[1]["2. high"]);
            item[1]["2. high"] = item[1]["2. high"].toFixed(2);
            item[1]["2. high"] = item[1]["2. high"].replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            );

            item[1]["3. low"] = parseFloat(item[1]["3. low"]);
            item[1]["3. low"] = item[1]["3. low"].toFixed(2);
            item[1]["3. low"] = item[1]["3. low"].replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            );

            item[1]["4. close"] = parseFloat(item[1]["4. close"]);
            item[1]["4. close"] = item[1]["4. close"].toFixed(2);
            item[1]["4. close"] = item[1]["4. close"].replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            );
          });
          this.tracker = respData;
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.authenticated = false;
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
