<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;Here is a list of registered users!</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>

      <v-layout column align-center>
        <v-flex xs6 sm8 md7>
          <v-alert
            v-if="showMsg === 'new'"
            dismissible
            :value="true"
            type="success"
          >New user has been added.</v-alert>
          <v-alert
            v-if="showMsg === 'update'"
            dismissible
            :value="true"
            type="success"
          >User information has been updated.</v-alert>
          <v-alert
            v-if="showMsg === 'deleted'"
            dismissible
            :value="true"
            type="success"
          >Selected User has been deleted.</v-alert>
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
                <v-icon @click="deleteUser(item)">mdi-trash-can</v-icon>
                <v-icon @click="selectUser(item)">mdi-check-circle</v-icon>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn class="blue darken-4 ml-3" @click="addNewUser">Add User</v-btn>
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
      { text: "Name", value:"name", sortable: false, align: "left" },
      { text: "Zip Code", value:"zip_code", sortable: false, align: "left" },
      { text: "Email", value:"email", sortable: false, align: "left" },
      { text: "News Preference", value:"news_preference", sortable: false, align: "left" },
      { text: "Stock Preference", value:"stock_preference", sortable: false, align: "left" },
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
    addNewUser() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        router.push("/user-create");
      } else {
        router.push("/auth");
      }
    },
    updateUser(user) {
      router.push("/user-create/" + user.id);
    },
    deleteUser(user) {
      apiService
        .deleteUser(user.id)
        .then(response => {
          if (response.status === 204) {
            alert("User deleted");
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
    },
    selectUser(user) {
      
    }
  }
};
</script>
