<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash; Enter a team below</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
      <br />
      <v-container grid-list-md fill-height>
        <v-layout wrap>
          <v-flex md12>
            <v-card class="mb-2 mx-auto">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout row justify-center>
                  <v-flex md11>
                    <v-text-field
                      class="ml-5"
                      label="Enter a team"
                      v-model="Team"
                      maxlength="25"
                    />
                  </v-flex>
                  <v-flex md1>
                    <v-btn
                      class="mt-4 ml-5 blue darken-4"
                      :disabled="!valid"
                      @click="getTeam(Team)"
                    >Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex md12>
            <v-card v-if="TeamEntered" class="mb-1">
              <div class="headline ml-4 pt-2">Current information for {{ Team }}</div>
              <hr class="mb-2" />
              <v-layout row>
                <v-layout column align-center>
                  <v-layout row>
                    <v-layout column class="ml-5 mb-4 mt-2">
                      <div>{{ SportsTeam.strStadium }}</div>
                    </v-layout>
                  </v-layout>
                </v-layout>
              </v-layout>
            </v-card>
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
    authenticated: false,
    Team: "",
    TeamEntered: false,
    SportsTeam: [],
    validUserName: "Guest",
    showMsg: "",
    headers: [],
  }),
  mounted() {
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
    getTeam(team) {
      this.TeamEntered = true;
      apiService.getSportsTeam(team).then(response => {
        this.SportsTeam = response.data.data[0];
      })
      .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            localStorage.removeItem("newsPreference");
            localStorage.removeItem("stockPreference");
            localStorage.removeItem('teamPreference');
            router.push("/auth");
          }
        });;
    }
  }
};
</script>
