<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;Below are the top news stories right now.</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
      <br />
      <v-container grid-list-md fill-height>
        <v-layout wrap>
          <template v-for="story in news">
            <v-flex :key="story" md4>
              <v-card class="mb-4 mx-auto" min-height="600px" :key="story">
                <p class="headline mx-4 pt-5" v-bind:key="story">{{ story.title }}</p>
                <v-img :src="story.urlToImage" height="325px" contain />
                <p class="ml-4 mt-5" :key="story">{{ story.description }}</p>
                <v-btn
                  class="mb-4 ml-4 blue darken-4"
                  v-bind:key="story"
                  @click="goToLink(story.url)"
                >Go To Article</v-btn>
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
import vuetify from "../plugins/vuetify";
import Axios from "axios";
const apiService = new APIService();

export default {
  name: "NewsList",
  data: () => ({
    news: [],
    validUserName: "Guest",
    newsSize: 0,
    showMsg: "",
    headers: []
  }),
  mounted() {
    this.getNews();
    this.showMessages();
  },
  methods: {
    showMessages() {
      console.log(this.$route.params.msg);
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getNews() {
      apiService.getNewsForPage().then(response => {
        this.news = response.data.articles;
      })
      .catch(error => {
        this.news = {
          'title': 'There was an issue retrieving your news',
          'description': 'Please try again later',
          'url': '',
          'urlToImage': '@/assets/images/broken.png'

        }
      });
    },
    goToLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

