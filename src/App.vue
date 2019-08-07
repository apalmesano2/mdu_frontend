<template>
  <v-app>
    <v-toolbar dense color="grey darken-3">
      <v-img
        class="mx-2"
        :src="require('@/assets/images/logo.png')"
        max-height="40"
        max-width="40"
        contain
      ></v-img>

      <v-toolbar-title>My Daily Update</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="goHome">Home</v-btn>
        <v-btn text @click="viewNews">News</v-btn>
        <v-btn text @click="viewSports">Sports</v-btn>
        <v-btn text @click="viewStocks">Stocks</v-btn>
        <v-btn text @click="viewEvents">Events</v-btn>
        <v-btn text @click="viewWeather">Weather</v-btn>
        <v-btn text v-if="authenticated" @click="viewUsers">Profile</v-btn>
        <v-btn text v-if="!authenticated" @click="login">Log in</v-btn>
        <v-btn text v-if="authenticated" @click="logout">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import router from "./router";
import { APIService } from "./http/APIService";
const apiService = new APIService();

export default {
  name: "App",
  data: () => ({
    authenticated: false
  }),

  mounted() {
    apiService
      .getUserList()
      .then(response => {
        this.authenticated = true;
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("isAuthenticates");
          localStorage.removeItem("log_user");
          localStorage.removeItem("token");
          localStorage.removeItem("newsPreference");
          localStorage.removeItem("stockPreference");
          this.authenticated = false;
        }
      });
    console.log("this.authenticated--" + this.authenticated);
  },

  methods: {
    logout() {
      localStorage.removeItem("isAuthenticates");
      localStorage.removeItem("log_user");
      localStorage.removeItem("token");
      localStorage.removeItem("newsPreference");
      localStorage.removeItem("stockPreference");
      this.authenticated = false;
      // router.push('/');
      window.location = "/";
    },
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

    login() {
      router.push("/auth");
    },

    goHome() {
      router.push("/");
    }
  }
};
</script>
<style>
.v-content {
  height: 100%;
}
</style>
