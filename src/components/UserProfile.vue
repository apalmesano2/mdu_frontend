<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-left>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;My Daily Update</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>

      <v-layout column align-center>
        <v-flex xs6 sm8 md7>
          <v-alert
            v-if="showMsg === 'update'"
            dismissible
            :value="true"
            type="success"
          >User information has been updated.</v-alert>
        </v-flex>
      </v-layout>
      <br />
      <v-container fluid grid-list-md fill-height>
        <v-layout column>
          <v-flex md6>
            <v-data-table
              :headers="headers"
              :items="users"
              hide-default-footer
              class="elevation-1"
              fixed
              style="max-height: 300px; overflow-y: auto"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon @click="updateUser(item)">mdi-pencil</v-icon>
              </template>
            </v-data-table>
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
  name: "UserList",
  data: () => ({
    users: [],
    validUserName: "Guest",
    userSize: 0,
    showMsg: "",
    headers: [
      { text: "Record Number", value:"id", sortable: false, align: "left" },
      { text: "User ID", value:"user_details.id", align: "left", sortable: false },
      { text: "First Name", value:"user_details.first_name", sortable: false, align: "left" },
      { text: "Last Name", value:"user_details.last_name", sortable: false, align: "left" },
      { text: "Email", value:"user_details.email", sortable: false, align: "left" },
      { text: "News Provider", value:"newsProvider", sortable: false, align: "left" },
      { text: "Stock Market Tracker", value:"stockAggregate", sortable: false, align: "left" },
      { text:"Actions", name: "Actions", value: "actions" }
    ]
  }),
  mounted() {
    this.getUsers();
    this.showMessages();
  },
  methods: {
    showMessages() {
      console.log(this.$route.params.msg);
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getUsers() {
      apiService
        .getUserList()
        .then(response => {
          this.users = response.data.data;
          this.userSize = this.users.length;
          if (
            localStorage.getItem("isAuthenticates") &&
            JSON.parse(localStorage.getItem("isAuthenticates")) === true
          ) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
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
    },
    updateUser(user) {
      router.push("/user-create/" + user.id);
    },
  }
};
</script>
<style>
.v-content {
  height: 100%;
  background-color: #303030;
}
</style>
