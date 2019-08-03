<template>
  <v-app>
    <v-toolbar dense color="blue darken-4">
      <v-toolbar-title>My Daily Update</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="goHome">Home</v-btn>
        <v-btn text @click="viewUsers">Profile</v-btn>
        <v-btn text @click="viewNews">News</v-btn>
        <v-btn text @click="viewStocks">Stock Market</v-btn>
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

    viewStocks() {
      router.push("stock-list");
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
