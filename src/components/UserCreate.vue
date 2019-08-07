<template>
  <v-container grid-list-md>
    <v-layout row wrap align-left justify-left fill-height>
      <v-flex xs12 sm8 lg7 md5>
        <v-layout column align-center>
          <v-flex xs6 sm8 md7>
            <v-alert
              v-if="showMsg === 'error'"
              dismissible
              :value="true"
              type="error"
            >Please verify User information.</v-alert>
          </v-flex>
        </v-layout>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">{{pageTitle}}</span>
          </v-card-title>

          <v-spacer />

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-container>
                <v-text-field v-model="user.name" label="Name" required />
                <v-text-field v-model="user.zip_code" label="Zip Code" required />
                <v-text-field v-model="user.email" label="Email" required />
                <v-text-field v-model="user.news_preference" label="News Preference" required />
                <v-text-field v-model="user.stock_preference" label="Stock Preference" required />
                <v-text-field v-model="user.favorite_team" label="Favorite Team" requires />
              </v-container>
              <v-btn v-if="!isUpdate" class="blue darken-4" @click="createUser">Save</v-btn>
              <v-btn v-if="isUpdate" class="blue darken-4" @click="updateUser">Update</v-btn>
              <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "UserCreate",
  components: {},
  data() {
    return {
      showError: false,
      user: {},
      pageTitle: "Add New User",
      isUpdate: false,
      showMsg: ""
    };
  },
  methods: {
    createUser() {
      apiService
        .addNewUser(this.user)
        .then(response => {
          if (response.status === 201) {
            this.user = response.data;
            this.showMsg = "";
            router.push("/user-list/new");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    },
    cancelOperation() {
      router.push("/user-list");
    },
    updateUser() {
      apiService
        .updateUser(this.user)
        .then(response => {
          if (response.status === 200) {
            this.user = response.data;
            router.push("/user-list/update");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.pageTitle = "Edit User";
      this.isUpdate = true;
      apiService
        .getUser(this.$route.params.id)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
    }
  }
};
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
