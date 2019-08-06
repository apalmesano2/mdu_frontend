/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://mdu-backend.herokuapp.com'; /* http://groyce.pythonanywhere.com/ or http://localhost:8000 */
const NEWS_API = '5e1e0ae2beea466f8673c0ab1ae181f8';
const STOCK_API = '5MHUFOYQCBAHIL3Z';
const WEATHER_API = '32bad162ffbf4942ad533f40ca430f9f';
const EVENT_API = 'skjftv2QV4mQXVRw';

export class APIService {
  constructor() {

  }

  getUser(param_pk) {
    const url = `${API_URL}/api/mdu_users/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
  }

  getUserList() {
    const url = `${API_URL}/api/mdu_users/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: headers });

  }

  addNewUser(user) {
    const url = `${API_URL}/api/mdu_users/`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.post(url, user, { headers: headers });
  }

  updateUser(user) {
    const url = `${API_URL}/api/mdu_users/${user.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    console.log(user);
    return axios.put(url, user, { headers: headers });
  }

  deleteUser(user_pk) {
    const url = `${API_URL}/api/mdu_user/${user_pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.delete(url, { headers: headers });
  }

  getNewsForPage(user) {
    return axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API}`);
  }

  getSectorData() {
    return axios.get(`https://www.alphavantage.co/query?function=SECTOR&apikey=${STOCK_API}`);
  }

  getMarketTracker() {
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=^DJI&outputsize=compact&apikey=${STOCK_API}`);
  }

  getCurrentWeather(zipcode) {
    const url = `http://api.weatherbit.io/v2.0/current?key=${WEATHER_API}&postal_code={ZIP_CODE}&country=US`;
    const newURL = url.replace('{ZIP_CODE}', zipcode);
    return axios.get(newURL);
  }

  getForecast(zipcode) {
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API}&postal_code={ZIP_CODE}&country=US`;
    const newURL = url.replace('{ZIP_CODE}', zipcode);
    return axios.get(newURL);
  }

  getEvents(location, radius) {
    if(location.includes(', ')) {
      location.replace(', ', '+');
    }
    // Eventful API doesn't like CORS requests, have to use a proxy here
    const url = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${EVENT_API}&location={LOCATION}&date=Future&within={RADIUS}`;
    const newURL = url.replace('{LOCATION}', location);
    const newerURL = newURL.replace('{RADIUS}', radius);
    return axios.get(newerURL);
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }

  selectUser(user) {
    const data = this.getUser(user).json()
  }
}
