<template>
  <main>
    <br />
    <v-container fluid grid-list-md>
      <v-layout column align-center>
        <blockquote>
          Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash; Enter a zip code to see weather data for that area</em>
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
                      label="Zip Code"
                      v-model="zipCode"
                      :rules="rules.zipCode"
                      maxlength="5"
                    />
                  </v-flex>
                  <v-flex md1>
                    <v-btn
                      class="mt-4 ml-5 blue darken-4"
                      :disabled="!valid"
                      @click="getWeather(zipCode)"
                    >Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex md12>
            <v-card v-if="zipEntered" class="mb-1">
              <div class="headline ml-4 pt-2">Current Weather for {{ zipCode }}</div>
              <hr class="mb-2" />
              <v-layout row>
                <v-layout column class="ml-5 mb-2">
                  <div>{{ currentWeather.weather.description }}</div>
                  <div>Temperature: {{ currentWeather.temp }} &deg;C</div>
                  <div>Feels Like: {{ currentWeather.app_temp }} &deg;C</div>
                  <div>Wind: {{ currentWeather.wind_spd.toFixed(1) }} m/s {{ currentWeather.wind_cdir_full }}</div>
                  <div>Humidity: {{ currentWeather.rh }}%</div>
                </v-layout>
                <v-layout column>
                  <v-img
                    :src="require(`@/assets/images/weather_icons/${currentWeather.weather.icon}.png`)"
                    height="100px"
                    contain
                  />
                </v-layout>
                <v-layout column />
                <v-layout column />
                <v-layout column />
                <v-layout column />
                <v-layout column />
                <v-layout column />
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex md-12>
            <v-card v-if="zipEntered">
              <div class="headline ml-4 pt-2">Forecast for {{ zipCode }}</div>
              <hr class="mb-2" />
              <v-layout wrap>
                <template v-for="day in forecast">
                  <v-flex :key="day" md3>
                    <v-card class="mx-auto" :key="day">
                      <div class="title ml-4">{{ day.valid_date }}</div>
                      <hr class="mb-2" />
                      <v-layout wrap>
                        <v-layout column class="ml-5 mb-2">
                          <div>{{ day.weather.description }}</div>
                          <div>Low: {{ day.min_temp }} &deg;C</div>
                          <div>High: {{ day.max_temp }} &deg;C</div>
                          <div>Wind: {{ day.wind_spd.toFixed(1) }} m/s {{ day.wind_cdir_full }}</div>
                          <div>Humidity: {{ day.rh }}%</div>
                        </v-layout>
                        <v-layout column>
                          <v-img
                            :src="require(`@/assets/images/weather_icons/${day.weather.icon}.png`)"
                            height="75px"
                            contain
                            class="mb-5"
                          />
                        </v-layout>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </template>
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
  name: "Weather",
  data: () => ({
    valid: true,
    authenticated: false,
    zipCode: "",
    zipEntered: false,
    currentWeather: [],
    forecast: [],
    validUserName: "Guest",
    showMsg: "",
    headers: [],
    rules: {
      zipCode: [
        v => (v && v.length === 5) || "Zip code must be 5 digits",
        v => /^[0-9]+$/.test(v) || "A username can only contain numbers"
      ]
    }
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
    getWeather(zip) {
      this.zipEntered = true;
      apiService.getCurrentWeather(zip).then(response => {
        this.currentWeather = response.data.data[0];
      });

      apiService.getForecast(zip).then(response => {
        let temp = response.data.data;
        temp.forEach(item => {
          item.valid_date = new Date(item.valid_date);
          item.valid_date = item.valid_date.toDateString();
        });
        this.forecast = temp;
      });
    }
  }
};
</script>
<style>
.v-content {
  height: 100%;
  background-color: #303030;
}
</style>
